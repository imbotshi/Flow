<template>
  <div class="v-tag" :class="tagClasses">
    <span class="v-tag__dot" v-if="showDot"></span>
    <slot />
    <button
      v-if="closable"
      class="v-tag__close"
      @click="handleClose"
      type="button"
    >
      ×
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  variant?: "success" | "warning" | "error" | "info" | "default";
  size?: "small" | "medium";
  closable?: boolean;
  showDot?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
  size: "medium",
  closable: false,
  showDot: false,
});

const emit = defineEmits<{
  close: [];
}>();

const tagClasses = computed(() => [
  `v-tag--${props.variant}`,
  `v-tag--${props.size}`,
]);

const handleClose = () => {
  emit("close");
};
</script>

<style scoped>
.v-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  border-radius: 48px;
  font-family:
    Figtree,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 160%;
  letter-spacing: -0.14px;
}

.v-tag--small {
  padding: 4px 8px;
  font-size: 12px;
}

.v-tag--success {
  background: #31920b;
  color: #fff9ce;
}

.v-tag--warning {
  background: #f59100;
  color: #fff;
}

.v-tag--error {
  background: #eb002d;
  color: #fff;
}

.v-tag--info {
  background: rgba(21, 61, 28, 0.1);
  color: #153d1c;
}

.v-tag--default {
  background: #fff;
  color: #153d1c;
  border: 1px solid rgba(21, 61, 28, 0.24);
}

.v-tag__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
  flex-shrink: 0;
}

.v-tag__close {
  background: none;
  border: none;
  color: currentColor;
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
  padding: 0;
  margin-left: 4px;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.v-tag__close:hover {
  opacity: 0.8;
}
</style>
