import api from './api';

class EvaluationService {
  // Soumettre une évaluation quotidienne
  async submitDailyEvaluation(evaluationData) {
    try {
      const response = await api.post('/evaluations/daily', evaluationData);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erreur lors de la soumission de l\'évaluation' 
      };
    }
  }

  // Obtenir les évaluations du patient
  async getPatientEvaluations(startDate, endDate) {
    try {
      const params = {};
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;
      
      const response = await api.get('/evaluations/patient', { params });
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erreur lors du chargement des évaluations' 
      };
    }
  }

  // Obtenir les évaluations d'un patient (pour thérapeute)
  async getPatientEvaluationsByTherapist(patientId, startDate, endDate) {
    try {
      const params = {};
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;
      
      const response = await api.get(`/evaluations/patient/${patientId}`, { params });
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erreur lors du chargement des évaluations' 
      };
    }
  }

  // Vérifier si l'évaluation du jour a été faite
  async checkTodayEvaluation() {
    try {
      const response = await api.get('/evaluations/today');
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erreur lors de la vérification' 
      };
    }
  }
}

export default new EvaluationService();
