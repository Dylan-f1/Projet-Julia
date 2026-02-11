import api from './api';

class SessionNoteService {
  // Upload une note de séance (avec OCR)
  async uploadSessionNote(patientId, file, sessionDate) {
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: file.uri,
        type: file.mimeType || 'image/jpeg',
        name: file.name || 'session_note.jpg'
      });
      formData.append('patientId', patientId);
      formData.append('sessionDate', sessionDate);

      const response = await api.post('/session-notes/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erreur lors de l\'upload de la note' 
      };
    }
  }

  async getSessionNotes(patientId) {
    try {
      const response = await api.get(`/session-notes/patient/${patientId}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erreur lors du chargement des notes' 
      };
    }
  }

  async getSessionNote(noteId) {
    try {
      const response = await api.get(`/session-notes/${noteId}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erreur lors du chargement de la note' 
      };
    }
  }

  async updateSessionNote(noteId, updateData) {
    try {
      const response = await api.put(`/session-notes/${noteId}`, updateData);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erreur lors de la mise à jour de la note' 
      };
    }
  }

  async deleteSessionNote(noteId) {
    try {
      const response = await api.delete(`/session-notes/${noteId}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erreur lors de la suppression de la note' 
      };
    }
  }
}

export default new SessionNoteService();
