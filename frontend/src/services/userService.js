/**
 * Service de gestion des utilisateurs
 * Communication avec l'API backend pour la gestion des utilisateurs
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

class UserService {
  /**
   * Vérifier si un utilisateur existe dans la base de données
   * @param {string} telephone - Numéro de téléphone à vérifier
   * @returns {Promise<Object>} - Résultat de la vérification
   */
  async verifierUtilisateur(telephone) {
    try {
      console.log('🔍 Vérification utilisateur:', telephone);
      const response = await fetch(`${API_BASE_URL}/user/exists`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ telephone })
      });
      const data = await response.json();
      console.log('📋 Réponse vérification utilisateur:', data);
      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la vérification');
      }
      return {
        success: true,
        existe: data.existe,
        message: data.message
      };
    } catch (error) {
      console.error('❌ Erreur vérification utilisateur:', error);
      return {
        success: false,
        existe: false,
        message: error.message || 'Erreur lors de la vérification de l\'utilisateur'
      };
    }
  }

  /**
   * Créer un nouvel utilisateur
   * @param {Object} userData - Données de l'utilisateur
   * @returns {Promise<Object>} - Résultat de la création
   */
  async creerUtilisateur(userData) {
    try {
      console.log('👤 Création utilisateur:', userData);
      
      const response = await fetch(`${API_BASE_URL}/utilisateurs/creer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();
      
      console.log('📋 Réponse création utilisateur:', data);
      
      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la création');
      }

      return {
        success: true,
        utilisateur: data.utilisateur,
        message: data.message
      };

    } catch (error) {
      console.error('❌ Erreur création utilisateur:', error);
      return {
        success: false,
        utilisateur: null,
        message: error.message || 'Erreur lors de la création de l\'utilisateur'
      };
    }
  }

  /**
   * Mettre à jour la dernière connexion d'un utilisateur
   * @param {string} telephone - Numéro de téléphone
   * @returns {Promise<Object>} - Résultat de la mise à jour
   */
  async mettreAJourConnexion(telephone) {
    try {
      console.log('🔄 Mise à jour connexion:', telephone);
      
      const response = await fetch(`${API_BASE_URL}/utilisateurs/connexion/${telephone}`, {
        method: 'PUT'
        // Pas de body JSON, donc pas besoin du header Content-Type
      });

      const data = await response.json();
      
      console.log('📋 Réponse mise à jour connexion:', data);
      
      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la mise à jour');
      }

      return {
        success: true,
        message: data.message,
        dateDerniereConnexion: data.dateDerniereConnexion
      };

    } catch (error) {
      console.error('❌ Erreur mise à jour connexion:', error);
      return {
        success: false,
        message: error.message || 'Erreur lors de la mise à jour de la connexion'
      };
    }
  }

  /**
   * Obtenir les informations d'un utilisateur
   * @param {string} telephone - Numéro de téléphone
   * @returns {Promise<Object>} - Informations de l'utilisateur
   */
  async obtenirUtilisateur(telephone) {
    try {
      console.log('📋 Récupération utilisateur:', telephone);
      
      const response = await fetch(`${API_BASE_URL}/utilisateurs/${telephone}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();
      
      console.log('📋 Réponse récupération utilisateur:', data);
      
      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la récupération');
      }

      return {
        success: true,
        utilisateur: data.utilisateur
      };

    } catch (error) {
      console.error('❌ Erreur récupération utilisateur:', error);
      return {
        success: false,
        utilisateur: null,
        message: error.message || 'Erreur lors de la récupération de l\'utilisateur'
      };
    }
  }

  /**
   * Finaliser l'inscription d'un utilisateur
   * @param {Object} userData - Données complètes de l'utilisateur
   * @returns {Promise<Object>} - Résultat de la finalisation
   */
  async finaliserInscription(userData) {
    try {
      console.log('🚀 Finalisation inscription:', userData);
      const response = await fetch(`${API_BASE_URL}/user/finaliser-inscription`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });
      const data = await response.json();
      console.log('📋 Réponse finalisation inscription:', data);
      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la finalisation');
      }
      return {
        success: true,
        utilisateur: data.utilisateur,
        message: data.message
      };
    } catch (error) {
      console.error('❌ Erreur finalisation inscription:', error);
      return {
        success: false,
        utilisateur: null,
        message: error.message || 'Erreur lors de la finalisation de l\'inscription'
      };
    }
  }
}

// Export d'une instance unique du service
const userService = new UserService();
export default userService; 