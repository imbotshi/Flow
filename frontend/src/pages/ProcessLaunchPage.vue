<template>
  <div class="process-launch-page">
    <!-- Header -->
    <div class="header">
      <BackIcon class="back-icon" @click="goBack" />
      <h1 class="page-title">Lancement automatique</h1>
    </div>

    <!-- Process Status Card -->
    <VCard class="process-status-card">
      <div class="process-header">
        <div class="process-info">
          <h2 class="process-title">Relance client</h2>
          <p class="process-subtitle">Démarrée à 14:30</p>
        </div>
        <VBadge
          :variant="processStatus === 'completed' ? 'success' : 'info'"
          class="status-badge"
        >
          {{ processStatus === "completed" ? "Terminé" : "En cours" }}
        </VBadge>
      </div>
      <!-- Ajout bouton modifier la date -->
      <div class="date-row">
        <span>Date de relance : {{ formattedDate }}</span>
        <button class="edit-date-btn" @click="showDateModal = true" aria-label="Modifier la date">
          <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M17.5 6.5L13.5 2.5C13.1022 2.10218 12.5978 1.87868 12.0625 1.87868C11.5272 1.87868 11.0228 2.10218 10.625 2.5L3.75 9.375V13.75H8.125L15 6.875C15.3978 6.47722 15.6213 5.97282 15.6213 5.4375C15.6213 4.90218 15.3978 4.39778 15 4Z" stroke="#31920b" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
      </div>

      <!-- Process Steps -->
      <div class="process-steps">
        <div
          v-for="(step, index) in processSteps"
          :key="index"
          class="step-item"
          :class="{ completed: step.completed, current: step.current }"
        >
          <div class="step-indicator">
            <div class="step-circle">
              <span v-if="step.completed">✓</span>
              <span v-else>{{ index + 1 }}</span>
            </div>
            <div v-if="index < processSteps.length - 1" class="step-line"></div>
          </div>
          <div class="step-content">
            <h3 class="step-title">{{ step.title }}</h3>
            <p class="step-description">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </VCard>

    <!-- Results Summary -->
    <VCard class="results-card">
      <h3 class="results-title">Résumé des résultats</h3>

      <div class="results-stats">
        <div class="stat-item success">
          <div class="stat-number">{{ results.successful }}</div>
          <div class="stat-label">Messages envoyés</div>
        </div>

        <div class="stat-item error">
          <div class="stat-number">{{ results.failed }}</div>
          <div class="stat-label">Échecs</div>
        </div>

        <div class="stat-item total">
          <div class="stat-number">{{ results.total }}</div>
          <div class="stat-label">Total</div>
        </div>
      </div>
    </VCard>

    <!-- Partner Results -->
    <VCard class="partners-results-card">
      <h3 class="partners-title">Partenaires traités</h3>

      <div class="partners-list">
        <div
          v-for="partner in partnerResults"
          :key="partner.id"
          class="partner-result-item"
        >
          <VAvatar
            :src="partner.photo"
            :alt="partner.name"
            size="medium"
            class="partner-avatar"
          />
          <div class="partner-info">
            <h4 class="partner-name">{{ partner.name }}</h4>
            <p class="partner-status" :class="partner.status">
              {{ getStatusText(partner.status) }}
            </p>
            <div class="partner-message-row">
              <span class="partner-message-label">Message :</span>
              <span class="partner-message-content">{{ partner.message || 'Aucun message personnalisé' }}</span>
              <button class="edit-message-btn" @click="openMessageModal(partner)">
                <svg width="18" height="18" fill="none" viewBox="0 0 20 20"><path d="M17.5 6.5L13.5 2.5C13.1022 2.10218 12.5978 1.87868 12.0625 1.87868C11.5272 1.87868 11.0228 2.10218 10.625 2.5L3.75 9.375V13.75H8.125L15 6.875C15.3978 6.47722 15.6213 5.97282 15.6213 5.4375C15.6213 4.90218 15.3978 4.39778 15 4Z" stroke="#31920b" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </button>
            </div>
          </div>
          <VBadge
            :variant="partner.status === 'success' ? 'success' : 'error'"
            class="result-badge"
          >
            {{ partner.status === "success" ? "✓" : "✗" }}
          </VBadge>
        </div>
      </div>

      <VModal :isVisible="showMessageModal" title="Modifier le message de relance" @close="showMessageModal = false">
        <div class="modal-content">
          <textarea v-model="editMessage" class="message-input" rows="5" placeholder="Saisir le message de relance..."></textarea>
        </div>
        <template #footer>
          <button class="btn-secondary" @click="showMessageModal = false">Annuler</button>
          <button class="btn-primary" @click="saveMessage">Valider</button>
        </template>
      </VModal>
    </VCard>

    <!-- Action Buttons -->
    <div class="actions">
      <button class="btn-secondary" @click="goBack">
        Retour au tableau de bord
      </button>

      <button
        v-if="processStatus === 'completed'"
        class="btn-primary"
        @click="launchNewProcess"
      >
        Nouveau lancement
      </button>
      <button
        v-if="processStatus !== 'completed'"
        class="btn-danger"
        @click="showCancelModal = true"
      >
        Annuler la relance
      </button>
    </div>

    <VModal :isVisible="showCancelModal" title="Annuler la relance" @close="showCancelModal = false">
      <div class="modal-content">
        <p>Pour confirmer l'annulation, saisissez le mot <b>ANNULER</b> :</p>
        <input type="text" v-model="cancelWord" class="cancel-input" placeholder="Saisir ANNULER pour confirmer" />
        <p v-if="cancelError" class="cancel-error">Mot incorrect. Veuillez saisir <b>ANNULER</b>.</p>
      </div>
      <template #footer>
        <button class="btn-secondary" @click="showCancelModal = false">Fermer</button>
        <button class="btn-danger" @click="confirmCancel">Confirmer</button>
      </template>
    </VModal>
  </div>

  <VModal :isVisible="showDateModal" title="Modifier la date de relance" @close="showDateModal = false">
    <div class="modal-content">
      <input type="date" v-model="editDate" class="date-input" />
    </div>
    <template #footer>
      <button class="btn-secondary" @click="showDateModal = false">Annuler</button>
      <button class="btn-primary" @click="saveDate">Valider</button>
    </template>
  </VModal>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import VCard from "@/components/atoms/VCard.vue";
