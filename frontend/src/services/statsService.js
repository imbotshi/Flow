// Service pour la gestion des statistiques (frontend/src/services/statsService.js)

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

class StatsService {
  // Récupérer les statistiques d'overview
  static async getOverview() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/relances/stats/overview`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken') || ''}`
        }
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la récupération des statistiques');
      }
      return data;
    } catch (error) {
      console.error('Erreur StatsService.getOverview:', error);
      throw error;
    }
  }
}

export default StatsService; 