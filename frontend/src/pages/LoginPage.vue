<template>
  <VAppLayout theme="dark" :show-testimonial="true">
    <main class="login-container" role="main" data-bind="login-page">
      <form
        class="login-form"
        @submit.prevent="handleValidate"
        aria-label="Formulaire de connexion"
      >
        <!-- Phone Input Section -->
        <section class="input-section" data-bind="phone-section">
          <VInput
            v-model="phoneNumber"
            placeholder="Numéro de téléphone"
            :icon="PhoneIcon"
            class="phone-input"
            data-bind="phone-number"
            aria-label="Saisir votre numéro de téléphone"
            autocomplete="tel"
            inputmode="tel"
          />
        </section>

        <!-- Security Code Section -->
        <section
          class="input-section security-section"
          data-bind="security-section"
        >
          <div class="security-input-wrapper">
            <VInput
              v-model="securityCode"
              placeholder="Clé de sécurité"
              :icon="LockIcon"
              type="password"
              :divided-input="true"
              class="security-input"
              data-bind="security-code"
              aria-label="Saisir votre clé de sécurité"
              autocomplete="one-time-code"
              inputmode="numeric"
            >
              <template #action>
                <button
                  type="button"
                  class="send-code-btn"
                  @click="sendSecurityCode"
                  :disabled="!phoneNumber"
                  :data-loading="isLoading"
                  data-bind="send-code"
                  aria-label="Envoyer le code de sécurité"
                >
                  Envoyer le clé
                </button>
              </template>
            </VInput>
          </div>
          <button
            type="button"
            class="resend-link"
            @click="resendCode"
            data-bind="resend-code"
            aria-label="Demander un nouveau code"
          >
            Renvoyer une nouvelle clé
          </button>
        </section>

        <!-- Action Buttons Section -->
        <section class="actions-section" data-bind="actions-section">
          <VButton
            type="submit"
            variant="accent"
            size="large"
            full-width
            :disabled="!canValidate"
            class="validate-btn"
            data-bind="validate-button"
            aria-label="Valider la connexion"
          >
            Valider
          </VButton>

          <VDivider text="Ou" class="form-divider" />

          <VButton
            type="button"
            variant="primary"
            size="large"
            full-width
            @click="goToSignup"
            class="signup-btn"
            data-bind="signup-button"
            aria-label="Aller à l'inscription"
          >
            Inscrivez-vous
          </VButton>
        </section>
      </form>
    </main>

    <!-- Error Modal -->
    <VModal 
      :is-visible="showErrorModal" 
      title="Erreur" 
      :show-close-button="true"
      @close="closeErrorModal"
    >
      <p class="error-message">{{ errorMessage }}</p>
      <template #footer>
        <VButton 
          variant="primary" 
          @click="closeErrorModal"
        >
          OK
        </VButton>
      </template>
    </VModal>
  </VAppLayout>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import VAppLayout from "../components/organisms/VAppLayout.vue";
import VInput from "../components/atoms/VInput.vue";
import VButton from "../components/atoms/VButton.vue";
import VDivider from "../components/molecules/VDivider.vue";
import VModal from "../components/atoms/VModal.vue";
import PhoneIcon from "../components/atoms/icons/PhoneIcon.vue";
import LockIcon from "../components/atoms/icons/LockIcon.vue";
import otpService from "../services/otpService.js";
import { useUserStore } from "../stores/user.js";

const router = useRouter();
const userStore = useUserStore();

// === STATE MANAGEMENT - READY FOR DYNAMIC BINDING ===
const phoneNumber = ref("");
const securityCode = ref("");
const isLoading = ref(false);
const showErrorModal = ref(false);
const errorMessage = ref("");
const otpSent = ref(false);

const canValidate = computed(() => {
  return phoneNumber.value.length > 0 && securityCode.value.length > 0 && otpSent.value;
});

