<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { services } from "../../data/landing";
import ServiceIcon from "../services/ServiceIcon.vue";

const serviceBackgroundImages = {
  ereceta: "/images/ServiciosEReceta.png",
  comunicacion: "/images/ServiciosComunicacion.png",
  "libro-tratamientos": "/images/ServiciosLibroTratamientos.png",
  vademecum: "/images/ServiciosVademecum.png",
  "botiquin-veterinario": "/images/ServicioBotiquinVeterinario.png",
  "libro-visitas": "/images/ServicioLibroVisitas.png",
  almacenaje: "/images/ServicioAlmacenaje.png",
  ayuda: "/images/ServicioAyuda.png"
};

const DESKTOP_BREAKPOINT = 1200;
const SWIPE_THRESHOLD = 40;

const selectedIndex = ref(0);
const viewportWidth = ref(0);
const touchStartX = ref(null);

const cardsPerPage = computed(() => (viewportWidth.value >= DESKTOP_BREAKPOINT ? 2 : 1));

const servicePages = computed(() => {
  const pages = [];

  for (let index = 0; index < services.length; index += cardsPerPage.value) {
    pages.push(services.slice(index, index + cardsPerPage.value));
  }

  return pages;
});

const pageCount = computed(() => servicePages.value.length);
const canPrev = computed(() => selectedIndex.value > 0);
const canNext = computed(() => selectedIndex.value < pageCount.value - 1);
const hasControls = computed(() => pageCount.value > 1);

const trackStyle = computed(() => ({
  transform: `translate3d(-${selectedIndex.value * 100}%, 0, 0)`
}));

watch(pageCount, (count) => {
  if (!count) {
    selectedIndex.value = 0;
    return;
  }

  selectedIndex.value = Math.min(selectedIndex.value, count - 1);
});

const syncViewportWidth = () => {
  viewportWidth.value = window.innerWidth;
};

const goPrev = () => {
  if (!canPrev.value) {
    return;
  }

  selectedIndex.value -= 1;
};

const goNext = () => {
  if (!canNext.value) {
    return;
  }

  selectedIndex.value += 1;
};

