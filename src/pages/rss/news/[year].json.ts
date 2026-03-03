import type { APIRoute, GetStaticPaths } from "astro";
import { getAvailableNewsYears, getNewsByYear } from "../../../lib/news-service";

export const prerender = true;

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const availableYears = await getAvailableNewsYears();
    const years = availableYears.length ? availableYears : [new Date().getUTCFullYear()];

    return years.map((year) => ({
      params: {
        year: String(year)
      }
    }));
  } catch (error) {
    console.error("[rss/news/[year].json] Static path error.", error);
    return [
      {
        params: {
          year: String(new Date().getUTCFullYear())
        }
      }
    ];
  }
};

export const GET: APIRoute = async ({ params }) => {
  const year = Number.parseInt(params.year ?? "", 10);
  if (!Number.isInteger(year)) {
    return new Response(JSON.stringify([]), {
      status: 400,
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    });
  }

  try {
    const items = await getNewsByYear(year);
    return new Response(JSON.stringify(items), {
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    });
  } catch (error) {
    console.error(`[rss/news/${year}.json] Year feed error.`, error);
    return new Response(JSON.stringify([]), {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    });
  }
};
