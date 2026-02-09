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
    console.log('🌐 === REQUÊTE API ===');
    console.log('📍 URL complète:', config.baseURL + config.url);
    console.log('🔑 Method:', config.method.toUpperCase());
    console.log('📦 Data:', config.data);
    
    const token = await StorageService.getItem('userToken');
    console.log('🎫 Token:', token ? `Présent (${token.substring(0, 30)}...)` : '❌ ABSENT');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    console.log('📤 Headers:', config.headers);
    
    return config;
  },
  (error) => {
    console.log('🚨 Erreur intercepteur requête:', error);
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
  (response) => {
    console.log('✅ === RÉPONSE API ===');
    console.log('📍 URL:', response.config.url);
    console.log('📊 Status:', response.status);
    console.log('📦 Data:', response.data);
    return response;
  },
  async (error) => {
    console.log('❌ === ERREUR API ===');
    console.log('📍 URL:', error.config?.url);
    console.log('📊 Status:', error.response?.status);
    console.log('📦 Response data:', error.response?.data);
    console.log('💬 Message:', error.message);
    console.log('🔍 Code:', error.code);
    
    if (error.response?.status === 401) {
      console.log('🔐 Token expiré, déconnexion...');
      await StorageService.deleteItem('userToken');
      await StorageService.deleteItem('userRole');
    }
    
    return Promise.reject(error);
  }
);

export default api;