<script setup>
import { ref } from "vue";

const formRef = ref(null);
const acceptedPrivacy = ref(false);
const mapEmbedSrc =
  "https://www.google.com/maps?q=NTec%20Web%2C%20S.L.%2C%20C.%20E%2C%2011%2C%20Piso%202%20B%2C%2031192%20Mutilva%20Baja%2C%20Navarra&z=15&output=embed";

function handleSubmit() {
  const formElement = formRef.value;
  if (!(formElement instanceof HTMLFormElement)) {
    return;
  }

  if (!acceptedPrivacy.value) {
    return;
  }

  if (!formElement.reportValidity()) {
    return;
  }

  const formData = new FormData(formElement);
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const message = String(formData.get("message") || "").trim();
  const subject = encodeURIComponent(`Contacto web GeneraRecetas - ${name}`);
  const body = encodeURIComponent(
    [
      `Nombre: ${name}`,
      `Email: ${email}`,
      "",
      "Mensaje:",
      message
    ].join("\n")
  );

  window.location.href = `mailto:info@generarecetas.com?subject=${subject}&body=${body}`;
}
</script>

<template>
  <section class="relative overflow-hidden pb-[64px] pt-[20px] md:pb-[90px] md:pt-[30px]">
    <div class="mx-auto w-full max-w-[1200px]">
      <section
        class="relative overflow-hidden rounded-[24px] border border-gr-border/26 bg-[#f5f0de] shadow-[0_28px_56px_rgba(20,57,73,0.14)] reveal-up"
        aria-labelledby="contact-title"
      >
        <span class="pointer-events-none absolute left-[42px] right-[42px] top-[64px] h-px bg-gr-border/20" aria-hidden="true"></span>

        <div class="grid min-[980px]:grid-cols-[1.1fr_0.9fr]">
          <div class="px-[22px] pb-[26px] pt-[24px] md:px-[34px] md:pb-[34px] md:pt-[30px] min-[1200px]:px-[44px] min-[1200px]:pb-[40px] min-[1200px]:pt-[36px]">
            <p class="font-space text-[0.78rem] font-[700] uppercase tracking-[0.22em] text-gr-blue/58">
              Contacto
            </p>
            <h1 id="contact-title" class="mt-[12px] font-space text-[2.2rem] font-[700] leading-[1.02] text-gr-blue md:text-[3rem]">
              Queremos escucharte
            </h1>
            <p class="mt-[18px] max-w-[38ch] text-[1.02rem] leading-[1.72] text-gr-blue/84 md:text-[1.08rem]">
              Si quieres información o estás interesado, rellena nuestro formulario y nos pondremos en contacto contigo lo antes posible.
            </p>

            <div class="mt-[28px] grid gap-[12px] md:mt-[34px] md:max-w-[560px] md:grid-cols-2">
              <a
                href="mailto:info@generarecetas.com"
                class="group flex min-h-[76px] flex-col justify-between rounded-[14px] border border-gr-border/24 bg-white/74 p-[14px] transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-[1px] hover:border-gr-gold/55 hover:shadow-[0_10px_22px_rgba(47,86,104,0.12)]"
              >
                <span class="text-[0.76rem] font-medium uppercase tracking-[0.18em] text-gr-blue/48">E-mail</span>
                <span class="font-space text-[1.02rem] font-[600] leading-[1.2] text-gr-blue transition-colors duration-200 group-hover:text-gr-gold">
                  info@generarecetas.com
                </span>
              </a>

              <a
                href="tel:+34948482356"
                class="group flex min-h-[76px] flex-col justify-between rounded-[14px] border border-gr-border/24 bg-white/74 p-[14px] transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-[1px] hover:border-gr-gold/55 hover:shadow-[0_10px_22px_rgba(47,86,104,0.12)]"
              >
                <span class="text-[0.76rem] font-medium uppercase tracking-[0.18em] text-gr-blue/48">Teléfono</span>
                <span class="font-space text-[1.14rem] font-[600] leading-none text-gr-blue transition-colors duration-200 group-hover:text-gr-gold">
                  948 48 23 56
                </span>
              </a>

              <div class="min-h-[112px] rounded-[14px] border border-gr-border/24 bg-white/74 p-[14px] md:col-span-2">
                <span class="text-[0.76rem] font-medium uppercase tracking-[0.18em] text-gr-blue/48">Dirección</span>
                <p class="mt-[10px] max-w-[42ch] text-[1rem] leading-[1.6] text-gr-blue/82">
                  Pol. Mutilva E-11, Piso 2. Oficina 2B, 31192 (Navarra)
                </p>
              </div>
            </div>
          </div>

          <div class="border-t border-gr-border/22 bg-white px-[22px] pb-[24px] pt-[22px] md:px-[34px] md:pb-[32px] md:pt-[28px] min-[980px]:border-l min-[980px]:border-t-0 min-[1200px]:px-[42px] min-[1200px]:pb-[38px] min-[1200px]:pt-[34px]">
            <p class="text-[0.76rem] font-medium uppercase tracking-[0.18em] text-gr-blue/46">
              Formulario
            </p>
            <h2 class="mt-[8px] font-space text-[1.8rem] font-[700] leading-[1.06] text-gr-blue md:text-[2.12rem]">
              Escríbenos
            </h2>

            <form ref="formRef" class="mt-[18px] space-y-[12px]" @submit.prevent="handleSubmit">
              <label class="block">
                <span class="text-[0.76rem] font-medium uppercase tracking-[0.14em] text-gr-blue/50">Nombre</span>
                <input
                  name="name"
                  type="text"
                  required
                  autocomplete="name"
                  class="mt-[6px] block min-h-[48px] w-full rounded-[12px] border border-gr-border/28 bg-white px-[13px] py-[11px] text-[1rem] text-gr-blue outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-gr-blue/34 focus:border-gr-gold focus:shadow-[0_0_0_3px_rgba(186,161,71,0.14)]"
                  placeholder="Tu nombre"
                />
              </label>

              <label class="block">
                <span class="text-[0.76rem] font-medium uppercase tracking-[0.14em] text-gr-blue/50">Email</span>
                <input
                  name="email"
                  type="email"
                  required
                  autocomplete="email"
                  class="mt-[6px] block min-h-[48px] w-full rounded-[12px] border border-gr-border/28 bg-white px-[13px] py-[11px] text-[1rem] text-gr-blue outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-gr-blue/34 focus:border-gr-gold focus:shadow-[0_0_0_3px_rgba(186,161,71,0.14)]"
                  placeholder="tu@email.com"
                />
              </label>

              <label class="block">
                <span class="text-[0.76rem] font-medium uppercase tracking-[0.14em] text-gr-blue/50">Mensaje</span>
                <textarea
                  name="message"
                  required
                  rows="5"
                  class="mt-[6px] block min-h-[150px] w-full resize-y rounded-[12px] border border-gr-border/28 bg-white px-[13px] py-[11px] text-[1rem] leading-[1.58] text-gr-blue outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-gr-blue/34 focus:border-gr-gold focus:shadow-[0_0_0_3px_rgba(186,161,71,0.14)]"
                  placeholder="Cuéntanos en qué podemos ayudarte"
                ></textarea>
              </label>

              <div class="flex items-start gap-[10px] rounded-[12px] border border-gr-border/18 bg-[#f6f3ea] px-[12px] py-[10px] text-[0.92rem] leading-[1.45] text-gr-blue/80">
                <input
                  id="accept-privacy"
                  v-model="acceptedPrivacy"
                  type="checkbox"
                  required
                  class="mt-[2px] h-[16px] w-[16px] shrink-0 rounded-[4px] border border-gr-border/24 accent-[#baa147]"
                />
                <label for="accept-privacy" class="cursor-pointer">
                  Acepto los términos de la
                  <a
                    href="/politica-privacidad"
                    class="font-semibold text-gr-blue underline decoration-gr-gold/65 decoration-[1.5px] underline-offset-[3px] transition-colors duration-200 hover:text-gr-gold"
                    @click.stop
                  >
                    política de privacidad
                  </a>.
                </label>
              </div>

              <button
                type="submit"
                :disabled="!acceptedPrivacy"
                class="inline-flex min-h-[52px] w-full items-center justify-center rounded-[12px] px-[16px] py-[12px] font-space text-[1rem] font-[600] tracking-[0.01em] transition-[transform,box-shadow,background-color,filter,color] duration-200"
                :class="
                  acceptedPrivacy
                    ? 'bg-gr-gold text-white shadow-[0_12px_24px_rgba(186,161,71,0.24)] hover:-translate-y-[1px] hover:brightness-[1.03] active:translate-y-0'
                    : 'cursor-not-allowed bg-gr-blue/10 text-gr-blue/36 shadow-none'
                "
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
      </section>

      <section
        class="mt-[18px] overflow-hidden rounded-[20px] border border-gr-border/20 bg-white shadow-[0_20px_42px_rgba(20,57,73,0.1)] reveal-up reveal-delay-1 md:mt-[24px]"
        aria-label="Mapa de ubicación"
      >
        <iframe
          :src="mapEmbedSrc"
          title="Mapa de la ubicación de NTec Web, S.L."
          class="block h-[300px] w-full md:h-[400px]"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          allowfullscreen
        ></iframe>
      </section>
    </div>
  </section>
</template>
