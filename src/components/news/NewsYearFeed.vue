<template>
  <section class="w-full">
    <div
      class="sticky top-[58px] z-[120] -mx-[14px] w-[calc(100%+28px)] border-y border-gr-border/55 bg-[#efe9d3] py-[10px] md:top-[70px] md:-mx-[20px] md:w-[calc(100%+40px)] md:py-[14px] min-[1200px]:hidden"
    >
      <div class="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-[10px] px-[14px] md:justify-start md:px-[20px]">
        <button
          type="button"
          class="inline-flex h-[34px] w-[34px] items-center justify-center rounded-full border border-gr-border/65 bg-transparent text-gr-blue shadow-[0_6px_12px_rgba(47,86,104,0.08)] transition-[border-color,background-color,color,box-shadow,transform] duration-200 enabled:hover:border-gr-blue enabled:hover:bg-gr-blue enabled:hover:text-white enabled:hover:shadow-[0_10px_16px_rgba(47,86,104,0.22)] enabled:active:scale-[0.96] disabled:cursor-not-allowed disabled:opacity-40"
          :disabled="!canGoOlder || isLoading"
          aria-label="Anio anterior"
          @click="goOlderYear"
        >
          <svg viewBox="0 0 24 24" class="h-[17px] w-[17px] fill-none stroke-current stroke-[2.2]" aria-hidden="true">
            <path d="M15 6 9 12l6 6" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
        </button>

        <p class="font-space text-[1.18rem] font-semibold leading-none text-gr-gold md:text-[1.48rem]">
          Noticias {{ selectedYear }}
        </p>

        <button
          type="button"
          class="inline-flex h-[34px] w-[34px] items-center justify-center rounded-full border border-gr-border/65 bg-transparent text-gr-blue shadow-[0_6px_12px_rgba(47,86,104,0.08)] transition-[border-color,background-color,color,box-shadow,transform] duration-200 enabled:hover:border-gr-blue enabled:hover:bg-gr-blue enabled:hover:text-white enabled:hover:shadow-[0_10px_16px_rgba(47,86,104,0.22)] enabled:active:scale-[0.96] disabled:cursor-not-allowed disabled:opacity-40"
          :disabled="!canGoNewer || isLoading"
          aria-label="Anio siguiente"
          @click="goNewerYear"
        >
          <svg viewBox="0 0 24 24" class="h-[17px] w-[17px] fill-none stroke-current stroke-[2.2]" aria-hidden="true">
            <path d="m9 6 6 6-6 6" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
        </button>
      </div>
    </div>

    <div class="mt-[22px]">
      <div
        v-if="displayItems.length"
        class="min-[1200px]:grid min-[1200px]:grid-cols-[minmax(0,1fr)_280px] min-[1200px]:items-start min-[1200px]:gap-[26px]"
      >
        <div>
          <ul class="grid grid-cols-1 gap-x-[18px] gap-y-[18px] md:grid-cols-2 md:gap-x-[22px] md:gap-y-[22px] xl:grid-cols-2">
            <li
              v-for="entry in displayItems"
              :id="entry.cardAnchorId"
              :key="entry.key"
              class="scroll-mt-[132px] h-full [content-visibility:auto] [contain-intrinsic-size:360px] md:[contain-intrinsic-size:420px] min-[1200px]:scroll-mt-[108px]"
            >
              <article class="group/news-card relative h-full overflow-hidden rounded-[14px] border border-gr-border/45 bg-[#fdfdfc] shadow-[0_14px_28px_rgba(47,86,104,0.12)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-[2px] hover:border-gr-blue/35 hover:shadow-[0_20px_34px_rgba(47,86,104,0.18)] md:rounded-[16px]">
                <a :href="entry.item.link || '#'" target="_blank" rel="noopener noreferrer" class="flex h-full flex-col">
                  <div class="relative overflow-hidden bg-[#e6e1d2]">
                    <img
                      :src="imageSource(entry)"
                      :alt="entry.item.title || 'Imagen de noticia'"
                      class="aspect-[16/8.4] w-full object-cover transition-transform duration-500 group-hover/news-card:scale-[1.05] md:aspect-[16/9]"
                      width="640"
                      height="360"
                      :loading="entry.index < 2 ? 'eager' : 'lazy'"
                      :fetchpriority="entry.index === 0 ? 'high' : entry.index < 2 ? 'auto' : 'low'"
                      decoding="async"
                      referrerpolicy="no-referrer"
                      @error="onImageError(entry, $event)"
                    />
                    <span class="pointer-events-none absolute inset-x-0 bottom-0 h-[64px] bg-gradient-to-t from-[#153646]/30 to-transparent" aria-hidden="true"></span>
                  </div>

                  <div class="flex min-h-[156px] flex-1 flex-col px-[13px] pb-[13px] pt-[11px] md:min-h-[188px] md:px-[15px] md:pb-[15px] md:pt-[13px]">
                    <div class="flex items-center justify-between gap-[8px]">
                      <span class="inline-flex min-h-[20px] items-center rounded-full bg-gr-blue/10 px-[9px] py-[2px] text-[0.68rem] font-semibold uppercase tracking-[0.04em] text-gr-blue md:min-h-[22px] md:px-[10px] md:py-[3px] md:text-[0.72rem]">
                        {{ entry.category }}
                      </span>
                      <span class="truncate text-[0.76rem] font-medium text-gr-muted md:text-[0.8rem]">
                        {{ entry.formattedDate }}
                      </span>
                    </div>

                    <h2 class="mt-[8px] h-[4.3rem] line-clamp-3 font-space text-[1.18rem] font-semibold leading-[1.18] text-gr-blue md:mt-[10px] md:h-[5rem] md:text-[1.38rem] md:leading-[1.2]">
                      {{ entry.item.title || "Sin titulo" }}
                    </h2>

                    <span class="mt-[10px] inline-flex items-center gap-[6px] pt-[10px] text-[0.86rem] font-semibold text-gr-gold md:mt-[12px] md:pt-[12px] md:text-[0.92rem]">
                      <span>Leer mas</span>
                      <svg viewBox="0 0 24 24" class="h-[14px] w-[14px] fill-none stroke-current stroke-[2.2]" aria-hidden="true">
                        <path d="M7 12h10M13 8l4 4-4 4" stroke-linecap="round" stroke-linejoin="round"></path>
                      </svg>
                    </span>
                  </div>
                </a>
              </article>
            </li>
          </ul>

          <div v-if="hasMoreItems" class="mt-[18px] flex justify-center">
            <button
              type="button"
              class="inline-flex items-center gap-[8px] rounded-full border border-gr-border/55 bg-white px-[18px] py-[10px] font-space text-[0.94rem] font-semibold text-gr-blue shadow-[0_8px_18px_rgba(47,86,104,0.08)] transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-[1px] hover:border-gr-blue/35 hover:shadow-[0_12px_24px_rgba(47,86,104,0.14)]"
              @click="showMoreItems"
            >
              <span>Ver mas noticias</span>
              <span class="text-[1rem] leading-none" aria-hidden="true">+</span>
            </button>
          </div>
        </div>

        <aside class="hidden min-[1200px]:sticky min-[1200px]:top-[104px] min-[1200px]:block min-[1200px]:self-start">
          <div class="rounded-[18px] border border-gr-border/45 bg-[linear-gradient(180deg,rgba(255,255,255,0.88)_0%,rgba(247,243,231,0.96)_100%)] p-[16px] shadow-[0_14px_30px_rgba(47,86,104,0.08)]">
            <div class="flex items-center justify-between gap-[10px] border-b border-gr-border/40 pb-[12px]">
              <button
                type="button"
                class="inline-flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full border border-gr-border/65 bg-transparent text-gr-blue shadow-[0_6px_12px_rgba(47,86,104,0.08)] transition-[border-color,background-color,color,box-shadow,transform] duration-200 enabled:hover:border-gr-blue enabled:hover:bg-gr-blue enabled:hover:text-white enabled:hover:shadow-[0_10px_16px_rgba(47,86,104,0.22)] enabled:active:scale-[0.96] disabled:cursor-not-allowed disabled:opacity-40"
                :disabled="!canGoOlder || isLoading"
                aria-label="Anio anterior"
                @click="goOlderYear"
              >
                <svg viewBox="0 0 24 24" class="h-[17px] w-[17px] fill-none stroke-current stroke-[2.2]" aria-hidden="true">
                  <path d="M15 6 9 12l6 6" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
              </button>

              <div class="min-w-0 flex-1 text-center">
                <p class="font-space text-[1.02rem] font-semibold leading-none text-gr-gold">
                  Noticias {{ selectedYear }}
                </p>
              </div>

              <button
                type="button"
                class="inline-flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full border border-gr-border/65 bg-transparent text-gr-blue shadow-[0_6px_12px_rgba(47,86,104,0.08)] transition-[border-color,background-color,color,box-shadow,transform] duration-200 enabled:hover:border-gr-blue enabled:hover:bg-gr-blue enabled:hover:text-white enabled:hover:shadow-[0_10px_16px_rgba(47,86,104,0.22)] enabled:active:scale-[0.96] disabled:cursor-not-allowed disabled:opacity-40"
                :disabled="!canGoNewer || isLoading"
                aria-label="Anio siguiente"
                @click="goNewerYear"
              >
                <svg viewBox="0 0 24 24" class="h-[17px] w-[17px] fill-none stroke-current stroke-[2.2]" aria-hidden="true">
                  <path d="m9 6 6 6-6 6" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
              </button>
            </div>

            <ul class="mt-[14px] space-y-[10px]">
              <li v-for="entry in sidebarItems" :key="`${entry.key}-mini`">
                <button
                  type="button"
                  class="group flex w-full items-center gap-[10px] rounded-[14px] border border-transparent bg-white/78 p-[8px] text-left transition-[border-color,background-color,transform,box-shadow] duration-200 hover:-translate-y-[1px] hover:border-gr-blue/15 hover:bg-white hover:shadow-[0_10px_18px_rgba(47,86,104,0.1)]"
                  @click="scrollToCard(entry.cardAnchorId)"
                >
                  <div class="h-[58px] w-[58px] shrink-0 overflow-hidden rounded-[10px] bg-[#e6e1d2]">
                    <img
                      :src="imageSource(entry)"
                      :alt="entry.item.title || 'Imagen de noticia'"
                      class="h-full w-full object-cover"
                      width="58"
                      height="58"
                      loading="lazy"
                      fetchpriority="low"
                      decoding="async"
                      referrerpolicy="no-referrer"
                      @error="onImageError(entry, $event)"
                    />
                  </div>

                  <div class="min-w-0 flex-1">
                    <p class="text-[0.72rem] font-medium uppercase tracking-[0.04em] text-gr-muted">
                      {{ entry.formattedDate || "Sin fecha" }}
                    </p>
                    <p class="mt-[4px] line-clamp-2 text-[0.82rem] font-semibold leading-[1.25] text-gr-blue transition-colors duration-200 group-hover:text-gr-gold">
                      {{ entry.item.title || "Sin titulo" }}
                    </p>
                  </div>
                </button>
              </li>
            </ul>
          </div>
        </aside>
      </div>

      <div v-else-if="isLoading" class="rounded-[14px] border border-gr-border/35 bg-white/55 p-[22px] text-[0.98rem] text-gr-blue/82">
        Cargando noticias de {{ selectedYear }}...
      </div>
      <div v-else-if="isError" class="rounded-[14px] border border-red-300 bg-red-50/70 p-[22px] text-[0.98rem] text-red-700">
        No ha sido posible recuperar el feed en este momento.
      </div>
      <div v-else class="rounded-[14px] border border-gr-border/35 bg-white/45 p-[22px] text-[0.98rem] text-gr-blue/82">
        No hay noticias de Medicamentos Veterinarios para {{ selectedYear }}.
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

