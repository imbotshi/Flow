<template>
  <div class="signup-phone">
    <h2>Connexion</h2>
    <form @submit.prevent="onSubmitPhone" v-if="step === 'phone'">
      <label for="phone">Numéro de téléphone</label>
      <input id="phone" v-model="phone" type="tel" required placeholder="Numéro de téléphone" :class="{ error: phoneError }" @focus="clearError" />
      <button type="submit" :disabled="loading || !phone || phoneError">
        <span v-if="loading">Envoi...</span>
        <span v-else>Envoyer la clé</span>
      </button>
      <p v-if="phoneError" class="error">Numéro invalide</p>
      <p v-if="networkError" class="error">Erreur réseau, veuillez réessayer.</p>
      <a href="#" @click.prevent="goToSignup">Inscrivez-vous</a>
    </form>

    <div v-if="step === 'confirmation'">
      <p>Clé envoyée, veuillez vérifier votre téléphone</p>
      <form @submit.prevent="onSubmitOtp">
        <input id="otp" v-model="otp" type="text" maxlength="6" required placeholder="Clé de sécurité" @focus="clearError" :disabled="otpExpired || otpTooManyAttempts" />
        <button type="submit" :disabled="loading || !otp || otpExpired || otpTooManyAttempts">
          <span v-if="loading">Validation...</span>
          <span v-else>Valider</span>
        </button>
      </form>
      <p v-if="otpError" class="error">{{ otpErrorMsg || 'Clé incorrecte. Veuillez réessayer.' }}</p>
      <div v-if="otpExpired || otpTooManyAttempts" class="expired-alert">
        <p v-if="otpExpired">Votre code a expiré. <strong>Veuillez demander un nouveau code.</strong></p>
        <p v-if="otpTooManyAttempts">Trop de tentatives. <strong>Veuillez demander un nouveau code.</strong></p>
        <button @click="resendOtp" :disabled="loading" class="resend-btn">
          <span v-if="loading">Renvoi...</span>
          <span v-else>Renvoyer un code</span>
        </button>
      </div>
      <button v-else @click="resendOtp" :disabled="loading">
        <span v-if="loading">Renvoi...</span>
        <span v-else>Renvoyer une nouvelle clé</span>
      </button>
      <p v-if="networkError" class="error">Erreur réseau, veuillez réessayer.</p>
    </div>

    <div v-if="step === 'success'">
      <p>Connexion validée !</p>
    </div>
  </div>
</template>

<script>
import otpService from '../services/otpService.js';

export default {
  name: 'SignupPhone',
  data() {
    return {
      phone: '',
      otp: '',
      step: 'phone', // 'phone', 'confirmation', 'success'
      loading: false,
      phoneError: false,
      otpError: false,
      otpErrorMsg: '',
      networkError: false,
      otpExpired: false,
      otpTooManyAttempts: false
    };
  },
  methods: {
    clearError() {
      this.phoneError = false;
      this.networkError = false;
      this.otpError = false;
      this.otpErrorMsg = '';
      this.otpExpired = false;
      this.otpTooManyAttempts = false;
    },
    goToSignup() {
      // Rediriger vers l'interface de création de compte si applicable
      // TODO: Implémenter la navigation réelle
      alert('Redirection vers la création de compte (à implémenter)');
    },
    async onSubmitPhone() {
      this.phoneError = false;
      this.networkError = false;
      this.loading = true;
      if (!/^\+?[0-9]{9,15}$/.test(this.phone)) {
        this.phoneError = true;
        this.loading = false;
        return;
      }
      // Appel réel au service d'envoi OTP
      const result = await otpService.sendOtp(this.phone);
      this.loading = false;
      if (result.success) {
        this.step = 'confirmation';
        this.otp = '';
        this.otpExpired = false;
        this.otpTooManyAttempts = false;
      } else {
        this.networkError = true;
      }
    },
    async onSubmitOtp() {
      this.otpError = false;
      this.otpErrorMsg = '';
      this.networkError = false;
      this.otpExpired = false;
      this.otpTooManyAttempts = false;
      this.loading = true;
      // Appel réel au service de vérification OTP
      const result = await otpService.verifyOtp(this.phone, this.otp);
      this.loading = false;
      if (result.success) {
        this.step = 'success';
      } else {
        if (result.message && result.message !== 'Failed to fetch') {
          if (result.message.includes('expiré')) {
            this.otpExpired = true;
            this.otp = '';
          } else if (result.message.toLowerCase().includes('trop de tentatives')) {
            this.otpTooManyAttempts = true;
            this.otp = '';
          } else {
            this.otpError = true;
            this.otpErrorMsg = result.message;
          }
        } else {
          this.networkError = true;
        }
      }
    },
    resendOtp() {
      this.loading = true;
      this.networkError = false;
      this.otpExpired = false;
      this.otpTooManyAttempts = false;
      // Appel réel au service d'envoi OTP
      otpService.sendOtp(this.phone).then(result => {
        this.loading = false;
        if (result.success) {
          this.otp = '';
        }
        if (!result.success) {
          this.networkError = true;
        }
      });
    }
  }
};
</script>

<style scoped>
.signup-phone {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid #eee;
  border-radius: 8px;
  background: #fff;
}
label {
  display: block;
  margin-bottom: 0.5rem;
}
input {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
input.error {
  border-color: #d00;
}
button {
  margin-right: 0.5rem;
  padding: 0.5rem 1rem;
}
.resend-btn {
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  margin-top: 0.5rem;
  cursor: pointer;
}
.expired-alert {
  background: #fff3cd;
  color: #856404;
  border: 1px solid #ffeeba;
  border-radius: 4px;
  padding: 1rem;
  margin: 1rem 0;
}
a {
  display: inline-block;
  margin-top: 0.5rem;
  color: #007bff;
  text-decoration: underline;
  cursor: pointer;
}
.error {
  color: #d00;
  margin-top: 0.5rem;
}
</style> 