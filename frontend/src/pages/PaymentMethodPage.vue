<template>
  <div class="payment-method-page">
    <!-- Header -->
    <div class="payment-method-page__header">
      <button class="payment-method-page__back-btn" @click="goBack">
        <BackIcon />
      </button>
      <div class="payment-method-page__country">
        <span class="payment-method-page__flag">🇨🇲</span>
      </div>
    </div>

    <!-- Title Section -->
    <div class="payment-method-page__title-section">
      <h1 class="payment-method-page__title">Méthodes de paiement</h1>
      <p class="payment-method-page__subtitle">
        Sélectionnez le moyen de paiement qui vous convient le mieux.
      </p>
    </div>

    <!-- Selected Package Summary -->
    <VCard class="payment-method-page__package-summary">
      <div class="payment-method-page__package-info">
        <div class="payment-method-page__package-icon">🧭</div>
        <div class="payment-method-page__package-details">
          <h3 class="payment-method-page__package-name">Pack Départ</h3>
          <p class="payment-method-page__package-credits">20 crédits</p>
        </div>
      </div>
      <div class="payment-method-page__package-pricing">
        <span class="payment-method-page__package-dash">-</span>
        <span class="payment-method-page__package-price">500 FCFA</span>
      </div>
    </VCard>

    <!-- Payment Methods Section -->
    <div class="payment-method-page__section">
      <h2 class="payment-method-page__section-title">Payer avec</h2>
      <div class="payment-method-page__payment-methods">
        <!-- Orange Money -->
        <VCard
          class="payment-method-page__payment-method"
          :class="{
            'payment-method-page__payment-method--selected':
              selectedMethod === 'orange',
          }"
          @click="selectPaymentMethod('orange')"
        >
          <div class="payment-method-page__method-content">
            <div
              class="payment-method-page__method-logo payment-method-page__method-logo--orange"
            >
              <svg width="39" height="27" viewBox="0 0 39 27" fill="none">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M16.1108 5.54443H4.98036C4.38931 5.55677 3.82663 5.80022 3.41298 6.22258C2.99934 6.64495 2.76768 7.21259 2.76768 7.80377C2.76768 8.39495 2.99934 8.96259 3.41298 9.38495C3.82663 9.80732 4.38931 10.0508 4.98036 10.0631H10.655L1.52031 19.1993C1.0965 19.6231 0.858398 20.1979 0.858398 20.7973C0.858398 21.3966 1.0965 21.9715 1.52031 22.3953C1.94413 22.8191 2.51895 23.0572 3.11832 23.0572C3.71769 23.0572 4.29251 22.8191 4.71632 22.3953L13.851 13.2596V18.9347C13.851 19.5341 14.0891 20.1089 14.5129 20.5327C14.9367 20.9565 15.5115 21.1946 16.1108 21.1946C16.7102 21.1946 17.285 20.9565 17.7088 20.5327C18.1326 20.1089 18.3707 19.5341 18.3707 18.9347V7.80426C18.3707 7.20492 18.1326 6.63012 17.7088 6.20632C17.285 5.78252 16.7102 5.54443 16.1108 5.54443Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M22.8897 21.1939H34.0197C34.3204 21.2002 34.6193 21.1464 34.8989 21.0357C35.1785 20.9249 35.4332 20.7595 35.648 20.5491C35.8629 20.3387 36.0336 20.0875 36.1501 19.8102C36.2666 19.533 36.3267 19.2353 36.3267 18.9346C36.3267 18.6338 36.2666 18.3361 36.1501 18.0589C36.0336 17.7817 35.8629 17.5305 35.648 17.3201C35.4332 17.1096 35.1785 16.9442 34.8989 16.8335C34.6193 16.7228 34.3204 16.669 34.0197 16.6752H28.3455L37.4802 7.53957C37.9041 7.11575 38.1421 6.54093 38.1421 5.94156C38.1421 5.34219 37.9041 4.76737 37.4802 4.34356C37.0564 3.91974 36.4816 3.68164 35.8822 3.68164C35.2829 3.68164 34.708 3.91974 34.2842 4.34356L25.1495 13.4792V7.80361C25.1495 7.20426 24.9114 6.62947 24.4876 6.20567C24.0638 5.78187 23.489 5.54378 22.8897 5.54378C22.2904 5.54378 21.7156 5.78187 21.2918 6.20567C20.868 6.62947 20.6299 7.20426 20.6299 7.80361V18.9336C20.6299 19.5329 20.868 20.1077 21.2918 20.5315C21.7156 20.9553 22.2904 21.1934 22.8897 21.1934"
                  fill="#FF7900"
                />
              </svg>
            </div>
            <span class="payment-method-page__method-name">Orange Money</span>
          </div>
        </VCard>

        <!-- MTN MoMo -->
        <VCard
          class="payment-method-page__payment-method"
          :class="{
            'payment-method-page__payment-method--selected':
              selectedMethod === 'mtn',
          }"
          @click="selectPaymentMethod('mtn')"
        >
          <div class="payment-method-page__method-content">
            <div class="payment-method-page__method-logo">
              <img
                src="https://via.placeholder.com/52x28/e1f524/000000?text=MTN"
                alt="MTN MoMo"
                class="payment-method-page__method-image"
              />
            </div>
            <span class="payment-method-page__method-name">MTN Momo</span>
          </div>
        </VCard>

        <!-- PayPal -->
        <VCard
          class="payment-method-page__payment-method"
          :class="{
            'payment-method-page__payment-method--selected':
              selectedMethod === 'paypal',
          }"
          @click="selectPaymentMethod('paypal')"
        >
          <div class="payment-method-page__method-content">
            <div class="payment-method-page__method-logo">
              <svg width="44" height="12" viewBox="0 0 44 12" fill="none">
                <path
                  d="M38.1418 2.73013L37.2274 8.46106C37.224 8.48211 37.2252 8.50364 37.231 8.52416C37.2368 8.54468 37.247 8.56369 37.261 8.57985C37.2749 8.59601 37.2922 8.60893 37.3117 8.61771C37.3312 8.62649 37.3523 8.63091 37.3737 8.63067H38.4558C38.494 8.631 38.5311 8.61767 38.5602 8.5931C38.5894 8.56854 38.6088 8.53436 38.6149 8.49676L39.5293 2.76583C39.5327 2.74478 39.5315 2.72325 39.5257 2.70273C39.5199 2.68221 39.5097 2.6632 39.4957 2.64704C39.4818 2.63088 39.4645 2.61796 39.445 2.60918C39.4255 2.6004 39.4044 2.59598 39.383 2.59622H38.3009C38.2626 2.59547 38.2253 2.60864 38.196 2.63328C38.1668 2.65792 38.1475 2.69235 38.1418 2.73013ZM36.9863 4.40255H35.9595C35.9214 4.40218 35.8844 4.41547 35.8552 4.44C35.8261 4.46453 35.8067 4.49868 35.8007 4.53624L35.7667 4.74722C35.7667 4.74722 34.9692 3.88464 33.5573 4.46758C32.7473 4.80133 32.3585 5.4909 32.193 5.99608C32.193 5.99608 31.6679 7.53141 32.8556 8.37649C32.8556 8.37649 33.9568 9.18928 35.1969 8.32647L35.1755 8.46106C35.1705 8.49268 35.1761 8.52505 35.1913 8.55322C35.2065 8.58138 35.2306 8.6038 35.2598 8.61703C35.2792 8.62612 35.3004 8.63067 35.3218 8.63067H36.3492C36.3875 8.63143 36.4248 8.61825 36.4541 8.59361C36.4833 8.56897 36.5026 8.53454 36.5083 8.49676L37.1333 4.57216C37.1368 4.55114 37.1355 4.52961 37.1297 4.50912C37.1238 4.48863 37.1134 4.46971 37.0993 4.45371C37.0854 4.43741 37.068 4.42436 37.0485 4.41548C37.029 4.4066 37.0077 4.40234 36.9863 4.40255ZM35.4754 6.57152C35.4354 6.84572 35.2964 7.09593 35.0846 7.27518C34.8718 7.45509 34.6011 7.55223 34.3222 7.54869C34.2128 7.54996 34.1039 7.53415 33.9995 7.50185C33.5562 7.36089 33.3032 6.93938 33.3759 6.4824C33.4163 6.20832 33.5554 5.95832 33.7672 5.77919C33.9798 5.59918 34.2503 5.50174 34.5291 5.50477C34.6385 5.50364 34.7474 5.5196 34.8519 5.55206C35.2979 5.69211 35.5497 6.11431 35.4766 6.57175H35.4754V6.57152Z"
                  fill="#0070E0"
                />
                <path
                  d="M25.9622 4.49997L24.7238 6.57004L24.0952 4.51521C24.0853 4.48242 24.0651 4.4537 24.0375 4.4334C24.0098 4.4131 23.9763 4.40231 23.942 4.40267H22.8243C22.7954 4.40228 22.7673 4.41232 22.7453 4.43096C22.7232 4.44959 22.7086 4.47556 22.7042 4.50407C22.7015 4.52297 22.7035 4.54225 22.7099 4.56022L23.8363 8.02147L22.8175 9.65251C22.8089 9.66594 22.803 9.68099 22.8004 9.69673C22.7978 9.71248 22.7984 9.72859 22.8023 9.74408C22.8061 9.75958 22.8131 9.77413 22.8228 9.78684C22.8324 9.79956 22.8446 9.81017 22.8585 9.81803C22.8772 9.82871 22.8983 9.83421 22.9198 9.83394H24.1237C24.158 9.83406 24.1918 9.82533 24.2218 9.80861C24.2518 9.79188 24.2769 9.76772 24.2948 9.73845L27.4409 4.58501C27.4523 4.56706 27.4586 4.54635 27.459 4.5251C27.4595 4.50386 27.4541 4.48291 27.4434 4.46451C27.4328 4.44604 27.4174 4.43076 27.3989 4.42024C27.3803 4.40973 27.3593 4.40436 27.3379 4.40471H26.1345C26.1 4.4044 26.066 4.413 26.0358 4.4297C26.0056 4.44639 25.9803 4.4706 25.9622 4.49997Z"
                  fill="#003087"
                />
              </svg>
            </div>
            <span class="payment-method-page__method-name">PayPal</span>
          </div>
        </VCard>
      </div>
    </div>

    <!-- Continue Button -->
    <div class="payment-method-page__actions">
      <VButton
        variant="primary"
        size="large"
        full-width
        @click="proceedToSummary"
        :disabled="!selectedMethod"
      >
        Continuer
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

