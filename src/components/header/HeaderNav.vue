<script setup>
import { useBreakpoints, onKeyStroke, useWindowScroll } from "@vueuse/core";
import { computed, onBeforeUnmount, ref, watch } from "vue";
import {
  defaultLanguage,
  languageOptions,
  loginLink,
  navItems,
  registerLink,
  resourcesItems
} from "../../data/site-navigation";
import LanguageSelect from "./LanguageSelect.vue";
import ResourceIcon from "./ResourceIcon.vue";

const selectedLanguage = ref(defaultLanguage);
const mobileMenuOpen = ref(false);
const mobileResourcesOpen = ref(false);

const breakpoints = useBreakpoints({
  desktop: 1200
});
const isDesktop = breakpoints.greaterOrEqual("desktop");
const { y } = useWindowScroll();
const isScrolled = computed(() => y.value > 4);

const profilesNavItem = navItems.find((item) => item.id === "profiles");
const pharmacyNavItem = navItems.find((item) => item.id === "pharmacy");
const secondaryNavItems = navItems.filter((item) => item.id !== "profiles" && item.id !== "pharmacy");
const isInternalLink = (href) => typeof href === "string" && href.startsWith("/") && !href.startsWith("//");

const closeMobileMenu = () => {
  mobileMenuOpen.value = false;
  mobileResourcesOpen.value = false;
};

const setBodyLock = (locked) => {
  if (typeof document === "undefined") {
    return;
  }

  const overflowValue = locked ? "hidden" : "";
  document.documentElement.style.overflow = overflowValue;
  document.body.style.overflow = overflowValue;
};

watch(mobileMenuOpen, (open) => {
  setBodyLock(open);

  if (!open) {
    mobileResourcesOpen.value = false;
  }
});

watch(isDesktop, (desktop) => {
  if (desktop) {
    closeMobileMenu();
  }
});

onKeyStroke("Escape", () => {
  closeMobileMenu();
});

onBeforeUnmount(() => {
  setBodyLock(false);
});
</script>

