<template>
  <header class="user-header-section" data-bind="user-header-section">
    <!-- Avatar utilisateur (atom) -->
    <VAvatar :src="user.avatar" :alt="user.name" size="medium" class="user-avatar" />
    <!-- Infos utilisateur (nom, crédits, menu) -->
    <div class="user-details">
      <div class="user-name-section">
        <h1 class="user-name">{{ user.name }}</h1>
        <!-- Bouton menu déroulant (icon atom) -->
        <button class="dropdown-button" @click="$emit('toggleUserMenu')" aria-label="Menu utilisateur">
          <DropdownIcon />
        </button>
      </div>
      <div class="credits-section">
        <span class="country-flag">{{ user.countryFlag }}</span>
        <span class="separator-dot"></span>
        <span class="credits-text">{{ user.credits }} crédits</span>
        <span class="credits-icon">🪙</span>
      </div>
    </div>
    <!-- Bouton actions supplémentaires (icon atom) -->
    <button class="more-actions-button" @click="$emit('toggleMoreMenu')" aria-label="Plus d'actions">
      <MoreIcon />
    </button>
  </header>
</template>

<script lang="ts" setup>
// Organism : UserHeaderSection
// Inspiré du dashboard Notion mobile pour la clarté et la hiérarchie visuelle
// Props strictement alignées sur les données Dashboard, sans invention
import { defineProps, defineEmits } from 'vue';
import VAvatar from '../atoms/VAvatar.vue';
import DropdownIcon from '../atoms/icons/DropdownIcon.vue';
import MoreIcon from '../atoms/icons/MoreIcon.vue';

type User = {
  avatar: string;
  name: string;
  credits: number;
  countryFlag: string;
};

defineProps<{ user: User }>();
defineEmits(['toggleUserMenu', 'toggleMoreMenu']);
</script>

<style scoped>
/* TODO: Adapter le style pour une ergonomie mobile façon Notion, sans inventer de couleurs ou de layout non présents dans la maquette */
.user-header-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0.5rem;
}
.user-details {
  flex: 1;
  margin-left: 1rem;
}
.user-name-section {
  display: flex;
  align-items: center;
}
.credits-section {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.25rem;
}
</style> 