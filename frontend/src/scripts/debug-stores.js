#!/usr/bin/env node

/**
 * Script de débogage pour afficher les données temporaires des stores
 * Usage: node debug-stores.js
 */

import { useUserStore } from '../stores/user.js';
import { useSignupStore } from '../stores/user.js';

console.log('🔍 === DEBUG DES STORES TEMPORAIRES ===\n');

// Fonction pour afficher les données du store utilisateur
function debugUserStore() {
  console.log('📱 === STORE UTILISATEUR ===');
  
  try {
    const userStore = useUserStore();
    
    console.log('📞 Téléphone:', userStore.telephone || 'Non défini');
    console.log('👤 Utilisateur:', userStore.utilisateur ? 'Connecté' : 'Non connecté');
    
    if (userStore.utilisateur) {
      console.log('   ├─ Nom:', userStore.utilisateur.nom || 'Non défini');
      console.log('   ├─ Téléphone:', userStore.utilisateur.telephone || 'Non défini');
      console.log('   ├─ Email:', userStore.utilisateur.email || 'Non défini');
      console.log('   ├─ Pays:', userStore.utilisateur.pays || 'Non défini');
      console.log('   ├─ Photo:', userStore.utilisateur.photoProfil ? 'Définie' : 'Non définie');
      console.log('   ├─ Crédits:', userStore.utilisateur.credits || 0);
      console.log('   ├─ Profil complet:', userStore.utilisateur.profilComplet ? 'Oui' : 'Non');
      console.log('   └─ Dernière connexion:', userStore.utilisateur.dateDerniereConnexion || 'Non définie');
    }
    
    console.log('⏳ Chargement:', userStore.isLoading ? 'En cours' : 'Terminé');
    console.log('❌ Erreur:', userStore.error || 'Aucune');
    
    // Propriétés calculées
    console.log('🔍 Propriétés calculées:');
    console.log('   ├─ Est connecté:', userStore.estConnecte ? 'Oui' : 'Non');
    console.log('   ├─ Profil complet:', userStore.profilComplet ? 'Oui' : 'Non');
    console.log('   └─ Nom utilisateur:', userStore.nomUtilisateur || 'Non défini');
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'accès au store utilisateur:', error.message);
  }
}

// Fonction pour afficher les données du store signup
function debugSignupStore() {
  console.log('\n📝 === STORE SIGNUP ===');
  
  try {
    const signupStore = useSignupStore();
    
    console.log('📞 Numéro de téléphone:', signupStore.phone_number || 'Non défini');
    console.log('🖼️  Photo de profil:', signupStore.profile_picture ? 'Définie' : 'Non définie');
    console.log('👤 Nom complet:', signupStore.full_name || 'Non défini');
    console.log('🌍 Pays:', signupStore.country || 'Non défini');
    console.log('💼 Années d\'expérience:', signupStore.annee_experience || 'Non défini');
    console.log('⚙️  Mode de gestion:', signupStore.mode_management || 'Non défini');
    console.log('📞 Méthode de contact:', signupStore.methode_contact || 'Non défini');
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'accès au store signup:', error.message);
  }
}

// Fonction pour afficher un résumé
function displaySummary() {
  console.log('\n📊 === RÉSUMÉ ===');
  
  try {
    const userStore = useUserStore();
    const signupStore = useSignupStore();
    
    const userConnected = !!userStore.utilisateur;
    const signupInProgress = !!(signupStore.phone_number || signupStore.full_name);
    
    console.log('🔐 Utilisateur connecté:', userConnected ? '✅ Oui' : '❌ Non');
    console.log('📝 Inscription en cours:', signupInProgress ? '✅ Oui' : '❌ Non');
    
    if (userConnected) {
      console.log('👤 Nom affiché:', userStore.utilisateur.nom || 'Non défini');
      console.log('🪙 Crédits disponibles:', userStore.utilisateur.credits || 0);
    }
    
    if (signupInProgress) {
      console.log('📞 Téléphone saisi:', signupStore.phone_number || 'Non défini');
      console.log('👤 Nom saisi:', signupStore.full_name || 'Non défini');
    }
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'affichage du résumé:', error.message);
  }
}

// Fonction principale
function main() {
  debugUserStore();
  debugSignupStore();
  displaySummary();
  
  console.log('\n✨ === FIN DU DEBUG ===');
  console.log('💡 Conseil: Utilisez ce script pour vérifier l\'état des données temporaires');
  console.log('🔄 Relancez le script après chaque action pour voir les changements');
}

// Exécution du script
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { debugUserStore, debugSignupStore, displaySummary }; 