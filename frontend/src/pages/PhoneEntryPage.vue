<template>
  <VAppLayout theme="light">
    <main
      class="phone-entry-container"
      role="main"
      data-bind="phone-entry-page"
    >
      <form
        class="phone-entry-form"
        @submit.prevent="handleContinue"
        aria-label="Formulaire d'inscription"
      >
        <!-- Title Section -->
        <header class="title-section" data-bind="title-section">
          <h1 class="page-title" data-bind="page-title">
            Entrez votre numéro de téléphone
          </h1>
        </header>

        <!-- Phone Input Section -->
        <section class="phone-input-section" data-bind="phone-input-section">
          <div class="form-group" data-bind="country-form-group">
            <label class="field-label" data-bind="country-label">
              Pays/Région
            </label>
            <div
              class="phone-input-container"
              data-bind="phone-input-container"
            >
              <VInput
                v-model="countryCode"
                placeholder="Cameroun (+237)"
                variant="country"
                class="country-input"
                data-bind="country-input"
                aria-label="Sélectionner votre pays et code"
                autocomplete="country"
                :data-error="errors.country"
                :disabled="true"
              />
              <VInput
                v-model="phoneNumber"
                placeholder="Numéro de téléphone"
                class="phone-input"
                data-bind="phone-input"
                aria-label="Saisir votre numéro de téléphone"
                autocomplete="tel"
                inputmode="tel"
                :data-error="errors.phone"
              />
            </div>
          </div>
        </section>

        <!-- Disclaimer Section -->
        <section class="disclaimer-section" data-bind="disclaimer-section">
          <p class="disclaimer-text" data-bind="disclaimer-text">
            Vous acceptez de recevoir automatiquement des messages de notre
            part, même si notre numéro de téléphone est placé dans une liste
            indésirable. Vous acceptez aussi les
            <button
              type="button"
              class="link-button"
              data-bind="terms-link"
              @click="openTerms"
              aria-label="Voir les conditions d'utilisation"
            >
              conditions d'utilisation
            </button>
            et les
            <button
              type="button"
              class="link-button"
              data-bind="contract-link"
              @click="openContract"
              aria-label="Voir les termes du contrat"
            >
              termes du contrat</button
            >. La fréquence des messages varie. Les messages et les données sont
            payants. Appuyer STOP pour annuler.
          </p>
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
            aria-label="Continuer vers la vérification"
          >
            Continuer
          </VButton>
        </section>

        <!-- Confirmation Section -->
        <section v-if="confirmationMessage" class="confirmation-section" data-bind="confirmation-section">
          <p class="confirmation-message">{{ confirmationMessage }}</p>
        </section>

        <!-- Phone Error Section -->
        <section v-if="phoneErrorMessage" class="phone-error-section" data-bind="phone-error-section">
          <p class="phone-error-message">{{ phoneErrorMessage }}</p>
        </section>
      </form>
    </main>
  </VAppLayout>
</template>

<script setup>
import { ref, computed, reactive } from "vue";
import { useRouter } from "vue-router";
import VAppLayout from "../components/organisms/VAppLayout.vue";
import VInput from "../components/atoms/VInput.vue";
import VButton from "../components/atoms/VButton.vue";
import otpService from "../services/otpService";
import userService from "../services/userService";

const router = useRouter();

// === STATE MANAGEMENT ===
const countryCode = ref("+237");
const phoneNumber = ref("");
const isLoading = ref(false);
const errors = reactive({
  country: false,
  phone: false,
});
const confirmationMessage = ref("");
const phoneErrorMessage = ref("");

// === COMPUTED VALUES ===
const canContinue = computed(() => {
  // Valide : 9 chiffres exactement, tous numériques
  return (
    phoneNumber.value.length === 9 &&
    /^\d{9}$/.test(phoneNumber.value) &&
    countryCode.value.length > 0
  );
});

const fullPhoneNumber = computed(() => {
  return `${countryCode.value}${phoneNumber.value}`;
});

// === METHODS ===
const validatePhoneNumber = () => {
  errors.phone =
    phoneNumber.value.length !== 9 || !/^\d{9}$/.test(phoneNumber.value);
  errors.country = countryCode.value.length === 0;
  return !errors.phone && !errors.country;
};

const handleContinue = async () => {
  confirmationMessage.value = "";
  phoneErrorMessage.value = "";
  if (!validatePhoneNumber()) {
    // Show validation errors
    const phoneSection = document.querySelector(
      '[data-bind="phone-input-section"]',
    );
    phoneSection?.setAttribute("data-error", "true");
    setTimeout(() => phoneSection?.removeAttribute("data-error"), 3000);
    return;
  }

  if (canContinue.value && !isLoading.value) {
    isLoading.value = true;
    try {
      // Vérifier si le numéro existe déjà
      const verif = await userService.verifierUtilisateur(fullPhoneNumber.value);
      if (verif.existe) {
        phoneErrorMessage.value =
          "Ce numéro est déjà inscrit. Veuillez vous connecter.";
        isLoading.value = false;
        return;
      }
      // Stocker le numéro pour la page OTP
      localStorage.setItem('otpPhone', fullPhoneNumber.value);
      // Appel mock OTP
      const result = await otpService.sendOtp(fullPhoneNumber.value);
      if (result.success) {
        confirmationMessage.value =
          "Un code a été envoyé à votre numéro.";
        // Optionnel : attendre un peu avant de naviguer
        setTimeout(() => {
          router.push("/otp");
        }, 1200);
      } else {
        confirmationMessage.value = result.message ||
          "Erreur lors de l'envoi du code.";
      }
    } catch (error) {
      confirmationMessage.value =
        error.message || "Erreur lors de l'envoi du code.";
    } finally {
      isLoading.value = false;
    }
  }
};

