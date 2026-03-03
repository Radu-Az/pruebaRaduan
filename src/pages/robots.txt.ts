import type { APIRoute } from "astro";

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  const siteUrl = (site?.toString() || "https://generarecetas.com").replace(/\/$/, "");

  const content = [
    "User-agent: *",
    "Allow: /",
    "Disallow: /rss/",
    "",
    `Sitemap: ${siteUrl}/sitemap-index.xml`
  ].join("\n");

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
};
