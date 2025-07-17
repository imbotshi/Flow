<template>
  <VAppLayout theme="light">
    <div class="contact-method-page">
      <div class="contact-method-page__content">
        <h1 class="contact-method-page__title">
          Comment êtes-vous entré en contact avec nous?
        </h1>

        <div class="contact-method-page__options">
          <VOption
            v-for="option in contactOptions"
            :key="option.value"
            :selected="selectedContact === option.value"
            @select="selectedContact = option.value"
          >
            {{ option.label }}
          </VOption>
        </div>

        <VButton
          variant="primary"
          size="large"
          full-width
          @click="handleContinue"
          :disabled="!selectedContact"
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

const selectedContact = ref("social-media"); // Default selection from design

const contactOptions = [
  { value: "word-of-mouth", label: "Bouche à oreille" },
  { value: "online-ads", label: "Annonces en ligne" },
  { value: "social-media", label: "Réseaux sociaux" },
  { value: "other", label: "Autres" },
];

const handleContinue = () => {
  if (selectedContact.value) {
    signup.setMethodeContact(selectedContact.value);
    router.push("/success");
  }
};
</script>

<style scoped>
.contact-method-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 26px;
  width: 100%;
  max-width: 381px;
  margin: 0 auto;
}

.contact-method-page__content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 26px;
  width: 100%;
}

.contact-method-page__title {
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

.contact-method-page__options {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
}
</style>