<template>
  <div class="contents">
    <span
      class="pointer-events-none absolute inset-x-0 bottom-0 z-[305] h-px transition-[box-shadow,background-color] duration-200"
      :class="
        isScrolled
          ? 'bg-gr-border/20 shadow-[0_1px_0_rgb(47_86_104_/_18%),0_5px_14px_rgb(47_86_104_/_6%)]'
          : 'bg-transparent shadow-none'
      "
      aria-hidden="true"
    ></span>

    <div class="hidden min-[1200px]:ml-auto min-[1200px]:flex min-[1200px]:translate-x-[10px] min-[1200px]:items-center min-[1200px]:gap-[34px]">
      <nav class="flex items-center gap-[32px] text-[1.12rem] leading-none text-gr-blue" aria-label="Principal">
      <a
        v-if="profilesNavItem"
        :href="profilesNavItem.href"
        :data-astro-prefetch="isInternalLink(profilesNavItem.href) ? '' : null"
        class="relative inline-flex font-roboto after:absolute after:-bottom-[6px] after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-gr-blue after:transition-transform after:duration-200 after:ease-out hover:after:scale-x-100 focus-visible:after:scale-x-100"
      >
        {{ profilesNavItem.label }}
      </a>

      <div class="group/desktop-resources relative">
        <a href="#" class="inline-flex items-center gap-[6px] font-roboto">
          <span>Recursos</span>
          <span
            class="h-0 w-0 border-x-[4px] border-x-transparent border-t-[5px] border-t-gr-blue transition-transform duration-200 ease-out group-hover/desktop-resources:rotate-180 group-focus-within/desktop-resources:rotate-180"
            aria-hidden="true"
          ></span>
        </a>
        <span class="absolute -bottom-[6px] left-0 h-[2px] w-full origin-left scale-x-0 bg-gr-blue transition-transform duration-200 ease-out group-hover/desktop-resources:scale-x-100 group-focus-within/desktop-resources:scale-x-100"></span>

        <div class="pointer-events-none absolute left-0 top-[calc(100%+12px)] z-[360] w-[314px] origin-top-left translate-y-[8px] rounded-[12px] border border-gr-border bg-gr-bg p-[10px] opacity-0 shadow-[0_12px_24px_rgba(47,86,104,0.14)] transform-gpu will-change-[opacity,transform] transition-[opacity,transform] duration-[430ms] ease-[cubic-bezier(0.4,0,0.2,1)] before:absolute before:-top-[12px] before:left-0 before:right-0 before:h-[12px] before:content-[''] group-hover/desktop-resources:pointer-events-auto group-hover/desktop-resources:translate-y-0 group-hover/desktop-resources:opacity-100 group-focus-within/desktop-resources:pointer-events-auto group-focus-within/desktop-resources:translate-y-0 group-focus-within/desktop-resources:opacity-100">
          <a
            v-for="item in resourcesItems"
            :key="item.title"
            :href="item.href"
            :data-astro-prefetch="isInternalLink(item.href) ? '' : null"
            class="group/resource-card mb-[8px] flex items-start gap-[10px] rounded-[10px] border border-gr-border bg-white/80 px-[10px] py-[9px] text-left transition-[border-color,box-shadow,background-color] duration-200 last:mb-0 hover:border-gr-gold hover:bg-white hover:shadow-[0_6px_14px_rgba(47,86,104,0.12)]"
          >
            <span class="inline-flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[8px] border border-gr-border bg-gr-bg text-gr-blue">
              <ResourceIcon :name="item.icon" icon-class="h-[18px] w-[18px]" />
            </span>
            <span class="block">
              <span class="block text-[0.98rem] leading-[1.15] font-medium text-gr-blue">{{ item.title }}</span>
              <span class="mt-[3px] block text-[0.8rem] leading-[1.2] text-gr-muted">{{ item.subtitle }}</span>
            </span>
          </a>
        </div>
      </div>

      <a
        v-for="item in secondaryNavItems"
        :key="item.id"
        :href="item.href"
        :data-astro-prefetch="isInternalLink(item.href) ? '' : null"
        class="relative inline-flex font-roboto after:absolute after:-bottom-[6px] after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-gr-blue after:transition-transform after:duration-200 after:ease-out hover:after:scale-x-100 focus-visible:after:scale-x-100"
      >
        {{ item.label }}
      </a>

      <a
        v-if="pharmacyNavItem"
        :href="pharmacyNavItem.href"
        :data-astro-prefetch="isInternalLink(pharmacyNavItem.href) ? '' : null"
        class="relative inline-flex font-roboto after:absolute after:-bottom-[6px] after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-gr-blue after:transition-transform after:duration-200 after:ease-out hover:after:scale-x-100 focus-visible:after:scale-x-100"
      >
        {{ pharmacyNavItem.label }}
      </a>
      </nav>

      <div class="flex items-center gap-[10px]">
        <div class="flex items-center gap-[10px]">
          <a
            class="inline-flex min-h-[38px] items-center justify-center gap-[8px] rounded-full bg-gr-gold px-[11px] py-[7px] pr-[20px] text-[1.12rem] font-medium leading-none whitespace-nowrap text-white transition-[box-shadow,filter] duration-300 ease-out hover:shadow-[0_8px_18px_rgba(186,161,71,0.28)] hover:brightness-[1.03] focus-visible:shadow-[0_8px_18px_rgba(186,161,71,0.28)] focus-visible:brightness-[1.03]"
            :href="loginLink.href"
          >
            <svg class="h-[20px] w-[20px] fill-none stroke-current stroke-2" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="8" r="3.25"></circle>
              <path d="M6.75 19c.75-2.5 2.7-3.95 5.25-3.95S16.5 16.5 17.25 19"></path>
            </svg>
            <span>{{ loginLink.label }}</span>
          </a>
          <a
            class="inline-flex min-h-[38px] items-center justify-center rounded-full border border-gr-gold bg-transparent px-[14px] py-[7px] text-[1.12rem] font-medium leading-none whitespace-nowrap text-gr-gold transition-[box-shadow,background-color,color] duration-300 ease-out hover:bg-gr-gold hover:text-white hover:shadow-[0_8px_18px_rgba(186,161,71,0.24)] focus-visible:bg-gr-gold focus-visible:text-white focus-visible:shadow-[0_8px_18px_rgba(186,161,71,0.24)]"
            :href="registerLink.href"
          >
            {{ registerLink.label }}
          </a>
        </div>

        <div class="relative hidden items-center min-[1200px]:flex">
          <LanguageSelect
            v-model="selectedLanguage"
            :options="languageOptions"
            :default-value="defaultLanguage"
            variant="desktop"
          />
        </div>
      </div>
    </div>

    <div class="relative z-[340] ml-auto flex shrink-0 items-center min-[1200px]:hidden">
      <button
        type="button"
        class="inline-flex h-[40px] w-[40px] cursor-pointer flex-col items-center justify-center gap-[5px] border-0 bg-transparent p-0"
        aria-label="Abrir menu principal"
        @click="mobileMenuOpen = true"
      >
        <span class="block h-[2px] w-[24px] rounded-[3px] bg-gr-blue"></span>
        <span class="block h-[2px] w-[24px] rounded-[3px] bg-gr-blue"></span>
        <span class="block h-[2px] w-[24px] rounded-[3px] bg-gr-blue"></span>
      </button>

      <div
        v-if="mobileMenuOpen"
        class="fixed inset-0 z-[330] min-[1200px]:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Menu principal movil"
      >
        <button
          type="button"
          class="absolute inset-0 block bg-transparent"
          aria-label="Cerrar menu principal"
          @click="closeMobileMenu"
        ></button>

        <aside
          class="absolute inset-y-0 left-[clamp(74px,24vw,160px)] right-0 flex h-dvh min-h-dvh flex-col items-center border-l border-gr-border bg-gr-bg px-[18px] pb-[20px] pt-[18px] shadow-[-6px_0_26px_rgba(47,86,104,0.14)] outline-none md:left-[clamp(150px,34vw,360px)] md:px-[22px] md:pb-[24px] md:pt-[20px]"
        >
          <button
            type="button"
            class="absolute right-[14px] top-[14px] z-[350] inline-flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full text-gr-blue md:right-[18px] md:top-[16px]"
            aria-label="Cerrar menu principal"
            @click="closeMobileMenu"
          >
            <svg viewBox="0 0 24 24" class="pointer-events-none h-[20px] w-[20px] fill-none stroke-current stroke-[2.2]" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke-linecap="round"></path>
            </svg>
          </button>

          <div class="mb-[20px] mt-[16px] flex w-full max-w-[460px] items-center justify-center" aria-hidden="true">
            <img
              src="/images/logos/logo-generarecetas-icon.svg"
              alt=""
              class="block h-auto w-[58px] md:w-[62px]"
              width="58"
              height="81"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div class="mb-[30px] flex w-full max-w-[320px] items-center justify-center md:mb-[34px]">
            <LanguageSelect
              v-model="selectedLanguage"
              :options="languageOptions"
              :default-value="defaultLanguage"
              variant="mobile"
            />
          </div>

          <div class="flex w-full max-w-[460px] flex-col items-center py-4">
            <div class="w-full divide-y divide-gr-border/55">
              <a
                v-if="profilesNavItem"
                class="inline-flex w-full justify-center px-[8px] py-[12px] text-center text-[1.42rem] font-medium leading-[1.2] tracking-[0.01em] text-gr-blue transition-colors duration-200 hover:text-gr-gold md:text-[1.5rem]"
                :href="profilesNavItem.href"
                :data-astro-prefetch="isInternalLink(profilesNavItem.href) ? '' : null"
                @click="closeMobileMenu"
              >
                {{ profilesNavItem.label }}
              </a>

              <div class="w-full">
                <button
                  type="button"
                  class="inline-flex w-full items-center justify-center gap-[8px] px-[8px] py-[12px] text-center text-[1.42rem] font-medium leading-[1.2] tracking-[0.01em] text-gr-blue transition-colors duration-200 hover:text-gr-gold md:text-[1.5rem]"
                  @click="mobileResourcesOpen = !mobileResourcesOpen"
                >
                  <span>Recursos</span>
                  <span
                    class="h-0 w-0 border-x-[4px] border-x-transparent border-t-[5px] border-t-gr-blue transition-transform duration-200 ease-out"
                    :class="{ 'rotate-180': mobileResourcesOpen }"
                    aria-hidden="true"
                  ></span>
                </button>

                <div v-if="mobileResourcesOpen" class="overflow-hidden">
                  <div class="mx-auto w-full max-w-[360px] px-[4px] py-[12px]">
                    <div class="relative pl-[18px]">
                      <span class="pointer-events-none absolute bottom-[8px] left-[6px] top-[8px] w-px bg-gradient-to-b from-gr-gold/20 via-gr-gold/70 to-gr-gold/20" aria-hidden="true"></span>
                      <a
                        v-for="item in resourcesItems"
                        :key="item.title"
                        class="group/resource-mobile-card relative flex w-full items-start gap-[10px] py-[11px] pr-[2px] text-left transition-colors duration-200 hover:text-gr-gold"
                        :href="item.href"
                        :data-astro-prefetch="isInternalLink(item.href) ? '' : null"
                        @click="closeMobileMenu"
                      >
                        <span class="absolute -left-[16px] top-[18px] h-[7px] w-[7px] rounded-full bg-gr-gold/80 shadow-[0_0_0_3px_rgba(245,246,244,0.95)]" aria-hidden="true"></span>
                        <span class="inline-flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[7px] bg-gr-blue/[0.08] text-gr-blue">
                          <ResourceIcon :name="item.icon" icon-class="h-[17px] w-[17px]" />
                        </span>
                        <span class="block pt-[1px]">
                          <span class="block text-[1.02rem] font-medium leading-[1.15] text-gr-blue transition-colors duration-200 group-hover/resource-mobile-card:text-gr-gold">{{ item.title }}</span>
                          <span class="mt-[3px] block text-[0.82rem] leading-[1.2] text-gr-muted">{{ item.subtitle }}</span>
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <a
                v-for="item in secondaryNavItems"
                :key="item.id"
                class="inline-flex w-full justify-center px-[8px] py-[12px] text-center text-[1.42rem] font-medium leading-[1.2] tracking-[0.01em] text-gr-blue transition-colors duration-200 hover:text-gr-gold md:text-[1.5rem]"
                :href="item.href"
                :data-astro-prefetch="isInternalLink(item.href) ? '' : null"
                @click="closeMobileMenu"
              >
                {{ item.label }}
              </a>

              <a
                v-if="pharmacyNavItem"
                class="inline-flex w-full justify-center px-[8px] py-[12px] text-center text-[1.42rem] font-medium leading-[1.2] tracking-[0.01em] text-gr-blue transition-colors duration-200 hover:text-gr-gold md:text-[1.5rem]"
                :href="pharmacyNavItem.href"
                :data-astro-prefetch="isInternalLink(pharmacyNavItem.href) ? '' : null"
                @click="closeMobileMenu"
              >
                {{ pharmacyNavItem.label }}
              </a>
            </div>
          </div>

          <div class="w-full max-w-[460px] py-[10px] md:py-[12px]" aria-hidden="true">
            <div class="relative mx-auto h-px w-full bg-gradient-to-r from-transparent via-gr-border to-transparent">
              <span class="absolute left-1/2 top-1/2 h-[8px] w-[8px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gr-gold/80 bg-gr-bg"></span>
            </div>
          </div>

          <div class="flex w-full max-w-[460px] flex-col gap-[10px]">
            <a
              class="inline-flex min-h-[49px] w-full items-center justify-center rounded-full bg-gr-gold px-[15px] py-[9px] text-[1.36rem] font-medium leading-[1.2] text-white transition-[box-shadow,filter] duration-300 ease-out hover:shadow-[0_10px_20px_rgba(186,161,71,0.28)] hover:brightness-[1.03] focus-visible:shadow-[0_10px_20px_rgba(186,161,71,0.28)] focus-visible:brightness-[1.03] md:min-h-[51px] md:text-[1.42rem]"
              :href="loginLink.href"
              @click="closeMobileMenu"
            >
              {{ loginLink.label }}
            </a>
            <a
              class="inline-flex min-h-[49px] w-full items-center justify-center rounded-full border border-gr-gold bg-transparent px-[15px] py-[9px] text-[1.36rem] font-medium leading-[1.2] text-gr-gold transition-[box-shadow,background-color,color] duration-300 ease-out hover:bg-gr-gold hover:text-white hover:shadow-[0_10px_20px_rgba(186,161,71,0.24)] focus-visible:bg-gr-gold focus-visible:text-white focus-visible:shadow-[0_10px_20px_rgba(186,161,71,0.24)] md:min-h-[51px] md:text-[1.42rem]"
              :href="registerLink.href"
              @click="closeMobileMenu"
            >
              {{ registerLink.label }}
            </a>
          </div>

          <a
            class="mt-auto w-full max-w-[460px] pt-[18px] text-center text-[1rem] leading-[1.2] text-gr-blue md:pt-[22px] md:text-[1.03rem]"
            href="mailto:info@generarecetas.com"
            @click="closeMobileMenu"
          >
            info@generarecetas.com
          </a>
        </aside>
      </div>
    </div>
  </div>
</template>
