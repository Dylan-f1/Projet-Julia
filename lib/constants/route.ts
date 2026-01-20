/**
 * Constantes pour les routes de navigation de l'application
 */

// Routes d'authentification
export const AUTH_ROUTES = {
  MAGIC_LINK: '/(auth)/magic-link',
  VERIFY: '/(auth)/verify',
} as const;

// Routes patient
export const PATIENT_ROUTES = {
  CHAT: '/(patient)/chat',
  SUIVI: '/(patient)/suivi',
  RDV: '/(patient)/rdv',
  PROFILE: '/(patient)/profile',
} as const;

// Routes psy
export const PSY_ROUTES = {
  DASHBOARD: '/(psy)/dashboard',
  ONBOARDING: '/(psy)/onboarding',
  
  // Patients
  PATIENTS_LIST: '/(psy)/dashboard', // Même route que dashboard
  PATIENT_DETAIL: '/(psy)/patients/[id]',
  PATIENT_CREATE: '/(psy)/patients/create',
  
  // Synthèses
  SYNTHESES: '/(psy)/syntheses',
  SYNTHESE_DETAIL: '/(psy)/syntheses/[id]',
  
  // Alertes
  ALERTES: '/(psy)/alertes',
  
  // Settings
  PROFILE: '/(psy)/settings/profile',
  RECOMMENDATIONS: '/(psy)/settings/recommendations',
  SEVERITY_LEVELS: '/(psy)/settings/severity-levels',
  INTEGRATIONS: '/(psy)/settings/integrations',
} as const;

// Routes communes
export const COMMON_ROUTES = {
  HOME: '/',
  INDEX: '/index',
} as const;

// Routes externes
export const EXTERNAL_ROUTES = {
  DOCTOLIB: 'https://www.doctolib.fr',
  MEDOUCINE: 'https://www.medoucine.com',
} as const;

// Paramètres de navigation
export const NAVIGATION_PARAMS = {
  PATIENT_ID: 'id',
  SYNTHESE_ID: 'id',
  CONVERSATION_ID: 'conversationId',
  TOKEN: 'token',
} as const;

// Noms des écrans pour analytics
export const SCREEN_NAMES = {
  // Auth
  MAGIC_LINK: 'MagicLink',
  VERIFY: 'Verify',
  
  // Patient
  CHAT: 'Chat',
  SUIVI: 'Suivi',
  RDV: 'Rendez-vous',
  PATIENT_PROFILE: 'PatientProfile',
  
  // Psy
  DASHBOARD: 'Dashboard',
  ONBOARDING: 'Onboarding',
  PATIENT_DETAIL: 'PatientDetail',
  PATIENT_CREATE: 'PatientCreate',
  SYNTHESES: 'Syntheses',
  SYNTHESE_DETAIL: 'SyntheseDetail',
  ALERTES: 'Alertes',
  PSY_PROFILE: 'PsyProfile',
  RECOMMENDATIONS: 'Recommendations',
  SEVERITY_LEVELS: 'SeverityLevels',
  INTEGRATIONS: 'Integrations',
} as const;

// Titres des écrans
export const SCREEN_TITLES = {
  // Auth
  MAGIC_LINK: 'Connexion',
  VERIFY: 'Vérification',
  
  // Patient
  CHAT: 'Conversation',
  SUIVI: 'Mon suivi',
  RDV: 'Mes rendez-vous',
  PATIENT_PROFILE: 'Mon profil',
  
  // Psy
  DASHBOARD: 'Mes patients',
  ONBOARDING: 'Bienvenue',
  PATIENT_DETAIL: 'Fiche patient',
  PATIENT_CREATE: 'Nouveau patient',
  SYNTHESES: 'Synthèses',
  SYNTHESE_DETAIL: 'Détail de la synthèse',
  ALERTES: 'Alertes',
  PSY_PROFILE: 'Mon profil',
  RECOMMENDATIONS: 'Recommandations',
  SEVERITY_LEVELS: 'Niveaux de gravité',
  INTEGRATIONS: 'Intégrations',
} as const;

// Configuration des tabs patient
export const PATIENT_TABS = [
  {
    name: 'Chat',
    route: PATIENT_ROUTES.CHAT,
    icon: 'message-circle',
    label: 'Discussion',
  },
  {
    name: 'Suivi',
    route: PATIENT_ROUTES.SUIVI,
    icon: 'activity',
    label: 'Suivi',
  },
  {
    name: 'RDV',
    route: PATIENT_ROUTES.RDV,
    icon: 'calendar',
    label: 'Rendez-vous',
  },
] as const;

// Configuration des tabs psy
export const PSY_TABS = [
  {
    name: 'Dashboard',
    route: PSY_ROUTES.DASHBOARD,
    icon: 'users',
    label: 'Patients',
  },
  {
    name: 'Synthèses',
    route: PSY_ROUTES.SYNTHESES,
    icon: 'file-text',
    label: 'Synthèses',
  },
  {
    name: 'Alertes',
    route: PSY_ROUTES.ALERTES,
    icon: 'alert-circle',
    label: 'Alertes',
    badge: true, // Afficher un badge avec le nombre d'alertes non lues
  },
] as const;

// Menu settings psy
export const PSY_SETTINGS_MENU = [
  {
    name: 'Profil',
    route: PSY_ROUTES.PROFILE,
    icon: 'user',
    description: 'Informations professionnelles',
  },
  {
    name: 'Recommandations',
    route: PSY_ROUTES.RECOMMENDATIONS,
    icon: 'heart',
    description: 'Configurer les actions recommandées',
  },
  {
    name: 'Niveaux de gravité',
    route: PSY_ROUTES.SEVERITY_LEVELS,
    icon: 'bar-chart-2',
    description: 'Paramétrer les seuils d\'évaluation',
  },
  {
    name: 'Intégrations',
    route: PSY_ROUTES.INTEGRATIONS,
    icon: 'link',
    description: 'Doctolib, Médoucine, CRM',
  },
] as const;

// Routes qui nécessitent une authentification
export const PROTECTED_ROUTES = [
  ...Object.values(PATIENT_ROUTES),
  ...Object.values(PSY_ROUTES),
] as const;

// Routes publiques (accessibles sans auth)
export const PUBLIC_ROUTES = [
  ...Object.values(AUTH_ROUTES),
  COMMON_ROUTES.HOME,
] as const;

// Helper pour générer une route avec paramètres
export const generateRoute = (route: string, params: Record<string, string>): string => {
  let result = route;
  Object.entries(params).forEach(([key, value]) => {
    result = result.replace(`[${key}]`, value);
  });
  return result;
};

// Helper pour vérifier si une route est protégée
export const isProtectedRoute = (route: string): boolean => {
  return PROTECTED_ROUTES.some(protectedRoute => route.startsWith(protectedRoute));
};

// Helper pour vérifier si une route est publique
export const isPublicRoute = (route: string): boolean => {
  return PUBLIC_ROUTES.some(publicRoute => route.startsWith(publicRoute));
};

// Helper pour obtenir la route de redirection selon le rôle
export const getDefaultRouteForRole = (role: 'patient' | 'psy'): string => {
  return role === 'patient' ? PATIENT_ROUTES.CHAT : PSY_ROUTES.DASHBOARD;
};