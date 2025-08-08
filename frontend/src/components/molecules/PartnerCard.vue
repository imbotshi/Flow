<template>
  <div :class="['partner-card', statusClass]" @click="$emit('click')" tabindex="0" :aria-label="`Voir le profil de ${name}`" style="cursor:pointer;" @keydown.enter="$emit('click')">
    <div class="partner-status-header">
      <span class="status-text">{{ statusText }}</span>
    </div>
    <div class="partner-content">
      <div class="partner-avatar">
        <slot name="avatar">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="24" :fill="avatarBg" />
            <circle cx="24" cy="20" r="8" fill="#888" />
            <ellipse cx="24" cy="40" rx="12" ry="8" fill="#888" />
          </svg>
        </slot>
      </div>
      <div class="partner-info">
        <h3 class="partner-name">{{ name }}</h3>
        <p class="partner-role">{{ role }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
  name: { type: String, required: true },
  role: { type: String, required: true },
  status: { type: String, default: 'due-soon' }, // 'overdue', 'due-soon', 'paid'
  statusText: { type: String, required: true },
  avatarBg: { type: String, default: '#E0E0E0' },
});
const statusClass = computed(() => {
  if (props.status === 'overdue') return 'partner-card--overdue';
  if (props.status === 'due-soon') return 'partner-card--due-soon';
  if (props.status === 'paid') return 'partner-card--paid';
  return '';
});
</script>

<style scoped>
.partner-card {
  min-width: 140px;
  height: 160px;
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
  transition: box-shadow 0.16s, transform 0.16s;
  cursor: pointer;
}
.partner-card:focus, .partner-card:hover {
  box-shadow: 0 4px 16px rgba(49,146,11,0.12);
  transform: translateY(-2px) scale(1.03);
  outline: 2px solid var(--secondary-green);
}
.partner-card--overdue .partner-status-header {
  background: #ef1524;
}
.partner-card--due-soon .partner-status-header {
  background: #fb9700;
}
.partner-card--paid .partner-status-header {
  background: #31920b;
}
.partner-status-header {
  height: 60px;
  border-radius: 16px 16px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  width: 100%;
}
.status-text {
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.6;
  letter-spacing: -0.14px;
  text-align: center;
}
.partner-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 16px;
  flex: 1;
}
.partner-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}
.partner-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  text-align: center;
}
.partner-name {
  color: #153d1c;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.6;
  letter-spacing: -0.16px;
  margin: 0;
}
.partner-role {
  color: #6b7280;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.6;
  letter-spacing: -0.14px;
  margin: 0;
}
</style> 