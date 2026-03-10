import Parser from "rss-parser";

const AEMPS_FEED_URL = "https://www.aemps.gob.es/feed/";
const MAPA_FEED_URL =
  (import.meta.env.NEWS_SOURCE_URL as string | undefined)?.trim() ||
  "https://www.mapa.gob.es/es/ganaderia/noticiasrss";

const FEED_TTL_MS = 10 * 60 * 1000;
const IMAGE_TTL_MS = 15 * 60 * 1000;
const IMAGE_FETCH_TIMEOUT_MS = 3500;
const NORMALIZE_CONCURRENCY = 8;

// TODO: whitelist no funcional
const MAPA_WHITELIST_TERMS = [
  "veterin",
  "ganader",
  "sanidad animal",
  "bienestar animal",
  "medicamento veterin",
  "receta veterin",
  "presvet",
  "antibiot",
  "antimicrobian",
  "resistencia antimicrobiana",
  "enfermedad animal",
  "vacuno",
  "bovin",
  "porcin",
  "granja"
];

const BLACKLIST_TERMS = [
  "pesca",
  "pesquer",
  "acuicult",
  "flota",
  "caladero",
  "marit",
  "citrico",
  "regadio",
  "olivar",
  "aceite de oliva",
  "vino",
  "vitivin",
  "hortaliza",
  "fruta",
  "forestal",
  "silvic",
  "cine",
  "planas"
];

const NORMALIZED_MAPA_WHITELIST = MAPA_WHITELIST_TERMS.map(normalizeText).filter(Boolean);
const NORMALIZED_BLACKLIST = BLACKLIST_TERMS.map(normalizeText).filter(Boolean);

type CacheEntry<T> = {
  value: T;
  expiresAt: number;
};

type MediaField = {
  url?: string;
  href?: string;
  $?: {
    url?: string;
    href?: string;
  };
};

type RawRssItem = {
  title?: string;
  link?: string;
  pubDate?: string;
  isoDate?: string;
  description?: string;
  summary?: string;
  content?: string;
  contentSnippet?: string;
  contentEncoded?: string;
  categories?: string[];
  category?: string | string[];
  enclosure?: {
    url?: string;
  };
  mediaContent?: MediaField[] | MediaField;
  mediaThumbnail?: MediaField[] | MediaField;
};

type FeedSource = "aemps" | "mapa";

type InternalNewsItem = NewsItem & {
  timestamp: number;
  dedupeKey: string;
};

export type NewsItem = {
  title: string;
  link: string;
  pubDate: string;
  image: string | null;
  description: string;
};

const parser = new Parser<Record<string, never>, RawRssItem>({
  timeout: 10000,
  headers: {
    "User-Agent": "Mozilla/5.0 (compatible; GeneraRecetasBot/1.0)"
  },
  customFields: {
    item: [
      ["content:encoded", "contentEncoded"],
      ["media:content", "mediaContent", { keepArray: true }],
      ["media:thumbnail", "mediaThumbnail", { keepArray: true }],
      ["category", "category", { keepArray: true }]
    ]
  }
});

let feedCache: CacheEntry<NewsItem[]> | null = null;
let feedInFlight: Promise<NewsItem[]> | null = null;

const imageCache = new Map<string, CacheEntry<string | null>>();
const imageInFlight = new Map<string, Promise<string | null>>();

export function getCurrentNewsYear(): number {
  return new Date().getUTCFullYear();
}

export async function getNewsItems(): Promise<NewsItem[]> {
  return loadAllNewsItems();
}

export async function getAvailableNewsYears(): Promise<number[]> {
  const items = await loadAllNewsItems();
  const years = unique(
    items.map((item) => getYearFromDate(item.pubDate)).filter((year): year is number => Number.isInteger(year) && year >= 2000)
  ).sort((a, b) => b - a);

  return years.length ? years : [getCurrentNewsYear()];
}

export async function getNewsByYear(yearInput: number): Promise<NewsItem[]> {
  const year = Number(yearInput);
  if (!Number.isInteger(year) || year < 2000 || year > getCurrentNewsYear()) {
    return [];
  }

  const items = await loadAllNewsItems();
  return items.filter((item) => getYearFromDate(item.pubDate) === year);
}

async function loadAllNewsItems(): Promise<NewsItem[]> {
  const now = Date.now();
  if (feedCache && feedCache.expiresAt > now) {
    return feedCache.value;
  }

  if (feedInFlight) {
    return feedInFlight;
  }

  feedInFlight = (async () => {
    const [aemps, mapa] = await Promise.allSettled([
      loadFeedItems(AEMPS_FEED_URL, "aemps"),
      loadFeedItems(MAPA_FEED_URL, "mapa")
    ]);

    const allItems = [
      ...(aemps.status === "fulfilled" ? aemps.value : []),
      ...(mapa.status === "fulfilled" ? mapa.value : [])
    ];

    const deduped = dedupeItems(allItems)
      .sort((a, b) => b.timestamp - a.timestamp)
      .map(({ timestamp: _timestamp, dedupeKey: _dedupeKey, ...item }) => item);

    feedCache = {
      value: deduped,
      expiresAt: Date.now() + FEED_TTL_MS
    };

    return deduped;
  })().catch((error) => {
    console.error("[news-service] Error loading feeds.", error);
    return [];
  });

  try {
    return await feedInFlight;
  } finally {
    feedInFlight = null;
  }
}

