// Service pour la gestion des OTP (envoi et vérification)
// À connecter à l'API backend

const API_BASE = '/api/otp';

export default {
  /**
   * Envoie un OTP au numéro de téléphone fourni
   * @param {string} phone - Numéro de téléphone
   * @returns {Promise<{success: boolean, message?: string, details?: string}>}
   */
  async sendOtp(phone) {
    try {
      // Validation du numéro de téléphone
      if (!phone || phone.trim().length === 0) {
        return { 
          success: false, 
          message: 'Le numéro de téléphone est requis',
          details: 'VALIDATION_ERROR'
        };
      }
      
      if (phone.length < 8) {
        return { 
          success: false, 
          message: 'Le numéro de téléphone doit contenir au moins 8 chiffres',
          details: 'VALIDATION_ERROR'
        };
      }

      console.log('🔍 Tentative d\'envoi OTP vers:', phone);
      console.log('🔍 URL API:', `${API_BASE}/send`);
      
      const response = await fetch(`${API_BASE}/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone })
      });
      
      console.log('📡 Réponse API OTP:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        url: response.url
      });
      
      if (!response.ok) {
        let errorMessage = 'Erreur lors de l\'envoi du code';
        let errorDetails = 'API_ERROR';
        
        try {
          const errorData = await response.json();
          console.log('❌ Données d\'erreur API:', errorData);
          
          if (errorData.error) {
            errorMessage = errorData.error;
            errorDetails = 'API_ERROR_MESSAGE';
          } else if (response.status === 404) {
            errorMessage = 'Service OTP non disponible (404) - Vérifiez que le backend est démarré';
            errorDetails = 'API_404';
          } else if (response.status === 500) {
            errorMessage = 'Erreur serveur interne (500) - Problème côté serveur';
            errorDetails = 'API_500';
          } else if (response.status === 429) {
            errorMessage = 'Trop de tentatives. Veuillez attendre avant de réessayer';
            errorDetails = 'API_RATE_LIMIT';
          } else if (response.status === 400) {
            errorMessage = 'Numéro de téléphone invalide ou format incorrect';
            errorDetails = 'API_400';
          } else if (response.status === 403) {
            errorMessage = 'Accès refusé - Vérifiez les permissions';
            errorDetails = 'API_403';
          } else if (response.status === 0) {
            errorMessage = 'Erreur de connexion réseau - Vérifiez votre connexion internet';
            errorDetails = 'NETWORK_ERROR';
          }
        } catch (parseError) {
          console.log('❌ Erreur parsing réponse:', parseError);
          errorMessage = `Erreur serveur (${response.status}): ${response.statusText}`;
          errorDetails = 'PARSE_ERROR';
        }
        
        throw new Error(`${errorMessage} [${errorDetails}]`);
      }
      
      const data = await response.json().catch(() => ({}));
      console.log('✅ Succès envoi OTP:', data);
      
      return { 
        success: true, 
        message: 'Code envoyé avec succès',
        details: 'SUCCESS'
      };
    } catch (e) {
      console.error('💥 Erreur détaillée OTP:', {
        name: e.name,
        message: e.message,
        stack: e.stack
      });
      
      // Gestion des erreurs réseau spécifiques
      if (e.name === 'TypeError' && e.message.includes('fetch')) {
        return { 
          success: false, 
          message: 'Erreur de connexion au serveur. Vérifiez votre connexion internet.',
          details: 'NETWORK_FETCH_ERROR'
        };
      }
      
      if (e.name === 'TypeError' && e.message.includes('Failed to fetch')) {
        return { 
          success: false, 
          message: 'Impossible de joindre le serveur. Vérifiez que le backend est démarré sur le bon port.',
          details: 'NETWORK_CONNECTION_ERROR'
        };
      }
      
      if (e.name === 'AbortError') {
        return { 
          success: false, 
          message: 'Requête annulée - Timeout de connexion',
          details: 'NETWORK_TIMEOUT'
        };
      }
      
      return { 
        success: false, 
        message: e.message,
        details: 'UNKNOWN_ERROR'
      };
    }
  },

  /**
   * Vérifie le code OTP saisi par l'utilisateur
   * @param {string} phone - Numéro de téléphone
   * @param {string} otp - Code OTP saisi
   * @returns {Promise<{success: boolean, message?: string, details?: string}>}
   */
  async verifyOtp(phone, otp) {
    try {
      // Validation des paramètres
      if (!phone || phone.trim().length === 0) {
        return { 
          success: false, 
          message: 'Le numéro de téléphone est requis',
          details: 'VALIDATION_ERROR'
        };
      }
      
      if (!otp || otp.trim().length === 0) {
        return { 
          success: false, 
          message: 'Le code OTP est requis',
          details: 'VALIDATION_ERROR'
        };
      }
      
      if (otp.length < 4) {
        return { 
          success: false, 
          message: 'Le code OTP doit contenir au moins 4 chiffres',
          details: 'VALIDATION_ERROR'
        };
      }

      console.log('🔍 Tentative de vérification OTP:', { phone, otpLength: otp.length });
      
      const response = await fetch(`${API_BASE}/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, otp })
      });
      
      console.log('📡 Réponse API vérification:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok
      });
      
      if (!response.ok) {
        let errorMessage = 'Code incorrect ou expiré';
        let errorDetails = 'VERIFICATION_ERROR';
        
        try {
          const data = await response.json();
          console.log('❌ Données d\'erreur vérification:', data);
          
          if (data.error) {
            errorMessage = data.error;
            errorDetails = 'API_ERROR_MESSAGE';
          } else if (response.status === 400) {
            errorMessage = 'Code OTP invalide ou format incorrect';
            errorDetails = 'API_400';
          } else if (response.status === 401) {
            errorMessage = 'Code OTP incorrect';
            errorDetails = 'API_401';
          } else if (response.status === 410) {
            errorMessage = 'Code OTP expiré - Veuillez demander un nouveau code';
            errorDetails = 'API_410';
          } else if (response.status === 404) {
            errorMessage = 'Service de vérification non disponible';
            errorDetails = 'API_404';
          } else if (response.status === 500) {
            errorMessage = 'Erreur serveur lors de la vérification';
            errorDetails = 'API_500';
          }
        } catch (parseError) {
          console.log('❌ Erreur parsing réponse vérification:', parseError);
          errorMessage = `Erreur serveur (${response.status}): ${response.statusText}`;
          errorDetails = 'PARSE_ERROR';
        }
        
        throw new Error(`${errorMessage} [${errorDetails}]`);
      }
      
      const data = await response.json().catch(() => ({}));
      console.log('✅ Succès vérification OTP:', data);
      
      return { 
        success: true, 
        message: 'Code vérifié avec succès',
        details: 'SUCCESS'
      };
    } catch (e) {
      console.error('💥 Erreur détaillée vérification OTP:', {
        name: e.name,
        message: e.message,
        stack: e.stack
      });
      
      // Gestion des erreurs réseau
      if (e.name === 'TypeError' && e.message.includes('fetch')) {
        return { 
          success: false, 
          message: 'Erreur de connexion lors de la vérification',
          details: 'NETWORK_FETCH_ERROR'
        };
      }
      
      return { 
        success: false, 
        message: e.message,
        details: 'UNKNOWN_ERROR'
      };
    }
  }
}; 