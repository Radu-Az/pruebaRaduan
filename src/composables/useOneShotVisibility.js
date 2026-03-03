import { useElementVisibility } from "@vueuse/core";
import { computed, ref, watch } from "vue";

export function useOneShotVisibility(target, options) {
  const lockedVisible = ref(false);
  const isVisible = useElementVisibility(target, {
    threshold: options?.threshold,
    rootMargin: options?.rootMargin
  });

  watch(
    isVisible,
    (visible) => {
      if (visible) {
        lockedVisible.value = true;
      }
    },
    { immediate: true }
  );

  return computed(() => lockedVisible.value);
}
