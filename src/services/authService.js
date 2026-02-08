import api from './api';
import StorageService from './StorageService';

class AuthService {
  // Envoyer le magic link au patient
  async sendMagicLink(email) {
    try {
      const response = await api.post('/auth/magic-link', { email });
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erreur lors de l\'envoi du lien' 
      };
    }
  }

  // Vérifier le magic link et obtenir le token
  async verifyMagicLink(token) {
    try {
      const response = await api.post('/auth/verify-magic-link', { token });
      await StorageService.setItem('userToken', response.data.token); // ✅
      await StorageService.setItem('userRole', 'patient'); // ✅
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Lien invalide ou expiré' 
      };
    }
  }

  // Connexion thérapeute
  async loginTherapist(email, password) {
    try {
      const response = await api.post('/auth/therapist/login', { email, password });
      await StorageService.setItem('userToken', response.data.token); // ✅
      await StorageService.setItem('userRole', 'therapist'); // ✅
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Identifiants incorrects' 
      };
    }
  }

  // Inscription thérapeute
  async registerTherapist(data) {
    try {
      const response = await api.post('/auth/therapist/register', data);
      await StorageService.setItem('userToken', response.data.token); // ✅
      await StorageService.setItem('userRole', 'therapist'); // ✅
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erreur lors de l\'inscription' 
      };
    }
  }

  // Déconnexion
  async logout() {
    await StorageService.removeItem('userToken'); // ✅
    await StorageService.removeItem('userRole'); // ✅
  }

  // Vérifier si l'utilisateur est connecté
  async isAuthenticated() {
    const token = await StorageService.getItem('userToken'); // ✅
    return !!token;
  }

  // Obtenir le rôle de l'utilisateur
  async getUserRole() {
    return await StorageService.getItem('userRole'); // ✅
  }

  // ✅ Méthode utile pour récupérer le token (pour les headers API)
  async getToken() {
    return await StorageService.getItem('userToken');
  }
}

export default new AuthService();