<template>
  <div
    class="code-input-container"
    :class="containerClasses"
    data-bind="code-input-container"
  >
    <div class="code-inputs-grid" data-bind="code-inputs-grid">
      <input
        v-for="(digit, index) in digits"
        :key="index"
        :ref="(el) => setInputRef(el, index)"
        v-model="digits[index]"
        type="text"
        inputmode="numeric"
        pattern="[0-9]*"
        maxlength="1"
        :class="inputClasses"
        :data-index="index"
        :data-bind="`code-digit-${index}`"
        :aria-label="`Chiffre ${index + 1} du code de vérification`"
        @input="handleInput(index, $event)"
        @keydown="handleKeydown(index, $event)"
        @focus="handleFocus(index)"
        @blur="handleBlur(index)"
        @paste="handlePaste($event)"
      />
    </div>

    <!-- Hidden input for form submission -->
    <input
      type="hidden"
      :name="name"
      :value="modelValue"
      data-bind="hidden-code-input"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  length: {
    type: Number,
    default: 5,
    validator: (value) => value >= 3 && value <= 8,
  },
  name: {
    type: String,
    default: "verification-code",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  error: {
    type: Boolean,
    default: false,
  },
  success: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue", "complete", "focus", "blur"]);

// === STATE MANAGEMENT ===
const digits = ref(Array(props.length).fill(""));
const inputRefs = ref([]);
const focusedIndex = ref(-1);

// === COMPUTED VALUES ===
const containerClasses = computed(() => [
  "code-input--base",
  {
    "code-input--disabled": props.disabled,
    "code-input--loading": props.loading,
    "code-input--error": props.error,
    "code-input--success": props.success,
    "code-input--focused": focusedIndex.value >= 0,
  },
]);

const inputClasses = computed(() => [
  "code-digit",
  {
    "code-digit--disabled": props.disabled,
  },
]);

const codeValue = computed(() => digits.value.join(""));

// === METHODS ===
const setInputRef = (el, index) => {
  if (el) {
    inputRefs.value[index] = el;
  }
};

const updateModelValue = () => {
  const newValue = codeValue.value;
  emit("update:modelValue", newValue);

  if (newValue.length === props.length) {
    emit("complete", newValue);
  }
};

const handleInput = (index, event) => {
  const value = event.target.value;

  // Only allow numeric input
  if (!/^\d*$/.test(value)) {
    event.target.value = digits.value[index];
    return;
  }

  // Handle multiple characters (from paste or autocomplete)
  if (value.length > 1) {
    const chars = value.split("").slice(0, props.length - index);
    chars.forEach((char, i) => {
      if (index + i < props.length && /^\d$/.test(char)) {
        digits.value[index + i] = char;
      }
    });

    // Move focus to next empty field or last field
    const nextIndex = Math.min(index + chars.length, props.length - 1);
    nextTick(() => {
      inputRefs.value[nextIndex]?.focus();
    });
  } else {
    digits.value[index] = value;

    // Auto-advance to next field
    if (value && index < props.length - 1) {
      nextTick(() => {
        inputRefs.value[index + 1]?.focus();
      });
    }
  }

  updateModelValue();
};

const handleKeydown = (index, event) => {
  const { key } = event;

  if (key === "Backspace") {
    if (!digits.value[index] && index > 0) {
      // Move to previous field and clear it
      digits.value[index - 1] = "";
      nextTick(() => {
        inputRefs.value[index - 1]?.focus();
      });
    } else {
      digits.value[index] = "";
    }
    updateModelValue();
    return;
  }

  if (key === "Delete") {
    digits.value[index] = "";
    updateModelValue();
    return;
  }

  if (key === "ArrowLeft" && index > 0) {
    inputRefs.value[index - 1]?.focus();
    return;
  }

  if (key === "ArrowRight" && index < props.length - 1) {
    inputRefs.value[index + 1]?.focus();
    return;
  }

  if (key === "Home") {
    inputRefs.value[0]?.focus();
    return;
  }

  if (key === "End") {
    inputRefs.value[props.length - 1]?.focus();
    return;
  }
};

const handleFocus = (index) => {
  focusedIndex.value = index;
  emit("focus", index);

  // Select all text in the input
  nextTick(() => {
    inputRefs.value[index]?.select();
  });
};

const handleBlur = (index) => {
  focusedIndex.value = -1;
  emit("blur", index);
};

const handlePaste = (event) => {
  event.preventDefault();
  const pastedData = event.clipboardData?.getData("text") || "";
  const digits_data = pastedData
    .replace(/\D/g, "")
    .split("")
    .slice(0, props.length);

  digits_data.forEach((digit, index) => {
    if (index < props.length) {
      digits.value[index] = digit;
    }
  });

  // Focus on the next empty field or the last field
  const nextEmptyIndex = digits.value.findIndex((d) => !d);
  const focusIndex = nextEmptyIndex >= 0 ? nextEmptyIndex : props.length - 1;

  nextTick(() => {
    inputRefs.value[focusIndex]?.focus();
  });

  updateModelValue();
};

const clear = () => {
  digits.value = Array(props.length).fill("");
  updateModelValue();
  inputRefs.value[0]?.focus();
};

const focus = () => {
  const firstEmptyIndex = digits.value.findIndex((d) => !d);
  const focusIndex = firstEmptyIndex >= 0 ? firstEmptyIndex : 0;
  inputRefs.value[focusIndex]?.focus();
};

// === WATCHERS ===
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue !== codeValue.value) {
      const chars = newValue.split("").slice(0, props.length);
      digits.value = Array(props.length)
        .fill("")
        .map((_, i) => chars[i] || "");
    }
  },
);

