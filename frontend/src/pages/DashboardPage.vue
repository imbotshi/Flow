<template>
  <VAppLayout theme="light">
    <main class="dashboard-container" role="main" data-bind="dashboard-page">
      <!-- User Header Section -->
      <UserHeaderSection
        :user="user"
        @toggleUserMenu="toggleUserMenu"
        @toggleMoreMenu="toggleMoreMenu"
      />

      <!-- Partners Overview Section -->
      <PartnersOverviewSection
        :partners="partners"
        :goToPartnerProfile="goToPartnerProfile"
        :handlePartnerCardKeydown="handlePartnerCardKeydown"
      />

      <!-- Group Messages Section -->
      <GroupMessagesSection
        :groupMessage="groupMessage"
        :autoReminderPartners="autoReminderPartners"
        :autoReminders="autoReminders"
        :isScheduling="isScheduling"
        :removePartnerFromReminders="removePartnerFromReminders"
        :openAddPartnerModal="openAddPartnerModal"
        :scheduleMessage="scheduleMessage"
      />

      <!-- Recent Actions Section -->
      <RecentActionsSection
        :recentActions="recentActions"
        :loadMoreActions="loadMoreActions"
      />

      <!-- Floating Action Button -->
      <FloatingActionButton @addPartner="addPartner" />
    </main>
  </VAppLayout>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import VAppLayout from "../components/organisms/VAppLayout.vue";
import UserHeaderSection from '../components/organisms/UserHeaderSection.vue';
import PartnersOverviewSection from '../components/organisms/PartnersOverviewSection.vue';
import GroupMessagesSection from '../components/organisms/GroupMessagesSection.vue';
import RecentActionsSection from '../components/organisms/RecentActionsSection.vue';
import FloatingActionButton from '../components/atoms/FloatingActionButton.vue';
import VAvatar from "../components/atoms/VAvatar.vue";
import VBadge from "../components/atoms/VBadge.vue";
import VTag from "../components/atoms/VTag.vue";
import VButton from "../components/atoms/VButton.vue";
import MoreIcon from "../components/atoms/icons/MoreIcon.vue";
import UserAddIcon from "../components/atoms/icons/UserAddIcon.vue";
import DropdownIcon from "../components/atoms/icons/DropdownIcon.vue";
// SyncIcon import removed - not present in original Figma design

const router = useRouter();

// === STATE MANAGEMENT ===
const showUserMenu = ref(false);
const showMoreMenu = ref(false);
const isScheduling = ref(false);
const autoReminders = ref(true);
const autoReminderPartners = ref(["Martin"]);

const user = reactive({
  name: "Eric Tshimba Lokole",
  avatar: "https://via.placeholder.com/46x46/31920B/ffffff?text=ET",
  credits: 3,
});

const partners = ref([
  {
    id: 1,
    name: "Martin Obiang",
    role: "Comptable",
    avatar: "https://via.placeholder.com/48x48/31920B/ffffff?text=MO",
    status: "overdue",
  },
  {
    id: 2,
    name: "Nembot Fokam",
    role: "Entrepreneur",
    avatar: "https://via.placeholder.com/48x48/31920B/ffffff?text=NF",
    status: "due_soon",
  },
  {
    id: 3,
    name: "Sarah Mandeng",
    role: "Sécrétaire",
    avatar: "https://via.placeholder.com/48x48/31920B/ffffff?text=SM",
    status: "due_soon",
  },
]);

const groupMessage = reactive({
  text: "Salut {utilisateur}, Vous venez de dépasser les délais de paiement pour votre loyer du {date}. Appelez urgemment afin de conformer au contrat de bail initial. Merci.",
  date: "10 juil. 2025",
  time: "09:48",
});

const recentActions = ref([
  {
    id: 1,
    type: "mail",
    text: "Relance envoyée à Salma",
    time: "1h",
    datetime: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 2,
    type: "user-add",
    text: "Nouveau partenaire ajouté",
    time: "6h",
    datetime: new Date(Date.now() - 21600000).toISOString(),
  },
  {
    id: 3,
    type: "money",
    text: "Paiement reçu par Martin",
    time: "7h",
    datetime: new Date(Date.now() - 25200000).toISOString(),
  },
]);

