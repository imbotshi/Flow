<template>
  <div class="buy-credits-page">
    <!-- Header -->
    <div class="buy-credits-page__header">
      <button class="buy-credits-page__back-btn" @click="goBack">
        <BackIcon />
      </button>
    </div>

    <!-- Title Section -->
    <div class="buy-credits-page__title-section">
      <h1 class="buy-credits-page__title">Acheter des crédits</h1>
      <p class="buy-credits-page__subtitle">
        Achetez des crédits et débloquez les relances et les contacts pour
        prendre le contrôle total de votre expérience.
      </p>
    </div>

    <!-- Credit Packages Grid -->
    <div class="buy-credits-page__packages">
      <div class="buy-credits-page__package-row">
        <!-- Pack Départ -->
        <VCard
          class="buy-credits-page__package buy-credits-page__package--featured"
          @click="selectPackage('depart')"
          :class="{
            'buy-credits-page__package--selected': selectedPackage === 'depart',
          }"
        >
          <div class="buy-credits-page__package-content">
            <div class="buy-credits-page__package-icon">🧭</div>
            <div class="buy-credits-page__package-info">
              <h3 class="buy-credits-page__package-name">Pack Départ</h3>
              <p class="buy-credits-page__package-credits">20 crédits</p>
            </div>
          </div>
          <div class="buy-credits-page__package-pricing">
            <span class="buy-credits-page__package-dash">-</span>
            <span class="buy-credits-page__package-price">500 FCFA</span>
          </div>
        </VCard>

        <!-- Pack Croissance -->
        <VCard
          class="buy-credits-page__package"
          @click="selectPackage('croissance')"
          :class="{
            'buy-credits-page__package--selected':
              selectedPackage === 'croissance',
          }"
        >
          <div class="buy-credits-page__package-content">
            <div class="buy-credits-page__package-icon">🌱</div>
            <div class="buy-credits-page__package-info">
              <h3 class="buy-credits-page__package-name">Pack Croissance</h3>
              <p class="buy-credits-page__package-credits">50 crédits</p>
            </div>
          </div>
          <div class="buy-credits-page__package-pricing">
            <span class="buy-credits-page__package-original">3000 FCFA</span>
            <span class="buy-credits-page__package-price">1500 FCFA</span>
          </div>
        </VCard>
      </div>

      <div class="buy-credits-page__package-row">
        <!-- Pack Influence -->
        <VCard
          class="buy-credits-page__package"
          @click="selectPackage('influence')"
          :class="{
            'buy-credits-page__package--selected':
              selectedPackage === 'influence',
          }"
        >
          <div class="buy-credits-page__package-content">
            <div class="buy-credits-page__package-icon">💼</div>
            <div class="buy-credits-page__package-info">
              <h3 class="buy-credits-page__package-name">Pack Influence</h3>
              <p class="buy-credits-page__package-credits">100 crédits</p>
            </div>
          </div>
          <div class="buy-credits-page__package-pricing">
            <span class="buy-credits-page__package-original">5000 FCFA</span>
            <span class="buy-credits-page__package-price">4500 FCFA</span>
          </div>
        </VCard>

        <!-- Pack Capital -->
        <VCard
          class="buy-credits-page__package"
          @click="selectPackage('capital')"
          :class="{
            'buy-credits-page__package--selected':
              selectedPackage === 'capital',
          }"
        >
          <div class="buy-credits-page__package-content">
            <div class="buy-credits-page__package-icon">👑</div>
            <div class="buy-credits-page__package-info">
              <h3 class="buy-credits-page__package-name">Pack Capital</h3>
              <p class="buy-credits-page__package-credits">1000 crédits</p>
            </div>
          </div>
          <div class="buy-credits-page__package-badge">
            <VBadge variant="success" size="small">Recommandé</VBadge>
          </div>
          <div class="buy-credits-page__package-pricing">
            <span class="buy-credits-page__package-price">40.000 FCFA</span>
          </div>
        </VCard>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="buy-credits-page__actions">
      <VButton
        variant="primary"
        size="large"
        full-width
        @click="proceedToPayment"
        :disabled="!selectedPackage"
      >
        Continuer
      </VButton>
      <p class="buy-credits-page__disclaimer">
        (*) Le pack Départ est valable pendant 30 jours
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

import VCard from "../components/atoms/VCard.vue";
import VBadge from "../components/atoms/VBadge.vue";
import VButton from "../components/atoms/VButton.vue";
import BackIcon from "../components/atoms/icons/BackIcon.vue";

