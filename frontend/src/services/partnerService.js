class PartnerService {
  static API_BASE_URL = 'http://localhost:5000/api/partners';

  // Créer un nouveau partenaire
  static async createPartner(partnerData) {
    try {
      const formData = new FormData();
      console.log(`[FRONTEND] [${new Date().toISOString()}] Action: Création partenaire, Payload:`, partnerData);
      
      // Ajouter les données du partenaire
      Object.keys(partnerData).forEach(key => {
        if (partnerData[key] !== null && partnerData[key] !== undefined) {
          if (key === 'photo' && partnerData[key] instanceof File) {
            formData.append('profile_photo', partnerData[key]);
            console.log(`[FRONTEND] [${new Date().toISOString()}] Photo ajoutée: ${partnerData[key].name}`);
          } else {
            formData.append(key, partnerData[key]);
            console.log(`[FRONTEND] [${new Date().toISOString()}] Champ: ${key}, Valeur: ${partnerData[key]}`);
          }
        }
      });
      
      const url = this.API_BASE_URL;
      console.log(`[FRONTEND] [${new Date().toISOString()}] Appel API: POST ${url}`);

      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log(`[FRONTEND] [${new Date().toISOString()}] Réponse API createPartner:`, data);

      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la création du partenaire');
      }

      return data;
    } catch (error) {
      console.error(`[FRONTEND] [${new Date().toISOString()}] Erreur API createPartner:`, error);
      throw error;
    }
  }

  // Récupérer tous les partenaires
  static async getPartners(params = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      if (params.page) queryParams.append('page', params.page);
      if (params.limit) queryParams.append('limit', params.limit);
      if (params.statut) queryParams.append('statut', params.statut);
      if (params.search) queryParams.append('search', params.search);

      const url = `${this.API_BASE_URL}?${queryParams.toString()}`;
      console.log(`[FRONTEND] [${new Date().toISOString()}] Appel API: GET ${url}`);
      
      const response = await fetch(url);
      const data = await response.json();
      console.log(`[FRONTEND] [${new Date().toISOString()}] Réponse API getPartners:`, data);

      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la récupération des partenaires');
      }

      return data;
    } catch (error) {
      console.error(`[FRONTEND] [${new Date().toISOString()}] Erreur API getPartners:`, error);
      throw error;
    }
  }

  // Récupérer un partenaire par ID
  static async getPartnerById(id) {
    try {
      const url = `${this.API_BASE_URL}/${id}`;
      console.log(`[FRONTEND] [${new Date().toISOString()}] Appel API: GET ${url}`);
      const response = await fetch(url);
      const data = await response.json();
      console.log(`[FRONTEND] [${new Date().toISOString()}] Réponse API getPartnerById:`, data);

      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la récupération du partenaire');
      }

      return data;
    } catch (error) {
      console.error(`[FRONTEND] [${new Date().toISOString()}] Erreur API getPartnerById:`, error);
      throw error;
    }
  }

  // Mettre à jour un partenaire
  static async updatePartner(id, partnerData) {
    try {
      const formData = new FormData();
      
      // Ajouter les données du partenaire
      Object.keys(partnerData).forEach(key => {
        if (partnerData[key] !== null && partnerData[key] !== undefined) {
          if (key === 'photo' && partnerData[key] instanceof File) {
            formData.append('profile_photo', partnerData[key]);
          } else {
            formData.append(key, partnerData[key]);
          }
        }
      });
      const url = `${this.API_BASE_URL}/${id}`;
      console.log(`[FRONTEND] [${new Date().toISOString()}] Appel API: PUT ${url}, Payload:`, partnerData);

      const response = await fetch(url, {
        method: 'PUT',
        body: formData,
      });

      const data = await response.json();
      console.log(`[FRONTEND] [${new Date().toISOString()}] Réponse API updatePartner:`, data);

      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la mise à jour du partenaire');
      }

      return data;
    } catch (error) {
      console.error(`[FRONTEND] [${new Date().toISOString()}] Erreur API updatePartner:`, error);
      throw error;
    }
  }

  // Supprimer un partenaire
  static async deletePartner(id) {
    try {
      const url = `${this.API_BASE_URL}/${id}`;
      console.log(`[FRONTEND] [${new Date().toISOString()}] Appel API: DELETE ${url}`);
      const response = await fetch(url, {
        method: 'DELETE',
      });

      const data = await response.json();
      console.log(`[FRONTEND] [${new Date().toISOString()}] Réponse API deletePartner:`, data);

      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la suppression du partenaire');
      }

      return data;
    } catch (error) {
      console.error(`[FRONTEND] [${new Date().toISOString()}] Erreur API deletePartner:`, error);
      throw error;
    }
  }

  // Mettre à jour le statut d'un partenaire
  static async updatePartnerStatus(id, status) {
    try {
      const url = `${this.API_BASE_URL}/${id}/status`;
      const payload = { statut: status };
      console.log(`[FRONTEND] [${new Date().toISOString()}] Appel API: PATCH ${url}, Payload:`, payload);
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log(`[FRONTEND] [${new Date().toISOString()}] Réponse API updatePartnerStatus:`, data);

      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la mise à jour du statut');
      }

      return data;
    } catch (error) {
      console.error(`[FRONTEND] [${new Date().toISOString()}] Erreur API updatePartnerStatus:`, error);
      throw error;
    }
  }

  // Enregistrer une relance
  static async recordRelance(id) {
    try {
      const url = `${this.API_BASE_URL}/${id}/relance`;
      console.log(`[FRONTEND] [${new Date().toISOString()}] Appel API: PATCH ${url}`);
      const response = await fetch(url, {
        method: 'PATCH',
      });

      const data = await response.json();
      console.log(`[FRONTEND] [${new Date().toISOString()}] Réponse API recordRelance:`, data);

      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de l\'enregistrement de la relance');
      }

      return data;
    } catch (error) {
      console.error(`[FRONTEND] [${new Date().toISOString()}] Erreur API recordRelance:`, error);
      throw error;
    }
  }

  // Formater les données du partenaire pour l'API
  static formatPartnerData(formData) {
    // Fonction pour combiner date et heure
    const combineDateTime = (dateString, timeString) => {
      if (!dateString) return null;
      
      // Si la date est déjà au format ISO, la retourner
      if (dateString.includes('-')) {
        const date = dateString.split('T')[0];
        const time = timeString || '12:00';
        return `${date}T${time}:00`;
      }
      
      // Convertir DD/MM/YYYY en YYYY-MM-DD
      const parts = dateString.split('/');
      if (parts.length === 3) {
        const [day, month, year] = parts;
        if (day && month && year) {
          const date = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
          const time = timeString || '12:00';
          return `${date}T${time}:00`;
        }
      }
      
      return dateString;
    };

    return {
      nom: formData.lastName,
      prenom: formData.firstName,
      telephone: formData.whatsapp,
      profession: formData.profession,
      type_bien_partage: formData.propertyType,
      montant: formData.amount,
      date_paiement: combineDateTime(formData.paymentDate, formData.paymentTime),
      mode_paiement: formData.paymentMethod,
      description_note: formData.note,
      photo: formData.photo
    };
  }

  // Validation simple des données
  static validatePartnerData(formData) {
    const errors = {};
    
    if (!formData.lastName?.trim()) {
      errors.lastName = 'Le nom est requis';
    }
    
    if (!formData.firstName?.trim()) {
      errors.firstName = 'Le prénom est requis';
    }
    
    if (!formData.whatsapp?.trim()) {
      errors.whatsapp = 'Le numéro de téléphone est requis';
    } else {
      const phoneRegex = /^\+?[1-9]\d{1,14}$/;
      if (!phoneRegex.test(formData.whatsapp.trim())) {
        errors.whatsapp = 'Le numéro de téléphone n\'est pas valide';
      }
    }
    
    if (!formData.amount || formData.amount <= 0) {
      errors.amount = 'Le montant doit être supérieur à 0';
    }
    
    if (!formData.paymentDate) {
      errors.paymentDate = 'La date de paiement est requise';
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }
}

export default PartnerService; 