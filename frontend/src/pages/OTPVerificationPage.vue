<template>
  <VAppLayout theme="light">
    <main class="otp-container" role="main" data-bind="otp-page">
      <form
        class="otp-form"
        @submit.prevent="handleContinue"
        aria-label="Formulaire de vérification OTP"
      >
        <!-- Header Section -->
        <header class="otp-header-section" data-bind="otp-header-section">
          <h1 class="otp-title" data-bind="otp-title">
            Vous recevrez un SMS. Entrez le code ici :
          </h1>

          <div class="code-input-wrapper" data-bind="code-input-wrapper">
            <VCodeInput
              v-model="otpCode"
              :length="5"
              class="otp-code-input"
              data-bind="otp-code-input"
              :data-error="errors.otp"
              aria-label="Saisir le code de vérification à 5 chiffres"
              @update:model-value="handleOTPInput"
            />
          </div>
        </header>

        <!-- Resend Section -->
        <section class="resend-section" data-bind="resend-section">
          <button
            type="button"
            class="resend-button"
            data-bind="resend-button"
            @click="handleResend"
            :disabled="isResendDisabled"
            aria-label="Je n'ai pas reçu de message, renvoyer le code"
          >
            Je n'ai pas reçu de message.
          </button>
        </section>

        <!-- Action Section -->
        <section class="action-section" data-bind="action-section">
          <VButton
            type="submit"
            variant="primary"
            size="large"
            full-width
            :disabled="!canContinue"
            :loading="isLoading"
            class="continue-button"
            data-bind="continue-button"
            aria-label="Continuer avec le code saisi"
          >
            Continuer
          </VButton>
        </section>

        <!-- Timer Section -->
        <section class="timer-section" data-bind="timer-section">
          <VCountdownTimer
            :duration="327"
            class="countdown-timer"
            data-bind="countdown-timer"
            @timeout="handleTimeout"
            @tick="handleTimerTick"
          />
        </section>

        <!-- Error Section -->
        <section v-if="errorMessage" class="otp-error-section" data-bind="otp-error-section">
          <p class="otp-error-message">{{ errorMessage }}</p>
        </section>
      </form>
    </main>
  </VAppLayout>
</template>

