import api from './api';

class EvaluationService {
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
