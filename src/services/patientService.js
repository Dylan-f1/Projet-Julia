import api from './api';

class PatientService {
  // Obtenir tous les patients du thérapeute
  async getMyPatients() {
    try {
      const response = await api.get('/therapist/patients');
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erreur lors du chargement des patients' 
      };
    }
  }

  // Obtenir un patient spécifique
  async getPatient(patientId) {
    try {
      const response = await api.get(`/therapist/patients/${patientId}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erreur lors du chargement du patient' 
      };
    }
  }

  // Créer un nouveau patient
  async createPatient(patientData) {
    try {
      const response = await api.post('/therapist/patients', patientData);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erreur lors de la création du patient' 
      };
    }
  }

  // Mettre à jour un patient
  async updatePatient(patientId, patientData) {
    try {
      const response = await api.put(`/therapist/patients/${patientId}`, patientData);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erreur lors de la mise à jour du patient' 
      };
    }
  }

  // Archiver un patient
  async archivePatient(patientId) {
    try {
      const response = await api.put(`/therapist/patients/${patientId}/archive`);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erreur lors de l\'archivage du patient' 
      };
    }
  }

  // Obtenir les statistiques d'un patient
  async getPatientStats(patientId) {
    try {
      const response = await api.get(`/therapist/patients/${patientId}/stats`);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erreur lors du chargement des statistiques' 
      };
    }
  }
}

export default new PatientService();
