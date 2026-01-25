import api from './api';
import * as SecureStore from 'expo-secure-store';

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
      await SecureStore.setItemAsync('userToken', response.data.token);
      await SecureStore.setItemAsync('userRole', 'patient');
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
      await SecureStore.setItemAsync('userToken', response.data.token);
      await SecureStore.setItemAsync('userRole', 'therapist');
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
      await SecureStore.setItemAsync('userToken', response.data.token);
      await SecureStore.setItemAsync('userRole', 'therapist');
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
    await SecureStore.deleteItemAsync('userToken');
    await SecureStore.deleteItemAsync('userRole');
  }

  // Vérifier si l'utilisateur est connecté
  async isAuthenticated() {
    const token = await SecureStore.getItemAsync('userToken');
    return !!token;
  }

  // Obtenir le rôle de l'utilisateur
  async getUserRole() {
    return await SecureStore.getItemAsync('userRole');
  }
}

export default new AuthService();