// === METHODS - WITH PROPER ERROR HANDLING ===
const sendSecurityCode = async () => {
  if (phoneNumber.value && !isLoading.value) {
    isLoading.value = true;
    try {
      console.log("🚀 Début envoi OTP pour:", phoneNumber.value);
      const result = await otpService.sendOtp(phoneNumber.value);
      
      console.log("📋 Résultat envoi OTP:", result);
      
      if (result.success) {
        otpSent.value = true;
        console.log("✅ OTP envoyé avec succès");
        // Optionnel: afficher un message de succès
        // errorMessage.value = "Code envoyé avec succès !";
        // showErrorModal.value = true;
      } else {
        console.error("❌ Échec envoi OTP:", result);
        errorMessage.value = result.message || "Erreur lors de l'envoi du code";
        showErrorModal.value = true;
      }
    } catch (error) {
      console.error("💥 Exception envoi OTP:", error);
      errorMessage.value = "Erreur lors de l'envoi du code";
      showErrorModal.value = true;
    } finally {
      isLoading.value = false;
    }
  }
};

const resendCode = async () => {
  if (phoneNumber.value && !isLoading.value) {
    isLoading.value = true;
    try {
      console.log("🔄 Début renvoi OTP pour:", phoneNumber.value);
      const result = await otpService.sendOtp(phoneNumber.value);
      
      console.log("📋 Résultat renvoi OTP:", result);
      
      if (result.success) {
        console.log("✅ OTP renvoyé avec succès");
        // Optionnel: afficher un message de succès
        // errorMessage.value = "Nouveau code envoyé avec succès !";
        // showErrorModal.value = true;
      } else {
        console.error("❌ Échec renvoi OTP:", result);
        errorMessage.value = result.message || "Erreur lors du renvoi du code";
        showErrorModal.value = true;
      }
    } catch (error) {
      console.error("💥 Exception renvoi OTP:", error);
      errorMessage.value = "Erreur lors du renvoi du code";
      showErrorModal.value = true;
    } finally {
      isLoading.value = false;
    }
  }
};

const handleValidate = async () => {
  if (canValidate.value && !isLoading.value) {
    isLoading.value = true;
    try {
      console.log("🔐 Début vérification OTP:", { 
        phone: phoneNumber.value, 
        codeLength: securityCode.value.length 
      });
      
      const result = await otpService.verifyOtp(phoneNumber.value, securityCode.value);
      
      console.log("📋 Résultat vérification OTP:", result);
      
      if (result.success) {
        console.log("✅ OTP vérifié avec succès");
        
        // Stocker le numéro de téléphone en mémoire tampon
        userStore.setTelephone(phoneNumber.value);
        
        // Vérifier si l'utilisateur existe dans la base de données
        console.log("🔍 Vérification de l'existence de l'utilisateur...");
        const userCheck = await userStore.verifierUtilisateur(phoneNumber.value);
        
        if (userCheck.success) {
          if (userCheck.existe) {
            // Utilisateur existe, mettre à jour sa dernière connexion
            await userStore.mettreAJourConnexion(phoneNumber.value);
            console.log("✅ Utilisateur existant, redirection vers le dashboard");
            router.push("/dashboard");
          } else {
            // Utilisateur n'existe pas, redirection vers la page d'informations utilisateur
            console.log("❌ Utilisateur non trouvé, redirection vers /user-info");
            userStore.setTelephone(phoneNumber.value); // Stocke le numéro pour l'inscription
            router.push("/user-info");
          }
        } else {
          // Erreur lors de la vérification, rediriger vers user-info par défaut
          console.error("❌ Erreur lors de la vérification utilisateur:", userCheck.message);
          errorMessage.value = "Erreur lors de la vérification de l'utilisateur";
          showErrorModal.value = true;
        }
      } else {
        console.error("❌ Échec vérification OTP:", result);
        errorMessage.value = result.message || "Code incorrect ou expiré";
        showErrorModal.value = true;
      }
    } catch (error) {
      console.error("💥 Exception vérification OTP:", error);
      errorMessage.value = "Erreur lors de la validation";
      showErrorModal.value = true;
    } finally {
      isLoading.value = false;
    }
  }
};

