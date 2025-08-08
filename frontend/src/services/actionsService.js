// Service pour la gestion des actions/logs (frontend/src/services/actionsService.js)

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

class ActionsService {
  // Récupérer les actions/logs (optionnel: params pour pagination)
  static async getActions(params = {}) {
    try {
      const queryParams = new URLSearchParams();
      if (params.page) queryParams.append('page', params.page);
      if (params.limit) queryParams.append('limit', params.limit);
      const url = `${API_BASE_URL}/api/actions/logs?${queryParams.toString()}`;
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken') || ''}`
        }
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la récupération des actions');
      }
      return data;
    } catch (error) {
      console.error('Erreur ActionsService.getActions:', error);
      throw error;
    }
  }
}

export default ActionsService; 