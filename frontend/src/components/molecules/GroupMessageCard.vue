<template>
  <VCard class="message-card">
    <div class="message-content-container">
      <div class="message-text-container">
        <p class="message-text">{{ groupMessage.text }}</p>
        <div class="message-sync-indicator">
          <span class="sync-text">Synchronisé sur</span>
          <div class="sync-icon">
            <!-- TODO: Icône de synchronisation à ajouter si présente dans la maquette Figma -->
          </div>
        </div>
      </div>
      <div class="message-schedule">
        <div class="schedule-date">
          <VBadge variant="info">{{ groupMessage.date }}</VBadge>
        </div>
        <div class="schedule-time">
          <VBadge variant="info">{{ groupMessage.time }}</VBadge>
        </div>
      </div>
    </div>
    <div class="message-controls">
      <div class="auto-reminders-section">
        <h3 class="reminders-title">Relances automatiques</h3>
        <div class="reminder-tags">
          <VTag
            v-for="partner in autoReminderPartners"
            :key="partner"
            variant="success"
            closable
            @close="() => $emit('removePartnerFromReminders', partner)"
          >
            {{ partner }}
          </VTag>
          <button class="add-partner-tag" @click="$emit('openAddPartnerModal')" aria-label="Ajouter un partenaire aux relances automatiques">
            <span>Ajouter</span>
            <UserAddIcon />
          </button>
        </div>
      </div>
      <div class="toggle-section">
        <label class="toggle-switch">
          <input type="checkbox" :checked="autoReminders" @change="$emit('update:autoReminders', $event.target.checked)" class="toggle-input" aria-label="Activer/désactiver les relances automatiques" />
          <span class="toggle-slider">
            <span class="toggle-handle"></span>
          </span>
        </label>
      </div>
    </div>
    <div class="schedule-action">
      <VButton
        variant="accent"
        size="large"
        full-width
        :loading="isScheduling"
        class="schedule-button"
        @click="$emit('scheduleMessage')"
        aria-label="Programmer le message de relance"
      >
        Programmer le message 🪙
      </VButton>
    </div>
  </VCard>
</template>

<script lang="ts" setup>
// Molecule : GroupMessageCard
// Inspiré du dashboard Notion mobile pour la clarté et la hiérarchie visuelle
// Props strictement alignées sur les données Dashboard, sans invention
import VCard from '../atoms/VCard.vue';
import VBadge from '../atoms/VBadge.vue';
import VTag from '../atoms/VTag.vue';
import VButton from '../atoms/VButton.vue';
// SyncIcon import removed - not present in original Figma design
import UserAddIcon from '../atoms/icons/UserAddIcon.vue';
import { defineProps, defineEmits } from 'vue';

type GroupMessage = {
  text: string;
  date: string;
  time: string;
};

defineProps<{
  groupMessage: GroupMessage;
  autoReminderPartners: string[];
  autoReminders: boolean;
  isScheduling: boolean;
}>();

defineEmits(['removePartnerFromReminders', 'openAddPartnerModal', 'scheduleMessage', 'update:autoReminders']);
</script>

<style scoped>
/* TODO: Adapter le style pour une carte mobile agréable façon Notion, sans inventer de visuels non présents dans la maquette */
.message-card {
  margin: 1rem 0;
  padding: 1rem;
}
</style> 