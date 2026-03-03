import type { APIRoute } from "astro";
import { getAvailableNewsYears } from "../../lib/news-service";

export const prerender = true;

export const GET: APIRoute = async () => {
  try {
    const availableYears = await getAvailableNewsYears();
    const fallbackYear = new Date().getUTCFullYear();
    const currentYear = availableYears[0] ?? fallbackYear;

    return new Response(
      JSON.stringify({
        currentYear,
        availableYears
      }),
      {
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }
      }
    );
  } catch (error) {
    console.error("[rss/news.json] Metadata error.", error);
    const fallbackYear = new Date().getUTCFullYear();

    return new Response(
      JSON.stringify({
        currentYear: fallbackYear,
        availableYears: [fallbackYear]
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }
      }
    );
  }
};