const props = defineProps({
  initialYear: {
    type: Number,
    default: null
  },
  initialYears: {
    type: Array,
    default: () => []
  },
  initialItems: {
    type: Array,
    default: () => []
  }
});

const PLACEHOLDER_IMAGE = "/images/placeholders/news-placeholder.svg";
const INITIAL_RENDER_COUNT = 8;
const RENDER_INCREMENT = 8;
const SIDEBAR_LIMIT = 6;
const PREFETCH_DELAY_MS = 320;
const dateFormatter = new Intl.DateTimeFormat("es-ES", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric"
});

const providedInitialYear = Number(props.initialYear);
const fallbackYear = new Date().getFullYear();
const seedYear = Number.isInteger(providedInitialYear) ? providedInitialYear : fallbackYear;
const normalizedInitialYears = normalizeYears(props.initialYears, seedYear);
const initialSelectedYear = normalizedInitialYears.includes(providedInitialYear)
  ? providedInitialYear
  : normalizedInitialYears[0] ?? seedYear;
const normalizedInitialItems = normalizeNewsItems(props.initialItems);
const hasInitialPayload =
  Number.isInteger(providedInitialYear) ||
  (Array.isArray(props.initialYears) && props.initialYears.length > 0) ||
  (Array.isArray(props.initialItems) && props.initialItems.length > 0);

