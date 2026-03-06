<script setup>
import emblaCarouselVue from "embla-carousel-vue";
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { services } from "../../data/landing";
import ServiceIcon from "../services/ServiceIcon.vue";

const serviceCardThemes = {
  ereceta: {
    accent: "rgba(201,169,97,0.18)",
    glow: "rgba(201,169,97,0.34)",
    edge: "rgba(47,86,104,0.14)"
  },
  comunicacion: {
    accent: "rgba(111,151,176,0.18)",
    glow: "rgba(111,151,176,0.32)",
    edge: "rgba(47,86,104,0.14)"
  },
  "libro-tratamientos": {
    accent: "rgba(132,170,144,0.16)",
    glow: "rgba(132,170,144,0.28)",
    edge: "rgba(47,86,104,0.12)"
  },
  vademecum: {
    accent: "rgba(122,133,190,0.16)",
    glow: "rgba(122,133,190,0.28)",
    edge: "rgba(47,86,104,0.14)"
  },
  "botiquin-veterinario": {
    accent: "rgba(194,132,104,0.16)",
    glow: "rgba(194,132,104,0.28)",
    edge: "rgba(47,86,104,0.12)"
  },
  "libro-visitas": {
    accent: "rgba(128,161,191,0.16)",
    glow: "rgba(128,161,191,0.28)",
    edge: "rgba(47,86,104,0.12)"
  },
  almacenaje: {
    accent: "rgba(143,157,201,0.16)",
    glow: "rgba(143,157,201,0.28)",
    edge: "rgba(47,86,104,0.12)"
  },
  ayuda: {
    accent: "rgba(201,169,97,0.14)",
    glow: "rgba(97,137,160,0.26)",
    edge: "rgba(47,86,104,0.14)"
  }
};
const defaultServiceCardTheme = {
  accent: "rgba(201,169,97,0.16)",
  glow: "rgba(111,151,176,0.26)",
  edge: "rgba(47,86,104,0.14)"
};

const DESKTOP_BREAKPOINT = 1024;
const AUTO_ADVANCE_MS = 2000;

const selectedIndex = ref(0);
const canPrev = ref(false);
const canNext = ref(false);
const viewportWidth = ref(0);
const isAutoplayPaused = ref(false);
let autoplayTimer = null;

const [emblaRef, emblaApi] = emblaCarouselVue({
  align: "center",
  containScroll: false,
  loop: false,
  slidesToScroll: 1,
  breakpoints: {
    "(min-width: 1024px)": {
      align: "center",
      containScroll: false,
      slidesToScroll: 3
    }
  }
});

const cardsPerPage = computed(() => (viewportWidth.value >= DESKTOP_BREAKPOINT ? 3 : 1));
const pageCount = computed(() => Math.ceil(services.length / cardsPerPage.value));
const hasControls = computed(() => pageCount.value > 1);

const syncCarouselState = () => {
  const api = emblaApi.value;
  if (!api) {
    selectedIndex.value = 0;
    canPrev.value = false;
    canNext.value = false;
    return;
  }

  selectedIndex.value = api.selectedScrollSnap();
  canPrev.value = api.canScrollPrev();
  canNext.value = api.canScrollNext();
};

const syncViewportWidth = () => {
  viewportWidth.value = window.innerWidth;
};

const goPrev = () => {
  emblaApi.value?.scrollPrev();
  startAutoplay();
};

const goNext = () => {
  emblaApi.value?.scrollNext();
  startAutoplay();
};

const goTo = (index) => {
  emblaApi.value?.scrollTo(index);
  startAutoplay();
};

const onKeydown = (event) => {
  if (event.key === "ArrowRight") {
    event.preventDefault();
    goNext();
    return;
  }

  if (event.key === "ArrowLeft") {
    event.preventDefault();
    goPrev();
  }
};

const getSlideStyle = () =>
  viewportWidth.value >= DESKTOP_BREAKPOINT
    ? {
        flex: "0 0 calc((100% - 16px) / 3.32)",
        height: "472px"
      }
    : {};
const getCardThemeStyle = (serviceId) => {
  const theme = serviceCardThemes[serviceId] ?? defaultServiceCardTheme;

  return {
    "--service-accent": theme.accent,
    "--service-glow": theme.glow,
    "--service-edge": theme.edge
  };
};

const stopAutoplay = () => {
  if (autoplayTimer !== null) {
    window.clearInterval(autoplayTimer);
    autoplayTimer = null;
  }
};

const advanceAutoplay = () => {
  const api = emblaApi.value;
  if (!api) {
    return;
  }

  if (api.canScrollNext()) {
    api.scrollNext();
    return;
  }

  api.scrollTo(0);
};

