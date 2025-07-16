<template>
  <li class="action-item" :data-bind="`action-item-${action.id}`">
    <div class="action-info">
      <div class="action-icon">
        <component :is="getActionIcon(action.type)" />
      </div>
      <span class="action-text">{{ action.text }}</span>
    </div>
    <time class="action-time" :datetime="action.datetime">
      {{ action.time }}
    </time>
  </li>
</template>

<script lang="ts" setup>
// Molecule : ActionItem
// Inspiré du dashboard Notion mobile pour la clarté et la hiérarchie visuelle
// Props strictement alignées sur les données Dashboard, sans invention
import { defineProps } from 'vue';

type Action = {
  id: string | number;
  type: string;
  text: string;
  datetime: string;
  time: string;
};

defineProps<{ action: Action }>();

function getActionIcon(type: string) {
  // TODO: Retourner le composant d'icône approprié selon le type d'action
  // Exemples : 'add' => AddIcon, 'edit' => EditIcon, etc.
  return 'span'; // Placeholder
}
</script>

<style scoped>
/* TODO: Adapter le style pour un item mobile agréable façon Notion, sans inventer de visuels non présents dans la maquette */
.action-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f0f0f0;
}
.action-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.action-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.action-text {
  font-size: 1rem;
}
.action-time {
  font-size: 0.9rem;
  color: #aaa;
}
</style> 