const state = ref(hasInitialPayload ? "ready" : "loading");
const selectedYear = ref(initialSelectedYear);
const availableYears = ref(normalizedInitialYears);
const newsItems = ref(normalizedInitialItems);
const visibleCount = ref(getInitialVisibleCount(normalizedInitialItems.length));
const brokenImages = ref(new Set());

const yearCache = new Map();
const yearRequests = new Map();
let requestToken = 0;
let prefetchHandle = null;

if (hasInitialPayload) {
  yearCache.set(initialSelectedYear, normalizedInitialItems);
}

const allDisplayItems = computed(() =>
  newsItems.value.map((item, index) => ({
    item,
    index,
    key: getItemKey(item, index),
    cardAnchorId: cardId(index),
    category: classifyItem(item),
    formattedDate: formatDate(item.pubDate)
  }))
);
const displayItems = computed(() => allDisplayItems.value.slice(0, visibleCount.value));
const sidebarItems = computed(() => displayItems.value.slice(0, SIDEBAR_LIMIT));
const hasMoreItems = computed(() => visibleCount.value < allDisplayItems.value.length);
const isLoading = computed(() => state.value === "loading");
const isError = computed(() => state.value === "error");

const sortedYears = computed(() => {
  const years = [...new Set(availableYears.value.filter((year) => Number.isInteger(year)))].sort((a, b) => b - a);
  return years.length ? years : [selectedYear.value];
});

