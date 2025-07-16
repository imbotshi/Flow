<template>
  <div class="v-select-field">
    <div class="v-select-field__header">
      <div class="v-select-field__label">
        <component v-if="icon" :is="icon" class="v-select-field__icon" />
        <span>{{ label }}</span>
      </div>
      <div class="v-select-field__selected">
        <VBadge variant="default" v-if="selectedOption">
          <span class="v-select-field__dot"></span>
          {{ selectedOption }}
        </VBadge>
        <span v-else class="v-select-field__placeholder">{{
          placeholder
        }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import VBadge from "../atoms/VBadge.vue";

interface Option {
  value: string;
  label: string;
}

interface Props {
  label: string;
  modelValue: string;
  options: Option[];
  icon?: any;
  placeholder?: string;
  selectedOption?: string;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: "Sélectionner...",
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();
</script>

<style scoped>
.v-select-field {
  width: 100%;
}

.v-select-field__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 16px;
  width: 100%;
}

.v-select-field__label {
  display: flex;
  align-items: center;
  gap: 10px;
}

.v-select-field__icon {
  width: 22px;
  height: 22px;
  color: #153d1c;
}

.v-select-field__label span {
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

.v-select-field__selected {
  display: flex;
  padding: 8px;
  align-items: center;
  gap: 4px;
  border-radius: 16px;
  background: #fff;
}

.v-select-field__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #e1f524;
  flex-shrink: 0;
}

.v-select-field__placeholder {
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
