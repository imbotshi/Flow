<template>
  <div
    class="countdown-timer"
    :class="timerClasses"
    data-bind="countdown-timer"
  >
    <div class="timer-display" data-bind="timer-display">
      <div class="timer-icon" data-bind="timer-icon">
        <ClockIcon />
      </div>

      <div class="timer-content" data-bind="timer-content">
        <span class="timer-text" data-bind="timer-text">
          {{ displayText }}
        </span>

        <div class="timer-digits" data-bind="timer-digits">
          <span class="time-value" data-bind="time-value">
            {{ formattedTime }}
          </span>
        </div>
      </div>
    </div>

    <!-- Progress Ring -->
    <div class="timer-progress" data-bind="timer-progress">
      <svg
        class="progress-ring"
        viewBox="0 0 120 120"
        data-bind="progress-ring"
      >
        <circle
          class="progress-ring-background"
          cx="60"
          cy="60"
          r="54"
          fill="transparent"
          stroke="rgba(21, 61, 28, 0.1)"
          stroke-width="4"
        />
        <circle
          class="progress-ring-progress"
          cx="60"
          cy="60"
          r="54"
          fill="transparent"
          stroke="currentColor"
          stroke-width="4"
          stroke-linecap="round"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="strokeDashoffset"
          transform="rotate(-90 60 60)"
        />
      </svg>

      <div class="progress-content">
        <div class="timer-icon-center">
          <ClockIcon />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import ClockIcon from "../atoms/icons/ClockIcon.vue";

