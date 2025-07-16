<template>
  <div class="edit-partner-page">
    <!-- Header -->
    <div class="edit-partner-page__header">
      <button class="edit-partner-page__back-btn" @click="goBack">
        <BackIcon />
      </button>
      <button class="edit-partner-page__more-btn">
        <MoreIcon />
      </button>
    </div>

    <!-- Title -->
    <h1 class="edit-partner-page__title">Modifier le partenaire</h1>

    <!-- Photo Upload -->
    <div class="edit-partner-page__photo-section">
      <h3 class="edit-partner-page__photo-label">Photo de profil</h3>
      <VPhotoUpload
        v-model="form.photo"
        :existing-image="form.existingAvatar"
        @upload="handlePhotoUpload"
      />
    </div>

    <!-- Form Fields with Existing Data -->
    <div class="edit-partner-page__form">
      <VInputFieldEditable
        label="Nom"
        v-model="form.lastName"
        :icon="UserIcon"
        :editable="true"
      />

      <VInputFieldEditable
        label="Prénom"
        v-model="form.firstName"
        :icon="UserIcon"
        :editable="true"
      />

      <VInputFieldEditable
        label="WhatsApp"
        v-model="form.whatsapp"
        :icon="PhoneIcon"
        :editable="true"
      />

      <VInputFieldEditable
        label="Profession"
        v-model="form.profession"
        :icon="WorkIcon"
        :editable="true"
      />

      <VSelectFieldEditable
        label="Bien"
        v-model="form.propertyType"
        :options="propertyOptions"
        :selected-option="form.propertyType"
        :editable="true"
      />

      <VInputFieldEditable
        label="Montant"
        v-model="form.amount"
        :icon="MoneyIcon"
        :editable="true"
      />

      <VDateFieldEditable
        label="Date de paiement"
        v-model="form.paymentDate"
        :selected-date="form.paymentDate"
        :editable="true"
      />

      <VSelectFieldEditable
        label="Mode de Paiement"
        v-model="form.paymentMethod"
        :options="paymentMethodOptions"
        :selected-option="form.paymentMethod"
        :editable="true"
      />

      <VInputFieldEditable
        label="Note"
        v-model="form.note"
        :icon="TextIcon"
        :editable="true"
      />
    </div>

    <!-- Action Buttons -->
    <div class="edit-partner-page__actions">
      <VButton
        variant="primary"
        size="large"
        full-width
        @click="saveChanges"
        :disabled="!hasChanges"
      >
        Modifier le partenaire
      </VButton>
      <VButton variant="secondary" size="large" full-width @click="cancel">
        Annuler
      </VButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

import VButton from "../components/atoms/VButton.vue";
import VPhotoUpload from "../components/molecules/VPhotoUpload.vue";
import BackIcon from "../components/atoms/icons/BackIcon.vue";
import MoreIcon from "../components/atoms/icons/MoreIcon.vue";
import UserIcon from "../components/atoms/icons/UserIcon.vue";
import PhoneIcon from "../components/atoms/icons/PhoneIcon.vue";
import WorkIcon from "../components/atoms/icons/WorkIcon.vue";
import MoneyIcon from "../components/atoms/icons/MoneyIcon.vue";
import TextIcon from "../components/atoms/icons/TextIcon.vue";

const router = useRouter();
const route = useRoute();

// Form reactive object with existing partner data
const form = reactive({
  photo: null as File | null,
  existingAvatar: "https://via.placeholder.com/100x100/31920B/ffffff?text=EO",
  lastName: "Obiang",
  firstName: "Martin",
  whatsapp: "+237 698 651 245",
  profession: "Comptable",
  propertyType: "Projet",
  amount: "200.000 FCFA",
  paymentDate: "09 Juil. 2025",
  paymentMethod: "Virement",
  note: "Il est toujours à temps",
});

// Store original values for comparison
const originalForm = ref({ ...form });

// Options for select fields
const propertyOptions = ref([
  { value: "projet", label: "Projet" },
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
const hasChanges = computed(() => {
  return Object.keys(form).some((key) => {
    if (key === "photo") return form.photo !== null;
    return form[key] !== originalForm.value[key];
  });
});

// Methods
const goBack = () => {
  router.go(-1);
};

const handlePhotoUpload = (file: File) => {
  form.photo = file;
};

const saveChanges = () => {
  if (hasChanges.value) {
    // TODO: Implement save logic
    console.log("Saving partner changes:", form);
    router.push(`/partner/${route.params.id}`);
  }
};

const cancel = () => {
  router.push(`/partner/${route.params.id}`);
};

// Load partner data on mount (in real app, this would be from API)
onMounted(() => {
  // TODO: Load partner data from API using route.params.id
  originalForm.value = { ...form };
});
</script>

<style scoped>
.edit-partner-page {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

.edit-partner-page__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.edit-partner-page__back-btn,
.edit-partner-page__more-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  color: #153d1c;
}

.edit-partner-page__title {
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

.edit-partner-page__photo-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.edit-partner-page__photo-label {
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

.edit-partner-page__form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.edit-partner-page__actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 24px;
}

@media (min-width: 768px) {
  .edit-partner-page {
    max-width: 500px;
  }
}
</style>
