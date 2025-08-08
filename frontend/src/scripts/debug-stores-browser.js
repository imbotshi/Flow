/**
 * Script de débogage pour afficher les données temporaires des stores dans la console du navigateur
 * Usage: Copier-coller ce code dans la console du navigateur
 */

// Fonction pour afficher les données du store utilisateur
function debugUserStore() {
  console.log('🔍 === DEBUG DES STORES TEMPORAIRES ===\n');
  console.log('📱 === STORE UTILISATEUR ===');
  
  try {
    // Accéder au store via l'instance Pinia de l'application Vue
    const app = document.querySelector('#app').__vue_app__;
    if (!app) {
      console.error('❌ Application Vue non trouvée. Assurez-vous que l\'application est chargée.');
      return;
    }
    
    const pinia = app._context.provides.pinia;
    if (!pinia) {
      console.error('❌ Pinia non trouvé. Assurez-vous que Pinia est configuré.');
      return;
    }
    
    const userStore = pinia._s.get('user');
    if (!userStore) {
      console.error('❌ Store utilisateur non trouvé.');
      return;
    }
    
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
    const app = document.querySelector('#app').__vue_app__;
    if (!app) {
      console.error('❌ Application Vue non trouvée.');
      return;
    }
    
    const pinia = app._context.provides.pinia;
    if (!pinia) {
      console.error('❌ Pinia non trouvé.');
      return;
    }
    
    const signupStore = pinia._s.get('signup');
    if (!signupStore) {
      console.error('❌ Store signup non trouvé.');
      return;
    }
    
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
    const app = document.querySelector('#app').__vue_app__;
    if (!app) {
      console.error('❌ Application Vue non trouvée.');
      return;
    }
    
    const pinia = app._context.provides.pinia;
    if (!pinia) {
      console.error('❌ Pinia non trouvé.');
      return;
    }
    
    const userStore = pinia._s.get('user');
    const signupStore = pinia._s.get('signup');
    
    if (!userStore || !signupStore) {
      console.error('❌ Stores non trouvés.');
      return;
    }
    
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

// Fonction pour afficher toutes les données
function debugAllStores() {
  debugUserStore();
  debugSignupStore();
  displaySummary();
  
  console.log('\n✨ === FIN DU DEBUG ===');
  console.log('💡 Conseil: Utilisez cette fonction pour vérifier l\'état des données temporaires');
  console.log('🔄 Relancez la fonction après chaque action pour voir les changements');
}

// Fonction pour afficher les données brutes des stores
function debugRawStores() {
  console.log('🔍 === DONNÉES BRUTES DES STORES ===\n');
  
  try {
    const app = document.querySelector('#app').__vue_app__;
    if (!app) {
      console.error('❌ Application Vue non trouvée.');
      return;
    }
    
    const pinia = app._context.provides.pinia;
    if (!pinia) {
      console.error('❌ Pinia non trouvé.');
      return;
    }
    
    console.log('📱 Store Utilisateur (brut):', pinia._s.get('user'));
    console.log('📝 Store Signup (brut):', pinia._s.get('signup'));
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'accès aux stores:', error.message);
  }
}

// Fonction pour surveiller les changements en temps réel
function watchStores() {
  console.log('👀 === SURVEILLANCE DES STORES ===');
  console.log('🔄 Les changements seront affichés automatiquement...\n');
  
  try {
    const app = document.querySelector('#app').__vue_app__;
    if (!app) {
      console.error('❌ Application Vue non trouvée.');
      return;
    }
    
    const pinia = app._context.provides.pinia;
    if (!pinia) {
      console.error('❌ Pinia non trouvé.');
      return;
    }
    
    const userStore = pinia._s.get('user');
    const signupStore = pinia._s.get('signup');
    
    if (userStore) {
      // Surveiller les changements du store utilisateur
      userStore.$subscribe((mutation, state) => {
        console.log('🔄 Changement dans le store utilisateur:', {
          type: mutation.type,
          storeId: mutation.storeId,
          payload: mutation.payload,
          state: state
        });
      });
    }
    
    if (signupStore) {
      // Surveiller les changements du store signup
      signupStore.$subscribe((mutation, state) => {
        console.log('🔄 Changement dans le store signup:', {
          type: mutation.type,
          storeId: mutation.storeId,
          payload: mutation.payload,
          state: state
        });
      });
    }
    
    console.log('✅ Surveillance activée. Les changements seront affichés ci-dessous.');
    
  } catch (error) {
    console.error('❌ Erreur lors de la mise en place de la surveillance:', error.message);
  }
}

// Exposer les fonctions globalement pour un accès facile
window.debugStores = {
  user: debugUserStore,
  signup: debugSignupStore,
  summary: displaySummary,
  all: debugAllStores,
  raw: debugRawStores,
  watch: watchStores
};

console.log('🔧 === FONCTIONS DE DEBUG DISPONIBLES ===');
console.log('debugStores.user() - Afficher le store utilisateur');
console.log('debugStores.signup() - Afficher le store signup');
console.log('debugStores.summary() - Afficher le résumé');
console.log('debugStores.all() - Afficher tous les stores');
console.log('debugStores.raw() - Afficher les données brutes');
console.log('debugStores.watch() - Surveiller les changements');
console.log('\n💡 Exemple: debugStores.all() pour tout afficher');

// Afficher automatiquement les données au chargement
setTimeout(() => {
  console.log('\n🚀 === CHARGEMENT AUTOMATIQUE ===');
  debugAllStores();
}, 1000); 