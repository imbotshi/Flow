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
      const url = `${API_BASE_URL}/user/exists`;
      const payload = { telephone };
      console.log(`[FRONTEND] [${new Date().toISOString()}] Appel API: POST ${url}, Payload:`, payload);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      console.log(`[FRONTEND] [${new Date().toISOString()}] Réponse API verifierUtilisateur:`, data);
      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la vérification');
      }
      return {
        success: true,
        existe: data.existe,
        message: data.message
      };
    } catch (error) {
      console.error(`[FRONTEND] [${new Date().toISOString()}] Erreur API verifierUtilisateur:`, error);
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
      const url = `${API_BASE_URL}/utilisateurs/creer`;
      console.log(`[FRONTEND] [${new Date().toISOString()}] Appel API: POST ${url}, Payload:`, userData);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });
      const data = await response.json();
      console.log(`[FRONTEND] [${new Date().toISOString()}] Réponse API creerUtilisateur:`, data);
      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la création');
      }
      return {
        success: true,
        utilisateur: data.utilisateur,
        message: data.message
      };
    } catch (error) {
      console.error(`[FRONTEND] [${new Date().toISOString()}] Erreur API creerUtilisateur:`, error);
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
      const url = `${API_BASE_URL}/utilisateurs/connexion/${telephone}`;
      console.log(`[FRONTEND] [${new Date().toISOString()}] Appel API: PUT ${url}`);
      const response = await fetch(url, {
        method: 'PUT'
      });
      const data = await response.json();
      console.log(`[FRONTEND] [${new Date().toISOString()}] Réponse API mettreAJourConnexion:`, data);
      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la mise à jour');
      }
      return {
        success: true,
        message: data.message,
        dateDerniereConnexion: data.dateDerniereConnexion
      };
    } catch (error) {
      console.error(`[FRONTEND] [${new Date().toISOString()}] Erreur API mettreAJourConnexion:`, error);
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
      const url = `${API_BASE_URL}/utilisateurs/${telephone}`;
      console.log(`[FRONTEND] [${new Date().toISOString()}] Appel API: GET ${url}`);
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();
      console.log(`[FRONTEND] [${new Date().toISOString()}] Réponse API obtenirUtilisateur:`, data);
      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la récupération');
      }
      return {
        success: true,
        utilisateur: data.utilisateur
      };
    } catch (error) {
      console.error(`[FRONTEND] [${new Date().toISOString()}] Erreur API obtenirUtilisateur:`, error);
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
      const url = `${API_BASE_URL}/user/finaliser-inscription`;
      console.log(`[FRONTEND] [${new Date().toISOString()}] Appel API: POST ${url}, Payload:`, userData);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });
      const data = await response.json();
      console.log(`[FRONTEND] [${new Date().toISOString()}] Réponse API finaliserInscription:`, data);
      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la finalisation');
      }
      return {
        success: true,
        utilisateur: data.utilisateur,
        message: data.message
      };
    } catch (error) {
      console.error(`[FRONTEND] [${new Date().toISOString()}] Erreur API finaliserInscription:`, error);
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