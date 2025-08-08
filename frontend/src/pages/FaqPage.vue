<template>
  <VAppLayout theme="light">
    <main class="faq-container">
      <h1 class="faq-title">Aide & Service Client</h1>
      <div class="faq-list">
        <div v-for="faq in faqs" :key="faq.q" class="faq-item">
          <div class="faq-question">{{ faq.q }}</div>
          <div class="faq-answer">{{ faq.a }}</div>
        </div>
      </div>
      <div class="faq-contact">
        <p>Vous n'avez pas trouvé votre réponse ?</p>
        <VButton variant="primary" size="large" @click="contactSupport">Contacter le support</VButton>
      </div>
    </main>
  </VAppLayout>
</template>

<script setup>
import { ref } from 'vue';
import VAppLayout from '../components/organisms/VAppLayout.vue';
import VButton from '../components/atoms/VButton.vue';

const faqs = ref([
  { q: 'Comment acheter des crédits ?', a: 'Allez dans la section Crédits, choisissez un pack et suivez les instructions.' },
  { q: 'Comment modifier mon profil ?', a: 'Depuis le menu, cliquez sur Modifier mon profil.' },
  { q: 'Comment programmer une relance ?', a: 'Dans le dashboard ou les archives, cliquez sur Programmer le message.' },
  { q: 'Que faire si mes crédits sont insuffisants ?', a: 'Achetez un nouveau pack de crédits dans la section Crédits.' },
  { q: 'Comment contacter le support ?', a: 'Utilisez le bouton ci-dessous pour nous écrire.' },
]);

function contactSupport() {
  window.open('mailto:support@vaniaflow.com', '_blank');
}
</script>

<style scoped>
.faq-container {
  max-width: 420px;
  margin: 0 auto;
  padding: 32px 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.faq-title {
  color: #153d1c;
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 18px;
  text-align: center;
}
.faq-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.faq-item {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 8px rgba(21,61,28,0.07);
  padding: 18px 16px;
}
.faq-question {
  color: #153d1c;
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 6px;
}
.faq-answer {
  color: #6b7280;
  font-size: 15px;
  font-weight: 400;
}
.faq-contact {
  margin-top: 32px;
  text-align: center;
  color: #153d1c;
  font-size: 16px;
}
</style> 