<script setup>
import { ref, computed, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user.js";
import VAppLayout from "../components/organisms/VAppLayout.vue";
import VCodeInput from "../components/atoms/VCodeInput.vue";
import VButton from "../components/atoms/VButton.vue";
import VCountdownTimer from "../components/molecules/VCountdownTimer.vue";
import otpService from "../services/otpService";

const router = useRouter();
const userStore = useUserStore();

// === STATE MANAGEMENT ===
const otpCode = ref("");
const isLoading = ref(false);
const isResendDisabled = ref(false);
const resendCount = ref(0);
const errors = reactive({
  otp: false,
});
const errorMessage = ref("");

// === COMPUTED VALUES ===
const canContinue = computed(() => {
  return otpCode.value.length === 5 && /^\d{5}$/.test(otpCode.value);
});

// === METHODS ===
const validateOTP = () => {
  errors.otp = otpCode.value.length !== 5 || !/^\d{5}$/.test(otpCode.value);
  return !errors.otp;
};

const handleOTPInput = (code) => {
  // Clear error state when user starts typing
  if (errors.otp && code.length > 0) {
    errors.otp = false;
    errorMessage.value = "";
    const codeWrapper = document.querySelector(
      '[data-bind="code-input-wrapper"]',
    );
    codeWrapper?.removeAttribute("data-error");
  }

  // Auto-advance when all digits are entered
  if (code.length === 5) {
    setTimeout(() => {
      if (validateOTP()) {
        handleContinue();
      }
    }, 500);
  }
};

const handleContinue = async () => {
  errorMessage.value = "";
  if (!validateOTP()) {
    const codeWrapper = document.querySelector(
      '[data-bind="code-input-wrapper"]',
    );
    codeWrapper?.setAttribute("data-error", "true");
    setTimeout(() => codeWrapper?.removeAttribute("data-error"), 3000);
    return;
  }

  if (canContinue.value && !isLoading.value) {
    isLoading.value = true;
    try {
      const phone = localStorage.getItem('otpPhone') || '';
      console.log(`[FRONTEND] [${new Date().toISOString()}] Action: Validation OTP, Payload:`, { phone, code: otpCode.value });
      const result = await otpService.verifyOtp(phone, otpCode.value);
      console.log(`[FRONTEND] [${new Date().toISOString()}] Résultat validation OTP:`, result);
      if (result.success) {
        if (result.user) {
          userStore.utilisateur = result.user;
          console.log(`[FRONTEND] [${new Date().toISOString()}] Données utilisateur chargées dans le store:`, result.user);
        } else {
          await userStore.verifierUtilisateur(phone);
          console.log(`[FRONTEND] [${new Date().toISOString()}] Chargement profil utilisateur via store.`);
        }
        const codeWrapper = document.querySelector('[data-bind="code-input-wrapper"]');
        codeWrapper?.setAttribute("data-success", "true");
        setTimeout(() => {
          router.push("/user-info");
        }, 1000);
      } else {
        throw new Error(result.message || "Code OTP incorrect");
      }
    } catch (error) {
      console.error(`[FRONTEND] [${new Date().toISOString()}] Erreur validation OTP:`, error);
      errors.otp = true;
      errorMessage.value = error.message || "Code OTP incorrect";
      const codeWrapper = document.querySelector('[data-bind="code-input-wrapper"]');
      codeWrapper?.setAttribute("data-error", "true");
      otpCode.value = "";
    } finally {
      isLoading.value = false;
    }
  }
};

const handleResend = async () => {
  if (isResendDisabled.value || resendCount.value >= 3) return;

  isResendDisabled.value = true;
  resendCount.value++;

  try {
    // TODO: Call resend OTP API
    console.log("Resending OTP code...");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Show success feedback
    const resendButton = document.querySelector('[data-bind="resend-button"]');
    resendButton?.setAttribute("data-success", "true");

    setTimeout(() => {
      resendButton?.removeAttribute("data-success");
      isResendDisabled.value = false;
    }, 3000);
  } catch (error) {
    console.error("Error resending OTP:", error);
    isResendDisabled.value = false;
  }
};

const handleTimeout = () => {
  // TODO: Handle timeout - redirect or show options
  console.log("OTP timeout - redirecting to phone entry");
  router.push("/phone");
};

const handleTimerTick = (remaining) => {
  // Update UI based on remaining time
  if (remaining <= 60) {
    const timerSection = document.querySelector('[data-bind="timer-section"]');
    timerSection?.setAttribute("data-warning", "true");
  }
};

// === LIFECYCLE ===
onMounted(() => {
  // Auto-focus on code input
  const codeInput = document.querySelector(
    '[data-bind="otp-code-input"] input',
  );
  codeInput?.focus();
});
</script>

<style scoped>
/* === OTP CONTAINER - FIGMA EXACT MEASUREMENTS === */
.otp-container {
  display: flex;
  width: 100%;
  max-width: 367px;
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* === OTP FORM === */
.otp-form {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 38px;
}

/* === HEADER SECTION - FIGMA EXACT SPECS === */
.otp-header-section {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 21px;
}

.otp-title {
  align-self: stretch;
  color: var(--primary-green, #153d1c);
  font-family: var(
    --font-mono,
    "IBM Plex Sans",
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif
  );
  font-size: 28px;
  font-weight: 400;
  line-height: 1.24;
  letter-spacing: -0.28px;
  margin: 0;
}

.code-input-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform var(--transition-fast);
}

.code-input-wrapper:focus-within {
  transform: translateY(-2px);
}

/* === RESEND SECTION - FIGMA TYPOGRAPHY === */
.resend-section {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.resend-button {
  align-self: stretch;
  color: var(--accent-green, #059c1f);
  text-align: center;
  font-family: var(
    --font-primary,
    "Figtree",
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif
  );
  font-size: 21px;
  font-weight: 500;
  line-height: 1.42;
  letter-spacing: -0.21px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: var(--space-sm);
  transition: all var(--transition-normal);
  border-radius: var(--radius-sm);
}

.resend-button:hover:not(:disabled) {
  text-decoration: underline;
  color: #047a19;
  background: rgba(5, 156, 31, 0.1);
}

.resend-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.resend-button:focus-visible {
  outline: 2px solid var(--accent-green);
  outline-offset: 2px;
}

/* === ACTION SECTION === */
.action-section {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
}

.continue-button {
  width: 100%;
  max-width: 367px;
}

/* === TIMER SECTION === */
.timer-section {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
}

.countdown-timer {
  width: 100%;
}

/* === RESPONSIVE DESIGN - FIGMA BREAKPOINTS === */
@media (max-width: 360px) {
  .otp-container {
    max-width: 100%;
    padding: 0 var(--space-md);
  }

  .otp-form {
    gap: 32px;
  }

  .otp-header-section {
    gap: 18px;
  }

  .otp-title {
    font-size: 24px;
    letter-spacing: -0.24px;
  }

  .resend-button {
    font-size: 18px;
    letter-spacing: -0.18px;
  }
}

@media (min-width: 768px) {
  .otp-container {
    max-width: 400px;
  }

  .otp-title {
    font-size: 30px;
    letter-spacing: -0.3px;
  }

  .resend-button {
    font-size: 22px;
    letter-spacing: -0.22px;
  }
}

/* === ERROR STATES - DYNAMIC BINDING === */
.code-input-wrapper[data-error="true"] {
  animation: shake 0.3s ease-in-out;
}

.code-input-wrapper[data-error="true"] .otp-code-input {
  border-color: var(--error-color, #eb002d);
  box-shadow: 0 0 0 3px rgba(235, 0, 45, 0.1);
}

/* === SUCCESS STATES === */
.code-input-wrapper[data-success="true"] .otp-code-input {
  border-color: var(--secondary-green, #31920b);
  box-shadow: 0 0 0 3px rgba(49, 146, 11, 0.1);
}

.resend-button[data-success="true"] {
  color: var(--secondary-green, #31920b);
  background: rgba(49, 146, 11, 0.1);
}

.resend-button[data-success="true"]::after {
  content: " ✓ Envoyé !";
  font-weight: 600;
}

/* === WARNING STATES === */
.timer-section[data-warning="true"] .countdown-timer {
  color: var(--orange, #fb9700);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
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

/* === ACCESSIBILITY IMPROVEMENTS === */
@media (prefers-reduced-motion: reduce) {
  .code-input-wrapper {
    transition: none;
  }

  .code-input-wrapper[data-error="true"] {
    animation: none;
  }

  .timer-section[data-warning="true"] .countdown-timer {
    animation: none;
  }
}

/* === HIGH CONTRAST MODE === */
@media (prefers-contrast: high) {
  .resend-button {
    text-decoration: underline;
  }

  .otp-title {
    font-weight: 500;
  }
}

/* === LOADING STATES === */
.otp-form[data-loading="true"] {
  pointer-events: none;
  opacity: 0.7;
}

/* === FOCUS MANAGEMENT === */
.otp-form:focus-within .code-input-wrapper {
  outline: none;
}

/* === TOUCH TARGET OPTIMIZATION === */
@media (max-width: 767px) {
  .resend-button {
    min-height: 44px;
    min-width: 44px;
    padding: var(--space-md);
  }
}
</style>