const goToSignup = () => {
  router.push("/phone");
};

const closeErrorModal = () => {
  showErrorModal.value = false;
  errorMessage.value = "";
};
</script>

<style scoped>
/* === LOGIN CONTAINER - FIGMA EXACT MEASUREMENTS === */
.login-container {
  display: flex;
  width: 100%;
  max-width: 383.852px;
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0;
}

/* === LOGIN FORM - SEMANTIC STRUCTURE === */
.login-form {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 25.732px;
}

/* === INPUT SECTIONS - FIGMA SPACING === */
.input-section {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 9.47px;
}

.security-section {
  gap: 0;
}

/* === SECURITY INPUT WRAPPER === */
.security-input-wrapper {
  width: 100%;
  position: relative;
  margin-bottom: 9.47px;
}

/* === SEND CODE BUTTON - EXACT FIGMA SPECS === */
.send-code-btn {
  color: var(--primary-green, #153d1c);
  font-family: var(--font-primary);
  font-size: 18px;
  font-weight: 600;
  line-height: 1.42;
  letter-spacing: -0.18px;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
  transition: color var(--transition-fast);
  user-select: none;
}

.send-code-btn:hover:not(:disabled) {
  color: #0f2f15;
}

.send-code-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.send-code-btn:focus-visible {
  outline: 2px solid var(--accent-green);
  outline-offset: 2px;
  border-radius: 4px;
}

/* === RESEND LINK - EXACT FIGMA TYPOGRAPHY === */
.resend-link {
  align-self: stretch;
  color: var(--cream, #fff9ce);
  text-align: right;
  font-family: var(--font-primary);
  font-size: 16px;
  font-weight: 400;
  line-height: 1.42;
  letter-spacing: -0.16px;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
  margin-top: 9.47px;
  transition: color var(--transition-fast);
}

.resend-link:hover {
  color: var(--white, #ffffff);
}

.resend-link:focus-visible {
  outline: 2px solid var(--cream);
  outline-offset: 2px;
  border-radius: 4px;
}

/* === ACTIONS SECTION - FIGMA SPACING === */
.actions-section {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 28.196px;
  margin-top: 0.464px;
}

/* === COMPONENT OVERRIDES FOR PIXEL-PERFECT === */
.phone-input,
.security-input {
  width: 100%;
  max-width: 383.852px;
}

.validate-btn,
.signup-btn {
  width: 100%;
  max-width: 383.852px;
}

.form-divider {
  width: 100%;
  margin: 0;
}

/* === MOBILE BREAKPOINTS - FIGMA RESPONSIVE === */
@media (max-width: 360px) {
  .login-container {
    max-width: 100%;
    padding: 0 var(--space-md);
  }

  .login-form {
    gap: 22px;
  }

  .input-section {
    gap: 8px;
  }

  .actions-section {
    gap: 24px;
  }

  .send-code-btn {
    font-size: 16px;
  }

  .resend-link {
    font-size: 14px;
  }
}

@media (min-width: 768px) {
  .login-container {
    max-width: 400px;
  }
}

/* === ERROR MESSAGE STYLES === */
.error-message {
  color: var(--primary-green, #153d1c);
  font-family: var(--font-primary);
  font-size: 1rem;
  line-height: 1.5;
  margin: 0;
  text-align: center;
}

/* === FOCUS MANAGEMENT FOR ACCESSIBILITY === */
.login-form:focus-within .input-section {
  outline: none;
}

/* === ANIMATION STATES === */
.input-section {
  transition: transform var(--transition-fast);
}

.input-section:focus-within {
  transform: translateY(-1px);
}

/* === ERROR STATES - READY FOR DYNAMIC BINDING === */
.input-section[data-error="true"] {
  animation: shake 0.3s ease-in-out;
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

/* === LOADING STATES === */
.send-code-btn[data-loading="true"] {
  position: relative;
  color: transparent;
}

.send-code-btn[data-loading="true"]::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 16px;
  height: 16px;
  margin: -8px 0 0 -8px;
  border: 2px solid var(--primary-green);
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