async function loadFeedItems(feedUrl: string, source: FeedSource): Promise<InternalNewsItem[]> {
  const feed = await parser.parseURL(feedUrl);
  const items = Array.isArray(feed.items) ? feed.items : [];
  const normalized = await mapLimit(items, NORMALIZE_CONCURRENCY, (item) => normalizeItem(item, source));
  return normalized.filter((item): item is InternalNewsItem => Boolean(item));
}

async function normalizeItem(item: RawRssItem, source: FeedSource): Promise<InternalNewsItem | null> {
  const title = cleanText(item.title ?? "");
  const link = cleanUrl(item.link ?? "");
  const description = cleanText(stripHtml(item.contentSnippet ?? item.summary ?? item.description ?? item.contentEncoded ?? item.content ?? ""));
  const categories = collectCategories(item);

  if (!title || !link) {
    return null;
  }

  if (!passesSourceFilters({ title, link, description, categories }, source)) {
    return null;
  }

  const timestamp = toTimestamp(item.isoDate ?? item.pubDate ?? "");
  const image = extractRssImage(item, link) ?? (await fetchImageFromPage(link));
  const pubDate = timestamp > 0 ? new Date(timestamp).toISOString() : "";

  return {
    title,
    link,
    pubDate,
    image,
    description,
    timestamp,
    dedupeKey: `${normalizeText(link)}|${normalizeText(title)}|${pubDate}`
  };
}

function passesSourceFilters(
  item: {
    title: string;
    link: string;
    description: string;
    categories: string[];
  },
  source: FeedSource
): boolean {
  const haystack = normalizeText([item.title, item.description, item.link, item.categories.join(" ")].join(" "));

  if (matchesAnyTerm(haystack, NORMALIZED_BLACKLIST)) {
    return false;
  }

  if (source === "aemps") {
    return item.categories.some((category) => normalizeText(category).includes("medicamentos veterinarios"));
  }

  return matchesAnyTerm(haystack, NORMALIZED_MAPA_WHITELIST);
}

function collectCategories(item: RawRssItem): string[] {
  const values: string[] = [];

  if (Array.isArray(item.categories)) {
    values.push(...item.categories);
  }

  if (Array.isArray(item.category)) {
    values.push(...item.category);
  } else if (typeof item.category === "string") {
    values.push(item.category);
  }

  return values.map((value) => cleanText(String(value))).filter(Boolean);
}

function extractRssImage(item: RawRssItem, baseUrl: string): string | null {
  const candidates = [
    item.enclosure?.url ?? "",
    ...collectMediaUrls(item.mediaContent),
    ...collectMediaUrls(item.mediaThumbnail),
    ...extractImageCandidatesFromHtml(item.contentEncoded ?? "", baseUrl),
    ...extractImageCandidatesFromHtml(item.content ?? "", baseUrl),
    ...extractImageCandidatesFromHtml(item.description ?? "", baseUrl)
  ];

  return firstUsefulImage(candidates, baseUrl);
}

async function fetchImageFromPage(link: string): Promise<string | null> {
  const cached = getCachedValue(imageCache, link);
  if (cached !== undefined) {
    return cached;
  }

  const inFlight = imageInFlight.get(link);
  if (inFlight) {
    return inFlight;
  }

  const task = (async () => {
    try {
      const response = await fetchWithTimeout(link, IMAGE_FETCH_TIMEOUT_MS, {
        headers: {
          Accept: "text/html,application/xhtml+xml",
          "User-Agent": "Mozilla/5.0 (compatible; GeneraRecetasBot/1.0)"
        }
      });

      if (!response.ok) {
        return null;
      }

      const html = await response.text();
      const finalUrl = response.url || link;
      const candidates = [
        ...extractMetaImages(html, "property", "og:image"),
        ...extractMetaImages(html, "property", "og:image:secure_url"),
        ...extractMetaImages(html, "name", "twitter:image"),
        ...extractImageCandidatesFromHtml(html, finalUrl)
      ];

      return firstUsefulImage(candidates, finalUrl);
    } catch {
      return null;
    }
  })();

  imageInFlight.set(link, task);

  try {
    const value = await task;
    imageCache.set(link, {
      value,
      expiresAt: Date.now() + IMAGE_TTL_MS
    });
    return value;
  } finally {
    imageInFlight.delete(link);
  }
}

function collectMediaUrls(value: RawRssItem["mediaContent"] | RawRssItem["mediaThumbnail"]): string[] {
  const items = Array.isArray(value) ? value : value ? [value] : [];

  return items
    .map((entry) => {
      if (!entry) {
        return "";
      }

      if (typeof entry.url === "string" && entry.url) {
        return entry.url;
      }

      if (typeof entry.href === "string" && entry.href) {
        return entry.href;
      }

      if (entry.$ && typeof entry.$.url === "string" && entry.$.url) {
        return entry.$.url;
      }

      if (entry.$ && typeof entry.$.href === "string" && entry.$.href) {
        return entry.$.href;
      }

      return "";
    })
    .filter(Boolean);
}

