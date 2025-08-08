<template>
  <nav :class="['dashboard-menu', { 'sidebar': sidebar }]" role="navigation" aria-label="Menu utilisateur">
    <ul class="dashboard-menu-list">
      <li>
        <button class="dashboard-menu-item" @click="$emit('select', 'editProfile')">
          <svg class="dashboard-menu-icon" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M8 8C10.2091 8 12 6.20914 12 4C12 1.79086 10.2091 0 8 0C5.79086 0 4 1.79086 4 4C4 6.20914 5.79086 8 8 8Z" fill="#153D1C"/><path d="M8 10C3.58172 10 0 13.5817 0 18H16C16 13.5817 12.4183 10 8 10Z" fill="#153D1C"/></svg>
          Modifier mon profil
        </button>
      </li>
      <li>
        <button class="dashboard-menu-item" @click="$emit('select', 'archives')">
          <svg class="dashboard-menu-icon" width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="2" width="16" height="16" rx="3" fill="#31920b"/><path d="M6 6H14M6 10H14M6 14H10" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg>
          Archives
        </button>
      </li>
      <li>
        <button class="dashboard-menu-item dashboard-menu-logout" @click="$emit('select', 'logout')">
          <svg class="dashboard-menu-icon" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M8 18H4C2.89543 18 2 17.1046 2 16V4C2 2.89543 2.89543 2 4 2H8M12 14L16 10L12 6M16 10H8" stroke="#ef1524" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Déconnexion
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup>
const props = defineProps({
  sidebar: { type: Boolean, default: false }
});
</script>

<style scoped>
.dashboard-menu {
  background: var(--white);
  border-radius: 24px;
  box-shadow: 0 4px 20px rgba(21, 61, 28, 0.10);
  padding: 18px 0;
  min-width: 220px;
  max-width: 320px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0;
}
.dashboard-menu.sidebar {
  height: 100vh;
  min-width: 220px;
  max-width: 320px;
  border-radius: 0 24px 24px 0;
  box-shadow: 2px 0 24px rgba(21, 61, 28, 0.10);
}
.dashboard-menu-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.dashboard-menu-item {
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 16px;
  font-weight: 600;
  color: var(--primary-green);
  background: none;
  border: none;
  padding: 14px 24px;
  border-radius: 18px;
  cursor: pointer;
  transition: background 0.16s, color 0.16s;
  outline: none;
}
.dashboard-menu-item:focus, .dashboard-menu-item:hover {
  background: var(--light-gray);
  color: var(--secondary-green);
}
.dashboard-menu-logout {
  color: #ef1524;
}
.dashboard-menu-logout:focus, .dashboard-menu-logout:hover {
  background: #fff0f0;
  color: #ef1524;
}
.dashboard-menu-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}
</style> 