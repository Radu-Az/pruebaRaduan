<script setup>
defineProps({
  name: {
    type: String,
    required: true
  },
  iconClass: {
    type: String,
    default: "h-[36px] w-[36px]"
  }
});
</script>

<template>
  <svg viewBox="0 0 24 24" class="fill-none stroke-current" :class="iconClass" aria-hidden="true">
    <template v-if="name === 'ereceta'">
      <rect x="4" y="5" width="16" height="15" rx="2.5" stroke-width="1.8"></rect>
      <path d="M8 2.8v3" stroke-width="1.8" stroke-linecap="round"></path>
      <path d="M16 2.8v3" stroke-width="1.8" stroke-linecap="round"></path>
      <path d="M8 11h8" stroke-width="1.8" stroke-linecap="round"></path>
      <path d="M8 14.5h5" stroke-width="1.8" stroke-linecap="round"></path>
    </template>

    <template v-else-if="name === 'comunicacion'">
      <path d="M5 7h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-7l-4 3v-3H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z" stroke-width="1.8"></path>
      <path d="M8.5 12h7" stroke-width="1.8" stroke-linecap="round"></path>
    </template>

    <template v-else-if="name === 'libro'">
      <path d="M6.5 4.5h10a2 2 0 0 1 2 2v12.5h-10a2 2 0 0 0-2 2V6.5a2 2 0 0 1 2-2Z" stroke-width="1.8"></path>
      <path d="M8 9h7" stroke-width="1.8" stroke-linecap="round"></path>
      <path d="M8 12h7" stroke-width="1.8" stroke-linecap="round"></path>
      <path d="M8 15h5" stroke-width="1.8" stroke-linecap="round"></path>
    </template>

    <template v-else-if="name === 'vademecum'">
      <rect x="4.5" y="4.5" width="15" height="15" rx="3" stroke-width="1.8"></rect>
      <path d="M12 8v8" stroke-width="1.8" stroke-linecap="round"></path>
      <path d="M8 12h8" stroke-width="1.8" stroke-linecap="round"></path>
    </template>

    <template v-else-if="name === 'botiquin'">
      <rect x="4" y="7" width="16" height="12" rx="2.5" stroke-width="1.8"></rect>
      <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7" stroke-width="1.8"></path>
      <path d="M12 10v6" stroke-width="1.8" stroke-linecap="round"></path>
      <path d="M9 13h6" stroke-width="1.8" stroke-linecap="round"></path>
    </template>

    <template v-else-if="name === 'visitas'">
      <circle cx="9" cy="8" r="2.5" stroke-width="1.8"></circle>
      <path d="M4.8 18c.6-2.4 2.4-3.7 4.2-3.7S12.6 15.6 13.2 18" stroke-width="1.8"></path>
      <path d="M14.5 8h4.5" stroke-width="1.8" stroke-linecap="round"></path>
      <path d="M14.5 12h4.5" stroke-width="1.8" stroke-linecap="round"></path>
      <path d="M14.5 16h3.2" stroke-width="1.8" stroke-linecap="round"></path>
    </template>

    <template v-else-if="name === 'almacenaje'">
      <path d="M4.5 8.5 12 4l7.5 4.5v7L12 20l-7.5-4.5v-7Z" stroke-width="1.8"></path>
      <path d="M4.5 8.5 12 13l7.5-4.5" stroke-width="1.8"></path>
    </template>

    <template v-else-if="name === 'ayuda'">
      <circle cx="12" cy="12" r="8" stroke-width="1.8"></circle>
      <path d="M9.8 9.6c0-1.3.9-2.3 2.3-2.3 1.3 0 2.2.8 2.2 2.1 0 1.2-.7 1.8-1.6 2.4-.8.5-1.2 1-1.2 2" stroke-width="1.8" stroke-linecap="round"></path>
      <circle cx="12" cy="17.1" r="0.7" fill="currentColor" stroke="none"></circle>
    </template>

    <template v-else>
      <circle cx="12" cy="12" r="8" stroke-width="1.8"></circle>
    </template>
  </svg>
</template>
