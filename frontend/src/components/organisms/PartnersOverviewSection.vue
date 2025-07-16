<template>
  <section class="partners-section" data-bind="partners-section">
    <h2 class="section-title">Mes partenaires en un coup d'Œil...</h2>
    <div class="partners-grid-container">
      <div class="partners-grid">
        <PartnerCard
          v-for="partner in partners"
          :key="partner.id"
          :partner="partner"
          @click="goToPartnerProfile(partner.id)"
          @keydown="handlePartnerCardKeydown($event, partner.id)"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
// Organism : PartnersOverviewSection
// Inspiré du dashboard Notion mobile pour la grille et la lisibilité
// Props strictement alignées sur les données Dashboard, sans invention
import PartnerCard from '../molecules/PartnerCard.vue';
import { defineProps } from 'vue';

type Partner = {
  id: string | number;
  name: string;
  avatar: string;
  role: string;
  status: string;
};

defineProps<{
  partners: Partner[];
  goToPartnerProfile: (id: string | number) => void;
  handlePartnerCardKeydown: (event: KeyboardEvent, id: string | number) => void;
}>();
</script>

<style scoped>
/* TODO: Adapter le style pour une grille mobile agréable façon Notion, sans inventer de visuels non présents dans la maquette */
.partners-section {
  margin: 1.5rem 0;
}
.partners-grid-container {
  overflow-x: auto;
}
.partners-grid {
  display: flex;
  gap: 1rem;
}
</style> 