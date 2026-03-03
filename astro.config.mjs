// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import vue from '@astrojs/vue';
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE_URL ?? "https://radu-az.github.io/pruebaRaduan/",
  base: "/pruebaRaduan/",
  compressHTML: true,
  prefetch: {
    prefetchAll: false,
    defaultStrategy: "hover"
  },
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [
    vue(),
    sitemap({
      filter: (page) => !page.includes("/rss/")
    })
  ]
});
