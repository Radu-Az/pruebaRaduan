<script setup>
import {
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectPortal,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectViewport
} from "reka-ui";
import { computed, ref, watch } from "vue";

const props = defineProps({
  options: {
    type: Array,
    required: true
  },
  modelValue: {
    type: String,
    default: undefined
  },
  defaultValue: {
    type: String,
    default: undefined
  },
  variant: {
    type: String,
    default: "desktop"
  }
});

const emit = defineEmits(["update:modelValue"]);

const currentValue = ref(props.modelValue ?? props.defaultValue ?? props.options[0]?.code ?? "");

watch(
  () => props.modelValue,
  (value) => {
    if (typeof value === "string" && value !== currentValue.value) {
      currentValue.value = value;
    }
  }
);

watch(currentValue, (value) => {
  emit("update:modelValue", value);
});

const triggerClass = computed(() =>
  props.variant === "mobile"
    ? "inline-flex h-[46px] w-[120px] cursor-pointer items-center justify-center gap-[6px] rounded-[8px] border border-gr-border bg-white/72 px-[12px] py-[7px] text-[1rem] font-medium leading-none text-gr-blue uppercase shadow-[0_8px_16px_rgba(47,86,104,0.08)] outline-none transition-[border-color,background-color,box-shadow] duration-200 hover:border-gr-gold focus-visible:border-gr-gold focus-visible:bg-white md:h-[48px] md:w-[128px]"
    : "inline-flex min-h-[38px] cursor-pointer items-center justify-center gap-[6px] rounded-[8px] border border-gr-border bg-white/68 px-[12px] py-[7px] text-[0.99rem] font-medium leading-none text-gr-blue uppercase shadow-[0_8px_16px_rgba(47,86,104,0.06)] outline-none transition-[border-color,background-color,box-shadow] duration-200 hover:border-gr-gold hover:bg-white focus-visible:border-gr-gold focus-visible:bg-white"
);

const contentClass = computed(() =>
  props.variant === "mobile"
    ? "z-[420] min-w-[120px] rounded-[10px] border border-gr-border bg-white/98 p-[4px] shadow-[0_14px_28px_rgba(47,86,104,0.16)]"
    : "z-[420] min-w-[86px] rounded-[10px] border border-gr-border bg-white/98 p-[4px] shadow-[0_14px_28px_rgba(47,86,104,0.16)]"
);

const itemClass = computed(() =>
  props.variant === "mobile"
    ? "cursor-pointer rounded-[7px] px-[10px] py-[9px] text-center text-[1rem] font-medium leading-none text-gr-blue uppercase outline-none transition-[background-color,color] duration-200 data-[highlighted]:bg-gr-blue/8 data-[highlighted]:text-gr-blue data-[state=checked]:bg-gr-gold/12 data-[state=checked]:text-gr-gold md:text-[1.04rem]"
    : "cursor-pointer rounded-[7px] px-[10px] py-[8px] text-center text-[0.9rem] font-medium leading-none text-gr-blue uppercase outline-none transition-[background-color,color] duration-200 data-[highlighted]:bg-gr-blue/8 data-[highlighted]:text-gr-blue data-[state=checked]:bg-gr-gold/12 data-[state=checked]:text-gr-gold"
);
</script>

<template>
  <SelectRoot v-model="currentValue">
    <SelectTrigger aria-label="Selector de idioma" :class="triggerClass">
      <svg
        class="h-[17px] w-[17px] fill-none stroke-current stroke-[1.8] md:h-[18px] md:w-[18px]"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9"></circle>
        <path d="M3 12h18"></path>
        <path d="M12 3c2.4 2.3 3.75 5.45 3.75 9S14.4 18.7 12 21"></path>
        <path d="M12 3C9.6 5.3 8.25 8.45 8.25 12S9.6 18.7 12 21"></path>
      </svg>
      <SelectValue class="min-w-[18px] text-center uppercase" />
      <span
        class="h-0 w-0 border-x-[4px] border-x-transparent border-t-[5px] border-t-gr-blue"
        aria-hidden="true"
      ></span>
    </SelectTrigger>

    <SelectPortal>
      <SelectContent position="popper" :side-offset="6" :class="contentClass">
        <SelectViewport>
          <SelectItem v-for="option in options" :key="option.code" :value="option.code" :class="itemClass">
            <SelectItemText>{{ option.code.toUpperCase() }}</SelectItemText>
          </SelectItem>
        </SelectViewport>
      </SelectContent>
    </SelectPortal>
  </SelectRoot>
</template>