function extractImageCandidatesFromHtml(html: string, baseUrl: string): string[] {
  if (!html) {
    return [];
  }

  const candidates: string[] = [];
  for (const match of html.matchAll(/<img[^>]+(?:src|data-src)=["']([^"']+)["'][^>]*>/gi)) {
    const raw = String(match[1] ?? "").trim();
    if (raw) {
      candidates.push(toAbsoluteUrl(raw, baseUrl));
    }
  }

  return candidates;
}

function extractMetaImages(html: string, attribute: "property" | "name", key: string): string[] {
  const safeKey = escapeRegex(key);
  const direct = new RegExp(`<meta[^>]+${attribute}=["']${safeKey}["'][^>]+content=["']([^"']+)["']`, "gi");
  const reverse = new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+${attribute}=["']${safeKey}["']`, "gi");
  return [...collectMatches(html, direct), ...collectMatches(html, reverse)];
}

function collectMatches(source: string, regex: RegExp): string[] {
  return [...source.matchAll(regex)]
    .map((match) => String(match[1] ?? "").trim())
    .filter(Boolean);
}

function firstUsefulImage(candidates: string[], baseUrl: string): string | null {
  for (const candidate of candidates) {
    const normalized = cleanUrl(toAbsoluteUrl(decodeHtmlEntities(candidate), baseUrl));
    if (isUsefulImage(normalized)) {
      return normalized;
    }
  }

  return null;
}

function dedupeItems(items: InternalNewsItem[]): InternalNewsItem[] {
  const seen = new Set<string>();
  const output: InternalNewsItem[] = [];

  for (const item of items) {
    if (!item.dedupeKey || seen.has(item.dedupeKey)) {
      continue;
    }

    seen.add(item.dedupeKey);
    output.push(item);
  }

  return output;
}

async function fetchWithTimeout(url: string, timeoutMs: number, init: RequestInit = {}): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      ...init,
      signal: controller.signal
    });
  } finally {
    clearTimeout(timer);
  }
}

function getCachedValue<T>(cache: Map<string, CacheEntry<T>>, key: string): T | undefined {
  const entry = cache.get(key);
  if (!entry) {
    return undefined;
  }

  if (entry.expiresAt <= Date.now()) {
    cache.delete(key);
    return undefined;
  }

  return entry.value;
}

function matchesAnyTerm(source: string, terms: string[]): boolean {
  return Boolean(source) && terms.some((term) => source.includes(term));
}

function isUsefulImage(url: string): boolean {
  const value = cleanUrl(url).toLowerCase();
  if (!value) {
    return false;
  }

  if (/\.(svg|ico)(\?|$)/i.test(value)) {
    return false;
  }

  return !["logo", "icon", "favicon", "sprite", "mapa_tcm"].some((token) => value.includes(token));
}

function cleanUrl(value: string): string {
  const source = String(value ?? "").trim();
  if (!/^https?:\/\//i.test(source)) {
    return "";
  }

  try {
    const parsed = new URL(source);
    if (parsed.protocol === "http:" && parsed.hostname.endsWith("mapa.gob.es")) {
      parsed.protocol = "https:";
    }
    return parsed.toString();
  } catch {
    return "";
  }
}

function cleanText(value: string): string {
  return decodeHtmlEntities(String(value ?? ""))
    .replace(/\s+/g, " ")
    .trim();
}

function stripHtml(value: string): string {
  return String(value ?? "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function decodeHtmlEntities(value: string): string {
  return String(value ?? "")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&nbsp;/gi, " ");
}

function normalizeText(value: string): string {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function toAbsoluteUrl(value: string, baseUrl: string): string {
  const source = String(value ?? "").trim();
  if (!source) {
    return "";
  }

  try {
    return new URL(source, baseUrl).toString();
  } catch {
    return "";
  }
}

function toTimestamp(value: string): number {
  const direct = new Date(value).getTime();
  if (Number.isFinite(direct) && direct > 0) {
    return direct;
  }

  const match = String(value ?? "").match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (!match) {
    return 0;
  }

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);

  if (!Number.isInteger(day) || !Number.isInteger(month) || !Number.isInteger(year)) {
    return 0;
  }

  return Date.UTC(year, month - 1, day);
}

function getYearFromDate(value: string): number {
  const timestamp = toTimestamp(value);
  return timestamp > 0 ? new Date(timestamp).getUTCFullYear() : Number.NaN;
}

function escapeRegex(value: string): string {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function unique(values: number[]): number[] {
  return [...new Set(values)];
}

async function mapLimit<T, R>(items: T[], limit: number, mapper: (item: T, index: number) => Promise<R>): Promise<R[]> {
  if (!items.length) {
    return [];
  }

  const results = new Array<R>(items.length);
  let cursor = 0;
  const workers = Array.from({ length: Math.max(1, Math.min(limit, items.length)) }, async () => {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await mapper(items[index], index);
    }
  });

  await Promise.all(workers);
  return results;
}
