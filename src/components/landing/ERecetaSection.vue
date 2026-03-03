<script setup>
import { ref } from "vue";
import { useOneShotVisibility } from "../../composables/useOneShotVisibility";

const sectionRef = ref(null);

const isVisible = useOneShotVisibility(sectionRef, {
  threshold: 0.2,
  rootMargin: "0px 0px -8% 0px"
});
</script>

<template>
  <section
    ref="sectionRef"
    class="landing-ereceta relative mt-[38px] w-full py-[28px] md:mt-[48px] md:py-[34px] min-[1200px]:mt-[56px] min-[1200px]:py-[42px]"
    :class="{ 'is-visible': isVisible }"
    aria-labelledby="ereceta-title"
  >
    <span class="pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 bg-[rgb(186_161_71_/_0.08)]" aria-hidden="true"></span>
    <span class="pointer-events-none absolute left-1/2 top-0 h-px w-screen -translate-x-1/2 bg-gr-border/35" aria-hidden="true"></span>
    <span class="pointer-events-none absolute left-1/2 bottom-0 h-px w-screen -translate-x-1/2 bg-gr-border/25" aria-hidden="true"></span>

    <div class="relative mx-auto min-h-[560px] w-full max-w-[1200px] overflow-hidden px-[16px] py-[24px] md:min-h-[630px] md:px-[24px] md:py-[30px] min-[1200px]:min-h-[710px] min-[1200px]:px-[32px] min-[1200px]:py-[40px]">
      <div class="relative z-10 grid min-h-[510px] items-center gap-[28px] min-[1020px]:min-h-[560px] min-[1020px]:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] min-[1200px]:min-h-[620px] min-[1200px]:gap-[42px]">
        <div class="mx-auto w-full max-w-[620px] min-[1020px]:mx-0">
          <h2 id="ereceta-title" class="gr-heading-2 reveal-up max-w-[12ch] text-gr-gold">e-Receta veterinaria</h2>
          <p class="gr-subtitle reveal-up reveal-delay-1 mt-[12px] max-w-[26ch] text-gr-blue">
            La nueva app Generarecetas es segura, &aacute;gil y completa
          </p>
          <p class="gr-body reveal-up reveal-delay-2 mt-[16px] max-w-[56ch] text-gr-blue">
            La nueva aplicaci&oacute;n web m&aacute;s intuitiva, con servicio total al sector veterinario y ganadero, donde podr&aacute;s obtener toda la informaci&oacute;n actualizada en torno a la Receta electr&oacute;nica veterinaria, registros de tratamientos digital, consumo de antibi&oacute;ticos y un largo etc&hellip; Una evoluci&oacute;n de nuestra soluci&oacute;n anterior, respaldada por m&aacute;s de 12 a&ntilde;os de experiencia en este sector, con una tecnolog&iacute;a responsable, eficiente y segura.
          </p>
        </div>

        <div class="reveal-up reveal-delay-3">
          <div class="ereceta-float relative mx-auto flex min-h-[280px] w-full max-w-[980px] items-center justify-center md:min-h-[360px] min-[1200px]:min-h-[440px]">
            <img
              src="/images/e-recetas.png"
              alt="Imagen e-Receta"
              class="relative z-10 h-auto w-[118%] max-w-[980px] object-contain md:w-[126%] min-[1200px]:w-[136%]"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes ereceta-float {
  0% {
    transform: translate3d(0, 0, 0);
  }

  50% {
    transform: translate3d(0, -6px, 0);
  }

  100% {
    transform: translate3d(0, 0, 0);
  }
}

.landing-ereceta.is-visible .ereceta-float {
  animation: ereceta-float 3.6s ease-in-out 280ms 1 both;
}

@media (prefers-reduced-motion: reduce) {
  .landing-ereceta.is-visible .ereceta-float {
    animation: none !important;
  }
}
</style>
