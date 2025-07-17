<template>
  <VAppLayout theme="light">
    <main class="user-info-container" role="main" data-bind="user-info-page">
      <form
        class="user-info-form"
        @submit.prevent="handleContinue"
        aria-label="Formulaire d'informations utilisateur"
      >
        <!-- Title Section -->
        <header class="title-section" data-bind="title-section">
          <h1 class="page-title" data-bind="page-title">
            Entrez vos informations
          </h1>
        </header>

        <!-- Form Fields Section -->
        <section class="form-fields-section" data-bind="form-fields-section">
          <!-- Photo Upload -->
          <div class="photo-upload-wrapper" data-bind="photo-upload-wrapper">
            <VPhotoUpload
              v-model="profilePhoto"
              label="Photo de profil"
              class="profile-photo-upload"
              data-bind="profile-photo-upload"
              :data-error="errors.photo"
              aria-label="Télécharger votre photo de profil"
            />
          </div>

          <!-- Full Name Input -->
          <div class="input-wrapper" data-bind="full-name-wrapper">
            <VInput
              v-model="fullName"
              placeholder="Nom complet"
              variant="user-info"
              class="full-name-input"
              data-bind="full-name-input"
              :data-error="errors.fullName"
              aria-label="Saisir votre nom complet"
              autocomplete="name"
              required
            />
          </div>

          <!-- Country Input -->
          <div class="input-wrapper" data-bind="country-wrapper">
            <VInput
              v-model="country"
              placeholder="Pays de résidence"
              variant="user-info"
              class="country-input"
              data-bind="country-input"
              :data-error="errors.country"
              aria-label="Saisir votre pays de résidence"
              autocomplete="country"
              required
            />
          </div>
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
            aria-label="Continuer vers l'expérience métier"
          >
            Continuer
          </VButton>
        </section>

        <!-- Affichage du message d'erreur nom complet -->
        <section v-if="errors.fullName" class="fullname-error-section" data-bind="fullname-error-section">
          <p class="fullname-error-message">Le nom complet doit contenir plus de 5 lettres.</p>
        </section>
        <!-- Affichage du message d'erreur global -->
        <section v-if="errorMessage" class="userinfo-error-section" data-bind="userinfo-error-section">
          <p class="userinfo-error-message">{{ errorMessage }}</p>
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
import VPhotoUpload from "../components/molecules/VPhotoUpload.vue";
import { useUserStore } from "../stores/user.js";

const router = useRouter();
const userStore = useUserStore();

// === STATE MANAGEMENT ===
const profilePhoto = ref(null);
const fullName = ref("");
const country = ref("");
const isLoading = ref(false);
const errors = reactive({
  photo: false,
  fullName: false,
  country: false,
});
const errorMessage = ref("");

// Conversion image en base64
function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// === COMPUTED VALUES ===
const canContinue = computed(() => {
  return fullName.value.trim().length > 5;
});

const formData = computed(() => ({
  profilePhoto: profilePhoto.value,
  fullName: fullName.value.trim(),
  country: country.value.trim(),
}));

// === METHODS ===
const validateForm = () => {
  errors.fullName = fullName.value.trim().length <= 5;
  errors.photo = false; // Photo is optional
  errors.country = false; // Pays optionnel
  return !errors.fullName;
};

const showFieldError = (fieldName) => {
  const wrapper = document.querySelector(`[data-bind="${fieldName}-wrapper"]`);
  wrapper?.setAttribute("data-error", "true");
  setTimeout(() => wrapper?.removeAttribute("data-error"), 3000);
};

const handleContinue = async () => {
  errorMessage.value = "";
  if (!validateForm()) {
    if (errors.fullName) showFieldError("full-name");
    // Shake the form
    const formSection = document.querySelector('[data-bind="form-fields-section"]');
    formSection?.setAttribute("data-error", "true");
    setTimeout(() => formSection?.removeAttribute("data-error"), 3000);
    return;
  }

  if (canContinue.value && !isLoading.value) {
    isLoading.value = true;
    try {
      // Récupérer le numéro de téléphone stocké
      const telephone = localStorage.getItem('otpPhone');
      if (!telephone) {
        errorMessage.value = "Numéro de téléphone manquant.";
        throw new Error("Numéro de téléphone manquant");
      }
      // Convertir la photo en base64 si présente
      let photoBase64 = null;
      if (profilePhoto.value && profilePhoto.value instanceof File) {
        photoBase64 = await toBase64(profilePhoto.value);
        localStorage.setItem('userProfilePhoto', photoBase64);
      }
      // Stocker toutes les infos dans localStorage
      const userInfo = {
        telephone,
        fullName: fullName.value.trim(),
        country: country.value.trim(),
        profilePhoto: photoBase64 || null
      };
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      // ... (tu peux aussi envoyer ces infos au backend ici si besoin)
      // Afficher succès et passer à la suite
      const formSection = document.querySelector('[data-bind="form-fields-section"]');
        formSection?.setAttribute("data-success", "true");
        setTimeout(() => {
          router.push("/business-experience");
        }, 1000);
    } catch (error) {
      errorMessage.value = error.message || "Erreur lors de la sauvegarde.";
      const formSection = document.querySelector('[data-bind="form-fields-section"]');
      formSection?.setAttribute("data-error", "true");
    } finally {
      isLoading.value = false;
    }
  }
};

// === WATCHERS FOR REAL-TIME VALIDATION ===
const clearFieldError = (fieldName) => {
  errors[fieldName] = false;
  const wrapper = document.querySelector(`[data-bind="${fieldName}-wrapper"]`);
  wrapper?.removeAttribute("data-error");
};

