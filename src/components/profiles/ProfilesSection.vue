<script setup>
import { ref } from "vue";
import { profiles } from "../../data/profiles";

const RESPONSIVE_FALLBACK_IMAGE = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
const mobileActiveId = ref("");
const DESKTOP_ROW_SIZE = 4;

const preparedProfiles = profiles.map((profile) => ({
  ...profile,
  hasSubprofiles: profile.subprofiles.length > 0,
  href: profile.slug ? `/perfiles/${profile.slug}` : "#",
  mobilePanelId: `profile-mobile-panel-${profile.id}`
}));

const profileRows = (() => {
  const rows = [];

  for (let index = 0; index < preparedProfiles.length; index += DESKTOP_ROW_SIZE) {
    rows.push(preparedProfiles.slice(index, index + DESKTOP_ROW_SIZE));
  }

  return rows;
})();

const isMobileExpanded = (profileId) => mobileActiveId.value === profileId;
const toggleMobileProfile = (profile) => {
  if (!profile.hasSubprofiles) {
    return;
  }

  mobileActiveId.value = isMobileExpanded(profile.id) ? "" : profile.id;
};
</script>

<template>
  <section class="relative mt-0 w-full py-[26px] md:py-[34px] min-[1200px]:py-[44px]" aria-labelledby="profiles-title">
    <span class="pointer-events-none absolute left-1/2 bottom-0 h-px w-screen -translate-x-1/2 bg-gr-border/18" aria-hidden="true"></span>

    <div class="mx-auto w-full max-w-[1280px] px-[16px] md:px-[24px] min-[1200px]:px-[32px]">
      <h1 id="profiles-title" class="sr-only">Perfiles</h1>

      <div class="mx-auto max-w-[1160px]">
        <div class="grid gap-[12px] md:grid-cols-2 md:gap-[14px] min-[1200px]:hidden">
            <article
              v-for="profile in preparedProfiles"
              :key="profile.id"
            class="relative overflow-hidden rounded-[18px] border border-gr-border/36 bg-white/84 shadow-[0_10px_24px_rgba(47,86,104,0.08)] transition-[height,border-color,box-shadow] duration-350 ease-[cubic-bezier(0.22,1,0.36,1)]"
            :class="
              isMobileExpanded(profile.id)
                ? 'h-[372px] border-gr-gold/55 shadow-[0_16px_34px_rgba(47,86,104,0.14)]'
                : 'h-[248px]'
            "
          >
            <a
              v-if="!profile.hasSubprofiles"
              :href="profile.href"
              class="absolute inset-0 z-20 min-[1200px]:hidden"
              :aria-label="`Abrir informacion de ${profile.name}`"
            ></a>
            <button
              v-else
              type="button"
              class="absolute inset-0 z-20 cursor-pointer border-0 bg-transparent p-0"
              :aria-controls="profile.mobilePanelId"
              :aria-expanded="isMobileExpanded(profile.id)"
              :aria-label="
                isMobileExpanded(profile.id)
                  ? `Ocultar subperfiles de ${profile.name}`
                  : `Mostrar subperfiles de ${profile.name}`
              "
              @click="toggleMobileProfile(profile)"
            ></button>
            <picture class="block h-full w-full">
              <source media="(max-width: 1199px)" :srcset="profile.image" />
              <img
                :src="RESPONSIVE_FALLBACK_IMAGE"
                :alt="`Imagen de perfil ${profile.name}`"
                class="h-full w-full object-cover transition-transform duration-350 ease-[cubic-bezier(0.22,1,0.36,1)]"
                :class="isMobileExpanded(profile.id) ? 'scale-[1.02]' : ''"
                :loading="profile.id === preparedProfiles[0]?.id ? 'eager' : 'lazy'"
                :fetchpriority="profile.id === preparedProfiles[0]?.id ? 'high' : 'low'"
                decoding="async"
              />
            </picture>
            <span
              class="pointer-events-none absolute inset-0 bg-gradient-to-t transition-opacity duration-350"
              :class="isMobileExpanded(profile.id) ? 'from-black/88 via-black/52 to-black/20' : 'from-black/78 via-black/42 to-black/14'"
              aria-hidden="true"
            ></span>

            <div
              class="pointer-events-none absolute inset-0 z-40 flex items-center justify-center px-[18px] text-center transition-transform duration-350"
              :class="isMobileExpanded(profile.id) ? '-translate-y-[48px]' : 'translate-y-0'"
            >
              <h2 class="max-w-[13ch] font-space text-[1.42rem] font-[700] leading-[1.04] text-white md:text-[1.48rem]">
                {{ profile.name }}
              </h2>
            </div>

            <div
              v-if="profile.hasSubprofiles"
              :id="profile.mobilePanelId"
              class="absolute inset-x-0 bottom-0 z-30 px-[18px] pb-[18px] pt-[78px] bg-gradient-to-t from-black/90 via-black/72 to-transparent transition-[opacity,transform] duration-350 ease-[cubic-bezier(0.22,1,0.36,1)]"
              :class="
                isMobileExpanded(profile.id)
                  ? 'pointer-events-auto translate-y-0 opacity-100'
                  : 'pointer-events-none translate-y-[112%] opacity-0'
              "
              role="region"
              :aria-hidden="!isMobileExpanded(profile.id)"
              :aria-label="`Subperfiles de ${profile.name}`"
            >
              <span class="absolute bottom-[18px] left-[18px] top-[78px] w-px bg-white/16" aria-hidden="true"></span>
              <ul class="relative grid gap-[9px] pl-[16px]">
                <li
                  v-for="(subprofile, index) in profile.subprofiles"
                  :key="`${profile.id}-${subprofile.slug}`"
                  class="flex items-center gap-[14px] border-b border-white/12 py-[11px] last:border-b-0"
                >
                  <span class="shrink-0 font-space text-[0.8rem] font-[700] uppercase tracking-[0.18em] text-gr-gold">
                    {{ (index + 1).toString().padStart(2, "0") }}
                  </span>
                  <a
                    :href="`/perfiles/${subprofile.slug}`"
                    class="relative z-20 font-space text-[1.06rem] font-[500] leading-[1.24] text-white/92 transition-colors duration-200 hover:text-gr-gold focus-visible:text-gr-gold"
                    @click.stop
                  >
                    {{ subprofile.name }}
                  </a>
                </li>
              </ul>
            </div>
          </article>
        </div>

        <div class="hidden space-y-[14px] min-[1200px]:block">
          <div
            v-for="(row, rowIndex) in profileRows"
            :key="`profiles-row-${rowIndex}`"
            v-once
            class="group/row flex h-[324px] gap-[14px]"
          >
            <article
              v-for="(profile, profileIndex) in row"
              :key="profile.id"
              class="group/card relative min-w-0 basis-0 grow overflow-hidden rounded-[22px] border border-gr-border/34 bg-white/84 shadow-[0_12px_26px_rgba(47,86,104,0.09)] transition-[flex-grow,border-color,box-shadow,transform] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/row:grow-[0.9] hover:grow-[2.2] hover:border-gr-gold/55 hover:shadow-[0_18px_38px_rgba(47,86,104,0.15)] focus-within:grow-[2.2] focus-within:border-gr-gold/55 focus-within:shadow-[0_18px_38px_rgba(47,86,104,0.15)]"
            >
              <picture class="block h-full w-full">
                <source media="(min-width: 1200px)" :srcset="profile.image" />
                <img
                  :src="RESPONSIVE_FALLBACK_IMAGE"
                  :alt="`Imagen de perfil ${profile.name}`"
                  class="h-full w-full object-cover transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:scale-[1.04] group-focus-within/card:scale-[1.04]"
                  :loading="rowIndex === 0 ? 'eager' : 'lazy'"
                  :fetchpriority="rowIndex === 0 && profileIndex === 0 ? 'high' : 'low'"
                  decoding="async"
                />
              </picture>
              <span
                class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/78 via-black/38 to-black/10 transition-opacity duration-350 group-hover/card:from-black/88 group-hover/card:via-black/48 group-hover/card:to-black/14 group-focus-within/card:from-black/88 group-focus-within/card:via-black/48 group-focus-within/card:to-black/14"
                aria-hidden="true"
              ></span>

              <div
                class="pointer-events-none absolute inset-y-0 left-0 right-0 z-10 flex translate-x-0 items-center justify-center px-[18px] text-center opacity-100 transition-[right,opacity,transform] duration-350 group-hover/card:right-[50%] group-hover/card:-translate-x-[4px] group-focus-within/card:right-[50%] group-focus-within/card:-translate-x-[4px]"
              >
                <h2 class="max-w-[14ch] [overflow-wrap:anywhere] font-space text-[1.5rem] font-[700] leading-[1.02] text-center text-white">
                  {{ profile.name }}
                </h2>
              </div>

              <div
                v-if="!profile.hasSubprofiles"
                class="pointer-events-none absolute inset-y-0 right-0 z-10 flex w-[50%] min-w-[240px] max-w-[328px] translate-x-[26px] items-center justify-center bg-gradient-to-l from-black/88 via-black/70 to-transparent px-[24px] opacity-0 transition-[opacity,transform] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:pointer-events-auto group-hover/card:translate-x-0 group-hover/card:opacity-100 group-focus-within/card:pointer-events-auto group-focus-within/card:translate-x-0 group-focus-within/card:opacity-100"
              >
                <a
                  :href="profile.href"
                  :aria-label="`Abrir informacion de ${profile.name}`"
                  class="group/cta relative z-20 inline-flex items-center gap-[10px] rounded-full border border-gr-gold bg-gr-gold px-[22px] py-[13px] font-space text-[1.04rem] font-[600] leading-none text-white transition-[background-color,border-color,box-shadow,transform] duration-200 hover:-translate-y-[1px] hover:border-gr-gold/90 hover:bg-[rgb(186_161_71_/_0.9)] hover:shadow-[0_10px_22px_rgba(186,161,71,0.22)] focus-visible:-translate-y-[1px] focus-visible:border-gr-gold/90 focus-visible:bg-[rgb(186_161_71_/_0.9)] focus-visible:shadow-[0_10px_22px_rgba(186,161,71,0.22)]"
                >
                  <span>M&aacute;s</span>
                  <span aria-hidden="true" class="text-[1.08rem] leading-none transition-transform duration-200 group-hover/cta:translate-x-[2px] group-focus-visible/cta:translate-x-[2px]">&rarr;</span>
                </a>
              </div>

              <div
                v-if="profile.hasSubprofiles"
                class="pointer-events-none absolute inset-y-0 right-0 z-10 w-[50%] min-w-[240px] max-w-[328px] translate-x-[26px] bg-gradient-to-l from-black/88 via-black/70 to-transparent px-[22px] pb-[22px] pt-[88px] opacity-0 transition-[opacity,transform] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:pointer-events-auto group-hover/card:translate-x-0 group-hover/card:opacity-100 group-focus-within/card:pointer-events-auto group-focus-within/card:translate-x-0 group-focus-within/card:opacity-100"
              >
                <span class="absolute bottom-[22px] left-[22px] top-[88px] w-px bg-white/18" aria-hidden="true"></span>
                <ul class="relative ml-auto grid max-w-[266px] gap-[9px] pl-[18px]">
                  <li
                    v-for="(subprofile, index) in profile.subprofiles"
                    :key="`${profile.id}-${subprofile.slug}`"
                    class="flex items-center gap-[14px] border-b border-white/12 py-[12px] last:border-b-0"
                  >
                    <span class="shrink-0 font-space text-[0.86rem] font-[700] uppercase tracking-[0.2em] text-gr-gold">
                      {{ (index + 1).toString().padStart(2, "0") }}
                    </span>
                    <a
                      :href="`/perfiles/${subprofile.slug}`"
                      class="relative z-20 font-space text-[1.14rem] font-[500] leading-[1.18] text-white/92 transition-colors duration-200 hover:text-gr-gold focus-visible:text-gr-gold"
                      @click.stop
                    >
                      {{ subprofile.name }}
                    </a>
                  </li>
                </ul>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