import VAvatar from "@/components/atoms/VAvatar.vue";
import VBadge from "@/components/atoms/VBadge.vue";
import BackIcon from "@/components/atoms/icons/BackIcon.vue";
import VModal from '@/components/atoms/VModal.vue';

interface ProcessStep {
  title: string;
  description: string;
  completed: boolean;
  current: boolean;
}

interface PartnerResult {
  id: string;
  name: string;
  photo?: string;
  status: "success" | "failed";
  message?: string; // Added message property
}

interface ProcessResults {
  successful: number;
  failed: number;
  total: number;
}

const router = useRouter();

const processStatus = ref<"running" | "completed">("running");

const processSteps = ref<ProcessStep[]>([
  {
    title: "Analyse des partenaires",
    description: "Identification des partenaires à relancer",
    completed: true,
    current: false,
  },
  {
    title: "Génération des messages",
    description: "Création des messages personnalisés",
    completed: true,
    current: false,
  },
  {
    title: "Envoi des notifications",
    description: "Envoi des messages de relance",
    completed: false,
    current: true,
  },
  {
    title: "Suivi et confirmation",
    description: "Vérification des accusés de réception",
    completed: false,
    current: false,
  },
]);

const results = ref<ProcessResults>({
  successful: 0,
  failed: 0,
  total: 0,
});

const partnerResults = ref<PartnerResult[]>([
  {
    id: "1",
    name: "Marie Dubois",
    photo: "/images/avatars/marie.jpg",
    status: "success",
  },
  {
    id: "2",
    name: "Jean Martin",
    photo: "/images/avatars/jean.jpg",
    status: "success",
  },
  {
    id: "3",
    name: "Sophie Laurent",
    photo: "/images/avatars/sophie.jpg",
    status: "failed",
  },
  {
    id: "4",
    name: "Pierre Moreau",
    photo: "/images/avatars/pierre.jpg",
    status: "success",
  },
]);

const getStatusText = (status: string): string => {
  return status === "success" ? "Message envoyé" : "Échec d'envoi";
};

const goBack = () => {
  router.push("/dashboard");
};

const launchNewProcess = () => {
  // Reset process and restart
  processStatus.value = "running";
  processSteps.value.forEach((step, index) => {
    step.completed = index === 0;
    step.current = index === 1;
  });
  results.value = { successful: 0, failed: 0, total: 0 };
};

const showDateModal = ref(false);
const relanceDate = ref(new Date());
const editDate = ref(relanceDate.value.toISOString().substring(0,10));

const formattedDate = computed(() => {
  const d = relanceDate.value;
  return d.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
});

function saveDate() {
  relanceDate.value = new Date(editDate.value);
  showDateModal.value = false;
}

const showMessageModal = ref(false);
const editMessage = ref('');
const editingPartnerId = ref<string | null>(null);

const openMessageModal = (partner: PartnerResult) => {
  editingPartnerId.value = partner.id;
  editMessage.value = partner.message || '';
  showMessageModal.value = true;
};

const saveMessage = () => {
  if (editingPartnerId.value) {
    const partner = partnerResults.value.find(p => p.id === editingPartnerId.value);
    if (partner) {
      partner.message = editMessage.value;
    }
  }
  showMessageModal.value = false;
};

// Simulate process completion
onMounted(() => {
  setTimeout(() => {
    // Complete all steps
    processSteps.value.forEach((step) => {
      step.completed = true;
      step.current = false;
    });

    // Update results
    const successful = partnerResults.value.filter(
      (p) => p.status === "success",
    ).length;
    const failed = partnerResults.value.filter(
      (p) => p.status === "failed",
    ).length;

    results.value = {
      successful,
      failed,
      total: successful + failed,
    };

    processStatus.value = "completed";
  }, 3000);
});

const showCancelModal = ref(false);
const cancelWord = ref('');
const cancelError = ref(false);

