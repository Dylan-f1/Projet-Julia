import api from './api';

class ChatService {
  // Récupérer la conversation active du patient
  async getActiveConversation() {
    try {
      const response = await api.get('/conversations/active');
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erreur lors du chargement de la conversation',
      };
    }
  }

  // Alias
  async getMyConversations() {
    return this.getActiveConversation();
  }

  async getPatientConversations() {
    return this.getActiveConversation();
  }

  // Récupérer l'historique des conversations fermées
  async getConversationHistory() {
    try {
      const response = await api.get('/conversations/history');
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erreur lors du chargement de l\'historique',
      };
    }
  }

  // Créer une nouvelle conversation avec un premier message
  async createConversation(firstMessage = 'Bonjour') {
    try {
      const response = await api.post('/conversations', { firstMessage });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erreur lors de la création de la conversation',
      };
    }
  }

  // Envoyer un message dans une conversation existante
  async sendMessage(conversationId, message) {
    try {
      const response = await api.post(`/conversations/${conversationId}/messages`, { message });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erreur lors de l\'envoi du message',
      };
    }
  }

  // Récupérer les messages d'une conversation spécifique (pour le patient)
  async getMessages(conversationId) {
    try {
      // Utiliser la route patient/:id pour récupérer une conversation spécifique
      const response = await api.get(`/conversations/patient/${conversationId}`);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erreur lors du chargement des messages',
      };
    }
  }

  // Fermer une conversation avec un niveau de gravité
  async closeConversation(conversationId, gravityLevel) {
    try {
      const response = await api.post(`/conversations/${conversationId}/close`, { gravityLevel });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erreur lors de la fermeture de la conversation',
      };
    }
  }

  // Récupérer les conversations d'un patient (vue therapist)
  async getConversationsByPatient(patientId) {
    try {
      const response = await api.get(`/conversations/patient/${patientId}`);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erreur lors du chargement des conversations',
      };
    }
  }

  // Récupérer une conversation par ID (vue therapist/professional)
  async getConversation(conversationId) {
    try {
      const response = await api.get(`/conversations/${conversationId}`);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erreur lors du chargement de la conversation',
      };
    }
  }

  // Marquer une conversation comme lue
  async markAsRead(conversationId) {
    try {
      const response = await api.put(`/conversations/${conversationId}/read`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message };
    }
  }
}

export default new ChatService();
