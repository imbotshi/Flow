<template>
  <button class="floating-action-button" @click="$emit('addPartner')" aria-label="Ajouter un nouveau partenaire">
    <AddIcon />
    <span>Ajouter</span>
  </button>
</template>

<script lang="ts" setup>
// Atom : FloatingActionButton
// Inspiré du dashboard Notion mobile pour la clarté et la hiérarchie visuelle
// Props strictement alignées sur les besoins Dashboard, sans invention
import AddIcon from './icons/AddIcon.vue';
import { defineEmits } from 'vue';

defineEmits(['addPartner']);
</script>

<style scoped>
/* TODO: Adapter le style pour un bouton flottant mobile agréable façon Notion, sans inventer de visuels non présents dans la maquette */
.floating-action-button {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #4caf50;
  color: #fff;
  border: none;
  border-radius: 50px;
  padding: 0.75rem 1.5rem;
  font-size: 1.1rem;
  box-shadow: 0 4px 16px rgba(0,0,0,0.12);
  cursor: pointer;
  z-index: 1000;
  transition: background 0.2s;
}
.floating-action-button:hover {
  background: #388e3c;
}
</style> 