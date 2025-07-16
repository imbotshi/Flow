<template>
  <div class="input-wrapper" data-bind="input-wrapper">
    <div
      class="input-container"
      :class="inputClasses"
      data-bind="input-container"
    >
      <div v-if="icon" class="input-icon" data-bind="input-icon">
        <component :is="icon" />
      </div>
      <input
        v-model="inputValue"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :autocomplete="autocomplete"
        :inputmode="inputmode"
        :aria-label="ariaLabel"
        class="input-field"
        data-bind="input-field"
        @focus="handleFocus"
        @blur="handleBlur"
        @input="handleInput"
      />
      <div v-if="$slots.action" class="input-action" data-bind="input-action">
        <slot name="action" />
      </div>
    </div>
    <div
      v-if="dividedInput"
      class="input-divider"
      data-bind="input-divider"
    ></div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: Object,
    default: null,
  },
  dividedInput: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String,
    default: "default",
    validator: (value) => ["default", "country", "user-info"].includes(value),
  },
  autocomplete: {
    type: String,
    default: "",
  },
  inputmode: {
    type: String,
    default: "",
  },
  ariaLabel: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue", "focus", "blur", "input"]);

const inputValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const inputClasses = computed(() => [
  "input-container--base",
  `input-container--${props.variant}`,
  {
    "input-container--disabled": props.disabled,
    "input-container--with-icon": props.icon,
    "input-container--divided": props.dividedInput,
  },
]);

// === EVENT HANDLERS ===
const handleFocus = (event) => {
  emit("focus", event);
};

const handleBlur = (event) => {
  emit("blur", event);
};

const handleInput = (event) => {
  emit("input", event.target.value);
};
</script>

<style scoped>
/* === INPUT WRAPPER - FIGMA CONTAINER === */
.input-wrapper {
  position: relative;
  width: 100%;
}

/* === INPUT CONTAINER BASE - EXACT FIGMA MEASUREMENTS === */
.input-container--base {
  display: flex;
  align-items: center;
  gap: 11.847px;
  border-radius: 21.325px;
  background: var(--white, #ffffff);
  border: 1.01px solid rgba(21, 61, 28, 0.24);
  padding: 26.064px 18.956px;
  transition: all var(--transition-normal);
  width: 100%;
  max-width: 383.852px;
  min-height: 82.586px;
  box-sizing: border-box;
}

.input-container--base:focus-within {
  border-color: rgba(21, 61, 28, 0.64);
  box-shadow: 0 0 0 3px rgba(21, 61, 28, 0.1);
}

.input-container--base:hover:not(.input-container--disabled) {
  border-color: rgba(21, 61, 28, 0.4);
}

/* === VARIANT STYLES - FIGMA EXACT SPECS === */
.input-container--country {
  border-radius: 21px 21px 0 0;
  background: rgba(255, 255, 255, 0.64);
  backdrop-filter: blur(10px);
}

.input-container--user-info {
  background: rgba(255, 255, 255, 0.64);
  border-radius: 21.15px;
  backdrop-filter: blur(10px);
}

/* === DISABLED STATE === */
.input-container--disabled {
  opacity: 0.5;
  pointer-events: none;
  cursor: not-allowed;
}

/* === ICON CONTAINER - EXACT FIGMA SIZE === */
.input-icon {
  width: 28.433px;
  height: 28.433px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-green, #153d1c);
}

/* === INPUT FIELD - FIGMA TYPOGRAPHY === */
.input-field {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-family: var(
    --font-primary,
    "Figtree",
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif
  );
  font-size: 18px;
  font-weight: 400;
  line-height: 1.42;
  letter-spacing: -0.18px;
  color: var(--primary-green, #153d1c);
  min-width: 0;
}

.input-field::placeholder {
  color: rgba(21, 61, 28, 0.64);
  font-weight: 400;
}

.input-field:focus {
  outline: none;
}

/* === INPUT ACTION CONTAINER === */
.input-action {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* === DIVIDED INPUT STYLING === */
.input-container--divided {
  border-radius: 21px 21px 0 0;
  position: relative;
}

.input-divider {
  width: 100%;
  height: 1px;
  background: rgba(21, 61, 28, 0.24);
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1;
}

/* === RESPONSIVE DESIGN - FIGMA BREAKPOINTS === */
@media (max-width: 360px) {
  .input-container--base {
    padding: 22px 16px;
    gap: 10px;
    min-height: 76px;
  }

  .input-field {
    font-size: 16px;
    letter-spacing: -0.16px;
  }

  .input-icon {
    width: 24px;
    height: 24px;
  }
}

@media (min-width: 768px) {
  .input-container--base {
    max-width: 400px;
  }
}

/* === ACCESSIBILITY IMPROVEMENTS === */
@media (prefers-reduced-motion: reduce) {
  .input-container--base {
    transition: none;
  }
}

/* === HIGH CONTRAST MODE === */
@media (prefers-contrast: high) {
  .input-container--base {
    border-width: 2px;
  }

  .input-container--base:focus-within {
    border-color: var(--primary-green);
    box-shadow: 0 0 0 3px rgba(21, 61, 28, 0.3);
  }
}

/* === DARK MODE SUPPORT === */
@media (prefers-color-scheme: dark) {
  .input-container--country,
  .input-container--user-info {
    background: rgba(255, 255, 255, 0.9);
  }
}

/* === VALIDATION STATES - READY FOR DYNAMIC BINDING === */
.input-container--base[data-error="true"] {
  border-color: var(--error-color, #eb002d);
  box-shadow: 0 0 0 3px rgba(235, 0, 45, 0.1);
}

.input-container--base[data-success="true"] {
  border-color: var(--success-color, #31920b);
  box-shadow: 0 0 0 3px rgba(49, 146, 11, 0.1);
}

/* === LOADING STATE === */
.input-container--base[data-loading="true"] {
  position: relative;
  overflow: hidden;
}

.input-container--base[data-loading="true"]::after {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(21, 61, 28, 0.1),
    transparent
  );
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}
</style>
