<template>
  <button :class="optionClasses" @click="$emit('select')" :disabled="disabled">
    <slot />
  </button>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  selected: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String,
    default: "default",
    validator: (value) => ["default", "green"].includes(value),
  },
});

defineEmits(["select"]);

const optionClasses = computed(() => [
  "v-option",
  `v-option--${props.variant}`,
  {
    "v-option--selected": props.selected,
    "v-option--disabled": props.disabled,
  },
]);
</script>

<style scoped>
.v-option {
  display: flex;
  width: 100%;
  padding: 26px 19px;
  justify-content: center;
  align-items: center;
  gap: 12px;
  border-radius: 21px;
  border: 1px solid rgba(21, 61, 28, 0.64);
  background: rgba(255, 255, 255, 0.64);
  color: rgba(21, 61, 28, 0.64);
  font-family:
    Figtree,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-size: 18px;
  font-weight: 400;
  line-height: 142%;
  letter-spacing: -0.18px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.v-option:hover {
  background: rgba(255, 255, 255, 0.8);
  border-color: rgba(21, 61, 28, 0.8);
}

.v-option--selected,
.v-option--selected:focus,
.v-option--selected:active,
.v-option--selected:hover {
  background: #43c300 !important;
  color: #fff !important;
  font-weight: 500;
  border-color: #43c300 !important;
  opacity: 1 !important;
  pointer-events: auto !important;
  cursor: pointer !important;
}

.v-option--green.v-option--selected {
  background: #43c300;
}

.v-option--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.v-option--disabled:hover {
  background: rgba(255, 255, 255, 0.64);
  border-color: rgba(21, 61, 28, 0.64);
}
</style>