// === COMPUTED VALUES ===
const totalPartners = computed(() => partners.value.length);
const overduePartners = computed(
  () => partners.value.filter((p) => p.status === "overdue").length,
);

// === METHODS ===
const getStatusVariant = (status: string) => {
  switch (status) {
    case "overdue":
      return "error";
    case "due_soon":
      return "warning";
    case "paid":
      return "success";
    default:
      return "default";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "overdue":
      return "En retard";
    case "due_soon":
      return "Échéance dans 12j";
    case "paid":
      return "Aucune échéance";
    default:
      return "Status inconnu";
  }
};

const getPartnerCardClasses = (status: string) => [
  "partner-card--base",
  `partner-card--${status}`,
];

const getActionIcon = (type: string) => {
  const icons = {
    mail: "MailIcon",
    "user-add": "UserAddIcon",
    money: "MoneyIcon",
  };
  return icons[type] || "InfoIcon";
};

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value;
  if (showMoreMenu.value) showMoreMenu.value = false;
};

const toggleMoreMenu = () => {
  showMoreMenu.value = !showMoreMenu.value;
  if (showUserMenu.value) showUserMenu.value = false;
};

const goToPartnerProfile = (partnerId: number) => {
  router.push(`/partner/${partnerId}`);
};

const handlePartnerCardKeydown = (event: KeyboardEvent, partnerId: number) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    goToPartnerProfile(partnerId);
  }
};

const addPartner = () => {
  router.push("/add-partner");
};

const openAddPartnerModal = () => {
  // TODO: Open modal to add partner to reminders
  console.log("Opening add partner modal");
};

const removePartnerFromReminders = (partnerName: string) => {
  const index = autoReminderPartners.value.indexOf(partnerName);
  if (index > -1) {
    autoReminderPartners.value.splice(index, 1);
  }
};

const scheduleMessage = async () => {
  if (isScheduling.value) return;

  isScheduling.value = true;

  try {
    // TODO: Implement actual message scheduling
    console.log("Scheduling message...", groupMessage);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Show success state
    const scheduleButton = document.querySelector(
      '[data-bind="schedule-button"]',
    );
    scheduleButton?.setAttribute("data-success", "true");

    setTimeout(() => {
      scheduleButton?.removeAttribute("data-success");
    }, 3000);
  } catch (error) {
    console.error("Error scheduling message:", error);

    // Show error state
    const scheduleButton = document.querySelector(
      '[data-bind="schedule-button"]',
    );
    scheduleButton?.setAttribute("data-error", "true");

    setTimeout(() => {
      scheduleButton?.removeAttribute("data-error");
    }, 3000);
  } finally {
    isScheduling.value = false;
  }
};

const loadMoreActions = () => {
  // TODO: Load more actions from API
  console.log("Loading more actions...");
};
</script>

<style scoped>
/* === DASHBOARD CONTAINER - FIGMA LAYOUT === */
.dashboard-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  max-width: 381px;
  margin: 0 auto;
  position: relative;
}

/* === USER HEADER SECTION - FIGMA EXACT SPECS === */
.user-header-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: var(--space-sm) 0;
}

.user-info-container {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.user-avatar {
  flex-shrink: 0;
}

.user-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
}

.user-name-section {
  display: flex;
  align-items: center;
  gap: 8px;
}

