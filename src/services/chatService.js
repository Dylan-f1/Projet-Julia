import api from './api';

class ChatService {
  async getMyConversations() {
    try {
      const response = await api.get('/conversations/active');
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erreur lors du chargement de la conversation' 
      };
    }
  }

  async getPatientConversations() {
    return this.getMyConversations();
  }

  async getConversationHistory() {
    try {
      const response = await api.get('/conversations/history');
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erreur lors du chargement de l\'historique' 
      };
    }
  }

  async createConversation(firstMessage = "Bonjour") {
    try {
      const response = await api.post('/conversations', { firstMessage });
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erreur lors de la création de la conversation' 
      };
    }
  }

  async sendMessage(conversationId, message) {
    try {
      const response = await api.post(`/conversations/${conversationId}/messages`, { message });
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erreur lors de l\'envoi du message' 
      };
    }
  }

  async getMessages(conversationId) {
    // Les patients récupèrent toujours leur conversation active
    const response = await api.get('/conversations/active');
    return { success: true, data: response.data };
  }

  async closeConversation(conversationId, gravityLevel) {
    try {
      const response = await api.post(`/conversations/${conversationId}/close`, { gravityLevel });
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erreur lors de la fermeture de la conversation' 
      };
    }
  }

  async getConversationsByPatient(patientId) {
    try {
      const response = await api.get(`/conversations/patient/${patientId}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erreur lors du chargement des conversations' 
      };
    }
  }

  async getConversation(conversationId) {
    try {
      const response = await api.get(`/conversations/${conversationId}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erreur lors du chargement de la conversation' 
      };
    }
  }

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