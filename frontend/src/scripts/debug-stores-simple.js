/**
 * Script de débogage simplifié pour afficher les données temporaires des stores
 * Version alternative qui utilise une approche plus directe
 */

// Fonction pour obtenir l'instance Pinia
function getPinia() {
  // Méthode 1: Via l'élément #app
  const appElement = document.querySelector('#app');
  if (appElement && appElement.__vue_app__) {
    const app = appElement.__vue_app__;
    if (app._context && app._context.provides && app._context.provides.pinia) {
      return app._context.provides.pinia;
    }
  }
  
  // Méthode 2: Via window.__VUE_DEVTOOLS_GLOBAL_HOOK__
  if (window.__VUE_DEVTOOLS_GLOBAL_HOOK__ && window.__VUE_DEVTOOLS_GLOBAL_HOOK__.apps) {
    const apps = window.__VUE_DEVTOOLS_GLOBAL_HOOK__.apps;
    for (let app of apps) {
      if (app._context && app._context.provides && app._context.provides.pinia) {
        return app._context.provides.pinia;
      }
    }
  }
  
  // Méthode 3: Via les stores globaux (si exposés)
  if (window.$pinia) {
    return window.$pinia;
  }
  
  return null;
}

// Fonction pour afficher les données du store utilisateur
function debugUserStore() {
  console.log('🔍 === DEBUG DES STORES TEMPORAIRES ===\n');
  console.log('📱 === STORE UTILISATEUR ===');
  
  try {
    const pinia = getPinia();
    if (!pinia) {
      console.error('❌ Pinia non trouvé. Tentative d\'accès direct...');
      
      // Tentative d'accès direct via les stores globaux
      if (window.userStore) {
        console.log('✅ Store utilisateur trouvé via accès global');
        const store = window.userStore;
        displayUserStoreData(store);
        return;
      }
      
      console.error('❌ Impossible d\'accéder aux stores. Vérifiez que l\'application est chargée.');
      return;
    }
    
    const userStore = pinia._s.get('user');
    if (!userStore) {
      console.error('❌ Store utilisateur non trouvé.');
      return;
    }
    
    displayUserStoreData(userStore);
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'accès au store utilisateur:', error.message);
  }
}

// Fonction pour afficher les données du store signup
function debugSignupStore() {
  console.log('\n📝 === STORE SIGNUP ===');
  
  try {
    const pinia = getPinia();
    if (!pinia) {
      console.error('❌ Pinia non trouvé. Tentative d\'accès direct...');
      
      if (window.signupStore) {
        console.log('✅ Store signup trouvé via accès global');
        const store = window.signupStore;
        displaySignupStoreData(store);
        return;
      }
      
      console.error('❌ Impossible d\'accéder aux stores.');
      return;
    }
    
    const signupStore = pinia._s.get('signup');
    if (!signupStore) {
      console.error('❌ Store signup non trouvé.');
      return;
    }
    
    displaySignupStoreData(signupStore);
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'accès au store signup:', error.message);
  }
}

// Fonction pour afficher les données utilisateur
function displayUserStoreData(store) {
  console.log('📞 Téléphone:', store.telephone || 'Non défini');
  console.log('👤 Utilisateur:', store.utilisateur ? 'Connecté' : 'Non connecté');
  
  if (store.utilisateur) {
    console.log('   ├─ Nom:', store.utilisateur.nom || 'Non défini');
    console.log('   ├─ Téléphone:', store.utilisateur.telephone || 'Non défini');
    console.log('   ├─ Email:', store.utilisateur.email || 'Non défini');
    console.log('   ├─ Pays:', store.utilisateur.pays || 'Non défini');
    console.log('   ├─ Photo:', store.utilisateur.photoProfil ? 'Définie' : 'Non définie');
    console.log('   ├─ Crédits:', store.utilisateur.credits || 0);
    console.log('   ├─ Profil complet:', store.utilisateur.profilComplet ? 'Oui' : 'Non');
    console.log('   └─ Dernière connexion:', store.utilisateur.dateDerniereConnexion || 'Non définie');
  }
  
  console.log('⏳ Chargement:', store.isLoading ? 'En cours' : 'Terminé');
  console.log('❌ Erreur:', store.error || 'Aucune');
  
  // Propriétés calculées
  console.log('🔍 Propriétés calculées:');
  console.log('   ├─ Est connecté:', store.estConnecte ? 'Oui' : 'Non');
  console.log('   ├─ Profil complet:', store.profilComplet ? 'Oui' : 'Non');
  console.log('   └─ Nom utilisateur:', store.nomUtilisateur || 'Non défini');
}

