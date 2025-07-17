<template>
  <div :class="['text-status', statusClass]">
    <span v-if="status === 'pending'">⏳ Enregistrement en cours... ({{ processName }})</span>
    <span v-else-if="status === 'success'">✅ Succès de l'enregistrement – {{ processName }}</span>
    <span v-else-if="status === 'error'">❌ Erreur lors de la sauvegarde – {{ processName }}</span>
    <span v-else>{{ message }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
  status: { type: String, default: 'pending' }, // 'pending', 'success', 'error'
  processName: { type: String, default: 'Création du profil Vania' },
  message: { type: String, default: '' }
});
const statusClass = computed(() => {
  if (props.status === 'success') return 'text-status--success';
  if (props.status === 'error') return 'text-status--error';
  return 'text-status--pending';
});
</script>

<style scoped>
.text-status {
  font-size: 18px;
  font-weight: 500;
  margin: 18px 0;
  padding: 12px 18px;
  border-radius: 12px;
  text-align: center;
  transition: background 0.2s;
}
.text-status--pending {
  background: #fffbe6;
  color: #bfa100;
  border: 1.5px solid #ffe066;
}
.text-status--success {
  background: #e6ffe6;
  color: #31920b;
  border: 1.5px solid #43c300;
}
.text-status--error {
  background: #fff0f0;
  color: #eb002d;
  border: 1.5px solid #eb002d;
}
</style> 