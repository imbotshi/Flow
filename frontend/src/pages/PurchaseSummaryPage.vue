<template>
  <div class="purchase-summary-page">
    <!-- Header -->
    <div class="purchase-summary-page__header">
      <button class="purchase-summary-page__back-btn" @click="goBack">
        <BackIcon />
      </button>
    </div>

    <!-- Title Section -->
    <div class="purchase-summary-page__title-section">
      <h1 class="purchase-summary-page__title">Résumé de l'achat</h1>
      <p class="purchase-summary-page__subtitle">
        Vérifier les informaitonsci-dessous pour compléter le paiement.
      </p>
    </div>

    <!-- Purchase Summary -->
    <VCard class="purchase-summary-page__summary">
      <!-- Package Details -->
      <div class="purchase-summary-page__item">
        <div class="purchase-summary-page__item-info">
          <div class="purchase-summary-page__package-icon">🧭</div>
          <div class="purchase-summary-page__package-details">
            <h3 class="purchase-summary-page__package-name">Pack Départ</h3>
            <p class="purchase-summary-page__package-credits">20 crédits</p>
          </div>
        </div>
        <div class="purchase-summary-page__item-pricing">
          <span class="purchase-summary-page__package-dash">-</span>
          <span class="purchase-summary-page__package-price">500 FCFA</span>
        </div>
      </div>

      <!-- Service Fees -->
      <div class="purchase-summary-page__item">
        <div class="purchase-summary-page__item-info">
          <div class="purchase-summary-page__service-icon">🧭</div>
          <div class="purchase-summary-page__service-details">
            <h3 class="purchase-summary-page__service-title">
              Frais de service
            </h3>
            <p class="purchase-summary-page__service-subtitle">
              Fournisseur de services de paiement
            </p>
          </div>
        </div>
        <span class="purchase-summary-page__service-price">Gratuit</span>
      </div>

      <!-- Payment Method -->
      <div class="purchase-summary-page__item">
        <div class="purchase-summary-page__item-info">
          <div class="purchase-summary-page__payment-logo">
            <svg width="44" height="31" viewBox="0 0 44 31" fill="none">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M18.0222 6.18555H4.96244C4.26893 6.20002 3.60871 6.48567 3.12337 6.98125C2.63803 7.47682 2.36621 8.14286 2.36621 8.83651C2.36621 9.53016 2.63803 10.1962 3.12337 10.6918C3.60871 11.1873 4.26893 11.473 4.96244 11.4875H11.6207L0.902627 22.2073C0.405346 22.7046 0.125977 23.379 0.125977 24.0823C0.125977 24.7855 0.405346 25.46 0.902627 25.9573C1.39991 26.4546 2.07437 26.7339 2.77763 26.7339C3.48089 26.7339 4.15535 26.4546 4.65263 25.9573L15.3707 15.238V21.8969C15.3707 22.6001 15.6501 23.2746 16.1473 23.7718C16.6446 24.2691 17.319 24.5484 18.0222 24.5484C18.7255 24.5484 19.3999 24.2691 19.8972 23.7718C20.3944 23.2746 20.6738 22.6001 20.6738 21.8969V8.83709C20.6738 8.13385 20.3944 7.45942 19.8972 6.96216C19.3999 6.4649 18.7255 6.18555 18.0222 6.18555Z"
                fill="black"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M25.9767 24.5478H39.036C39.3887 24.5552 39.7394 24.492 40.0675 24.3621C40.3956 24.2322 40.6944 24.0381 40.9465 23.7912C41.1986 23.5443 41.3989 23.2496 41.5356 22.9243C41.6724 22.599 41.7428 22.2497 41.7428 21.8968C41.7428 21.544 41.6724 21.1947 41.5356 20.8694C41.3989 20.5441 41.1986 20.2494 40.9465 20.0025C40.6944 19.7556 40.3956 19.5615 40.0675 19.4316C39.7394 19.3016 39.3887 19.2385 39.036 19.2459H32.3783L43.0963 8.52665C43.5936 8.02937 43.873 7.35491 43.873 6.65165C43.873 5.94839 43.5936 5.27393 43.0963 4.77665C42.5991 4.27937 41.9246 4 41.2213 4C40.5181 4 39.8436 4.27937 39.3463 4.77665L28.6283 15.4959V8.83646C28.6283 8.13323 28.3489 7.4588 27.8517 6.96154C27.3544 6.46428 26.68 6.18492 25.9767 6.18492C25.2735 6.18492 24.5991 6.46428 24.1018 6.96154C23.6046 7.4588 23.3252 8.13323 23.3252 8.83646V21.8957C23.3252 22.5989 23.6046 23.2733 24.1018 23.7706C24.5991 24.2679 25.2735 24.5472 25.9767 24.5472"
                fill="#FF7900"
              />
            </svg>
          </div>
          <div class="purchase-summary-page__payment-details">
            <h3 class="purchase-summary-page__payment-title">Orange Money</h3>
            <p class="purchase-summary-page__payment-subtitle">
              Assurez-vous d'avoir vos coordonnées à portée de main pour un
              paiement rapide et sécurisé
            </p>
          </div>
        </div>
      </div>

      <!-- Separator -->
      <div class="purchase-summary-page__separator"></div>

      <!-- Total -->
      <div class="purchase-summary-page__total">
        <span class="purchase-summary-page__total-label">Total:</span>
        <span class="purchase-summary-page__total-price">500 FCFA</span>
      </div>
    </VCard>

    <!-- Payment Button -->
    <div class="purchase-summary-page__actions">
      <VButton variant="accent" size="large" full-width @click="processPayment">
        Payer 500 FCFA
      </VButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