// Fonction pour afficher les données signup
function displaySignupStoreData(store) {
  console.log('📞 Numéro de téléphone:', store.phone_number || 'Non défini');
  console.log('🖼️  Photo de profil:', store.profile_picture ? 'Définie' : 'Non définie');
  console.log('👤 Nom complet:', store.full_name || 'Non défini');
  console.log('🌍 Pays:', store.country || 'Non défini');
  console.log('💼 Années d\'expérience:', store.annee_experience || 'Non défini');
  console.log('⚙️  Mode de gestion:', store.mode_management || 'Non défini');
  console.log('📞 Méthode de contact:', store.methode_contact || 'Non défini');
}

// Fonction pour afficher un résumé
function displaySummary() {
  console.log('\n📊 === RÉSUMÉ ===');
  
  try {
    const pinia = getPinia();
    let userStore, signupStore;
    
    if (pinia) {
      userStore = pinia._s.get('user');
      signupStore = pinia._s.get('signup');
    } else {
      userStore = window.userStore;
      signupStore = window.signupStore;
    }
    
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

// Fonction pour afficher les données brutes
function debugRawStores() {
  console.log('🔍 === DONNÉES BRUTES DES STORES ===\n');
  
  try {
    const pinia = getPinia();
    if (pinia) {
      console.log('📱 Store Utilisateur (brut):', pinia._s.get('user'));
      console.log('📝 Store Signup (brut):', pinia._s.get('signup'));
    } else if (window.userStore && window.signupStore) {
      console.log('📱 Store Utilisateur (brut):', window.userStore);
      console.log('📝 Store Signup (brut):', window.signupStore);
    } else {
      console.error('❌ Aucun store trouvé.');
    }
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'accès aux stores:', error.message);
  }
}

// Fonction pour forcer la récupération des données utilisateur
function forceUserRecovery() {
  console.log('🔄 === RÉCUPÉRATION FORCÉE DES DONNÉES UTILISATEUR ===');
  
  try {
    const userStore = window.userStore;
    if (!userStore) {
      console.error('❌ Store utilisateur non trouvé.');
      return;
    }
    
    const telephone = userStore.telephone;
    if (!telephone) {
      console.error('❌ Aucun numéro de téléphone en mémoire.');
      return;
    }
    
    console.log('📞 Tentative de récupération pour:', telephone);
    
    // Appeler la méthode de récupération forcée
    userStore.forcerRecuperationUtilisateur(telephone).then(result => {
      if (result.success) {
        console.log('✅ Récupération forcée réussie:', userStore.utilisateur);
        debugUserStore(); // Afficher les nouvelles données
      } else {
        console.error('❌ Échec de la récupération forcée:', result.message);
      }
    });
    
  } catch (error) {
    console.error('❌ Erreur lors de la récupération forcée:', error.message);
  }
}

// Exposer les fonctions globalement
window.debugStoresSimple = {
  user: debugUserStore,
  signup: debugSignupStore,
  summary: displaySummary,
  all: debugAllStores,
  raw: debugRawStores,
  forceRecovery: forceUserRecovery
};

console.log('🔧 === FONCTIONS DE DEBUG SIMPLIFIÉES DISPONIBLES ===');
console.log('debugStoresSimple.user() - Afficher le store utilisateur');
console.log('debugStoresSimple.signup() - Afficher le store signup');
console.log('debugStoresSimple.summary() - Afficher le résumé');
console.log('debugStoresSimple.all() - Afficher tous les stores');
console.log('debugStoresSimple.raw() - Afficher les données brutes');
console.log('debugStoresSimple.forceRecovery() - Forcer la récupération des données utilisateur');
console.log('\n💡 Exemple: debugStoresSimple.all() pour tout afficher');
console.log('🆘 Si les données sont manquantes: debugStoresSimple.forceRecovery()');

// Afficher automatiquement les données au chargement
setTimeout(() => {
  console.log('\n🚀 === CHARGEMENT AUTOMATIQUE (VERSION SIMPLIFIÉE) ===');
  debugAllStores();
}, 1000); 