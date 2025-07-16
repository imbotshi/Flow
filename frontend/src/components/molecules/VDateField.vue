<template>
  <div class="v-date-field">
    <div class="v-date-field__header">
      <div class="v-date-field__label">
        <component v-if="icon" :is="icon" class="v-date-field__icon" />
        <span>{{ label }}</span>
      </div>
      <div class="v-date-field__selected">
        <VBadge variant="default" v-if="selectedDate">
          {{ selectedDate }}
        </VBadge>
        <span v-else class="v-date-field__placeholder">{{ placeholder }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import VBadge from "../atoms/VBadge.vue";

interface Props {
  label: string;
  modelValue: string;
  icon?: any;
  placeholder?: string;
  selectedDate?: string;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: "Sélectionner...",
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();
</script>

<style scoped>
.v-date-field {
  width: 100%;
}

.v-date-field__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 16px;
  width: 100%;
}

.v-date-field__label {
  display: flex;
  align-items: center;
  gap: 10px;
}

.v-date-field__icon {
  width: 22px;
  height: 22px;
  color: #153d1c;
}

.v-date-field__label span {
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

.v-date-field__selected {
  display: flex;
  padding: 8px;
  align-items: center;
  gap: 4px;
  border-radius: 16px;
  background: #fff;
}

.v-date-field__placeholder {
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