import VCard from "../components/atoms/VCard.vue";
import VButton from "../components/atoms/VButton.vue";
import BackIcon from "../components/atoms/icons/BackIcon.vue";

const router = useRouter();
const route = useRoute();

const selectedPackage = ref<string>("");
const selectedMethod = ref<string>("");

const packageInfo = {
  depart: {
    name: "Pack Départ",
    credits: 20,
    price: 500,
    icon: "🧭",
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
  },
};

const paymentMethods = {
  orange: "Orange Money",
  mtn: "MTN MoMo",
  paypal: "PayPal",
};

const currentPackage = ref(packageInfo.depart);
const currentMethod = ref("Orange Money");

const goBack = () => {
  router.go(-1);
};

const processPayment = () => {
  // TODO: Implement payment processing
  console.log(`[FRONTEND] [${new Date().toISOString()}] Action: Achat crédits, Payload:`, {
    package: selectedPackage.value,
    method: selectedMethod.value,
    amount: currentPackage.value.price,
  });

  // Navigate to process launch page or success page
  router.push({
    name: "ProcessLaunch",
    query: {
      package: selectedPackage.value,
      amount: currentPackage.value.price,
    },
  });
};

onMounted(() => {
  // Get the selected package and method from query params
  selectedPackage.value = (route.query.package as string) || "depart";
  selectedMethod.value = (route.query.method as string) || "orange";

  currentPackage.value =
    packageInfo[selectedPackage.value] || packageInfo.depart;
  currentMethod.value = paymentMethods[selectedMethod.value] || "Orange Money";
});
</script>

<style scoped>
.purchase-summary-page {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

.purchase-summary-page__header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 17px;
}

.purchase-summary-page__back-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  color: #153d1c;
}

.purchase-summary-page__title-section {
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 0 17px;
}

.purchase-summary-page__title {
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

.purchase-summary-page__subtitle {
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

.purchase-summary-page__summary {
  display: flex;
  padding: 32px 18px;
  flex-direction: column;
  gap: 32px;
  border-radius: 21.15px;
  margin: 0 32px;
}

.purchase-summary-page__item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.purchase-summary-page__item-info {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.purchase-summary-page__package-icon,
.purchase-summary-page__service-icon {
  color: #153d1c;
  font-family:
    Figtree,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-size: 40px;
  font-weight: 600;
  line-height: 142%;
  letter-spacing: -0.4px;
  text-transform: uppercase;
}

.purchase-summary-page__package-details,
.purchase-summary-page__service-details,
.purchase-summary-page__payment-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.purchase-summary-page__package-name,
.purchase-summary-page__service-title,
.purchase-summary-page__payment-title {
  color: #153d1c;
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

.purchase-summary-page__payment-title {
  font-size: 22px;
  letter-spacing: -0.22px;
  text-transform: none;
}

.purchase-summary-page__package-credits,
.purchase-summary-page__service-subtitle,
.purchase-summary-page__payment-subtitle {
  color: #153d1c;
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

.purchase-summary-page__payment-subtitle {
  font-size: 14px;
  font-weight: 400;
  letter-spacing: -0.14px;
  max-width: 296px;
}

.purchase-summary-page__item-pricing {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.purchase-summary-page__package-dash {
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

.purchase-summary-page__package-price {
  color: #31920b;
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

.purchase-summary-page__service-price {
  color: #31920b;
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
  text-transform: uppercase;
}

.purchase-summary-page__payment-logo {
  width: 52px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.purchase-summary-page__separator {
  width: 100%;
  height: 0.5px;
  background: rgba(21, 61, 28, 0.14);
}

.purchase-summary-page__total {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.purchase-summary-page__total-label {
  color: #153d1c;
  font-family:
    Figtree,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-size: 22px;
  font-weight: 600;
  line-height: 142%;
  letter-spacing: -0.22px;
}

.purchase-summary-page__total-price {
  color: #31920b;
  font-family:
    Figtree,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-size: 22px;
  font-weight: 900;
  line-height: 142%;
  letter-spacing: -0.22px;
}

.purchase-summary-page__actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 24px;
  padding: 0 38px;
}

@media (min-width: 768px) {
  .purchase-summary-page {
    max-width: 500px;
  }
}
</style>
