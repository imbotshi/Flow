// Service pour la gestion des OTP (envoi et vérification)
// À connecter à l'API backend

const API_BASE = '/api/otp';

export default {
  /**
   * Envoie un OTP au numéro de téléphone fourni
   * @param {string} phone - Numéro de téléphone
   * @returns {Promise<{success: boolean, message?: string}>}
   */
  async sendOtp(phone) {
    try {
      const response = await fetch(`${API_BASE}/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone })
      });
      if (!response.ok) throw new Error('Erreur lors de l’envoi du code');
      return { success: true };
    } catch (e) {
      return { success: false, message: e.message };
    }
  },

  /**
   * Vérifie le code OTP saisi par l'utilisateur
   * @param {string} phone - Numéro de téléphone
   * @param {string} otp - Code OTP saisi
   * @returns {Promise<{success: boolean, message?: string}>}
   */
  async verifyOtp(phone, otp) {
    try {
      const response = await fetch(`${API_BASE}/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, otp })
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Code incorrect ou expiré');
      }
      return { success: true };
    } catch (e) {
      return { success: false, message: e.message };
    }
  }
}; 