const router = useRouter();

const selectedPackage = ref<string>("");

const packages = {
  depart: {
    name: "Pack Départ",
    credits: 20,
    price: 500,
    icon: "🧭",
    featured: true,
  },
  croissance: {
    name: "Pack Croissance",
    credits: 50,
    price: 1500,
    originalPrice: 3000,
    icon: "🌱",
  },
  influence: {
    name: "Pack Influence",
    credits: 100,
    price: 4500,
    originalPrice: 5000,
    icon: "💼",
  },
  capital: {
    name: "Pack Capital",
    credits: 1000,
    price: 40000,
    icon: "👑",
    recommended: true,
  },
};

const selectPackage = (packageId: string) => {
  selectedPackage.value = packageId;
};

const goBack = () => {
  router.go(-1);
};

const proceedToPayment = () => {
  if (selectedPackage.value) {
    router.push({
      name: "PaymentMethod",
      query: { package: selectedPackage.value },
    });
  }
};
</script>

<style scoped>
.buy-credits-page {
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 100%;
  max-width: 412px;
  margin: 0 auto;
  padding: 0 14px;
}

.buy-credits-page__header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 17px;
}

.buy-credits-page__back-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  color: #153d1c;
}

.buy-credits-page__title-section {
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 0 17px;
}

.buy-credits-page__title {
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

.buy-credits-page__subtitle {
  color: rgba(21, 61, 28, 0.64);
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

.buy-credits-page__packages {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.buy-credits-page__package-row {
  display: flex;
  gap: 8px;
}

.buy-credits-page__package {
  display: flex;
  width: 202px;
  padding: 32px 18px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;
  border-radius: 21.15px;
  border: 1px solid rgba(21, 61, 28, 0.64);
  background: rgba(255, 255, 255, 0.64);
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.buy-credits-page__package--featured {
  background: #31920b;
  color: white;
}

.buy-credits-page__package--selected {
  border-color: #31920b;
  box-shadow: 0 0 0 2px rgba(49, 146, 11, 0.2);
}

.buy-credits-page__package:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(21, 61, 28, 0.1);
}

.buy-credits-page__package-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.buy-credits-page__package-icon {
  font-size: 64px;
  font-weight: 600;
  line-height: 142%;
  letter-spacing: -0.64px;
  text-transform: uppercase;
}

.buy-credits-page__package-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  text-align: center;
}

.buy-credits-page__package-name {
  font-family:
    Figtree,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-size: 18px;
  font-weight: 600;
  line-height: 142%;
  letter-spacing: -0.18px;
  text-transform: uppercase;
  margin: 0;
}

.buy-credits-page__package--featured .buy-credits-page__package-name {
  color: #fff;
}

.buy-credits-page__package-credits {
  font-family:
    Figtree,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-size: 18px;
  font-weight: 600;
  line-height: 142%;
  letter-spacing: -0.18px;
  margin: 0;
}

.buy-credits-page__package--featured .buy-credits-page__package-credits {
  color: #fff;
}

.buy-credits-page__package-badge {
  position: absolute;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
}

.buy-credits-page__package-pricing {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.buy-credits-page__package-dash {
  color: rgba(21, 61, 28, 0.4);
  font-family:
    Figtree,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-size: 18px;
  font-weight: 600;
  line-height: 142%;
  letter-spacing: -0.18px;
}

.buy-credits-page__package--featured .buy-credits-page__package-dash {
  color: rgba(255, 255, 255, 0.4);
}

.buy-credits-page__package-original {
  color: rgba(21, 61, 28, 0.4);
  font-family:
    Figtree,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-size: 12px;
  font-weight: 600;
  line-height: 142%;
  letter-spacing: -0.12px;
  text-decoration: line-through;
}

.buy-credits-page__package-price {
  color: #153d1c;
  font-family:
    Figtree,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-size: 18px;
  font-weight: 900;
  line-height: 142%;
  letter-spacing: -0.18px;
}

.buy-credits-page__package--featured .buy-credits-page__package-price {
  color: #e1f524;
}

.buy-credits-page__actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-top: 24px;
}

.buy-credits-page__disclaimer {
  color: rgba(21, 61, 28, 0.64);
  font-family:
    Figtree,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 144%;
  letter-spacing: -0.141px;
  text-transform: uppercase;
  text-align: center;
  margin: 0;
}

@media (min-width: 768px) {
  .buy-credits-page {
    max-width: 500px;
  }

  .buy-credits-page__package-row {
    justify-content: center;
  }
}
</style>
