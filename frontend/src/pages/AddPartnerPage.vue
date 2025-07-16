<template>
  <div class="add-partner-page">
    <!-- Header -->
    <div class="add-partner-page__header">
      <button class="add-partner-page__back-btn" @click="goBack">
        <BackIcon />
      </button>
      <button class="add-partner-page__more-btn">
        <MoreIcon />
      </button>
    </div>

    <!-- Title -->
    <h1 class="add-partner-page__title">Ajouter un nouveau partenaire</h1>

    <!-- Photo Upload -->
    <div class="add-partner-page__photo-section">
      <h3 class="add-partner-page__photo-label">Photo de profil</h3>
      <VPhotoUpload v-model="form.photo" @upload="handlePhotoUpload" />
    </div>

    <!-- Form Fields -->
    <div class="add-partner-page__form">
      <VInputField
        label="Nom"
        v-model="form.lastName"
        :icon="UserIcon"
        placeholder="Vide"
      />

      <VInputField
        label="Prénom"
        v-model="form.firstName"
        :icon="UserIcon"
        placeholder="Vide"
      />

      <VInputField
        label="WhatsApp"
        v-model="form.whatsapp"
        :icon="PhoneIcon"
        placeholder="Vide"
      />

      <VInputField
        label="Profession"
        v-model="form.profession"
        :icon="WorkIcon"
        placeholder="Vide"
      />

      <VSelectField
        label="Bien"
        v-model="form.propertyType"
        :options="propertyOptions"
        selected-option="Maison"
      />

      <VInputField
        label="Montant"
        v-model="form.amount"
        :icon="MoneyIcon"
        placeholder="Vide"
      />

      <VDateField
        label="Date de paiement"
        v-model="form.paymentDate"
        selected-date="09/07/2025"
      />

      <VSelectField
        label="Mode de Paiement"
        v-model="form.paymentMethod"
        :options="paymentMethodOptions"
        selected-option="Virement"
      />

      <VInputField
        label="Note"
        v-model="form.note"
        :icon="TextIcon"
        placeholder="Vide"
      />
    </div>

    <!-- Action Buttons -->
    <div class="add-partner-page__actions">
      <VButton
        variant="accent"
        size="large"
        full-width
        @click="savePartner"
        :disabled="!isFormValid"
      >
        Enregistrer le partenaire 🪙
      </VButton>
      <VButton variant="secondary" size="large" full-width @click="cancel">
        Annuler
      </VButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from "vue";
import { useRouter } from "vue-router";

import VButton from "../components/atoms/VButton.vue";
import VPhotoUpload from "../components/molecules/VPhotoUpload.vue";
import BackIcon from "../components/atoms/icons/BackIcon.vue";
import MoreIcon from "../components/atoms/icons/MoreIcon.vue";
import PhoneIcon from "../components/atoms/icons/PhoneIcon.vue";

const router = useRouter();

// Form reactive object
const form = reactive({
  photo: null as File | null,
  lastName: "",
  firstName: "",
  whatsapp: "",
  profession: "",
  propertyType: "Maison",
  amount: "",
  paymentDate: "09/07/2025",
  paymentMethod: "Virement",
  note: "",
});

// Options for select fields
const propertyOptions = ref([
  { value: "maison", label: "Maison" },
  { value: "appartement", label: "Appartement" },
  { value: "bureau", label: "Bureau" },
]);

const paymentMethodOptions = ref([
  { value: "virement", label: "Virement" },
  { value: "especes", label: "Espèces" },
  { value: "cheque", label: "Chèque" },
]);

// Computed properties
const isFormValid = computed(() => {
  return (
    form.lastName.length > 0 &&
    form.firstName.length > 0 &&
    form.whatsapp.length > 0
  );
});

// Methods
const goBack = () => {
  router.go(-1);
};

const handlePhotoUpload = (file: File) => {
  form.photo = file;
};

const savePartner = () => {
  if (isFormValid.value) {
    // TODO: Implement save logic
    console.log("Saving partner:", form);
    router.push("/dashboard");
  }
};

const cancel = () => {
  router.push("/dashboard");
};
</script>

<style scoped>
.add-partner-page {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

.add-partner-page__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.add-partner-page__back-btn,
.add-partner-page__more-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  color: #153d1c;
}

.add-partner-page__title {
  color: #153d1c;
  font-family:
    Figtree,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-size: 28px;
  font-weight: 600;
  line-height: 124%;
  letter-spacing: -0.28px;
  margin: 0;
}

.add-partner-page__photo-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.add-partner-page__photo-label {
  color: #153d1c;
  font-family:
    Figtree,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 142%;
  letter-spacing: -0.16px;
  margin: 0;
}

.add-partner-page__form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.add-partner-page__actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 24px;
}

@media (min-width: 768px) {
  .add-partner-page {
    max-width: 500px;
  }
}
</style>
