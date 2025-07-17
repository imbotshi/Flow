<template>
  <VAppLayout theme="light">
    <div class="business-process-page">
      <div class="business-process-page__content">
        <h1 class="business-process-page__title">
          Où êtes-vous dans votre processus de gestion ?
        </h1>

        <div class="business-process-page__options">
          <VOption
            v-for="option in processOptions"
            :key="option.value"
            :selected="selectedProcess === option.value"
            @select="selectedProcess = option.value"
          >
            {{ option.label }}
          </VOption>
        </div>

        <VButton
          variant="primary"
          size="large"
          full-width
          @click="handleContinue"
          :disabled="!selectedProcess"
        >
          Continuer
        </VButton>
      </div>
    </div>
  </VAppLayout>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import VAppLayout from "../components/organisms/VAppLayout.vue";
import VOption from "../components/atoms/VOption.vue";
import VButton from "../components/atoms/VButton.vue";
import { useSignupStore } from '../stores/user.js';

const router = useRouter();
const signup = useSignupStore();

const selectedProcess = ref("partners"); // Default selection from design

const processOptions = [
  { value: "partners", label: "Je recherche des partenaires" },
  { value: "valorize", label: "Je souhaite valoriser mes biens" },
  { value: "communication", label: "Je souhaite améliorer la communication" },
];

const handleContinue = () => {
  if (selectedProcess.value) {
    signup.setModeManagement(selectedProcess.value);
    router.push("/contact-method");
  }
};
</script>

<style scoped>
.business-process-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 26px;
  width: 100%;
  max-width: 381px;
  margin: 0 auto;
}

.business-process-page__content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 26px;
  width: 100%;
}

.business-process-page__title {
  align-self: stretch;
  color: #153d1c;
  font-family:
    Figtree,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-size: 28px;
  font-weight: 400;
  line-height: 124%;
  letter-spacing: -0.28px;
  margin: 0;
}

.business-process-page__options {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
}
</style>
