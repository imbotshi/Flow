<template>
  <VAppLayout theme="success" :show-header="false">
    <div class="success-page">
      <div class="success-page__content">
        <VaniaLogo size="large" theme="success" />

        <div class="success-page__message">
          <h1 class="success-page__title">Parfait.</h1>
          <TextStatus :status="status" processName="Création du profil Vania" :message="errorMessage" />
          <template v-if="status === 'error'">
            <button @click="retry" class="retry-btn">Réessayer</button>
            <button @click="goToLogin" class="login-btn">Retour à la connexion</button>
          </template>
        </div>
      </div>
    </div>
  </VAppLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import VAppLayout from "../components/organisms/VAppLayout.vue";
import VaniaLogo from "../components/atoms/VaniaLogo.vue";
import TextStatus from "../components/atoms/TextStatus.vue";
import { useSignupStore } from '../stores/user.js';

const router = useRouter();
const status = ref('pending'); // 'pending', 'success', 'error'
const errorMessage = ref('');
const signup = useSignupStore();

const saveUser = async () => {
  status.value = 'pending';
  errorMessage.value = '';
  try {
    const response = await fetch('/api/utilisateurs/finaliser-inscription', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        telephone: signup.phone_number,
        profile_picture: signup.profile_picture,
        full_name: signup.full_name,
        country: signup.country,
        annee_experience: signup.annee_experience,
        mode_management: signup.mode_management,
        methode_contact: signup.methode_contact
      })
    });
    const data = await response.json();
    if (data.success) {
      status.value = 'success';
      setTimeout(() => router.push('/dashboard'), 2000);
    } else {
      status.value = 'error';
      errorMessage.value = data.message || 'Erreur lors de la sauvegarde.';
    }
  } catch (e) {
    status.value = 'error';
    errorMessage.value = 'Erreur réseau ou serveur. Veuillez réessayer.';
  }
};

onMounted(saveUser);

const retry = () => {
  saveUser();
};

const goToLogin = () => {
  router.push('/login');
};
</script>

<style scoped>
.success-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
  width: 100%;
}

.success-page__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 43px;
  width: 100%;
  max-width: 320px;
}

.success-page__message {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 34px;
  text-align: center;
}

.success-page__title {
  color: #0a200e;
  font-family:
    Figtree,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-size: 32px;
  font-weight: 400;
  line-height: 142%;
  letter-spacing: -0.32px;
  margin: 0;
}

.retry-btn, .login-btn {
  margin: 8px 6px 0 6px;
  padding: 10px 18px;
  border-radius: 8px;
  border: none;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
}
.retry-btn {
  background: #43c300;
  color: #fff;
}
.login-btn {
  background: #fff;
  color: #31920b;
  border: 1.5px solid #31920b;
}

.success-page__subtitle {
  color: #0a200e;
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
  margin: 0;
}
</style>
