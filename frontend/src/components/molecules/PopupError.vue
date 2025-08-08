<template>
  <transition name="fade-slide">
    <div v-if="visible" class="popup-overlay" role="dialog" aria-modal="true" tabindex="-1">
      <div class="popup-content">
        <div class="popup-icon error">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="24" fill="#fff0f0"/><path d="M16 16L32 32M32 16L16 32" stroke="#ef1524" stroke-width="3.5" stroke-linecap="round"/></svg>
        </div>
        <div class="popup-message">{{ message }}</div>
        <button class="popup-btn" @click="$emit('close')">OK</button>
      </div>
    </div>
  </transition>
</template>

<script setup>
const props = defineProps({
  message: { type: String, required: true },
  visible: { type: Boolean, default: false }
});
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(21,61,28,0.18);
  z-index: 3000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.popup-content {
  background: #fff;
  border-radius: 32px;
  box-shadow: 0 8px 40px 0 rgba(21,61,28,0.10), 0 2px 12px rgba(21,61,28,0.12);
  padding: 36px 32px 28px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  min-width: 280px;
  max-width: 90vw;
}
.popup-icon.error {
  margin-bottom: 8px;
}
.popup-message {
  font-size: 18px;
  color: #ef1524;
  font-weight: 600;
  text-align: center;
  margin-bottom: 8px;
}
.popup-btn {
  background: #ef1524;
  color: #fff;
  border: none;
  border-radius: 24px;
  font-size: 17px;
  font-weight: 700;
  padding: 12px 38px;
  cursor: pointer;
  margin-top: 8px;
  transition: background 0.18s;
}
.popup-btn:focus, .popup-btn:hover {
  background: var(--primary-green);
  outline: none;
}
</style> 