// Clear errors when user starts typing
const handleFullNameInput = () => {
  if (errors.fullName && fullName.value.trim().length > 0) {
    clearFieldError("fullName");
  }
};

const handleCountryInput = () => {
  if (errors.country && country.value.trim().length > 0) {
    clearFieldError("country");
  }
};

// Watch for input changes
import { watch } from "vue";

watch(fullName, handleFullNameInput);
watch(country, handleCountryInput);
</script>

<style scoped>
/* === USER INFO CONTAINER - FIGMA EXACT MEASUREMENTS === */
.user-info-container {
  display: flex;
  width: 100%;
  max-width: 381px;
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* === USER INFO FORM === */
.user-info-form {
  display: inline-flex;
  width: 381px;
  height: 526px;
  flex-direction: column;
  align-items: flex-start;
  gap: 25.85px;
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

/* === FORM FIELDS SECTION === */
.form-fields-section {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 25.85px;
  transition: transform var(--transition-fast);
}

.form-fields-section:focus-within {
  transform: translateY(-2px);
}

/* === PHOTO UPLOAD WRAPPER === */
.photo-upload-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-photo-upload {
  width: 100%;
  max-width: 120px;
}

/* === INPUT WRAPPERS === */
.input-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: transform var(--transition-fast);
}

.input-wrapper:focus-within {
  transform: translateY(-1px);
}

/* === INPUT OVERRIDES FOR USER-INFO VARIANT === */
.full-name-input,
.country-input {
  width: 100%;
}

.full-name-input :deep(.input-container--base),
.country-input :deep(.input-container--base) {
  background: rgba(255, 255, 255, 0.64);
  border-radius: 21.15px;
  backdrop-filter: blur(10px);
}

/* === ACTION SECTION === */
.action-section {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  margin-top: auto;
}

.continue-button {
  width: 100%;
  max-width: 381px;
}

/* === RESPONSIVE DESIGN - FIGMA BREAKPOINTS === */
@media (max-width: 360px) {
  .user-info-container {
    max-width: 100%;
    padding: 0 var(--space-md);
  }

  .user-info-form {
    width: 100%;
    height: auto;
    min-height: 480px;
    gap: 22px;
  }

  .form-fields-section {
    gap: 22px;
  }

  .page-title {
    font-size: 24px;
    letter-spacing: -0.24px;
  }

  .profile-photo-upload {
    max-width: 100px;
  }
}

@media (min-width: 768px) {
  .user-info-container {
    max-width: 420px;
  }

  .user-info-form {
    width: 100%;
    max-width: 420px;
    height: auto;
    min-height: 560px;
    gap: 30px;
  }

  .form-fields-section {
    gap: 30px;
  }

  .page-title {
    font-size: 30px;
    letter-spacing: -0.3px;
  }

  .profile-photo-upload {
    max-width: 140px;
  }
}

/* === ERROR STATES - DYNAMIC BINDING === */
.form-fields-section[data-error="true"] {
  animation: shake 0.3s ease-in-out;
}

.input-wrapper[data-error="true"] {
  animation: shake 0.3s ease-in-out;
}

.input-wrapper[data-error="true"]
  .full-name-input
  :deep(.input-container--base),
.input-wrapper[data-error="true"] .country-input :deep(.input-container--base) {
  border-color: var(--error-color, #eb002d);
  box-shadow: 0 0 0 3px rgba(235, 0, 45, 0.1);
}

.photo-upload-wrapper[data-error="true"] .profile-photo-upload {
  border-color: var(--error-color, #eb002d);
  box-shadow: 0 0 0 3px rgba(235, 0, 45, 0.1);
}

/* === SUCCESS STATES === */
.form-fields-section[data-success="true"] {
  opacity: 1;
  transform: scale(1.02);
  transition: all var(--transition-normal);
}

.form-fields-section[data-success="true"]
  .input-wrapper
  :deep(.input-container--base) {
  border-color: var(--secondary-green, #31920b);
  box-shadow: 0 0 0 3px rgba(49, 146, 11, 0.1);
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
  .form-fields-section,
  .input-wrapper {
    transition: none;
  }

  .form-fields-section[data-error="true"],
  .input-wrapper[data-error="true"] {
    animation: none;
  }

  .form-fields-section[data-success="true"] {
    transition: none;
    transform: none;
  }
}

/* === HIGH CONTRAST MODE === */
@media (prefers-contrast: high) {
  .input-wrapper :deep(.input-container--base) {
    border-width: 2px;
  }

  .page-title {
    font-weight: 500;
  }
}

/* === LOADING STATES === */
.user-info-form[data-loading="true"] {
  pointer-events: none;
  opacity: 0.7;
}

/* === FOCUS MANAGEMENT === */
.user-info-form:focus-within .form-fields-section {
  outline: none;
}

/* === TOUCH TARGET OPTIMIZATION === */
@media (max-width: 767px) {
  .input-wrapper {
    min-height: 44px;
  }

  .photo-upload-wrapper {
    min-height: 80px;
  }
}

/* === VALIDATION FEEDBACK === */
.input-wrapper[data-valid="true"] :deep(.input-container--base) {
  border-color: rgba(49, 146, 11, 0.5);
}

.input-wrapper[data-valid="true"] :deep(.input-container--base):focus-within {
  border-color: var(--secondary-green, #31920b);
  box-shadow: 0 0 0 3px rgba(49, 146, 11, 0.1);
}

/* === PROGRESSIVE ENHANCEMENT === */
.user-info-form {
  container-type: inline-size;
}

@container (max-width: 350px) {
  .form-fields-section {
    gap: 20px;
  }

  .page-title {
    font-size: 22px;
  }
}
</style>
