<template>
  <section class="actions-section" data-bind="actions-section">
    <h2 class="section-title">Actions récentes</h2>
    <VCard class="actions-card">
      <ul class="actions-list">
        <ActionItem
          v-for="action in recentActions"
          :key="action.id"
          :action="action"
        />
      </ul>
      <div class="actions-divider"></div>
      <button class="show-more-button" @click="loadMoreActions" aria-label="Afficher plus d'actions">
        <MoreIcon />
        <span>Afficher plus</span>
      </button>
    </VCard>
  </section>
</template>

<script lang="ts" setup>
// Organism : RecentActionsSection
// Inspiré du dashboard Notion mobile pour la clarté et la hiérarchie visuelle
// Props strictement alignées sur les données Dashboard, sans invention
import VCard from '../atoms/VCard.vue';
import MoreIcon from '../atoms/icons/MoreIcon.vue';
import ActionItem from '../molecules/ActionItem.vue';
import { defineProps } from 'vue';

type Action = {
  id: string | number;
  type: string;
  text: string;
  datetime: string;
  time: string;
};

defineProps<{
  recentActions: Action[];
  loadMoreActions: () => void;
}>();
</script>

<style scoped>
/* TODO: Adapter le style pour une ergonomie mobile façon Notion, sans inventer de visuels non présents dans la maquette */
.actions-section {
  margin: 1.5rem 0;
}
.actions-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.actions-divider {
  height: 1px;
  background: #eee;
  margin: 1rem 0;
}
</style> 