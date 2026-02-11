// src/services/api.js
import axios from 'axios';
import StorageService from './StorageService';
import ENV from '../config/environment';

const api = axios.create({
  baseURL: ENV.apiUrl,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token JWT
  api.interceptors.request.use(
    async (config) => {      
      const token = await StorageService.getItem('userToken');

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        console.log('⚠️ Aucun token trouvé dans le storage');
      }      
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Intercepteur pour gérer les erreurs
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        console.warn('⚠️ 401 Unauthorized - vérifier le token');
        // NE PAS faire de logout automatique
      }
      return Promise.reject(error);
    }
  );

/**
 * Fonction utilitaire pour faire des requêtes API
 * @param {string} url - L'URL de l'endpoint (ex: '/patients')
 * @param {string} method - La méthode HTTP (GET, POST, PUT, DELETE)
 * @param {object} data - Les données à envoyer (pour POST, PUT)
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 */
export const apiRequest = async (url, method = 'GET', data = null) => {
  try {
    const config = {
      method: method.toUpperCase(),
      url,
    };

    // Ajouter les données si présentes (POST, PUT)
    if (data && ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase())) {
      config.data = data;
    }

    const response = await api(config);

    // Retourner un format standardisé
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    // Gérer les erreurs et retourner un format standardisé
    const errorMessage = 
      error.response?.data?.message || 
      error.response?.data?.error || 
      error.message || 
      'Une erreur est survenue';

    return {
      success: false,
      error: errorMessage,
      statusCode: error.response?.status,
    };
  }
};

export default api;