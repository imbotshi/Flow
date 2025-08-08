// Service pour la gestion des relances (frontend/src/services/relanceService.js)

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

class RelanceService {
  // Récupérer toutes les relances (optionnel: params pour pagination, filtre)
  static async getRelances(params = {}) {
    try {
      const queryParams = new URLSearchParams();
      if (params.page) queryParams.append('page', params.page);
      if (params.limit) queryParams.append('limit', params.limit);
      if (params.statut) queryParams.append('statut', params.statut);
      if (params.search) queryParams.append('search', params.search);
      const url = `${API_BASE_URL}/api/relances?${queryParams.toString()}`;
      console.log(`[FRONTEND] [${new Date().toISOString()}] Appel API: GET ${url}`);
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken') || ''}`
        }
      });
      const data = await response.json();
      console.log(`[FRONTEND] [${new Date().toISOString()}] Réponse API getRelances:`, data);
      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la récupération des relances');
      }
      return data;
    } catch (error) {
      console.error(`[FRONTEND] [${new Date().toISOString()}] Erreur API getRelances:`, error);
      throw error;
    }
  }

  // Créer une nouvelle relance
  static async createRelance(relanceData) {
    try {
      const url = `${API_BASE_URL}/api/relances`;
      console.log(`[FRONTEND] [${new Date().toISOString()}] Appel API: POST ${url}, Payload:`, relanceData);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken') || ''}`
        },
        body: JSON.stringify(relanceData)
      });
      const data = await response.json();
      console.log(`[FRONTEND] [${new Date().toISOString()}] Réponse API createRelance:`, data);
      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la création de la relance');
      }
      return data;
    } catch (error) {
      console.error(`[FRONTEND] [${new Date().toISOString()}] Erreur API createRelance:`, error);
      throw error;
    }
  }

  // Mettre à jour une relance (ex: PATCH /api/partners/:id/relance)
  static async updateRelance(partnerId, relanceData) {
    try {
      const url = `${API_BASE_URL}/api/partners/${partnerId}/relance`;
      console.log(`[FRONTEND] [${new Date().toISOString()}] Appel API: PATCH ${url}, Payload:`, relanceData);
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken') || ''}`
        },
        body: JSON.stringify(relanceData)
      });
      const data = await response.json();
      console.log(`[FRONTEND] [${new Date().toISOString()}] Réponse API updateRelance:`, data);
      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la mise à jour de la relance');
      }
      return data;
    } catch (error) {
      console.error(`[FRONTEND] [${new Date().toISOString()}] Erreur API updateRelance:`, error);
      throw error;
    }
  }
}

export default RelanceService; 