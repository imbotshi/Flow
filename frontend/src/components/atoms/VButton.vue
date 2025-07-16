<template>
  <button
    :type="type"
    :class="buttonClasses"
    :disabled="disabled"
    :aria-label="ariaLabel"
    data-bind="button"
    @click="handleClick"
  >
    <span v-if="$slots.icon" class="button-icon" data-bind="button-icon">
      <slot name="icon" />
    </span>
    <span class="button-text" data-bind="button-text">
      <slot />
    </span>
  </button>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  variant: {
    type: String,
    default: "primary",
    validator: (value) =>
      ["primary", "secondary", "accent", "ghost", "outline"].includes(value),
  },
  size: {
    type: String,
    default: "medium",
    validator: (value) => ["small", "medium", "large", "xl"].includes(value),
  },
  type: {
    type: String,
    default: "button",
    validator: (value) => ["button", "submit", "reset"].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  ariaLabel: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["click"]);

const buttonClasses = computed(() => [
  "button-base",
  `button--${props.variant}`,
  `button--${props.size}`,
  {
    "button--disabled": props.disabled,
    "button--full-width": props.fullWidth,
    "button--loading": props.loading,
  },
]);

const handleClick = (event) => {
  if (!props.disabled && !props.loading) {
    emit("click", event);
  }
};
</script>

<style scoped>
/* === BUTTON BASE - FIGMA FOUNDATION === */
.button-base {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 11.847px;
  border: none;
  border-radius: 21.325px;
  font-family: var(
    --font-primary,
    "Figtree",
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif
  );
  font-weight: 400;
  cursor: pointer;
  transition: all var(--transition-normal);
  text-decoration: none;
  user-select: none;
  overflow: hidden;
  box-sizing: border-box;
  white-space: nowrap;
}

