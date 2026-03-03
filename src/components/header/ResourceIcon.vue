<script setup>
defineProps({
  name: {
    type: String,
    required: true
  },
  iconClass: {
    type: String,
    default: ""
  }
});
</script>

<template>
  <svg
    v-if="name === 'gestion'"
    viewBox="0 0 24 24"
    class="fill-none stroke-current stroke-[1.8]"
    :class="iconClass ?? 'h-[18px] w-[18px]'"
    aria-hidden="true"
  >
    <path d="M4 18h16"></path>
    <path d="M7 14V9"></path>
    <path d="M12 14V6"></path>
    <path d="M17 14v-3"></path>
  </svg>

  <svg
    v-else-if="name === 'noticias'"
    viewBox="0 0 24 24"
    class="fill-none stroke-current stroke-[1.8]"
    :class="iconClass ?? 'h-[18px] w-[18px]'"
    aria-hidden="true"
  >
    <rect x="4" y="5" width="16" height="14" rx="2"></rect>
    <path d="M8 9h8"></path>
    <path d="M8 13h5"></path>
  </svg>

  <svg
    v-else
    viewBox="0 0 24 24"
    class="fill-none stroke-current stroke-[1.8]"
    :class="iconClass ?? 'h-[18px] w-[18px]'"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="8"></circle>
    <path d="M12 8v5"></path>
    <circle cx="12" cy="16.5" r="0.6" fill="currentColor" stroke="none"></circle>
  </svg>
</template>