const startAutoplay = () => {
  stopAutoplay();

  if (typeof window === "undefined" || !emblaApi.value || pageCount.value <= 1 || isAutoplayPaused.value) {
    return;
  }

  autoplayTimer = window.setInterval(advanceAutoplay, AUTO_ADVANCE_MS);
};

const pauseAutoplay = () => {
  isAutoplayPaused.value = true;
  stopAutoplay();
};

const resumeAutoplay = () => {
  isAutoplayPaused.value = false;
  startAutoplay();
};

const toggleAutoplay = () => {
  if (isAutoplayPaused.value) {
    resumeAutoplay();
    return;
  }

  pauseAutoplay();
};

watch(
  emblaApi,
  (nextApi, previousApi) => {
    if (previousApi) {
      previousApi.off("select", syncCarouselState);
      previousApi.off("reInit", syncCarouselState);
    }

    if (!nextApi) {
      syncCarouselState();
      return;
    }

    nextApi.on("select", syncCarouselState);
    nextApi.on("reInit", syncCarouselState);
    syncCarouselState();
    startAutoplay();
  },
  { immediate: true }
);

watch(cardsPerPage, () => {
  emblaApi.value?.reInit();
  startAutoplay();
});

watch(pageCount, (count) => {
  if (!count) {
    selectedIndex.value = 0;
    stopAutoplay();
    return;
  }

  if (selectedIndex.value > count - 1) {
    emblaApi.value?.scrollTo(count - 1, true);
  }

  startAutoplay();
});