.button-base:focus-visible {
  outline: 2px solid var(--accent-green, #059c1f);
  outline-offset: 2px;
}

/* === PRIMARY VARIANT - FIGMA EXACT COLORS === */
.button--primary {
  background: var(--primary-green, #153d1c);
  color: var(--light-gray, #f5f5f5);
  border: 1px solid transparent;
}

.button--primary:hover:not(.button--disabled):not(.button--loading) {
  background: #0f2f15;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(21, 61, 28, 0.3);
}

.button--primary:active {
  transform: translateY(0);
  box-shadow: 0 2px 6px rgba(21, 61, 28, 0.2);
}

/* === SECONDARY VARIANT === */
.button--secondary {
  background: rgba(255, 255, 255, 0.64);
  color: rgba(21, 61, 28, 0.64);
  border: 1px solid rgba(21, 61, 28, 0.64);
  backdrop-filter: blur(10px);
}

.button--secondary:hover:not(.button--disabled):not(.button--loading) {
  background: rgba(255, 255, 255, 0.8);
  color: var(--primary-green, #153d1c);
  border-color: var(--primary-green, #153d1c);
}

/* === ACCENT VARIANT - FIGMA GRADIENT === */
.button--accent {
  background: linear-gradient(
    170deg,
    var(--light-green, #e1f524) 0%,
    var(--bright-green, #b9f524) 97.69%
  );
  color: var(--primary-green, #153d1c);
  font-family: var(
    --font-mono,
    "IBM Plex Sans",
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif
  );
  font-weight: 600;
  border: 1.185px solid var(--white, #fff);
  box-shadow:
    0px 1.185px 2.369px 0px #e7ff00,
    0px 0px 0px 3.554px #eeff49;
}

.button--accent:hover:not(.button--disabled):not(.button--loading) {
  background: linear-gradient(170deg, #d4e820 0%, #a8e820 97.69%);
  transform: translateY(-2px);
  box-shadow:
    0px 2px 4px 0px #e7ff00,
    0px 0px 0px 4px #eeff49;
}

/* === GHOST VARIANT === */
.button--ghost {
  background: transparent;
  color: var(--primary-green, #153d1c);
  border: 1px solid transparent;
}

.button--ghost:hover:not(.button--disabled):not(.button--loading) {
  background: rgba(21, 61, 28, 0.1);
  color: var(--primary-green, #153d1c);
}

/* === OUTLINE VARIANT === */
.button--outline {
  background: transparent;
  color: var(--primary-green, #153d1c);
  border: 1.5px solid var(--primary-green, #153d1c);
}

.button--outline:hover:not(.button--disabled):not(.button--loading) {
  background: var(--primary-green, #153d1c);
  color: var(--white, #ffffff);
}

/* === SIZE VARIANTS - FIGMA MEASUREMENTS === */
.button--small {
  padding: 12px 16px;
  font-size: 16px;
  line-height: 1.42;
  letter-spacing: -0.16px;
  gap: 8px;
  border-radius: 18px;
}

.button--medium {
  padding: 19px;
  font-size: 20px;
  line-height: 1.42;
  letter-spacing: -0.2px;
  min-height: 58px;
}

.button--large {
  padding: 18.956px;
  font-size: 20px;
  line-height: 1.42;
  letter-spacing: -0.2px;
  min-height: 58.912px;
}

.button--xl {
  padding: 24px 32px;
  font-size: 22px;
  line-height: 1.42;
  letter-spacing: -0.22px;
  min-height: 70px;
}

/* === FULL WIDTH === */
.button--full-width {
  width: 100%;
  max-width: 383.852px;
}

/* === DISABLED STATE === */
.button--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.button--disabled:hover {
  transform: none;
  box-shadow: none;
}

/* === LOADING STATE === */
.button--loading {
  cursor: wait;
  pointer-events: none;
}

.button--loading .button-text {
  opacity: 0.7;
}

.button--loading::after {
  content: "";
  position: absolute;
  top: 50%;
  right: 16px;
  width: 16px;
  height: 16px;
  margin-top: -8px;
  border: 2px solid currentColor;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 1s linear infinite;
}

/* === BUTTON CONTENT === */
.button-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.button-text {
  display: flex;
  align-items: center;
  line-height: inherit;
}

/* === RESPONSIVE DESIGN - FIGMA BREAKPOINTS === */
@media (max-width: 360px) {
  .button--small {
    padding: 10px 14px;
    font-size: 14px;
    gap: 6px;
  }

  .button--medium,
  .button--large {
    padding: 16px;
    font-size: 18px;
    min-height: 52px;
  }

  .button--full-width {
    max-width: 100%;
  }
}

@media (min-width: 768px) {
  .button--full-width {
    max-width: 400px;
  }
}

/* === ANIMATIONS === */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* === ACCESSIBILITY IMPROVEMENTS === */
@media (prefers-reduced-motion: reduce) {
  .button-base {
    transition: none;
  }

  .button--loading::after {
    animation: none;
  }
}

/* === HIGH CONTRAST MODE === */
@media (prefers-contrast: high) {
  .button--primary {
    border: 2px solid var(--primary-green);
  }

  .button--secondary {
    border-width: 2px;
  }

  .button--accent {
    border-width: 2px;
    border-color: var(--primary-green);
  }
}

/* === FOCUS STATES FOR KEYBOARD NAVIGATION === */
.button-base:focus-visible {
  outline: 3px solid var(--accent-green, #059c1f);
  outline-offset: 2px;
}

/* === PRESSED STATES === */
.button-base:active:not(.button--disabled):not(.button--loading) {
  transform: scale(0.98);
}

/* === DYNAMIC STATE CLASSES - READY FOR BINDING === */
.button-base[data-state="success"] {
  background: var(--secondary-green, #31920b);
  color: var(--white, #ffffff);
}

.button-base[data-state="error"] {
  background: #eb002d;
  color: var(--white, #ffffff);
}

.button-base[data-state="warning"] {
  background: #f59100;
  color: var(--white, #ffffff);
}
</style>