const selectedMethod = ref<string>("");
const selectedPackage = ref<string>("");

const selectPaymentMethod = (method: string) => {
  selectedMethod.value = method;
};

const goBack = () => {
  router.go(-1);
};

const proceedToSummary = () => {
  if (selectedMethod.value) {
    router.push({
      name: "PurchaseSummary",
      query: {
        package: selectedPackage.value,
        method: selectedMethod.value,
      },
    });
  }
};

onMounted(() => {
  // Get the selected package from query params
  selectedPackage.value = (route.query.package as string) || "depart";
});
</script>

<style scoped>
.payment-method-page {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

.payment-method-page__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 17px;
}

.payment-method-page__back-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  color: #153d1c;
}

.payment-method-page__country {
  display: flex;
  padding: 6.5px 4px;
  justify-content: center;
  align-items: center;
  border-radius: 32px;
  background: #fff;
}

.payment-method-page__flag {
  font-size: 16px;
  line-height: 144%;
  letter-spacing: -0.16px;
}

.payment-method-page__title-section {
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 0 17px;
}

.payment-method-page__title {
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

.payment-method-page__subtitle {
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

.payment-method-page__package-summary {
  display: flex;
  padding: 32px 18px;
  justify-content: center;
  align-items: center;
  gap: 32px;
  border-radius: 21.15px;
  border: 1px solid #31920b;
  margin: 0 32px;
}

.payment-method-page__package-info {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
}

.payment-method-page__package-icon {
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

.payment-method-page__package-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 12px;
}

.payment-method-page__package-name {
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

.payment-method-page__package-credits {
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

.payment-method-page__package-pricing {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.payment-method-page__package-dash {
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

.payment-method-page__package-price {
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

.payment-method-page__section {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 0 31px;
}

.payment-method-page__section-title {
  color: rgba(21, 61, 28, 0.64);
  font-family:
    Figtree,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-size: 18px;
  font-weight: 600;
  line-height: 160%;
  letter-spacing: -0.18px;
  margin: 0;
}

.payment-method-page__payment-methods {
  display: flex;
  align-items: flex-start;
  gap: 9px;
  flex-wrap: wrap;
}

.payment-method-page__payment-method {
  display: flex;
  width: 120px;
  height: 113px;
  padding: 27px 15px;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
  border-radius: 15px;
  background: #fff;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid transparent;
}

.payment-method-page__payment-method--selected {
  border-color: #31920b;
  box-shadow: 0 0 0 2px rgba(49, 146, 11, 0.2);
}

.payment-method-page__payment-method:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(21, 61, 28, 0.1);
}

.payment-method-page__method-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
  width: 100%;
}

.payment-method-page__method-logo {
  display: flex;
  width: 44px;
  justify-content: center;
  align-items: center;
  gap: 15px;
}

.payment-method-page__method-logo--orange {
  background: #31920b;
  padding: 6px;
  border-radius: 8px;
}

.payment-method-page__method-image {
  width: 100%;
  height: auto;
  object-fit: contain;
}

.payment-method-page__method-name {
  color: #0a200e;
  font-family:
    Figtree,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 124%;
  letter-spacing: -0.14px;
}

.payment-method-page__actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 24px;
  padding: 0 31px;
}

@media (min-width: 768px) {
  .payment-method-page {
    max-width: 500px;
  }
}
</style>
