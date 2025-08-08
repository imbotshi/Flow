/**
 * Service de gestion des uploads de fichiers
 * Communication avec l'API backend pour les uploads
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

class UploadService {
  /**
   * Uploader une photo de profil
   * @param {File} file - Fichier image à uploader
   * @param {string} telephone - Numéro de téléphone de l'utilisateur
   * @returns {Promise<Object>} - Résultat de l'upload
   */
  async uploadProfilePhoto(file, telephone) {
    try {
      console.log('📸 Upload de photo de profil:', file.name, 'pour:', telephone);
      
      const formData = new FormData();
      formData.append('profile_photo', file);
      formData.append('telephone', telephone);
      
      const response = await fetch(`${API_BASE_URL}/upload/profile-photo`, {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      console.log('📋 Réponse upload photo:', data);
      
      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de l\'upload');
      }
      
      return {
        success: true,
        filename: data.filename,
        url: data.url,
        user: data.user
      };
      
    } catch (error) {
      console.error('❌ Erreur upload photo:', error);
      return {
        success: false,
        message: error.message || 'Erreur lors de l\'upload de la photo'
      };
    }
  }
  
  /**
   * Supprimer une photo de profil
   * @param {string} telephone - Numéro de téléphone de l'utilisateur
   * @returns {Promise<Object>} - Résultat de la suppression
   */
  async deleteProfilePhoto(telephone) {
    try {
      console.log('🗑️ Suppression de photo de profil pour:', telephone);
      
      const response = await fetch(`${API_BASE_URL}/upload/profile-photo/${telephone}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      const data = await response.json();
      console.log('📋 Réponse suppression photo:', data);
      
      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la suppression');
      }
      
      return {
        success: true,
        message: data.message,
        user: data.user
      };
      
    } catch (error) {
      console.error('❌ Erreur suppression photo:', error);
      return {
        success: false,
        message: error.message || 'Erreur lors de la suppression de la photo'
      };
    }
  }
  
  /**
   * Obtenir l'URL d'une photo de profil
   * @param {string} telephone - Numéro de téléphone de l'utilisateur
   * @returns {Promise<Object>} - URL de la photo
   */
  async getProfilePhotoUrl(telephone) {
    try {
      console.log('🔍 Récupération URL photo pour:', telephone);
      
      const response = await fetch(`${API_BASE_URL}/upload/profile-photo/${telephone}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      const data = await response.json();
      console.log('📋 Réponse URL photo:', data);
      
      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la récupération');
      }
      
      return {
        success: true,
        url: data.url,
        filename: data.filename,
        exists: data.exists
      };
      
    } catch (error) {
      console.error('❌ Erreur récupération URL photo:', error);
      return {
        success: false,
        message: error.message || 'Erreur lors de la récupération de l\'URL'
      };
    }
  }
  
  /**
   * Valider un fichier image
   * @param {File} file - Fichier à valider
   * @returns {Object} - Résultat de la validation
   */
  validateImageFile(file) {
    // Vérifier le type de fichier
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return {
        valid: false,
        message: 'Type de fichier non supporté. Utilisez JPEG, PNG, GIF ou WebP.'
      };
    }
    
    // Vérifier la taille (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return {
        valid: false,
        message: 'Fichier trop volumineux. Taille maximum : 5MB.'
      };
    }
    
    return {
      valid: true,
      message: 'Fichier valide'
    };
  }
  
  /**
   * Convertir un fichier en base64 (pour prévisualisation)
   * @param {File} file - Fichier à convertir
   * @returns {Promise<string>} - Base64 du fichier
   */
  async fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  
  /**
   * Convertir un base64 en fichier
   * @param {string} base64 - Chaîne base64
   * @param {string} filename - Nom du fichier
   * @returns {Promise<File>} - Fichier créé
   */
  async base64ToFile(base64, filename) {
    // Extraire le type MIME et les données
    const matches = base64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    
    if (!matches || matches.length !== 3) {
      throw new Error('Format base64 invalide');
    }
    
    const mimeType = matches[1];
    const data = matches[2];
    
    // Convertir base64 en blob
    const byteCharacters = atob(data);
    const byteNumbers = new Array(byteCharacters.length);
    
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });
    
    // Créer un fichier à partir du blob
    return new File([blob], filename, { type: mimeType });
  }
}

// Export d'une instance unique du service
const uploadService = new UploadService();
export default uploadService; 