const selectedYearIndex = computed(() => sortedYears.value.indexOf(selectedYear.value));
const canGoOlder = computed(() => selectedYearIndex.value >= 0 && selectedYearIndex.value < sortedYears.value.length - 1);
const canGoNewer = computed(() => selectedYearIndex.value > 0);

onMounted(async () => {
  if (!hasInitialPayload) {
    await loadNewsMeta();
    await loadYear(selectedYear.value);
    return;
  }

  scheduleAdjacentPrefetch(selectedYear.value);
});

onBeforeUnmount(() => {
  cancelScheduledPrefetch();
});

function normalizeNewsItem(item) {
  return {
    title: typeof item?.title === "string" ? item.title : "",
    link: typeof item?.link === "string" ? item.link : "",
    pubDate: typeof item?.pubDate === "string" ? item.pubDate : "",
    image: typeof item?.image === "string" && item.image.trim() ? item.image : null,
    description: typeof item?.description === "string" ? item.description : ""
  };
}

function normalizeNewsItems(items) {
  const source = Array.isArray(items) ? items : [];
  return source.map(normalizeNewsItem);
}

function normalizeYears(years, fallbackYear) {
  const source = Array.isArray(years) ? years : [];
  const normalized = [...new Set(source.map((year) => Number(year)).filter((year) => Number.isInteger(year) && year >= 2000))]
    .sort((a, b) => b - a);

  return normalized.length ? normalized : [fallbackYear];
}

function getInitialVisibleCount(total) {
  const normalizedTotal = Number(total);
  if (!Number.isInteger(normalizedTotal) || normalizedTotal <= 0) {
    return 0;
  }

  return Math.min(normalizedTotal, INITIAL_RENDER_COUNT);
}

function resetVisibleCount(total = newsItems.value.length) {
  visibleCount.value = getInitialVisibleCount(total);
}

async function loadNewsMeta() {
  try {
    const response = await fetch("/rss/news.json", { cache: "force-cache" });
    if (!response.ok) {
      throw new Error(`Metadata request failed: ${response.status}`);
    }

    const payload = await response.json();
    const currentYear =
      Number.isInteger(payload?.currentYear) && payload.currentYear >= 2000 ? payload.currentYear : fallbackYear;

    const years = normalizeYears(payload?.availableYears, currentYear);
    availableYears.value = years;
    selectedYear.value = years.includes(currentYear) ? currentYear : years[0];
  } catch {
    availableYears.value = [fallbackYear];
    selectedYear.value = fallbackYear;
  }
}

async function fetchYear(year) {
  const normalizedYear = Number(year);
  if (!Number.isInteger(normalizedYear) || normalizedYear < 2000) {
    return [];
  }

  const cached = yearCache.get(normalizedYear);
  if (cached) {
    return cached;
  }

  const pending = yearRequests.get(normalizedYear);
  if (pending) {
    return pending;
  }

  const task = (async () => {
    const response = await fetch(`/rss/news/${normalizedYear}.json`, { cache: "force-cache" });
    if (!response.ok) {
      throw new Error(`Year request failed: ${response.status}`);
    }

    const payload = await response.json();
    const items = normalizeNewsItems(payload);
    yearCache.set(normalizedYear, items);
    return items;
  })();

  yearRequests.set(normalizedYear, task);

  try {
    return await task;
  } finally {
    yearRequests.delete(normalizedYear);
  }
}