const props = defineProps({
  duration: {
    type: Number,
    required: true,
    validator: (value) => value > 0,
  },
  autoStart: {
    type: Boolean,
    default: true,
  },
  format: {
    type: String,
    default: "mm:ss",
    validator: (value) => ["mm:ss", "ss", "mm:ss:ms"].includes(value),
  },
  warningThreshold: {
    type: Number,
    default: 60,
  },
  dangerThreshold: {
    type: Number,
    default: 30,
  },
  text: {
    type: String,
    default: "Temps restant",
  },
  showProgress: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits([
  "start",
  "pause",
  "resume",
  "stop",
  "timeout",
  "tick",
  "warning",
  "danger",
]);

// === STATE MANAGEMENT ===
const timeRemaining = ref(props.duration);
const isRunning = ref(false);
const isPaused = ref(false);
const hasStarted = ref(false);
const intervalId = ref(null);
const warningEmitted = ref(false);
const dangerEmitted = ref(false);

// === COMPUTED VALUES ===
const timerClasses = computed(() => [
  "countdown-timer--base",
  {
    "countdown-timer--running": isRunning.value,
    "countdown-timer--paused": isPaused.value,
    "countdown-timer--warning":
      timeRemaining.value <= props.warningThreshold &&
      timeRemaining.value > props.dangerThreshold,
    "countdown-timer--danger": timeRemaining.value <= props.dangerThreshold,
    "countdown-timer--finished": timeRemaining.value <= 0,
  },
]);

const formattedTime = computed(() => {
  const seconds = Math.max(0, timeRemaining.value);

  switch (props.format) {
    case "ss":
      return seconds.toString().padStart(2, "0");
    case "mm:ss:ms":
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      const milliseconds = Math.floor((seconds % 1) * 100);
      return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}:${milliseconds.toString().padStart(2, "0")}`;
    case "mm:ss":
    default:
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }
});

const displayText = computed(() => {
  if (timeRemaining.value <= 0) {
    return "Temps écoulé";
  }
  if (isPaused.value) {
    return "En pause";
  }
  if (!hasStarted.value) {
    return "Prêt à démarrer";
  }
  return props.text;
});

const progress = computed(() => {
  return Math.max(0, Math.min(1, timeRemaining.value / props.duration));
});

const circumference = computed(() => 2 * Math.PI * 54);

const strokeDashoffset = computed(() => {
  return circumference.value * (1 - progress.value);
});

// === METHODS ===
const start = () => {
  if (timeRemaining.value <= 0) {
    reset();
  }

  isRunning.value = true;
  isPaused.value = false;
  hasStarted.value = true;

  intervalId.value = setInterval(() => {
    tick();
  }, 1000);

  emit("start");
};

const pause = () => {
  if (!isRunning.value) return;

  isRunning.value = false;
  isPaused.value = true;

  if (intervalId.value) {
    clearInterval(intervalId.value);
    intervalId.value = null;
  }

  emit("pause");
};

const resume = () => {
  if (!isPaused.value) return;

  start();
  emit("resume");
};

const stop = () => {
  isRunning.value = false;
  isPaused.value = false;
  hasStarted.value = false;

  if (intervalId.value) {
    clearInterval(intervalId.value);
    intervalId.value = null;
  }

  reset();
  emit("stop");
};

const reset = () => {
  timeRemaining.value = props.duration;
  warningEmitted.value = false;
  dangerEmitted.value = false;
};

const tick = () => {
  if (timeRemaining.value > 0) {
    timeRemaining.value--;
    emit("tick", timeRemaining.value);

    // Emit warning and danger events
    if (
      timeRemaining.value <= props.warningThreshold &&
      !warningEmitted.value &&
      timeRemaining.value > props.dangerThreshold
    ) {
      warningEmitted.value = true;
      emit("warning", timeRemaining.value);
    }

    if (timeRemaining.value <= props.dangerThreshold && !dangerEmitted.value) {
      dangerEmitted.value = true;
      emit("danger", timeRemaining.value);
    }
  } else {
    // Timer finished
    isRunning.value = false;
    isPaused.value = false;

    if (intervalId.value) {
      clearInterval(intervalId.value);
      intervalId.value = null;
    }

    emit("timeout");
  }
};

// === WATCHERS ===
watch(
  () => props.duration,
  (newDuration) => {
    if (!hasStarted.value || timeRemaining.value <= 0) {
      timeRemaining.value = newDuration;
    }
  },
);

// === LIFECYCLE ===
onMounted(() => {
  if (props.autoStart) {
    start();
  }
});

onUnmounted(() => {
  if (intervalId.value) {
    clearInterval(intervalId.value);
  }
});

// === EXPOSE METHODS ===
defineExpose({
  start,
  pause,
  resume,
  stop,
  reset,
  timeRemaining: computed(() => timeRemaining.value),
  isRunning: computed(() => isRunning.value),
  isPaused: computed(() => isPaused.value),
});
</script>

<style scoped>
/* === COUNTDOWN TIMER BASE - FIGMA DESIGN === */
.countdown-timer--base {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-md);
  width: 100%;
  max-width: 280px;
  margin: 0 auto;
  padding: var(--space-lg);
}

/* === TIMER DISPLAY - MAIN CONTENT === */
.timer-display {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  padding: var(--space-md);
  border-radius: var(--radius-lg);
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(21, 61, 28, 0.1);
  transition: all var(--transition-normal);
}

.timer-icon {
  width: 24px;
  height: 24px;
  color: var(--primary-green, #153d1c);
  flex-shrink: 0;
}

.timer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-xs);
}

.timer-text {
  color: rgba(21, 61, 28, 0.64);
  font-family: var(--font-primary);
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
  letter-spacing: -0.14px;
  text-align: center;
}

.timer-digits {
  display: flex;
  align-items: center;
  justify-content: center;
}

.time-value {
  color: var(--primary-green, #153d1c);
  font-family: var(--font-mono, "IBM Plex Sans", monospace);
  font-size: 28px;
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.02em;
  text-align: center;
  min-width: 120px;
}

/* === PROGRESS RING === */
.timer-progress {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
}

.progress-ring {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.progress-ring-progress {
  transition: stroke-dashoffset 1s ease-in-out;
  color: var(--accent-green, #059c1f);
}

.progress-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.timer-icon-center {
  width: 32px;
  height: 32px;
  color: var(--accent-green, #059c1f);
  opacity: 0.7;
}

/* === TIMER STATES === */
.countdown-timer--running .timer-display {
  background: rgba(5, 156, 31, 0.1);
  border-color: rgba(5, 156, 31, 0.3);
}

.countdown-timer--paused .timer-display {
  background: rgba(251, 151, 0, 0.1);
  border-color: rgba(251, 151, 0, 0.3);
}

.countdown-timer--paused .progress-ring-progress {
  color: var(--orange, #fb9700);
}

.countdown-timer--paused .timer-icon,
.countdown-timer--paused .timer-icon-center {
  color: var(--orange, #fb9700);
}

.countdown-timer--warning .timer-display {
  background: rgba(251, 151, 0, 0.15);
  border-color: rgba(251, 151, 0, 0.4);
  animation: warning-pulse 2s ease-in-out infinite;
}

.countdown-timer--warning .progress-ring-progress {
  color: var(--orange, #fb9700);
}

.countdown-timer--warning .time-value {
  color: var(--orange, #fb9700);
}

.countdown-timer--danger .timer-display {
  background: rgba(235, 0, 45, 0.15);
  border-color: rgba(235, 0, 45, 0.4);
  animation: danger-pulse 1s ease-in-out infinite;
}

.countdown-timer--danger .progress-ring-progress {
  color: var(--error-color, #eb002d);
}

.countdown-timer--danger .time-value {
  color: var(--error-color, #eb002d);
}

.countdown-timer--danger .timer-icon,
.countdown-timer--danger .timer-icon-center {
  color: var(--error-color, #eb002d);
}

.countdown-timer--finished .timer-display {
  background: rgba(235, 0, 45, 0.2);
  border-color: var(--error-color, #eb002d);
}

.countdown-timer--finished .progress-ring-progress {
  color: var(--error-color, #eb002d);
  opacity: 0.5;
}

.countdown-timer--finished .time-value {
  color: var(--error-color, #eb002d);
  font-weight: 700;
}

/* === RESPONSIVE DESIGN === */
@media (max-width: 360px) {
  .countdown-timer--base {
    max-width: 240px;
    gap: var(--space-sm);
    padding: var(--space-md);
  }

  .timer-display {
    gap: var(--space-xs);
    padding: var(--space-sm);
  }

  .timer-icon {
    width: 20px;
    height: 20px;
  }

  .time-value {
    font-size: 24px;
    min-width: 100px;
  }

  .timer-progress {
    width: 100px;
    height: 100px;
  }

  .timer-icon-center {
    width: 28px;
    height: 28px;
  }
}

@media (min-width: 768px) {
  .countdown-timer--base {
    max-width: 320px;
    gap: var(--space-lg);
    padding: var(--space-xl);
  }

  .timer-display {
    gap: var(--space-md);
    padding: var(--space-lg);
  }

  .timer-icon {
    width: 28px;
    height: 28px;
  }

  .time-value {
    font-size: 32px;
    min-width: 140px;
  }

  .timer-progress {
    width: 140px;
    height: 140px;
  }

  .timer-icon-center {
    width: 36px;
    height: 36px;
  }
}

/* === ANIMATIONS === */
@keyframes warning-pulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.02);
  }
}

@keyframes danger-pulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.05);
  }
}

/* === ACCESSIBILITY === */
@media (prefers-reduced-motion: reduce) {
  .progress-ring-progress {
    transition: none;
  }

  .countdown-timer--warning .timer-display,
  .countdown-timer--danger .timer-display {
    animation: none;
  }
}

/* === HIGH CONTRAST MODE === */
@media (prefers-contrast: high) {
  .timer-display {
    border-width: 2px;
    background: var(--white, #ffffff);
  }

  .progress-ring-background {
    stroke-width: 6px;
    stroke: rgba(21, 61, 28, 0.3);
  }

  .progress-ring-progress {
    stroke-width: 6px;
  }
}

/* === DYNAMIC STATES FOR DATA-BIND === */
.countdown-timer[data-warning="true"] {
  animation: warning-pulse 2s ease-in-out infinite;
}

.countdown-timer[data-danger="true"] {
  animation: danger-pulse 1s ease-in-out infinite;
}

.countdown-timer[data-finished="true"] .timer-display {
  animation: finished-shake 0.5s ease-in-out;
}

@keyframes finished-shake {
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

/* === PRINT STYLES === */
@media print {
  .countdown-timer--base {
    display: none;
  }
}
</style>