.user-name {
  color: var(--primary-green, #153d1c);
  font-family: var(--font-primary);
  font-size: 20px;
  font-weight: 600;
  line-height: 1.6;
  letter-spacing: -0.2px;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dropdown-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--space-xs);
  color: var(--primary-green, #153d1c);
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  transition: color var(--transition-fast);
}

.dropdown-button:hover {
  color: var(--accent-green, #059c1f);
}

.credits-section {
  display: flex;
  align-items: flex-end;
  gap: 5px;
}

.country-flag {
  font-size: 12px;
}

.separator-dot {
  width: 2px;
  height: 2px;
  background: var(--primary-green, #153d1c);
  border-radius: 50%;
  flex-shrink: 0;
}

.credits-text {
  color: var(--secondary-green, #31920b);
  font-family: var(--font-primary);
  font-size: 20px;
  font-weight: 600;
  line-height: 1.6;
  letter-spacing: -0.2px;
}

.credits-icon {
  color: var(--secondary-green, #31920b);
  font-size: 14px;
  font-weight: 600;
  opacity: 0.7;
}

.more-actions-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--space-xs);
  color: rgba(21, 61, 28, 0.64);
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  transition: color var(--transition-fast);
}

.more-actions-button:hover {
  color: var(--primary-green, #153d1c);
}

/* === SECTION TITLES === */
.section-title {
  color: rgba(21, 61, 28, 0.64);
  font-family: var(--font-primary);
  font-size: 18px;
  font-weight: 600;
  line-height: 1.6;
  letter-spacing: -0.18px;
  margin: 0;
}

/* === PARTNERS SECTION - FIGMA GRID === */
.partners-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.partners-grid-container {
  width: 100%;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.partners-grid-container::-webkit-scrollbar {
  display: none;
}

.partners-grid {
  display: flex;
  gap: 14px;
  min-width: min-content;
}

.partner-card--base {
  min-width: 157px;
  height: 185px;
  cursor: pointer;
  transition: transform var(--transition-normal);
  position: relative;
  background: var(--white, #ffffff);
  border-radius: var(--radius-lg);
  border: 1px solid rgba(21, 61, 28, 0.14);
  overflow: hidden;
}

.partner-card--base:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(21, 61, 28, 0.15);
}

.partner-card--base:focus-visible {
  outline: 2px solid var(--accent-green);
  outline-offset: 2px;
}

.partner-card--overdue {
  border-top: 84px solid #eb002d;
}

.partner-card--due_soon {
  border-top: 84px solid #f59100;
}

.partner-card--paid {
  border-top: 84px solid #31920b;
}

.partner-status-container {
  position: absolute;
  top: -68px;
  left: 21px;
  right: 21px;
}

.partner-info-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 17px;
  padding: 27px 21px 21px;
  height: 100%;
  justify-content: center;
}

.partner-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  text-align: center;
}

.partner-name {
  color: var(--primary-green, #153d1c);
  font-family: var(--font-primary);
  font-size: 18px;
  font-weight: 600;
  line-height: 1.6;
  letter-spacing: -0.18px;
  margin: 0;
}

.partner-role {
  color: var(--primary-green, #153d1c);
  font-family: var(--font-primary);
  font-size: 16px;
  font-weight: 400;
  line-height: 1.6;
  letter-spacing: -0.16px;
  margin: 0;
}

/* === MESSAGES SECTION === */
.messages-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.message-card {
  padding: 18px 38px;
}

.message-content-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
}

.message-text-container {
  padding: 18px;
  border-radius: 18px;
  background: #f8f6f4;
  position: relative;
}

.message-text {
  color: rgba(21, 61, 28, 0.64);
  font-family: var(--font-primary);
  font-size: 16px;
  font-weight: 400;
  line-height: 1.24;
  letter-spacing: -0.16px;
  margin: 0 0 40px 0;
}

.message-sync-indicator {
  position: absolute;
  bottom: 11px;
  right: 17px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.sync-text {
  color: rgba(21, 61, 28, 0.64);
  font-family: var(--font-primary);
  font-size: 10px;
  font-style: italic;
  font-weight: 500;
  line-height: 1.24;
  letter-spacing: -0.1px;
}

.sync-icon {
  width: 14px;
  height: 14px;
  color: var(--secondary-green, #31920b);
}

.message-schedule {
  display: flex;
  gap: 8px;
}

.message-controls {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 24px;
}

.auto-reminders-section h3 {
  color: var(--primary-green, #153d1c);
  font-family: var(--font-primary);
  font-size: 18px;
  font-weight: 600;
  line-height: 1.6;
  letter-spacing: -0.18px;
  margin: 0 0 12px 0;
}

.reminder-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.add-partner-tag {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  background: rgba(49, 146, 11, 0.1);
  color: var(--secondary-green, #31920b);
  border: 1px solid var(--secondary-green, #31920b);
  border-radius: 16px;
  font-family: var(--font-primary);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.add-partner-tag:hover {
  background: rgba(49, 146, 11, 0.2);
}

.toggle-section {
  width: 54px;
  height: 30px;
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.toggle-input {
  opacity: 0;
  width: 0;
  height: 0;
  position: absolute;
}

.toggle-slider {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--primary-green, #153d1c);
  border-radius: 16px;
  transition: background-color var(--transition-normal);
}

.toggle-handle {
  position: absolute;
  top: 2px;
  right: 2px;
  width: 26px;
  height: 26px;
  background: var(--white, #ffffff);
  border-radius: 50%;
  transition: transform var(--transition-normal);
}

.toggle-input:checked + .toggle-slider .toggle-handle {
  transform: translateX(-24px);
}

/* === ACTIONS SECTION === */
.actions-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.actions-card {
  padding: 20px 16px;
}

.actions-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.action-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 0.5px solid rgba(21, 61, 28, 0.14);
}

.action-item:last-child {
  border-bottom: none;
}

.action-info {
  display: flex;
  align-items: center;
  gap: 9px;
}

.action-icon {
  width: 24px;
  height: 24px;
  color: rgba(21, 61, 28, 0.64);
}

.action-text {
  color: var(--primary-green, #153d1c);
  font-family: var(--font-primary);
  font-size: 16px;
  font-weight: 400;
  line-height: 1.6;
  letter-spacing: -0.16px;
}

.action-time {
  color: var(--primary-green, #153d1c);
  font-family: var(--font-primary);
  font-size: 16px;
  font-weight: 400;
  line-height: 1.6;
  letter-spacing: -0.16px;
}

.actions-divider {
  width: 100%;
  height: 0.5px;
  background: rgba(21, 61, 28, 0.14);
  margin: 12px 0;
}

.show-more-button {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  width: 100%;
  color: rgba(21, 61, 28, 0.64);
  font-family: var(--font-primary);
  font-size: 18px;
  font-weight: 600;
  transition: color var(--transition-fast);
}

.show-more-button:hover {
  color: var(--primary-green, #153d1c);
}

/* === FLOATING ACTION BUTTON === */
.fab-container {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 100;
}

.floating-action-button {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(
    170deg,
    var(--light-green, #e1f524) 0%,
    var(--bright-green, #b9f524) 97.69%
  );
  border: 1.75px solid var(--white, #fff);
  box-shadow:
    0px 0px 0px #eeff49,
    0px 1.173px 2.347px #e7ff00;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-green, #153d1c);
  transition: transform var(--transition-normal);
}

.floating-action-button:hover {
  transform: scale(1.05);
}

.floating-action-button:focus-visible {
  outline: 2px solid var(--accent-green);
  outline-offset: 2px;
}

/* === RESPONSIVE DESIGN === */
@media (max-width: 360px) {
  .dashboard-container {
    max-width: 100%;
    padding: 0 var(--space-md);
    gap: 20px;
  }

  .user-name {
    font-size: 18px;
  }

  .credits-text {
    font-size: 18px;
  }

  .section-title {
    font-size: 16px;
  }

  .partners-grid {
    gap: 12px;
  }

  .partner-card--base {
    min-width: 140px;
    height: 160px;
  }

  .message-card {
    padding: 16px 20px;
  }

  .fab-container {
    bottom: 16px;
    right: 16px;
  }
}

@media (min-width: 768px) {
  .dashboard-container {
    max-width: 500px;
    gap: 32px;
  }

  .partners-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(157px, 1fr));
    overflow-x: visible;
    gap: 20px;
  }

  .message-card {
    padding: 24px 48px;
  }
}

/* === ACCESSIBILITY === */
@media (prefers-reduced-motion: reduce) {
  .partner-card--base,
  .floating-action-button,
  .toggle-handle {
    transition: none;
  }
}

/* === HIGH CONTRAST MODE === */
@media (prefers-contrast: high) {
  .partner-card--base {
    border-width: 2px;
  }

  .toggle-slider {
    border: 2px solid var(--primary-green);
  }
}
</style>