async function loadYear(year) {
  const normalizedYear = Number(year);
  if (!Number.isInteger(normalizedYear)) {
    return;
  }

  selectedYear.value = normalizedYear;

  const cached = yearCache.get(normalizedYear);
  if (cached) {
    newsItems.value = cached;
    resetVisibleCount(cached.length);
    state.value = "ready";
    scheduleAdjacentPrefetch(normalizedYear);
    return;
  }

  state.value = "loading";

  requestToken += 1;
  const token = requestToken;

  try {
    const items = await fetchYear(normalizedYear);
    if (token !== requestToken) {
      return;
    }

    newsItems.value = items;
    resetVisibleCount(items.length);
    state.value = "ready";
    scheduleAdjacentPrefetch(normalizedYear);
  } catch {
    if (token !== requestToken) {
      return;
    }

    newsItems.value = [];
    visibleCount.value = 0;
    state.value = "error";
  }
}

async function prefetchYear(year) {
  if (!Number.isInteger(year) || year < 2000 || yearCache.has(year)) {
    return;
  }

  try {
    await fetchYear(year);
  } catch {
    // Silent prefetch errors.
  }
}

async function prefetchAdjacentYears(year) {
  const index = sortedYears.value.indexOf(year);
  if (index < 0) {
    return;
  }

  const older = sortedYears.value[index + 1];
  const newer = sortedYears.value[index - 1];
  await Promise.allSettled([prefetchYear(older), prefetchYear(newer)]);
}

function canPrefetchAdjacentYears() {
  if (typeof navigator === "undefined") {
    return false;
  }

  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (!connection) {
    return true;
  }

  if (connection.saveData) {
    return false;
  }

  return !["slow-2g", "2g"].includes(String(connection.effectiveType || ""));
}

function cancelScheduledPrefetch() {
  if (typeof window === "undefined" || prefetchHandle === null) {
    return;
  }

  if ("cancelIdleCallback" in window) {
    window.cancelIdleCallback(prefetchHandle);
  } else {
    window.clearTimeout(prefetchHandle);
  }

  prefetchHandle = null;
}

function scheduleAdjacentPrefetch(year) {
  if (typeof window === "undefined") {
    return;
  }

  cancelScheduledPrefetch();

  if (!canPrefetchAdjacentYears()) {
    return;
  }

  const runPrefetch = () => {
    prefetchHandle = null;
    void prefetchAdjacentYears(year);
  };

  if ("requestIdleCallback" in window) {
    prefetchHandle = window.requestIdleCallback(runPrefetch, { timeout: 1200 });
    return;
  }

  prefetchHandle = window.setTimeout(runPrefetch, PREFETCH_DELAY_MS);
}

function goOlderYear() {
  if (!canGoOlder.value || isLoading.value) {
    return;
  }

  const target = sortedYears.value[selectedYearIndex.value + 1];
  void loadYear(target);
}

function goNewerYear() {
  if (!canGoNewer.value || isLoading.value) {
    return;
  }

  const target = sortedYears.value[selectedYearIndex.value - 1];
  void loadYear(target);
}

function showMoreItems() {
  visibleCount.value = Math.min(allDisplayItems.value.length, visibleCount.value + RENDER_INCREMENT);
}

function scrollToCard(cardAnchorId) {
  if (!cardAnchorId || typeof document === "undefined") {
    return;
  }

  const target = document.getElementById(cardAnchorId);
  if (!target) {
    return;
  }

  target.scrollIntoView({ behavior: "smooth", block: "start" });
}

function cardId(index) {
  return `news-card-${selectedYear.value}-${index}`;
}

function getItemKey(item, index) {
  return `${selectedYear.value}:${item?.link || `${item?.title || "news"}-${item?.pubDate || "date"}-${index}`}`;
}

function imageSource(entry) {
  if (!entry?.item?.image || brokenImages.value.has(entry.key)) {
    return PLACEHOLDER_IMAGE;
  }

  return entry.item.image;
}

function onImageError(entry, event) {
  const target = event?.target;
  if (target?.src && target.src.includes(PLACEHOLDER_IMAGE)) {
    return;
  }

  const next = new Set(brokenImages.value);
  next.add(entry.key);
  brokenImages.value = next;
}

function formatDate(value) {
  if (!value) {
    return "";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return dateFormatter.format(date);
}

function classifyItem(item) {
  const source = `${item?.title || ""} ${item?.description || ""}`.toLowerCase();
  if (source.includes("seguridad") || source.includes("riesgo")) {
    return "SEGURIDAD";
  }
  if (source.includes("alerta")) {
    return "ALERTA";
  }
  if (source.includes("bolet")) {
    return "BOLETIN";
  }
  return "INFORMACION";
}
</script>
