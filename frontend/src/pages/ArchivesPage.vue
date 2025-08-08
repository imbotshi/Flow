<template>
  <VAppLayout theme="light" :showHeader="false">
    <template #default>
      <div class="archives-header">
        <button class="back-btn" @click="goBack" aria-label="Retour">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 22L10 14L18 6" stroke="#153d1c" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <h1 class="archives-title">Archives des relances</h1>
        <input
          v-model="search"
          type="text"
          class="search-bar"
          placeholder="Rechercher"
        />
        <div class="filters-row">
          <button
            v-for="f in filters"
            :key="f.value"
            :class="['filter-btn', { active: activeFilter === f.value }]"
            @click="activeFilter = f.value"
            type="button"
          >
            {{ f.label }}
          </button>
        </div>
      </div>
      <div class="archives-list">
        <div v-for="relance in filteredRelances" :key="relance.id" :class="['archive-item', relance.status]">
          <div class="archive-banner" :class="relance.status">
            <div class="banner-main">
              <div class="avatar-name-row">
                <img v-if="relance.photo" :src="relance.photo" :alt="relance.name" class="archive-avatar" />
                <div v-else class="archive-avatar avatar-placeholder">{{ relance.name.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase() }}</div>
                <div class="archive-name-code">
                  <span class="archive-name">{{ relance.name }}</span>
                  <span class="archive-code">{{ relance.code }}</span>
                </div>
              </div>
            </div>
            <span class="archive-status-badge" :class="relance.status">{{ relance.statusText }}</span>
          </div>
          <div class="archive-details">
            <div class="details-row">
              <span class="details-label">Montant :</span>
              <span class="details-value">{{ relance.montant }}</span>
            </div>
            <div class="details-row">
              <span class="details-label">Échéance :</span>
              <span class="details-value">{{ relance.echeance }}</span>
            </div>
            <div class="details-row">
              <span class="details-label">Téléphone :</span>
              <span class="details-value">{{ relance.telephone }}</span>
            </div>
            <div class="details-row">
              <span class="details-label">Bien :</span>
              <span class="details-value">{{ relance.bien }}</span>
            </div>
            <div class="details-row">
              <span class="details-label">Profession :</span>
              <span class="details-value">{{ relance.profession }}</span>
            </div>
            <div class="details-row">
              <span class="details-label">Mode de paiement :</span>
              <span class="details-value">{{ relance.modePaiement }}</span>
            </div>
            <div class="details-row">
              <span class="details-label">Date de création :</span>
              <span class="details-value">{{ relance.dateCreation }}</span>
            </div>
            <div class="details-row" v-if="relance.notes">
              <span class="details-label">Notes :</span>
              <span class="details-value">{{ relance.notes }}</span>
            </div>
            <button
              v-if="relance.status === 'paid'"
              class="action-btn btn-success"
              @click="telechargerRecu(relance)"
            >
              <span class="btn-icon">⬇️</span> Télécharger le reçu
            </button>
            <button
              v-else-if="relance.status === 'overdue'"
              class="action-btn btn-danger"
              @click="relancerImmediatement(relance)"
            >
              <span class="btn-icon">⚡</span> Relancer immédiatement
            </button>
            <button
              v-else-if="relance.status === 'due-soon'"
              class="action-btn btn-warning"
              @click="contacterPartenaire(relance)"
            >
              <span class="btn-icon">💬</span> Contacter le partenaire
            </button>
            <button
              v-else
              class="action-btn btn-info"
              @click="programmerRelance(relance)"
            >
              <span class="btn-icon">⏰</span> Programmer une relance
            </button>
          </div>
        </div>
      </div>
      <PopupSuccess :visible="showSuccessPopup" :message="successMessage" @close="showSuccessPopup = false" />
      <PopupError :visible="showErrorPopup" :message="errorMessage" @close="showErrorPopup = false" />
    </template>
  </VAppLayout>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import VAppLayout from '../components/organisms/VAppLayout.vue';
import VButton from '../components/atoms/VButton.vue';
import PopupSuccess from '../components/molecules/PopupSuccess.vue';
import PopupError from '../components/molecules/PopupError.vue';