onMounted(() => {
  syncViewportWidth();
  window.addEventListener("resize", syncViewportWidth, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", syncViewportWidth);
  stopAutoplay();
});
</script>

<template>
  <section class="landing-services relative mt-0 w-full py-[38px] md:py-[54px] min-[1200px]:py-[72px]" style="content-visibility: auto; contain-intrinsic-size: 1080px;" aria-labelledby="services-title">
    <span class="pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 bg-[rgb(47_86_104_/_0.05)]" aria-hidden="true"></span>
    <span class="pointer-events-none absolute left-1/2 top-0 h-px w-screen -translate-x-1/2 bg-gr-border/32" aria-hidden="true"></span>
    <span class="pointer-events-none absolute left-1/2 bottom-0 h-px w-screen -translate-x-1/2 bg-gr-border/22" aria-hidden="true"></span>

    <div class="mx-auto w-full max-w-[1120px] px-[14px] md:px-[22px] min-[1024px]:px-[18px]">
      <div class="flex flex-col gap-[22px] min-[1200px]:gap-[28px]">
        <div class="reveal-up relative">
          <div class="mx-auto flex w-fit items-center gap-[10px]">
            <span class="h-[1px] w-[34px] bg-gr-gold/65" aria-hidden="true"></span>
            <p class="font-space text-[0.78rem] font-[600] tracking-[0.18em] text-gr-blue/72">SOLUCI&Oacute;N INTEGRADA</p>
          </div>

          <h2 id="services-title" class="gr-heading-2 mt-[10px] text-center text-gr-gold min-[1200px]:mt-[14px]">
            SERVICIOS
          </h2>
        </div>

        <div class="reveal-up reveal-delay-1">
          <div class="relative left-1/2 w-screen -translate-x-1/2 px-[14px] md:px-[22px] min-[1024px]:w-[calc(100vw+240px)] min-[1024px]:px-[12px] min-[1440px]:w-[calc(100vw+320px)] min-[1440px]:px-[18px]">
            <div
              class="relative mx-auto w-full max-w-[470px] md:max-w-[980px] min-[1024px]:max-w-none"
              role="region"
              aria-roledescription="carousel"
              aria-label="Servicios de GeneraRecetas"
              tabindex="0"
              @keydown="onKeydown"
              @mouseenter="stopAutoplay"
              @mouseleave="startAutoplay"
              @focusin="stopAutoplay"
              @focusout="startAutoplay"
            >
              <div
                ref="emblaRef"
                class="overflow-hidden px-0 md:px-[10px] min-[1024px]:relative min-[1024px]:left-1/2 min-[1024px]:w-[calc(100%+260px)] min-[1024px]:-translate-x-1/2 min-[1024px]:px-0 min-[1440px]:w-[calc(100%+340px)]"
              >
                <div class="flex gap-0 md:gap-[12px] min-[1024px]:gap-[8px]">
                  <article
                    v-for="service in services"
                    :key="service.id"
                    class="relative shrink-0 basis-[calc(100%-28px)] overflow-hidden rounded-[18px] border border-gr-border/55 bg-transparent px-[14px] py-[10px] text-left md:basis-[86%] md:px-[18px] md:py-[12px]"
                    :style="{ ...getSlideStyle(), ...getCardThemeStyle(service.id) }"
                  >
                    <span
                      class="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(240,244,247,0.96)_100%)]"
                      aria-hidden="true"
                    ></span>
                    <span
                      class="pointer-events-none absolute right-[-18%] top-[-16%] h-[210px] w-[210px] rounded-full blur-3xl"
                      style="background: radial-gradient(circle, var(--service-glow) 0%, rgba(255,255,255,0) 72%)"
                      aria-hidden="true"
                    ></span>
                    <span
                      class="pointer-events-none absolute bottom-[-18%] left-[-12%] h-[180px] w-[180px] rounded-full blur-3xl"
                      style="background: radial-gradient(circle, var(--service-accent) 0%, rgba(255,255,255,0) 74%)"
                      aria-hidden="true"
                    ></span>
                    <span
                      class="pointer-events-none absolute right-[22px] top-[24px] h-[86px] w-[86px] opacity-[0.42] md:h-[108px] md:w-[108px]"
                      style="background-image: radial-gradient(var(--service-edge) 1.15px, transparent 1.15px); background-size: 14px 14px;"
                      aria-hidden="true"
                    ></span>
                    <span
                      class="pointer-events-none absolute -left-[28px] top-1/2 h-[112px] w-[112px] -translate-y-1/2 rounded-full border border-white/72 opacity-[0.8] md:h-[136px] md:w-[136px]"
                      style="box-shadow: inset 0 0 0 1px var(--service-edge);"
                      aria-hidden="true"
                    ></span>
                    <span
                      class="pointer-events-none absolute inset-0 opacity-[0.7]"
                      style="background:
                        radial-gradient(circle at 82% 20%, rgba(255,255,255,0.82) 0%, rgba(255,255,255,0) 34%),
                        radial-gradient(circle at 18% 78%, rgba(255,255,255,0.62) 0%, rgba(255,255,255,0) 30%),
                        linear-gradient(180deg, rgba(47,86,104,0) 0%, rgba(47,86,104,0.03) 100%)"
                      aria-hidden="true"
                    ></span>
                    <span
                      class="pointer-events-none absolute inset-[14px] rounded-[14px] border border-white/70"
                      aria-hidden="true"
                    ></span>

                    <div class="relative z-10 flex h-[420px] flex-col items-center pt-[8px] md:h-[466px] md:pt-[14px] min-[1024px]:h-full">
                      <span class="mx-auto inline-flex h-[60px] w-[60px] items-center justify-center rounded-[16px] border border-gr-gold/45 bg-gr-gold/10 text-gr-gold md:h-[72px] md:w-[72px]">
                        <ServiceIcon :name="service.icon" icon-class="h-[32px] w-[32px] md:h-[38px] md:w-[38px]" />
                      </span>

                      <div class="mt-[8px] flex min-h-[64px] w-full items-center justify-center md:min-h-[62px]">
                        <h3 class="text-center font-space text-[1.35rem] font-[700] leading-[1.12] text-gr-blue md:text-[1.55rem]">
                          {{ service.title }}
                        </h3>
                      </div>

                      <p class="gr-body mt-[10px] flex-1 overflow-hidden px-[4px] text-[0.92rem] leading-[1.45] text-gr-blue/82 md:mt-[12px] md:px-[8px] md:text-[0.96rem]">
                        {{ service.description }}
                      </p>
                    </div>
                  </article>
                </div>
              </div>
              <div
                class="pointer-events-none absolute inset-y-0 left-0 right-0 min-[1024px]:left-1/2 min-[1024px]:w-[calc(100%+260px)] min-[1024px]:-translate-x-1/2 min-[1440px]:w-[calc(100%+340px)]"
                aria-hidden="true"
              >
                <span
                  class="absolute inset-y-0 left-0 w-[28px] bg-[linear-gradient(90deg,rgba(245,246,244,0.9)_0%,rgba(245,246,244,0)_100%)] md:w-[42px] min-[1024px]:w-[104px] min-[1024px]:bg-[linear-gradient(90deg,rgba(245,246,244,0.96)_0%,rgba(245,246,244,0.82)_26%,rgba(245,246,244,0.32)_68%,rgba(245,246,244,0)_100%)] min-[1440px]:w-[132px]"
                ></span>
                <span
                  class="absolute inset-y-0 right-0 w-[28px] bg-[linear-gradient(270deg,rgba(245,246,244,0.9)_0%,rgba(245,246,244,0)_100%)] md:w-[42px] min-[1024px]:w-[104px] min-[1024px]:bg-[linear-gradient(270deg,rgba(245,246,244,0.96)_0%,rgba(245,246,244,0.82)_26%,rgba(245,246,244,0.32)_68%,rgba(245,246,244,0)_100%)] min-[1440px]:w-[132px]"
                ></span>
              </div>
            </div>
          </div>

          <div class="mt-[14px] flex items-center justify-center gap-[10px] md:mt-[18px]">
            <div class="inline-flex items-center gap-[6px] rounded-full border border-gr-border/55 bg-white/92 px-[8px] py-[7px] shadow-[0_10px_24px_rgba(47,86,104,0.18)]">
              <button
                type="button"
                class="inline-flex h-[36px] w-[36px] items-center justify-center rounded-full border border-gr-border/70 bg-white text-gr-blue transition-[background-color,color,transform,border-color,box-shadow] duration-200 hover:border-gr-gold/70 hover:bg-gr-gold/12 hover:text-gr-blue hover:shadow-[0_0_0_1px_rgba(201,169,97,0.16)] active:scale-[0.96] disabled:border-gr-border/40 disabled:bg-white/60 disabled:text-gr-muted"
                aria-label="Servicio anterior"
                :disabled="!canPrev"
                @click="goPrev"
              >
                <svg viewBox="0 0 24 24" class="h-[16px] w-[16px] fill-none stroke-current stroke-[2.1]" aria-hidden="true">
                  <path d="M15 6 9 12l6 6" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
              </button>

              <div v-if="hasControls" class="flex items-center gap-[8px] px-[2px]">
                <button
                  v-for="index in pageCount"
                  :key="`dot-${index - 1}`"
                  type="button"
                  :aria-label="`Ir al grupo ${index}`"
                  class="h-[8px] rounded-full bg-gr-blue/18 transition-all duration-250"
                  :class="
                    index - 1 === selectedIndex
                      ? 'w-[30px] bg-gr-gold shadow-[0_0_0_1px_rgba(201,169,97,0.35)]'
                      : 'w-[8px] hover:bg-gr-gold/55'
                  "
                  @click="goTo(index - 1)"
                ></button>
              </div>

              <button
                type="button"
                class="inline-flex h-[36px] w-[36px] items-center justify-center rounded-full border border-gr-border/70 bg-white text-gr-blue transition-[background-color,color,transform,border-color,box-shadow] duration-200 hover:border-gr-gold/70 hover:bg-gr-gold/12 hover:text-gr-blue hover:shadow-[0_0_0_1px_rgba(201,169,97,0.16)] active:scale-[0.96] disabled:border-gr-border/40 disabled:bg-white/60 disabled:text-gr-muted"
                aria-label="Servicio siguiente"
                :disabled="!canNext"
                @click="goNext"
              >
                <svg viewBox="0 0 24 24" class="h-[16px] w-[16px] fill-none stroke-current stroke-[2.1]" aria-hidden="true">
                  <path d="m9 6 6 6-6 6" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
              </button>
            </div>

            <button
              type="button"
              class="inline-flex h-[46px] w-[46px] items-center justify-center rounded-full border border-gr-border/55 bg-white/92 text-gr-blue shadow-[0_10px_24px_rgba(47,86,104,0.18)] transition-[background-color,color,transform,border-color,box-shadow] duration-200 hover:border-gr-gold/75 hover:bg-gr-gold/12 hover:text-gr-blue hover:shadow-[0_0_0_1px_rgba(201,169,97,0.16),0_10px_24px_rgba(47,86,104,0.18)] active:scale-[0.98]"
              :aria-pressed="isAutoplayPaused ? 'true' : 'false'"
              :aria-label="isAutoplayPaused ? 'Reanudar reproducción automática' : 'Pausar reproducción automática'"
              @click="toggleAutoplay"
            >
              <svg
                v-if="isAutoplayPaused"
                viewBox="0 0 24 24"
                class="h-[16px] w-[16px] fill-current text-gr-gold"
                aria-hidden="true"
              >
                <path d="M8 6.5v11l9-5.5-9-5.5Z"></path>
              </svg>
              <svg
                v-else
                viewBox="0 0 24 24"
                class="h-[16px] w-[16px] fill-current text-gr-gold"
                aria-hidden="true"
              >
                <path d="M7 6h3v12H7zm7 0h3v12h-3z"></path>
              </svg>
            </button>
          </div>

          <div class="mt-[18px] flex flex-col items-center justify-center min-[1200px]:mt-[22px]">
            <p class="gr-body mx-auto max-w-[60ch] text-center text-gr-blue/84">
              Descubre en <strong class="font-[700] text-gr-blue">Perfiles</strong> qu&eacute; experiencia y servicios
              encajan contigo.
            </p>
            <a
              href="/perfiles"
              class="mt-[14px] flex h-[42px] w-fit items-center justify-center rounded-[10px] border border-gr-blue bg-gr-blue px-[16px] font-space text-[0.94rem] font-[600] tracking-[0.02em] text-white shadow-[0_8px_20px_rgba(47,86,104,0.24)] transition-[background-color,border-color,transform,box-shadow] duration-200 hover:border-gr-blue/90 hover:bg-gr-blue/90 hover:shadow-[0_9px_22px_rgba(47,86,104,0.28)] active:scale-[0.98]"
            >
              Ir a Perfiles
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
