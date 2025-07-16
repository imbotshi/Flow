<template>
  <span class="v-badge" :class="badgeClasses">
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  variant?: "success" | "warning" | "error" | "info" | "default";
  size?: "small" | "medium" | "large";
  rounded?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
  size: "medium",
  rounded: true,
});

const badgeClasses = computed(() => [
  `v-badge--${props.variant}`,
  `v-badge--${props.size}`,
  {
    "v-badge--rounded": props.rounded,
  },
]);
</script>

<style scoped>
.v-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family:
    Figtree,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-weight: 600;
  text-transform: capitalize;
  white-space: nowrap;
}

.v-badge--small {
  padding: 4px 8px;
  font-size: 12px;
  line-height: 124%;
  letter-spacing: -0.12px;
}

.v-badge--medium {
  padding: 8px 12px;
  font-size: 14px;
  line-height: 124%;
  letter-spacing: -0.14px;
}

.v-badge--large {
  padding: 12px 16px;
  font-size: 16px;
  line-height: 124%;
  letter-spacing: -0.16px;
}

.v-badge--rounded {
  border-radius: 16px;
}

.v-badge--success {
  background: #31920b;
  color: #fff;
}

.v-badge--warning {
  background: #f59100;
  color: #fff;
}

.v-badge--error {
  background: #eb002d;
  color: #fff;
}

.v-badge--info {
  background: rgba(21, 61, 28, 0.1);
  color: #153d1c;
}

.v-badge--default {
  background: #fff;
  color: #153d1c;
  border: 1px solid rgba(21, 61, 28, 0.24);
}
</style>