// === LIFECYCLE ===
onMounted(() => {
  // Initialize with modelValue if provided
  if (props.modelValue) {
    const chars = props.modelValue.split("").slice(0, props.length);
    digits.value = Array(props.length)
      .fill("")
      .map((_, i) => chars[i] || "");
  }
});

// === EXPOSE METHODS ===
defineExpose({
  clear,
  focus,
});
</script>

<style scoped>
/* === CODE INPUT CONTAINER - FIGMA EXACT SPECS === */
.code-input--base {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
}

/* === CODE INPUTS GRID === */
.code-inputs-grid {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
}

/* === INDIVIDUAL CODE DIGIT - FIGMA DESIGN === */
.code-digit {
  width: 48px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(21, 61, 28, 0.24);
  border-radius: 12px;
  background: var(--white, #ffffff);
  font-family: var(--font-mono, "IBM Plex Sans", -apple-system, monospace);
  font-size: 24px;
  font-weight: 600;
  line-height: 1;
  text-align: center;
  color: var(--primary-green, #153d1c);
  transition: all var(--transition-normal);
  outline: none;
  caret-color: var(--accent-green, #059c1f);
}

.code-digit:focus {
  border-color: var(--accent-green, #059c1f);
  box-shadow: 0 0 0 3px rgba(5, 156, 31, 0.2);
  background: rgba(5, 156, 31, 0.05);
}

.code-digit:hover:not(:disabled):not(:focus) {
  border-color: rgba(21, 61, 28, 0.4);
}

/* === STATES === */
.code-input--disabled .code-digit {
  opacity: 0.5;
  pointer-events: none;
  background: var(--light-gray, #f5f5f5);
}

.code-input--error .code-digit {
  border-color: var(--error-color, #eb002d);
  background: rgba(235, 0, 45, 0.05);
  color: var(--error-color, #eb002d);
}

.code-input--error .code-digit:focus {
  box-shadow: 0 0 0 3px rgba(235, 0, 45, 0.2);
}

.code-input--success .code-digit {
  border-color: var(--secondary-green, #31920b);
  background: rgba(49, 146, 11, 0.05);
  color: var(--secondary-green, #31920b);
}

.code-input--success .code-digit:focus {
  box-shadow: 0 0 0 3px rgba(49, 146, 11, 0.2);
}

.code-input--loading .code-digit {
  animation: pulse 1.5s ease-in-out infinite;
}

.code-input--focused .code-digit {
  transform: translateY(-1px);
}

/* === RESPONSIVE DESIGN === */
@media (max-width: 360px) {
  .code-inputs-grid {
    gap: 8px;
  }

  .code-digit {
    width: 40px;
    height: 48px;
    font-size: 20px;
    border-radius: 8px;
  }
}

@media (min-width: 768px) {
  .code-inputs-grid {
    gap: 16px;
  }

  .code-digit {
    width: 56px;
    height: 64px;
    font-size: 28px;
    border-radius: 16px;
  }
}

/* === ANIMATIONS === */
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.02);
  }
}

/* === ACCESSIBILITY === */
@media (prefers-reduced-motion: reduce) {
  .code-digit {
    transition: none;
  }

  .code-input--loading .code-digit {
    animation: none;
  }

  .code-input--focused .code-digit {
    transform: none;
  }
}

/* === HIGH CONTRAST MODE === */
@media (prefers-contrast: high) {
  .code-digit {
    border-width: 3px;
    font-weight: 700;
  }

  .code-digit:focus {
    outline: 3px solid var(--accent-green);
    outline-offset: 2px;
  }
}

/* === PRINT STYLES === */
@media print {
  .code-input--base {
    display: none;
  }
}

/* === DYNAMIC STATES FOR DATA-BIND === */
.code-input-container[data-error="true"] {
  animation: shake 0.3s ease-in-out;
}

.code-input-container[data-success="true"] {
  animation: success-bounce 0.5s ease-out;
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-4px);
  }
  75% {
    transform: translateX(4px);
  }
}

@keyframes success-bounce {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

/* === TOUCH OPTIMIZATION === */
@media (max-width: 767px) {
  .code-digit {
    min-height: 44px;
    min-width: 44px;
  }
}

/* === SELECTION STYLES === */
.code-digit::selection {
  background: rgba(5, 156, 31, 0.3);
  color: var(--primary-green, #153d1c);
}

/* === PLACEHOLDER-LIKE EFFECT FOR EMPTY DIGITS === */
.code-digit:empty::before {
  content: "";
  display: block;
  width: 6px;
  height: 2px;
  background: rgba(21, 61, 28, 0.3);
  margin: 0 auto;
  border-radius: 1px;
  opacity: 0.5;
}

.code-digit:focus:empty::before {
  animation: blink 1s infinite;
}

@keyframes blink {
  0%,
  50% {
    opacity: 1;
  }
  51%,
  100% {
    opacity: 0;
  }
}
</style>
