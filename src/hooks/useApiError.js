import { useState, useCallback } from 'react';

/**
 * Hook pour gérer les erreurs API de manière consistante
 */
const useApiError = () => {
  const [error, setError] = useState(null);
  const [errorType, setErrorType] = useState(null);

  /**
   * Parse une erreur API et retourne un message utilisateur-friendly
   */
  const parseApiError = useCallback((error) => {
    // Erreur réseau
    if (!error.response) {
      setErrorType('network');
      return {
        type: 'network',
        title: 'Erreur de connexion',
        message: 'Impossible de se connecter au serveur. Vérifiez votre connexion internet.',
      };
    }

    const status = error.response.status;
    const data = error.response.data;

    // Erreur 400 - Validation
    if (status === 400) {
      setErrorType('validation');
      return {
        type: 'validation',
        title: 'Données invalides',
        message: data.message || 'Les données fournies sont incorrectes.',
        errors: data.errors || [],
      };
    }

    // Erreur 401 - Non authentifié
    if (status === 401) {
      setErrorType('auth');
      return {
        type: 'auth',
        title: 'Session expirée',
        message: 'Votre session a expiré. Veuillez vous reconnecter.',
      };
    }

    // Erreur 403 - Non autorisé
    if (status === 403) {
      setErrorType('auth');
      return {
        type: 'auth',
        title: 'Accès refusé',
        message: 'Vous n\'avez pas les permissions nécessaires pour cette action.',
      };
    }

    // Erreur 404 - Ressource non trouvée
    if (status === 404) {
      setErrorType('notfound');
      return {
        type: 'notfound',
        title: 'Introuvable',
        message: data.message || 'La ressource demandée n\'existe pas.',
      };
    }

    // Erreur 409 - Conflit
    if (status === 409) {
      setErrorType('validation');
      return {
        type: 'validation',
        title: 'Conflit',
        message: data.message || 'Cette action ne peut pas être effectuée (doublon, conflit, etc.).',
      };
    }

    // Erreur 422 - Entité non traitable
    if (status === 422) {
      setErrorType('validation');
      return {
        type: 'validation',
        title: 'Erreur de validation',
        message: data.message || 'Les données fournies ne peuvent pas être traitées.',
        errors: data.errors || [],
      };
    }

    // Erreur 429 - Trop de requêtes
    if (status === 429) {
      setErrorType('general');
      return {
        type: 'general',
        title: 'Trop de tentatives',
        message: 'Vous avez effectué trop de requêtes. Veuillez patienter quelques instants.',
      };
    }

    // Erreur 500+ - Erreur serveur
    if (status >= 500) {
      setErrorType('server');
      return {
        type: 'server',
        title: 'Erreur serveur',
        message: 'Le serveur rencontre des difficultés. Veuillez réessayer plus tard.',
      };
    }

    // Erreur générique
    setErrorType('general');
    return {
      type: 'general',
      title: 'Erreur',
      message: data.message || 'Une erreur inattendue s\'est produite.',
    };
  }, []);

  /**
   * Définit une erreur à partir d'une erreur API
   */
  const setApiError = useCallback((apiError) => {
    const parsedError = parseApiError(apiError);
    setError(parsedError);
  }, [parseApiError]);

  /**
   * Efface l'erreur
   */
  const clearError = useCallback(() => {
    setError(null);
    setErrorType(null);
  }, []);

  /**
   * Retourne un message d'erreur simple (string)
   */
  const getErrorMessage = useCallback(() => {
    return error?.message || null;
  }, [error]);

  /**
   * Retourne si une erreur est présente
   */
  const hasError = useCallback(() => {
    return error !== null;
  }, [error]);

  return {
    error,
    errorType,
    setApiError,
    clearError,
    getErrorMessage,
    hasError,
    parseApiError,
  };
};

export default useApiError;
