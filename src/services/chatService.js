import api from './api';

class ChatService {
  // Obtenir les conversations du patient
  async getPatientConversations() {
    try {
      const response = await api.get('/conversations/patient');
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erreur lors du chargement des conversations' 
      };
    }
  }

  // Obtenir les conversations d'un patient (pour thérapeute)
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

  // Envoyer un message
  async sendMessage(message) {
    try {
      const response = await api.post('/conversations/message', { message });
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erreur lors de l\'envoi du message' 
      };
    }
  }

  // Obtenir une conversation spécifique
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
