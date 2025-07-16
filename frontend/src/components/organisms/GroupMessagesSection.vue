<template>
  <section class="messages-section" data-bind="messages-section">
    <h2 class="section-title">Mes relances groupées</h2>
    <GroupMessageCard
      :groupMessage="groupMessage"
      :autoReminderPartners="autoReminderPartners"
      :autoReminders="autoReminders"
      :isScheduling="isScheduling"
      @removePartnerFromReminders="removePartnerFromReminders"
      @openAddPartnerModal="openAddPartnerModal"
      @scheduleMessage="scheduleMessage"
    />
  </section>
</template>

<script lang="ts" setup>
// Organism : GroupMessagesSection
// Inspiré du dashboard Notion mobile pour la clarté et la hiérarchie visuelle
// Props strictement alignées sur les données Dashboard, sans invention
import GroupMessageCard from '../molecules/GroupMessageCard.vue';
import { defineProps } from 'vue';

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
  removePartnerFromReminders: (partner: string) => void;
  openAddPartnerModal: () => void;
  scheduleMessage: () => void;
}>();
</script>

<style scoped>
/* TODO: Adapter le style pour une ergonomie mobile façon Notion, sans inventer de visuels non présents dans la maquette */
.messages-section {
  margin: 1.5rem 0;
}
</style> 