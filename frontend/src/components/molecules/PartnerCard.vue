<template>
  <article class="partner-card" :class="getPartnerCardClasses(partner.status)" tabindex="0" role="button" :aria-label="`Voir le profil de ${partner.name}`">
    <div class="partner-status-container">
      <VBadge :variant="getStatusVariant(partner.status)" class="partner-status-badge">
        {{ getStatusText(partner.status) }}
      </VBadge>
    </div>
    <div class="partner-info-container">
      <VAvatar :src="partner.avatar" :alt="partner.name" size="medium" class="partner-avatar" />
      <div class="partner-details">
        <h3 class="partner-name">{{ partner.name }}</h3>
        <p class="partner-role">{{ partner.role }}</p>
      </div>
    </div>
  </article>
</template>

<script lang="ts" setup>
// Molecule : PartnerCard
// Inspiré du dashboard Notion mobile pour la clarté et la hiérarchie visuelle
// Props strictement alignées sur les données Dashboard, sans invention
import VAvatar from '../atoms/VAvatar.vue';
import VBadge from '../atoms/VBadge.vue';
import { defineProps } from 'vue';

type Partner = {
  id: string | number;
  name: string;
  avatar: string;
  role: string;
  status: string;
};

defineProps<{ partner: Partner }>();

function getStatusVariant(status: string) {
  // TODO: Adapter selon les statuts réels du Dashboard
  switch (status) {
    case 'active': return 'success';
    case 'inactive': return 'default';
    default: return 'info';
  }
}

function getStatusText(status: string) {
  // TODO: Adapter selon les statuts réels du Dashboard
  switch (status) {
    case 'active': return 'Actif';
    case 'inactive': return 'Inactif';
    default: return status;
  }
}

function getPartnerCardClasses(status: string) {
  // TODO: Adapter les classes selon le statut pour l'accessibilité visuelle
  return status === 'active' ? 'active' : 'inactive';
}
</script>

<style scoped>
/* TODO: Adapter le style pour une carte mobile agréable façon Notion, sans inventer de visuels non présents dans la maquette */
.partner-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  min-width: 160px;
  background: #fff;
  cursor: pointer;
  transition: box-shadow 0.2s;
}
.partner-card.active {
  border: 2px solid #4caf50;
}
.partner-card.inactive {
  opacity: 0.6;
}
.partner-status-container {
  margin-bottom: 0.5rem;
}
.partner-info-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.partner-name {
  font-size: 1.1rem;
  font-weight: 600;
}
.partner-role {
  font-size: 0.95rem;
  color: #888;
}
</style> 