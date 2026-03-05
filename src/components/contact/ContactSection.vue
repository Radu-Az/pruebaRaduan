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
  <section class="relative overflow-hidden pb-[56px] pt-[18px] md:pb-[84px] md:pt-[26px]">
    <span class="pointer-events-none absolute left-[-8%] top-[8%] h-[220px] w-[220px] rounded-full bg-gr-gold/14 blur-3xl" aria-hidden="true"></span>
    <span class="pointer-events-none absolute right-[-6%] top-[14%] h-[260px] w-[260px] rounded-full bg-gr-blue/12 blur-3xl" aria-hidden="true"></span>
    <span class="pointer-events-none absolute bottom-[8%] left-[42%] h-[180px] w-[180px] rounded-full bg-gr-gold/10 blur-3xl" aria-hidden="true"></span>

    <div class="mx-auto w-full max-w-[1200px]">
      <section
        class="relative overflow-hidden rounded-[28px] border border-gr-border/20 shadow-[0_28px_70px_rgba(20,57,73,0.18)] reveal-up"
        aria-labelledby="contact-title"
      >
        <span class="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/18" aria-hidden="true"></span>
        <span class="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px bg-white/10 min-[960px]:block" aria-hidden="true"></span>

        <div class="grid min-[960px]:grid-cols-[1.04fr_0.96fr]">
          <div class="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(186,161,71,0.18),transparent_38%),linear-gradient(160deg,#efe6ce_0%,#e8ddc1_52%,#ddd1af_100%)] px-[20px] py-[24px] md:px-[34px] md:py-[36px] min-[1200px]:px-[44px] min-[1200px]:py-[44px]">
            <span class="pointer-events-none absolute right-[-12%] top-[6%] h-[180px] w-[180px] rounded-full border border-gr-blue/10" aria-hidden="true"></span>
            <span class="pointer-events-none absolute bottom-[-8%] left-[-4%] h-[210px] w-[210px] rounded-full border border-gr-gold/14" aria-hidden="true"></span>

            <p class="font-space text-[0.8rem] font-semibold uppercase tracking-[0.22em] text-gr-blue/58">
              Contacto directo
            </p>
            <h1 id="contact-title" class="mt-[14px] font-space text-[2.2rem] font-[700] leading-[1.04] text-gr-blue md:text-[3.2rem]">
              Queremos escucharte
            </h1>
            <p class="mt-[16px] max-w-[34ch] text-[1rem] leading-[1.7] text-gr-blue/85 md:text-[1.08rem]">
              Si quieres informacion o estas interesado, rellena nuestro formulario y nos pondremos en contacto contigo lo antes posible.
            </p>

            <dl class="mt-[28px] grid gap-[18px] md:mt-[34px] md:gap-[20px]">
              <div class="border-t border-gr-blue/14 pt-[14px]">
                <dt class="text-[0.78rem] font-medium uppercase tracking-[0.18em] text-gr-blue/52">E-mail</dt>
                <dd class="mt-[8px]">
                  <a
                    href="mailto:info@generarecetas.com"
                    class="font-space text-[1.16rem] font-semibold tracking-[-0.01em] text-gr-blue transition-colors duration-200 hover:text-gr-gold"
                  >
                    info@generarecetas.com
                  </a>
                </dd>
              </div>

              <div class="border-t border-gr-blue/14 pt-[14px]">
                <dt class="text-[0.78rem] font-medium uppercase tracking-[0.18em] text-gr-blue/52">Telefono</dt>
                <dd class="mt-[8px]">
                  <a
                    href="tel:+34948482356"
                    class="font-space text-[1.16rem] font-semibold tracking-[-0.01em] text-gr-blue transition-colors duration-200 hover:text-gr-gold"
                  >
                    948 48 23 56
                  </a>
                </dd>
              </div>

              <div class="border-t border-gr-blue/14 pt-[14px]">
                <dt class="text-[0.78rem] font-medium uppercase tracking-[0.18em] text-gr-blue/52">Direccion</dt>
                <dd class="mt-[8px] max-w-[28ch] text-[1rem] leading-[1.6] text-gr-blue/84">
                  Pol. Mutilva E-11, Piso 2. Oficina 2B, 31192 (Navarra)
                </dd>
              </div>
            </dl>
          </div>

          <div class="relative overflow-hidden bg-[radial-gradient(circle_at_top_right,rgba(186,161,71,0.16),transparent_34%),linear-gradient(180deg,#ffffff_0%,#faf7ee_64%,#f2ecdd_100%)] px-[20px] py-[24px] text-gr-blue md:px-[34px] md:py-[36px] min-[1200px]:px-[44px] min-[1200px]:py-[44px]">
            <span class="pointer-events-none absolute right-[-6%] top-[-10%] h-[180px] w-[180px] rounded-full bg-gr-blue/6 blur-2xl" aria-hidden="true"></span>
            <span class="pointer-events-none absolute bottom-[-12%] left-[-8%] h-[220px] w-[220px] rounded-full bg-gr-gold/10 blur-3xl" aria-hidden="true"></span>

            <div>
              <p class="font-space text-[0.8rem] font-semibold uppercase tracking-[0.22em] text-gr-blue/46">
                Formulario
              </p>
              <h2 class="mt-[10px] font-space text-[1.8rem] font-[700] leading-[1.08] text-gr-blue md:text-[2.2rem]">
                Escribenos
              </h2>
            </div>

            <form ref="formRef" class="mt-[22px] space-y-[14px]" @submit.prevent="handleSubmit">
              <label class="block">
                <span class="text-[0.8rem] font-medium uppercase tracking-[0.14em] text-gr-blue/48">Nombre</span>
                <input
                  name="name"
                  type="text"
                  required
                  autocomplete="name"
                  class="mt-[8px] block w-full rounded-[18px] border border-gr-border/24 bg-white px-[16px] py-[14px] text-[1rem] text-gr-blue outline-none transition-[border-color,background-color,box-shadow] duration-200 placeholder:text-gr-blue/32 focus:border-gr-gold focus:bg-white focus:shadow-[0_0_0_4px_rgba(186,161,71,0.14)]"
                  placeholder="Tu nombre"
                />
              </label>

              <label class="block">
                <span class="text-[0.8rem] font-medium uppercase tracking-[0.14em] text-gr-blue/48">Email</span>
                <input
                  name="email"
                  type="email"
                  required
                  autocomplete="email"
                  class="mt-[8px] block w-full rounded-[18px] border border-gr-border/24 bg-white px-[16px] py-[14px] text-[1rem] text-gr-blue outline-none transition-[border-color,background-color,box-shadow] duration-200 placeholder:text-gr-blue/32 focus:border-gr-gold focus:bg-white focus:shadow-[0_0_0_4px_rgba(186,161,71,0.14)]"
                  placeholder="tu@email.com"
                />
              </label>

              <label class="block">
                <span class="text-[0.8rem] font-medium uppercase tracking-[0.14em] text-gr-blue/48">Mensaje</span>
                <textarea
                  name="message"
                  required
                  rows="5"
                  class="mt-[8px] block min-h-[156px] w-full resize-y rounded-[18px] border border-gr-border/24 bg-white px-[16px] py-[14px] text-[1rem] leading-[1.6] text-gr-blue outline-none transition-[border-color,background-color,box-shadow] duration-200 placeholder:text-gr-blue/32 focus:border-gr-gold focus:bg-white focus:shadow-[0_0_0_4px_rgba(186,161,71,0.14)]"
                  placeholder="Cuentanos en que podemos ayudarte"
                ></textarea>
              </label>

              <div class="flex items-start gap-[12px] rounded-[18px] border border-gr-border/16 bg-gr-blue/[0.03] px-[14px] py-[12px] text-[0.95rem] leading-[1.5] text-gr-blue/82">
                <input
                  id="accept-privacy"
                  v-model="acceptedPrivacy"
                  type="checkbox"
                  required
                  class="mt-[2px] h-[18px] w-[18px] shrink-0 rounded-[5px] border border-gr-border/24 bg-transparent accent-[#baa147]"
                />
                <label for="accept-privacy" class="cursor-pointer">
                  Acepto los terminos de la
                  <a
                    href="/politica-privacidad"
                    class="font-semibold text-gr-blue underline decoration-gr-gold/65 decoration-[1.5px] underline-offset-[3px] transition-colors duration-200 hover:text-gr-gold"
                    @click.stop
                  >
                    politica de privacidad
                  </a>.
                </label>
              </div>

              <div class="pt-[6px]">
                <button
                  type="submit"
                  :disabled="!acceptedPrivacy"
                  class="inline-flex min-h-[54px] w-full items-center justify-center rounded-full px-[18px] py-[14px] font-space text-[1rem] font-semibold tracking-[0.01em] text-white transition-[transform,box-shadow,background-color,filter,color] duration-200"
                  :class="
                    acceptedPrivacy
                      ? 'bg-gr-gold shadow-[0_14px_28px_rgba(186,161,71,0.26)] hover:-translate-y-[1px] hover:brightness-[1.03] active:translate-y-0'
                      : 'cursor-not-allowed bg-gr-blue/10 text-gr-blue/36 shadow-none'
                  "
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section
        class="mt-[18px] overflow-hidden rounded-[28px] border border-gr-border/18 bg-white shadow-[0_20px_44px_rgba(20,57,73,0.1)] reveal-up reveal-delay-1 md:mt-[22px]"
        aria-label="Mapa de ubicacion"
      >
        <iframe
          :src="mapEmbedSrc"
          title="Mapa de la ubicacion de NTec Web, S.L."
          class="block h-[320px] w-full md:h-[420px]"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          allowfullscreen
        ></iframe>
      </section>
    </div>
  </section>
</template>
