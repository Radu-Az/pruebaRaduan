<script setup>
import { featureCards } from "../../data/landing";
import ServiceIcon from "../services/ServiceIcon.vue";

const marqueeCards = [...featureCards, ...featureCards];
</script>

<template>
  <section
    class="landing-hero-intro mx-auto flex min-h-[calc(100svh-110px)] w-full max-w-[560px] flex-col justify-center text-center md:min-h-[calc(100svh-128px)] md:max-w-[780px] min-[1024px]:max-w-[1060px] min-[1200px]:min-h-[calc(100svh-148px)] min-[1280px]:max-w-[1120px]"
    aria-labelledby="hero-title"
  >
    <h1 id="hero-title" class="gr-heading-1 text-gr-blue">
      Motivamos la buena
      <br />
      prescripción veterinaria
      <br />
      <span class="mt-[9px] inline-block text-gr-gold">¡Nueva app!</span>
    </h1>
    <p class="gr-body mt-[9px] text-gr-blue">Más de 15 años de experiencia</p>

    <div
      class="mx-auto mt-[28px] w-full max-w-[376px] overflow-hidden md:mt-[32px] md:max-w-[700px] md:[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] md:[-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] min-[1024px]:relative min-[1024px]:left-1/2 min-[1024px]:mx-0 min-[1024px]:mt-[34px] min-[1024px]:w-[calc(100%+168px)] min-[1024px]:max-w-none min-[1024px]:-translate-x-1/2 min-[1024px]:[mask-image:linear-gradient(to_right,transparent,black_3%,black_97%,transparent)] min-[1024px]:[-webkit-mask-image:linear-gradient(to_right,transparent,black_3%,black_97%,transparent)] min-[1280px]:w-[calc(100%+216px)]"
      aria-label="Funcionalidades principales"
    >
      <div class="landing-feature-track flex w-max gap-[20px] md:gap-[50px] min-[1024px]:gap-[88px] min-[1280px]:gap-[112px]">
        <article
          v-for="(feature, index) in marqueeCards"
          :key="`${feature.id}-${index}`"
          class="shrink-0 flex h-[86px] w-[86px] flex-col items-center rounded-[10px] border-2 border-gr-muted px-[6px] pb-[7px] pt-[7px] md:h-[104px] md:w-[104px] md:rounded-[11px] md:pb-[9px] md:pt-[9px] min-[1024px]:h-[122px] min-[1024px]:w-[122px] min-[1024px]:rounded-[12px] min-[1024px]:px-[8px] min-[1024px]:pb-[11px] min-[1024px]:pt-[11px] min-[1280px]:h-[128px] min-[1280px]:w-[128px] min-[1280px]:pb-[12px] min-[1280px]:pt-[12px]"
          :aria-hidden="index >= featureCards.length"
        >
          <div class="flex h-[44px] w-full items-center justify-center md:h-[60px] min-[1200px]:h-[64px]" aria-hidden="true">
            <ServiceIcon :name="feature.icon" icon-class="h-[36px] w-[36px] text-gr-muted/85 md:h-[46px] md:w-[46px] min-[1200px]:h-[50px] min-[1200px]:w-[50px]" />
          </div>

          <p class="m-0 mt-auto text-center text-[0.66rem] leading-[1.04] text-gr-muted md:text-[0.9rem] min-[1200px]:text-[0.94rem]">
            <template v-if="feature.id === 'consumo-antibioticos'">
              Consumo
              <br />
              antibióticos
            </template>
            <template v-else>{{ feature.title }}</template>
          </p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.landing-hero-intro {
  animation: landing-hero-reveal 820ms cubic-bezier(0.22, 1, 0.36, 1) both;
}

.landing-feature-track {
  animation: landing-feature-marquee 26s linear infinite;
  will-change: transform;
}

@keyframes landing-hero-reveal {
  from {
    opacity: 0;
    transform: translate3d(0, 14px, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes landing-feature-marquee {
  from {
    transform: translate3d(0, 0, 0);
  }

  to {
    transform: translate3d(-50%, 0, 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .landing-hero-intro,
  .landing-feature-track {
    animation: none !important;
  }
}
</style>
