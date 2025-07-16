<template>
  <VAppLayout theme="success" :show-header="false">
    <div class="success-page">
      <div class="success-page__content">
        <VaniaLogo size="large" theme="success" />

        <div class="success-page__message">
          <h1 class="success-page__title">Parfait.</h1>
          <p class="success-page__subtitle">
            Votre compte a bien été mis à jour...
          </p>
        </div>
      </div>
    </div>
  </VAppLayout>
</template>

<script setup>
import VAppLayout from "../components/organisms/VAppLayout.vue";
import VaniaLogo from "../components/atoms/VaniaLogo.vue";

// Auto-redirect after 3 seconds (optional)
// setTimeout(() => {
//   router.push('/dashboard')
// }, 3000)
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