const confirmCancel = () => {
  if (cancelWord.value === 'ANNULER') {
    processStatus.value = 'completed'; // Simulate cancellation
    processSteps.value.forEach((step) => {
      step.completed = true;
      step.current = false;
    });
    results.value = { successful: 0, failed: 0, total: 0 };
    showCancelModal.value = false;
    cancelWord.value = '';
    cancelError.value = false;
  } else {
    cancelError.value = true;
  }
};
</script>

<style scoped>
.process-launch-page {
  padding: 1rem;
  background-color: #f8f9fa;
  min-height: 100vh;
}

.header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.back-icon {
  width: 24px;
  height: 24px;
  cursor: pointer;
  color: #666;
}

.page-title {
  font-family: "Figtree", sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
}

.process-status-card {
  margin-bottom: 1.5rem;
}

.process-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
}

.process-title {
  font-family: "Figtree", sans-serif;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 0.25rem 0;
}

.process-subtitle {
  font-family: "Figtree", sans-serif;
  font-size: 0.875rem;
  color: #666;
  margin: 0;
}

.status-badge {
  margin-left: 1rem;
}

.process-steps {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.step-item {
  display: flex;
  gap: 1rem;
  position: relative;
}

.step-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
}

.step-circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #e9ecef;
  border: 2px solid #dee2e6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 600;
  color: #666;
}

.step-item.completed .step-circle {
  background-color: #31920b;
  border-color: #31920b;
  color: white;
}

.step-item.current .step-circle {
  background-color: #e1f524;
  border-color: #31920b;
  color: #31920b;
}

.step-line {
  width: 2px;
  height: 24px;
  background-color: #dee2e6;
  margin-top: 8px;
}

.step-item.completed .step-line {
  background-color: #31920b;
}

.step-content {
  flex: 1;
  padding-top: 0.25rem;
}

.step-title {
  font-family: "Figtree", sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 0.25rem 0;
}

.step-description {
  font-family: "Figtree", sans-serif;
  font-size: 0.875rem;
  color: #666;
  margin: 0;
}

.results-card {
  margin-bottom: 1.5rem;
}

.results-title {
  font-family: "Figtree", sans-serif;
  font-size: 1.125rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 1.5rem 0;
}

.results-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.stat-item {
  text-align: center;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.stat-item.success {
  background-color: #f8fff9;
  border-color: #31920b;
}

.stat-item.error {
  background-color: #fff8f8;
  border-color: #eb002d;
}

.stat-item.total {
  background-color: #f8f9fa;
  border-color: #dee2e6;
}

.stat-number {
  font-family: "Figtree", sans-serif;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.stat-item.success .stat-number {
  color: #31920b;
}

.stat-item.error .stat-number {
  color: #eb002d;
}

.stat-item.total .stat-number {
  color: #1a1a1a;
}

.stat-label {
  font-family: "Figtree", sans-serif;
  font-size: 0.875rem;
  color: #666;
}

.partners-results-card {
  margin-bottom: 2rem;
}

.partners-title {
  font-family: "Figtree", sans-serif;
  font-size: 1.125rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 1.5rem 0;
}

.partners-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.partner-result-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.partner-info {
  flex: 1;
}

.partner-name {
  font-family: "Figtree", sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 0.25rem 0;
}

.partner-status {
  font-family: "Figtree", sans-serif;
  font-size: 0.875rem;
  margin: 0;
}

.partner-status.success {
  color: #31920b;
}

.partner-status.failed {
  color: #eb002d;
}

.partner-message-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.partner-message-label {
  font-family: "Figtree", sans-serif;
  font-size: 0.875rem;
  color: #666;
  font-weight: 600;
}

.partner-message-content {
  font-family: "Figtree", sans-serif;
  font-size: 0.875rem;
  color: #1a1a1a;
  flex: 1;
}

.edit-message-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: background 0.2s;
}
.edit-message-btn:hover {
  background: #e1f52444;
}

.message-input {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  resize: vertical;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.btn-primary,
.btn-secondary {
  width: 100%;
  padding: 1rem;
  border-radius: 8px;
  font-family: "Figtree", sans-serif;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary {
  background-color: #31920b;
  color: white;
}

.btn-primary:hover {
  background-color: #267008;
}

.btn-secondary {
  background-color: white;
  color: #31920b;
  border: 2px solid #31920b;
}

.btn-secondary:hover {
  background-color: #f8fff9;
}

.date-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}
.edit-date-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: background 0.2s;
}
.edit-date-btn:hover {
  background: #e1f52444;
}
.date-input {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.btn-danger {
  background-color: #eb002d;
  color: white;
  border: none;
}

.btn-danger:hover {
  background-color: #c70020;
}

.modal-content {
  padding: 1.5rem;
}

.cancel-input {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
}

.cancel-error {
  color: #eb002d;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

@media (min-width: 768px) {
  .process-launch-page {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
  }

  .results-stats {
    grid-template-columns: repeat(3, 1fr);
  }

  .actions {
    flex-direction: row;
    justify-content: space-between;
  }

  .btn-primary,
  .btn-secondary {
    width: auto;
    min-width: 200px;
  }
}
</style>
