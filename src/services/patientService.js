import api from './api';

class PatientService {
  async getMyPatients() {
    try {
      const response = await api.get('/patients');
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erreur lors du chargement des patients' 
      };
    }
  }

  async getPatient(patientId) {
    try {
      const response = await api.get(`/patients/${patientId}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erreur lors du chargement du patient' 
      };
    }
  }

  async createPatient(patientData) {
    try {
      const response = await api.post('/patients', patientData);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erreur lors de la création du patient' 
      };
    }
  }

  async updatePatient(patientId, patientData) {
    try {
      const response = await api.put(`/patients/${patientId}`, patientData);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erreur lors de la mise à jour du patient' 
      }; 
    }
  }

  async archivePatient(patientId) {
    try {
      const response = await api.delete(`/patients/${patientId}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erreur lors de l\'archivage du patient' 
      };
    }
  }

  async getPatientStats(patientId) {
    try {
      const response = await api.get(`/patients/${patientId}/stats`);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erreur lors du chargement des statistiques' 
      };
    }
  }

  async getMagicLink(patientId) {
    try {
      const response = await api.get(`/patients/${patientId}/magic-link`);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        expired: error.response?.status === 410,
        error: error.response?.data?.message || 'Erreur lors du chargement du lien' 
      };
    }
  }

  async resendMagicLink(patientId) {
    try {
      const response = await api.post(`/patients/${patientId}/resend-magic-link`);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erreur lors de l\'envoi du lien' 
      };
    }
  }
}

export default new PatientService();