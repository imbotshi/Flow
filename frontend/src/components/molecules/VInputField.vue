<template>
  <div class="v-input-field">
    <div class="v-input-field__header">
      <div class="v-input-field__label">
        <component v-if="icon" :is="icon" class="v-input-field__icon" />
        <span>{{ label }}</span>
      </div>
      <span class="v-input-field__value">{{ displayValue }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  label: string;
  modelValue: string;
  icon?: any;
  placeholder?: string;
  type?: string;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: "Vide",
  type: "text",
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const displayValue = computed(() => {
  return props.modelValue || props.placeholder;
});
</script>

<style scoped>
.v-input-field {
  width: 100%;
}

.v-input-field__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.v-input-field__label {
  display: flex;
  align-items: center;
  gap: 10px;
}

.v-input-field__icon {
  width: 22px;
  height: 22px;
  color: #153d1c;
}

.v-input-field__label span {
  color: #153d1c;
  font-family:
    Figtree,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 142%;
  letter-spacing: -0.16px;
}

.v-input-field__value {
  color: rgba(21, 61, 28, 0.54);
  font-family:
    Figtree,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 142%;
  letter-spacing: -0.16px;
}
</style>
