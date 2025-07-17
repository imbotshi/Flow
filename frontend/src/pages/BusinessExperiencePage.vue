<template>
  <VAppLayout theme="light">
    <div class="business-experience-page">
      <div class="business-experience-page__content">
        <h1 class="business-experience-page__title">
          Depuis combien de temps êtes-vous dans cette affaire ?
        </h1>

        <div class="business-experience-page__options">
          <VOption
            v-for="option in experienceOptions"
            :key="option.value"
            :selected="selectedExperience === option.value"
            @select="selectedExperience = option.value"
          >
            {{ option.label }}
          </VOption>
        </div>

        <VButton
          variant="primary"
          size="large"
          full-width
          @click="handleContinue"
          :disabled="!selectedExperience"
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

const selectedExperience = ref("");

const experienceOptions = [
  { value: "less-than-year", label: "Moins d'un an" },
  { value: "1-to-3-years", label: "1 à 3 ans" },
  { value: "more-than-3-years", label: "Plus de 3 ans" },
];

const handleContinue = () => {
  if (selectedExperience.value) {
    signup.setAnneeExperience(selectedExperience.value);
    router.push("/business-process");
  }
};
</script>

<style scoped>
.business-experience-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 26px;
  width: 100%;
  max-width: 381px;
  margin: 0 auto;
}

.business-experience-page__content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 26px;
  width: 100%;
}

.business-experience-page__title {
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

.business-experience-page__options {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
}
</style>