const openTerms = () => {
  // TODO: Open terms modal or navigate to terms page
  console.log("Opening terms of service");
};

const openContract = () => {
  // TODO: Open contract modal or navigate to contract page
  console.log("Opening contract terms");
};
</script>

<style scoped>
/* === PHONE ENTRY CONTAINER - FIGMA EXACT MEASUREMENTS === */
.phone-entry-container {
  display: flex;
  width: 100%;
  max-width: 365px;
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* === PHONE ENTRY FORM === */
.phone-entry-form {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 25.732px;
}

/* === TITLE SECTION - FIGMA TYPOGRAPHY === */
.title-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.page-title {
  align-self: stretch;
  color: var(--primary-green, #153d1c);
  font-family: var(
    --font-primary,
    "Figtree",
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

/* === PHONE INPUT SECTION === */
.phone-input-section {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 21px;
}

.form-group {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 21px;
}

.field-label {
  color: rgba(21, 61, 28, 0.64);
  font-family: var(--font-primary);
  font-size: 16px;
  font-weight: 400;
  line-height: 1.42;
  letter-spacing: -0.16px;
  margin: 0;
}

/* === PHONE INPUT CONTAINER - FIGMA EXACT STYLING === */
.phone-input-container {
  width: 100%;
  position: relative;
  border-radius: 21px;
  border: 1px solid rgba(21, 61, 28, 0.24);
  overflow: hidden;
  transition: border-color var(--transition-normal);
}

.phone-input-container:focus-within {
  border-color: rgba(21, 61, 28, 0.64);
  box-shadow: 0 0 0 3px rgba(21, 61, 28, 0.1);
}

/* === INPUT OVERRIDES FOR SEAMLESS DESIGN === */
.country-input :deep(.input-container--base) {
  border: none;
  border-radius: 21px 21px 0 0;
  background: rgba(255, 255, 255, 0.64);
  border-bottom: 1px solid rgba(21, 61, 28, 0.24);
}

.phone-input :deep(.input-container--base) {
  border: none;
  border-radius: 0 0 21px 21px;
  background: var(--white, #ffffff);
}

/* === DISCLAIMER SECTION - FIGMA EXACT SPECS === */
.disclaimer-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.disclaimer-text {
  align-self: stretch;
  color: var(--primary-green, #153d1c);
  font-family: var(--font-primary);
  font-size: 14px;
  font-weight: 400;
  line-height: 1.44;
  letter-spacing: -0.14px;
  margin: 0;
}

.link-button {
  color: var(--orange, #fb9700);
  background: transparent;
  border: none;
  padding: 0;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  line-height: inherit;
  letter-spacing: inherit;
  cursor: pointer;
  text-decoration: none;
  transition: color var(--transition-fast);
}

.link-button:hover {
  text-decoration: underline;
  color: #e8890a;
}

.link-button:focus-visible {
  outline: 2px solid var(--orange);
  outline-offset: 2px;
  border-radius: 4px;
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
  max-width: 365px;
}

/* === RESPONSIVE DESIGN - FIGMA BREAKPOINTS === */
@media (max-width: 360px) {
  .phone-entry-container {
    max-width: 100%;
    padding: 0 var(--space-md);
  }

  .phone-entry-form {
    gap: 20px;
  }

  .phone-input-section {
    gap: 18px;
  }

  .form-group {
    gap: 18px;
  }

  .page-title {
    font-size: 24px;
    letter-spacing: -0.24px;
  }

  .disclaimer-text {
    font-size: 13px;
    letter-spacing: -0.13px;
  }
}

@media (min-width: 768px) {
  .phone-entry-container {
    max-width: 400px;
  }

  .page-title {
    font-size: 30px;
    letter-spacing: -0.3px;
  }
}

/* === ERROR STATES - DYNAMIC BINDING === */
.phone-input-section[data-error="true"] {
  animation: shake 0.3s ease-in-out;
}

.phone-input-section[data-error="true"] .phone-input-container {
  border-color: var(--error-color, #eb002d);
  box-shadow: 0 0 0 3px rgba(235, 0, 45, 0.1);
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
  .phone-input-container {
    transition: none;
  }

  .phone-input-section[data-error="true"] {
    animation: none;
  }
}

/* === HIGH CONTRAST MODE === */
@media (prefers-contrast: high) {
  .phone-input-container {
    border-width: 2px;
  }

  .link-button {
    text-decoration: underline;
  }
}

/* === LOADING STATES === */
.phone-entry-form[data-loading="true"] {
  pointer-events: none;
  opacity: 0.7;
}

/* === SUCCESS STATES === */
.phone-input-section[data-success="true"] .phone-input-container {
  border-color: var(--secondary-green, #31920b);
  box-shadow: 0 0 0 3px rgba(49, 146, 11, 0.1);
}

/* === FOCUS MANAGEMENT === */
.phone-entry-form:focus-within .phone-input-section {
  outline: none;
}

/* === TOUCH TARGET OPTIMIZATION === */
@media (max-width: 767px) {
  .link-button {
    min-height: 24px;
    min-width: 24px;
    padding: 2px;
    margin: -2px;
  }
}
</style>
