<script setup>
import { featureCards } from "../../data/landing";
import ServiceIcon from "../services/ServiceIcon.vue";

const marqueeCards = [...featureCards, ...featureCards];
</script>

<template>
  <section
    class="landing-hero-intro mx-auto flex min-h-[calc(100svh-110px)] w-full max-w-[560px] flex-col justify-center text-center md:min-h-[calc(100svh-128px)] md:max-w-[780px] min-[1200px]:min-h-[calc(100svh-148px)] min-[1200px]:max-w-[920px]"
    aria-labelledby="hero-title"
  >
    <h1 id="hero-title" class="gr-heading-1 text-gr-blue">
      Motivamos la buena
      <br />
      prescripci&oacute;n veterinaria
      <br />
      <span class="mt-[9px] inline-block text-gr-gold">&iexcl;Nueva app!</span>
    </h1>
    <p class="gr-body mt-[9px] text-gr-blue">M&aacute;s de 15 a&ntilde;os de experiencia</p>

    <div
      class="mx-auto mt-[28px] w-full max-w-[376px] overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] md:mt-[32px] md:max-w-[472px] min-[1200px]:mt-[34px] min-[1200px]:max-w-[504px]"
      aria-label="Funcionalidades principales"
    >
      <div class="landing-feature-track flex w-max">
        <article
          v-for="(feature, index) in marqueeCards"
          :key="`${feature.id}-${index}`"
          class="mr-[8px] flex h-[86px] w-[86px] flex-col items-center rounded-[10px] border-2 border-gr-muted px-[6px] pb-[7px] pt-[7px] md:mr-[14px] md:h-[104px] md:w-[104px] md:rounded-[11px] md:pb-[9px] md:pt-[9px] min-[1200px]:mr-[16px] min-[1200px]:h-[110px] min-[1200px]:w-[110px] min-[1200px]:pb-[10px] min-[1200px]:pt-[10px]"
          :aria-hidden="index >= featureCards.length"
        >
          <div class="flex h-[44px] w-full items-center justify-center md:h-[60px] min-[1200px]:h-[64px]" aria-hidden="true">
            <ServiceIcon :name="feature.icon" icon-class="h-[36px] w-[36px] text-gr-muted/85 md:h-[46px] md:w-[46px] min-[1200px]:h-[50px] min-[1200px]:w-[50px]" />
          </div>

          <p class="m-0 mt-auto text-center text-[0.66rem] leading-[1.04] text-gr-muted md:text-[0.9rem] min-[1200px]:text-[0.94rem]">
            <template v-if="feature.id === 'consumo-antibioticos'">
              Consumo
              <br />
              antibioticos
            </template>
            <template v-else>{{ feature.title }}</template>
          </p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes landing-hero-reveal {
  from {
    opacity: 0;
    transform: translate3d(0, 16px, 0);
    filter: blur(3px);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
    filter: blur(0);
  }
}

.landing-hero-intro {
  animation: landing-hero-reveal 780ms cubic-bezier(0.22, 1, 0.36, 1) 70ms both;
  will-change: transform, opacity, filter;
}

.landing-feature-track {
  animation: landing-feature-marquee 26s linear infinite;
  will-change: transform;
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
  .landing-hero-intro {
    animation: none !important;
  }

  .landing-feature-track {
    animation: none !important;
  }
}
</style>
