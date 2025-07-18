import { defineStore } from "pinia";
import { ref, computed } from "vue";
import userService from "../services/userService.js";

export const useUserStore = defineStore("user", () => {
  // State
  const telephone = ref("");
  const utilisateur = ref(null);
  const isLoading = ref(false);
  const error = ref("");

  // Computed
  const estConnecte = computed(() => !!utilisateur.value);
  const profilComplet = computed(() => utilisateur.value?.profilComplet || false);
  const nomUtilisateur = computed(() => utilisateur.value?.nom || "");

  // Actions

  /**
   * Définir le numéro de téléphone en mémoire tampon
   * @param {string} numero - Numéro de téléphone
   */
  const setTelephone = (numero) => {
    telephone.value = numero;
    console.log("📱 Numéro de téléphone défini:", numero);
  };

  /**
   * Vérifier si un utilisateur existe dans la base de données
   * @param {string} numero - Numéro de téléphone à vérifier
   * @returns {Promise<Object>} - Résultat de la vérification
   */
  const verifierUtilisateur = async (numero) => {
    isLoading.value = true;
    error.value = "";

    try {
      console.log("🔍 Vérification de l'existence de l'utilisateur:", numero);
      
      const resultat = await userService.verifierUtilisateur(numero);
      
      if (resultat.success) {
        if (resultat.existe) {
          // Utilisateur trouvé, récupérer ses informations complètes
          const userInfo = await userService.obtenirUtilisateur(numero);
          if (userInfo.success) {
            utilisateur.value = userInfo.utilisateur;
            console.log("✅ Utilisateur trouvé et chargé:", userInfo.utilisateur);
          }
        } else {
          // Utilisateur non trouvé, vider les données utilisateur
          utilisateur.value = null;
          console.log("❌ Utilisateur non trouvé");
        }
      } else {
        error.value = resultat.message;
        console.error("❌ Erreur lors de la vérification:", resultat.message);
      }

      return resultat;

    } catch (err) {
      error.value = "Erreur lors de la vérification de l'utilisateur";
      console.error("💥 Exception lors de la vérification:", err);
      return {
        success: false,
        existe: false,
        profilComplet: false,
        message: error.value
      };
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Créer un nouvel utilisateur
   * @param {Object} userData - Données de l'utilisateur
   * @returns {Promise<Object>} - Résultat de la création
   */
  const creerUtilisateur = async (userData) => {
    isLoading.value = true;
    error.value = "";

    try {
      console.log("👤 Création d'un nouvel utilisateur:", userData);
      
      const resultat = await userService.creerUtilisateur(userData);
      
      if (resultat.success) {
        utilisateur.value = resultat.utilisateur;
        console.log("✅ Nouvel utilisateur créé:", resultat.utilisateur);
      } else {
        error.value = resultat.message;
        console.error("❌ Erreur lors de la création:", resultat.message);
      }

      return resultat;

    } catch (err) {
      error.value = "Erreur lors de la création de l'utilisateur";
      console.error("💥 Exception lors de la création:", err);
      return {
        success: false,
        utilisateur: null,
        message: error.value
      };
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Mettre à jour la dernière connexion
   * @param {string} numero - Numéro de téléphone
   * @returns {Promise<Object>} - Résultat de la mise à jour
   */
  const mettreAJourConnexion = async (numero) => {
    try {
      console.log("🔄 Mise à jour de la dernière connexion:", numero);
      
      const resultat = await userService.mettreAJourConnexion(numero);
      
      if (resultat.success) {
        // Mettre à jour la date de dernière connexion dans le store
        if (utilisateur.value) {
          utilisateur.value.dateDerniereConnexion = resultat.dateDerniereConnexion;
        }
        console.log("✅ Dernière connexion mise à jour");
      } else {
        console.error("❌ Erreur lors de la mise à jour de la connexion:", resultat.message);
      }

      return resultat;

    } catch (err) {
      console.error("💥 Exception lors de la mise à jour de la connexion:", err);
      return {
        success: false,
        message: "Erreur lors de la mise à jour de la connexion"
      };
    }
  };

  /**
   * Déconnecter l'utilisateur (vider le store)
   */
  const deconnecter = () => {
    utilisateur.value = null;
    error.value = "";
    console.log("🚪 Utilisateur déconnecté");
  };

  /**
   * Vider les erreurs
   */
  const clearError = () => {
    error.value = "";
  };

  return {
    // State
    telephone,
    utilisateur,
    isLoading,
    error,
    
    // Computed
    estConnecte,
    profilComplet,
    nomUtilisateur,
    
    // Actions
    setTelephone,
    verifierUtilisateur,
    creerUtilisateur,
    mettreAJourConnexion,
    deconnecter,
    clearError
  };
});

export const useSignupStore = defineStore('signup', {
  state: () => ({
    phone_number: '', // /phone
    profile_picture: null, // /user-info
    full_name: '', // /user-info
    country: '', // /user-info
    annee_experience: '', // /business-experience
    mode_management: '', // /business-process
    methode_contact: '', // /contact-method
  }),
  actions: {
    setPhoneNumber(phone) {
      this.phone_number = phone;
    },
    setProfilePicture(pic) {
      this.profile_picture = pic;
    },
    setFullName(name) {
      this.full_name = name;
    },
    setCountry(country) {
      this.country = country;
    },
    setAnneeExperience(val) {
      this.annee_experience = val;
    },
    setModeManagement(val) {
      this.mode_management = val;
    },
    setMethodeContact(val) {
      this.methode_contact = val;
    },
    reset() {
      this.phone_number = '';
      this.profile_picture = null;
      this.full_name = '';
      this.country = '';
      this.annee_experience = '';
      this.mode_management = '';
      this.methode_contact = '';
      console.log('[VaniaFlow] Mémoire temporaire (signup store) vidée.');
    }
  }
});