// Remplacement du mock relances pour inclure code, montant, date
const relances = ref([
  { id: 1, name: 'Martin Obiang', status: 'overdue', statusText: 'En retard', code: 'q456z424', montant: '50 000 FCFA', echeance: '12/12/2023', telephone: '699 12 34 56', bien: 'Appartement', profession: 'Comptable', modePaiement: 'Virement', dateCreation: '01/01/2024', notes: 'Client régulier', photo: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { id: 2, name: 'Sarah', status: 'due-soon', statusText: 'Échéance dans 12j', code: '2qhty756', montant: '40 000 FCFA', echeance: '24/06/2024', telephone: '677 98 76 54', bien: 'Maison', profession: 'Médecin', modePaiement: 'Espèces', dateCreation: '15/03/2024', notes: 'À relancer par WhatsApp', photo: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { id: 3, name: 'Nembot Fokam', status: 'paid', statusText: 'Payé', code: '8zjklm12', montant: '60 000 FCFA', echeance: '01/05/2024', telephone: '655 22 11 00', bien: 'Studio', profession: 'Étudiant', modePaiement: 'Mobile Money', dateCreation: '20/02/2024', notes: '', photo: '' },
]);

const userCredits = ref(2); // Simulation crédits utilisateur
const isLoading = ref(false);
const showSuccessPopup = ref(false);
const showErrorPopup = ref(false);
const successMessage = ref('Message programmé avec succès !');
const errorMessage = ref('Crédits insuffisants pour programmer la relance.');

const search = ref('');
const filters = [
  { label: 'Tous', value: 'all' },
  { label: 'En retard', value: 'overdue' },
  { label: 'Échéance', value: 'due-soon' },
  { label: 'Payé', value: 'paid' },
];
const activeFilter = ref('all');

const filteredRelances = computed(() => {
  let list = relances.value;
  if (activeFilter.value !== 'all') {
    list = list.filter(r => r.status === activeFilter.value);
  }
  if (search.value.trim()) {
    const s = search.value.trim().toLowerCase();
    list = list.filter(r =>
      r.name.toLowerCase().includes(s) ||
      (r.profession && r.profession.toLowerCase().includes(s)) ||
      (r.bien && r.bien.toLowerCase().includes(s)) ||
      (r.telephone && r.telephone.toLowerCase().includes(s))
    );
  }
  return list;
});

function programmerRelance(relance) {
  isLoading.value = true;
  setTimeout(() => {
    if (userCredits.value > 0) {
      userCredits.value--;
      showSuccessPopup.value = true;
    } else {
      showErrorPopup.value = true;
    }
    isLoading.value = false;
  }, 800);
}
function telechargerRecu(relance) {
  alert('Téléchargement du reçu pour ' + relance.name);
}
function relancerImmediatement(relance) {
  alert('Relance immédiate envoyée à ' + relance.name);
}
function contacterPartenaire(relance) {
  alert('Contact du partenaire ' + relance.name);
}
const router = useRouter();
function goBack() {
  router.back();
}
</script>

<style scoped>
.archives-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
  position: relative;
}
.archives-title {
  color: #153d1c;
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 0;
  text-align: center;
  margin-left: 0;
  margin-right: 0;
}
.archives-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  margin: 0;
  padding: 0;
}
.archive-item {
  border-radius: 18px;
  box-shadow: 0 2px 8px rgba(21,61,28,0.07);
  display: flex;
  flex-direction: column;
  min-height: 120px;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background: #fff;
  transition: transform 0.18s cubic-bezier(.4,0,.2,1), box-shadow 0.18s cubic-bezier(.4,0,.2,1);
  will-change: transform, box-shadow;
}
.archive-item:hover,
.archive-item:focus-within {
  transform: scale(1.02);
  box-shadow: 0 6px 18px rgba(21,61,28,0.13);
  z-index: 2;
}
/* Couleurs de fond dynamiques selon le statut */
.archive-item.due-soon .archive-banner {
  background: #fff9cc;
}
.archive-item.overdue .archive-banner {
  background: #ffeaea;
}
.archive-item.paid .archive-banner {
  background: #e6fbe6;
}
.archive-banner {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px 16px 8px 16px;
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
  min-height: 48px;
}
.banner-main {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.avatar-name-row {
  display: flex;
  align-items: center;
  gap: 12px;
}
.archive-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  background: #eee;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
  color: #888;
}
.avatar-placeholder {
  background: #e0e0e0;
}
.archive-name-code {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.archive-name {
  color: #153d1c;
  font-size: 16px;
  font-weight: 700;
  font-family: 'Inter', 'Figtree', Arial, sans-serif;
}
.archive-code {
  font-size: 13px;
  color: #888;
  font-family: 'Figtree', Arial, sans-serif;
  margin-top: 2px;
}
.archive-status-badge {
  font-size: 13px;
  font-weight: 600;
  border-radius: 8px;
  padding: 4px 10px;
  margin-left: 8px;
  font-family: 'Inter', 'Figtree', Arial, sans-serif;
  background: #fff;
  border: 1px solid #eee;
  align-self: flex-start;
}
.archive-status-badge.due-soon {
  color: #fb9700;
  border-color: #fb9700;
  background: #fffbe6;
}
.archive-status-badge.overdue {
  color: #ef1524;
  border-color: #ef1524;
  background: #fff0f0;
}
.archive-status-badge.paid {
  color: #31920b;
  border-color: #31920b;
  background: #f0fff0;
}
.archive-details {
  background: #fff;
  padding: 12px 16px 16px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-bottom-left-radius: 18px;
  border-bottom-right-radius: 18px;
}
.details-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 14px;
  margin-bottom: 2px;
}
.details-label {
  color: #888;
  font-weight: 500;
}
.details-value {
  color: #153d1c;
  font-weight: 600;
}
.search-bar {
  width: 100%;
  max-width: 340px;
  margin: 18px 0 10px 0;
  padding: 10px 16px;
  border-radius: 12px;
  border: 1.5px solid #e0e0e0;
  font-size: 15px;
  background: #fafafa;
  color: #153d1c;
  outline: none;
  transition: border 0.18s;
}
.search-bar:focus {
  border-color: #153d1c;
}
.filters-row {
  display: flex;
  gap: 10px;
  margin-bottom: 18px;
  flex-wrap: wrap;
}
.filter-btn {
  padding: 7px 18px;
  border-radius: 16px;
  border: none;
  background: #f5f5f5;
  color: #153d1c;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.18s, color 0.18s;
}
.filter-btn.active {
  background: #153d1c;
  color: #fff;
}
.filter-btn:focus {
  outline: 2px solid #153d1c;
}
.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border-radius: 18px;
  font-size: 15px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: background 0.18s, box-shadow 0.18s, transform 0.12s;
  box-shadow: 0 2px 8px rgba(21,61,28,0.07);
  margin-top: 10px;
}
.action-btn:active {
  transform: scale(0.97);
}
.btn-icon {
  font-size: 18px;
  display: flex;
  align-items: center;
}
/* Succès (payé) */
.btn-success {
  background: #e6fbe6;
  color: #153d1c;
  border: 1.5px solid #31920b;
  box-shadow: 0 2px 8px rgba(49,146,11,0.10);
}
.btn-success:hover {
  background: #d0f5d0;
  color: #153d1c;
  box-shadow: 0 4px 16px rgba(49,146,11,0.18);
}
/* Danger (en retard) */
.btn-danger {
  background: #ffeaea;
  color: #ef1524;
  border: 1.5px solid #ef1524;
  box-shadow: 0 2px 8px rgba(239,21,36,0.10);
  animation: btn-pulse 1.2s infinite alternate;
}
.btn-danger:hover {
  background: #ffd6d6;
  color: #b80d1a;
  box-shadow: 0 4px 16px rgba(239,21,36,0.18);
}
@keyframes btn-pulse {
  0% { box-shadow: 0 2px 8px rgba(239,21,36,0.10); }
  100% { box-shadow: 0 6px 18px rgba(239,21,36,0.18); }
}
/* Warning (échéance) */
.btn-warning {
  background: #fff9cc;
  color: #fb9700;
  border: 1.5px solid #fb9700;
  box-shadow: 0 2px 8px rgba(251,151,0,0.10);
}
.btn-warning:hover {
  background: #fff3a6;
  color: #b87a00;
  box-shadow: 0 4px 16px rgba(251,151,0,0.18);
}
/* Info (autres) */
.btn-info {
  background: #e6f0fb;
  color: #153d1c;
  border: 1.5px solid #3192ff;
  box-shadow: 0 2px 8px rgba(49,146,255,0.10);
}
.btn-info:hover {
  background: #d0e4fa;
  color: #153d1c;
  box-shadow: 0 4px 16px rgba(49,146,255,0.18);
}
.back-btn {
  background: none;
  border: none;
  padding: 0 8px 0 0;
  margin-right: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 40px;
  transition: background 0.15s;
}
.back-btn:hover {
  background: #e6fbe6;
  border-radius: 50%;
}
@media (min-width: 0px) {
  .archives-header {
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;
  }
  .archives-title {
    text-align: left;
    flex: 1;
  }
}
</style> 