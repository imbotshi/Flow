<template>
  <VAppLayout theme="light">
    <main class="user-info-container" role="main" data-bind="user-info-modify-page">
      <form
        class="user-info-form"
        @submit.prevent="handleUpdate"
        aria-label="Formulaire de modification du profil utilisateur"
      >
        <!-- Title Section -->
        <header class="title-section" data-bind="title-section">
          <h1 class="page-title" data-bind="page-title">
            Modifier mon profil
          </h1>
        </header>

        <!-- Form Fields Section (identique à UserInfoPage.vue) -->
        <section class="form-fields-section" data-bind="form-fields-section">
          <div class="photo-upload-wrapper" data-bind="photo-upload-wrapper">
            <div style="width:100%;display:flex;flex-direction:column;align-items:flex-start;">
              <label style="margin-bottom:8px;font-size:16px;color:#153d1c;">Photo de profil</label>
              <VPhotoUpload
                v-model="profilePhoto"
                class="profile-photo-upload"
                data-bind="profile-photo-upload"
                :data-error="errors.photo"
                aria-label="Télécharger votre photo de profil"
                shape="rounded"
              />
            </div>
          </div>
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
          <div class="input-wrapper" data-bind="country-wrapper">
            <VInput
              v-model="country"
              placeholder="Pays"
              variant="user-info"
              class="country-input"
              data-bind="country-input"
              :data-error="errors.country"
              aria-label="Saisir votre pays"
              autocomplete="country"
              required
            />
          </div>
        </section>

        <!-- Action Button -->
        <section class="action-section" data-bind="action-section">
          <VButton
            type="submit"
            variant="primary"
            size="large"
            full-width
            :disabled="!canUpdate"
            :loading="isLoading"
            class="update-button"
            data-bind="update-button"
            aria-label="Mettre à jour le profil utilisateur"
          >
            Modifier mon profil
          </VButton>
        </section>

        <!-- Error Message -->
        <section v-if="errorMessage" class="userinfo-error-section" data-bind="userinfo-error-section">
          <p class="userinfo-error-message">{{ errorMessage }}</p>
        </section>
      </form>
    </main>
  </VAppLayout>
</template>

<script setup>
import { ref, computed, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import VAppLayout from "../components/organisms/VAppLayout.vue";
import VInput from "../components/atoms/VInput.vue";
import VButton from "../components/atoms/VButton.vue";
import VPhotoUpload from "../components/molecules/VPhotoUpload.vue";
import { useUserStore } from '../stores/user.js';
import userService from '../services/userService.js';

const router = useRouter();
const userStore = useUserStore();

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

const canUpdate = computed(() => fullName.value.length > 5 && country.value.length > 2);

onMounted(() => {
  // Pré-remplir avec les données utilisateur actuelles
  const user = userStore.utilisateur;
  if (user) {
    fullName.value = (user.nom || "") + (user.prenom ? " " + user.prenom : "");
    country.value = user.country || "";
    profilePhoto.value = user.photoProfil || null;
  }
});

async function handleUpdate() {
  isLoading.value = true;
  errorMessage.value = "";
  try {
    // Appel API pour mettre à jour le profil
    await userService.updateUser({
      fullName: fullName.value,
      country: country.value,
      photo: profilePhoto.value,
    });
    // Recharger les infos utilisateur
    await userStore.verifierUtilisateur(userStore.utilisateur?.phone || "");
    router.push("/dashboard");
  } catch (e) {
    errorMessage.value = e?.message || "Erreur lors de la mise à jour du profil.";
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped>
.user-info-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 32px 0;
}
.user-info-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.title-section {
  margin-bottom: 18px;
}
.page-title {
  color: #153d1c;
  font-size: 28px;
  font-weight: 600;
  margin: 0;
}
.action-section {
  margin-top: 18px;
}
.update-button {
  margin-top: 8px;
}
.userinfo-error-section {
  margin-top: 12px;
}
.userinfo-error-message {
  color: #ef1524;
  font-size: 15px;
  text-align: center;
}
</style> 