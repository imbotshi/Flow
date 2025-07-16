<template>
  <div class="v-card" :class="cardClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  variant?: "default" | "flat" | "elevated" | "outlined";
  padding?: "none" | "small" | "medium" | "large";
  rounded?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
  padding: "medium",
  rounded: true,
});

const cardClasses = computed(() => [
  `v-card--${props.variant}`,
  `v-card--padding-${props.padding}`,
  {
    "v-card--rounded": props.rounded,
  },
]);
</script>

<style scoped>
.v-card {
  background: #fff;
  border-radius: 18px;
  overflow: hidden;
}

.v-card--default {
  border: 1px solid rgba(21, 61, 28, 0.14);
}

.v-card--flat {
  box-shadow: none;
}

.v-card--elevated {
  box-shadow: 0px 2px 8px rgba(21, 61, 28, 0.1);
}

.v-card--outlined {
  border: 1px solid rgba(21, 61, 28, 0.24);
}

.v-card--padding-none {
  padding: 0;
}

.v-card--padding-small {
  padding: 12px;
}

.v-card--padding-medium {
  padding: 18px;
}

.v-card--padding-large {
  padding: 24px;
}

.v-card--rounded {
  border-radius: 18px;
}
</style>
