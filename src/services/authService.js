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
      await StorageService.setItem('userToken', response.data.token); 
      await StorageService.setItem('userRole', 'patient'); 
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Lien invalide ou expiré' 
      };
    }
  }

  // Connexion thérapeute
 // src/services/authService.js
  async loginTherapist(email, password) {
    try {
      const response = await api.post('/auth/login', { email, password });
      
      await StorageService.setItem('userToken', response.data.token);
      await StorageService.setItem('userRole', 'therapist');
      
      const storedToken = await StorageService.getItem('userToken');
      
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Identifiants incorrects' 
      };
    }
  }

  async registerTherapist(data) {
    try {
      const response = await api.post('/auth/therapist/register', data);
      await StorageService.setItem('userToken', response.data.token); 
      await StorageService.setItem('userRole', 'therapist'); 
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erreur lors de l\'inscription' 
      };
    }
  }

  async logout() {
    await StorageService.removeItem('userToken'); 
    await StorageService.removeItem('userRole'); 
  }

  async isAuthenticated() {
    const token = await StorageService.getItem('userToken'); 
    return !!token;
  }

  async getUserRole() {
    return await StorageService.getItem('userRole'); 
  }

  async getToken() {
    return await StorageService.getItem('userToken');
  }
}

export default new AuthService();