const goTo = (index) => {
  if (index < 0 || index >= pageCount.value) {
    return;
  }

  selectedIndex.value = index;
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

const onTouchStart = (event) => {
  touchStartX.value = event.changedTouches[0]?.clientX ?? null;
};

const onTouchEnd = (event) => {
  if (touchStartX.value === null) {
    return;
  }

  const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX.value;
  const deltaX = touchStartX.value - touchEndX;

  touchStartX.value = null;

  if (Math.abs(deltaX) < SWIPE_THRESHOLD) {
    return;
  }

  if (deltaX > 0) {
    goNext();
    return;
  }

  goPrev();
};

const getServiceBackground = (serviceId) => serviceBackgroundImages[serviceId] ?? null;

onMounted(() => {
  syncViewportWidth();
  window.addEventListener("resize", syncViewportWidth, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", syncViewportWidth);
});
</script>

<template>
  <section class="landing-services relative mt-0 w-full py-[24px] md:py-[30px] min-[1200px]:py-[36px]" aria-labelledby="services-title">
    <span class="pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 bg-[rgb(47_86_104_/_0.06)]" aria-hidden="true"></span>
    <span class="pointer-events-none absolute left-1/2 top-0 h-px w-screen -translate-x-1/2 bg-gr-border/32" aria-hidden="true"></span>
    <span class="pointer-events-none absolute left-1/2 bottom-0 h-px w-screen -translate-x-1/2 bg-gr-border/24" aria-hidden="true"></span>

    <div class="mx-auto w-full max-w-[1200px] px-[16px] md:px-[24px] min-[1200px]:px-[32px]">
      <h2 id="services-title" class="gr-heading-2 text-center text-gr-gold">SERVICIOS</h2>

      <div class="mt-[18px]">
        <div
          class="relative mx-auto w-full max-w-[420px] md:max-w-none"
          role="region"
          aria-roledescription="carousel"
          aria-label="Servicios de GeneraRecetas"
          tabindex="0"
          @keydown="onKeydown"
          @touchstart.passive="onTouchStart"
          @touchend.passive="onTouchEnd"
        >
          <div class="overflow-hidden">
            <div class="flex transition-transform duration-500 ease-out" :style="trackStyle">
              <div
                v-for="(page, pageIndex) in servicePages"
                :key="`services-page-${pageIndex}`"
                class="min-w-0 shrink-0 basis-full"
                :aria-hidden="pageIndex === selectedIndex ? 'false' : 'true'"
              >
                <div class="grid gap-[12px] md:gap-[14px] min-[1200px]:grid-cols-2 min-[1200px]:gap-[18px]">
                  <article
                    v-for="service in page"
                    :key="service.id"
                    class="relative flex h-[460px] flex-col overflow-hidden rounded-[18px] border border-gr-border/33 bg-white/72 px-[14px] py-[10px] text-left shadow-[0_8px_18px_rgba(47,86,104,0.1)] md:h-[430px] md:px-[18px] md:py-[12px] min-[1200px]:h-[450px]"
                  >
                    <span
                      v-if="getServiceBackground(service.id)"
                      class="pointer-events-none absolute inset-0 bg-cover bg-center opacity-[0.15]"
                      :style="{ backgroundImage: `url('${getServiceBackground(service.id)}')` }"
                      aria-hidden="true"
                    ></span>
                    <span
                      v-if="getServiceBackground(service.id)"
                      class="pointer-events-none absolute inset-0 bg-white/74"
                      aria-hidden="true"
                    ></span>

                    <div class="relative z-10 flex h-full flex-col items-center pt-[8px] md:pt-[14px]">
                      <span class="mx-auto inline-flex h-[60px] w-[60px] items-center justify-center rounded-[16px] border border-gr-gold/42 bg-gr-gold/12 text-gr-gold md:h-[72px] md:w-[72px]">
                        <ServiceIcon :name="service.icon" icon-class="h-[32px] w-[32px] md:h-[38px] md:w-[38px]" />
                      </span>

                      <div class="mt-[8px] flex min-h-[64px] w-full items-center justify-center md:min-h-[62px]">
                        <h3 class="text-center font-space text-[1.35rem] font-[700] leading-[1.12] text-gr-blue md:text-[1.55rem]">
                          {{ service.title }}
                        </h3>
                      </div>

                      <p class="gr-body mt-[10px] flex-1 overflow-hidden px-[4px] text-[0.92rem] leading-[1.45] text-gr-blue/90 md:mt-[12px] md:px-[8px] md:text-[0.96rem]">
                        {{ service.description }}
                      </p>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-[14px] flex items-center justify-center gap-[10px] md:mt-[18px]">
          <div class="inline-flex items-center gap-[6px] rounded-full border border-gr-border/45 bg-white/78 px-[8px] py-[7px] shadow-[0_10px_24px_rgba(47,86,104,0.12)]">
            <button
              type="button"
              class="inline-flex h-[36px] w-[36px] items-center justify-center rounded-full border border-transparent text-gr-blue transition-[background-color,color,transform] duration-200 hover:bg-gr-blue/10 active:scale-[0.96] disabled:opacity-40"
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
                class="h-[8px] rounded-full bg-gr-blue/42 transition-all duration-250"
                :class="index - 1 === selectedIndex ? 'w-[30px] bg-gr-gold' : 'w-[8px]'"
                @click="goTo(index - 1)"
              ></button>
            </div>

            <button
              type="button"
              class="inline-flex h-[36px] w-[36px] items-center justify-center rounded-full border border-transparent text-gr-blue transition-[background-color,color,transform] duration-200 hover:bg-gr-blue/10 active:scale-[0.96] disabled:opacity-40"
              aria-label="Servicio siguiente"
              :disabled="!canNext"
              @click="goNext"
            >
              <svg viewBox="0 0 24 24" class="h-[16px] w-[16px] fill-none stroke-current stroke-[2.1]" aria-hidden="true">
                <path d="m9 6 6 6-6 6" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
