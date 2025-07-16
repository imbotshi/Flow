<template>
  <div class="v-icon" :class="iconClasses">
    <component v-if="name" :is="iconComponent" />
    <slot v-else />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  name?: string;
  size?: "small" | "medium" | "large";
  color?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: "medium",
});

const iconClasses = computed(() => [
  `v-icon--${props.size}`,
  {
    [`v-icon--${props.color}`]: props.color,
  },
]);

const iconComponent = computed(() => {
  if (!props.name) return null;
  // Dynamic import would go here based on icon name
  return null;
});
</script>

<style scoped>
.v-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: currentColor;
}

.v-icon--small {
  width: 16px;
  height: 16px;
}

.v-icon--medium {
  width: 24px;
  height: 24px;
}

.v-icon--large {
  width: 32px;
  height: 32px;
}

.v-icon svg {
  width: 100%;
  height: 100%;
  fill: currentColor;
}
</style>
