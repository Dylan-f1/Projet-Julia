/**
 * Constantes générales de l'application MindLink
 */

// Informations de l'application
export const APP_INFO = {
  name: 'MindLink',
  version: '1.0.0',
  description: 'Votre espace de bien-être mental disponible 24/7',
  tagline: 'Un relais du lien humain, pas un remplacement',
  supportEmail: 'support@mindlink.health',
  website: 'https://mindlink.health',
} as const;

// Configuration des rôles
export const USER_ROLES = {
  PATIENT: 'patient',
  PSY: 'psy',
} as const;

export const ROLE_LABELS = {
  patient: 'Patient',
  psy: 'Professionnel de santé',
} as const;

// Configuration de l'authentification
export const AUTH_CONFIG = {
  MAGIC_LINK_EXPIRY_HOURS: 48, // Expiration du magic link en heures
  ACCESS_TOKEN_EXPIRY: 60 * 60 * 24, // 24 heures en secondes
  REFRESH_TOKEN_EXPIRY: 60 * 60 * 24 * 30, // 30 jours en secondes
  MAX_LOGIN_ATTEMPTS: 5,
  LOCKOUT_DURATION: 15 * 60, // 15 minutes en secondes
} as const;

// Configuration des messages
export const MESSAGE_CONFIG = {
  MAX_LENGTH: 2000, // Longueur maximale d'un message
  TYPING_INDICATOR_TIMEOUT: 3000, // 3 secondes
  MESSAGE_FETCH_LIMIT: 50, // Nombre de messages chargés à la fois
  AUTO_SCROLL_THRESHOLD: 100, // Pixels du bas pour auto-scroll
} as const;

// Configuration des synthèses
export const SYNTHESIS_CONFIG = {
  AUTO_GENERATE_AFTER_MESSAGES: 10, // Générer synthèse après X messages
  MIN_CONVERSATION_DURATION: 5, // Minutes minimum pour générer une synthèse
  RETENTION_DAYS: 365, // Jours de conservation des synthèses
} as const;

// Configuration des alertes
export const ALERT_CONFIG = {
  INACTIVITY_THRESHOLD_DAYS: 7, // Alerte après X jours d'inactivité
  AUTO_DISMISS_DAYS: 30, // Auto-suppression des alertes après X jours
  MAX_UNREAD_ALERTS: 50, // Nombre max d'alertes non lues avant nettoyage
} as const;

// Configuration des notifications
export const NOTIFICATION_CONFIG = {
  QUIET_HOURS_START: '22:00',
  QUIET_HOURS_END: '08:00',
  BATCH_NOTIFICATIONS: true,
  BATCH_INTERVAL_MINUTES: 30,
} as const;

// Configuration des rendez-vous
export const APPOINTMENT_CONFIG = {
  DEFAULT_DURATION: 50, // Minutes
  MIN_DURATION: 30,
  MAX_DURATION: 120,
  REMINDER_TIMES: [24 * 60, 60, 15], // Rappels à 24h, 1h, et 15min avant (en minutes)
  CANCELLATION_NOTICE_HOURS: 24, // Préavis minimum pour annulation
} as const;

// Configuration de la pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  MIN_PAGE_SIZE: 5,
} as const;

// Délais de relance automatique
export const FOLLOW_UP_CONFIG = {
  AFTER_NO_RDV_DAYS: 7, // Relance si pas de RDV fixé après X jours
  AFTER_SESSION_DAYS: 3, // Relance X jours après une séance
  MAX_AUTO_FOLLOW_UPS: 3, // Nombre max de relances automatiques
} as const;

// Formats de date et heure
export const DATE_FORMATS = {
  DISPLAY_DATE: 'DD/MM/YYYY',
  DISPLAY_TIME: 'HH:mm',
  DISPLAY_DATETIME: 'DD/MM/YYYY à HH:mm',
  DISPLAY_MONTH: 'MMMM YYYY',
  DISPLAY_DAY: 'dddd DD MMMM',
  API_DATE: 'YYYY-MM-DD',
  API_DATETIME: 'YYYY-MM-DDTHH:mm:ss',
} as const;

// Durées d'animation (en millisecondes)
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  SKELETON: 1000,
} as const;

// Tailles d'écran (breakpoints)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

// Espacements (en pixels)
export const SPACING = {
  XS: 4,
  SM: 8,
  MD: 16,
  LG: 24,
  XL: 32,
  '2XL': 48,
  '3XL': 64,
} as const;

// Tailles de police (en pixels)
export const FONT_SIZES = {
  XS: 12,
  SM: 14,
  BASE: 16,
  LG: 18,
  XL: 20,
  '2XL': 24,
  '3XL': 30,
  '4XL': 36,
} as const;

// Rayons de bordure (en pixels)
export const BORDER_RADIUS = {
  SM: 4,
  DEFAULT: 8,
  MD: 12,
  LG: 16,
  XL: 24,
  FULL: 9999,
} as const;

// Configuration des fichiers uploadables
export const FILE_UPLOAD = {
  MAX_SIZE_MB: 10,
  ALLOWED_TYPES: ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'],
  ALLOWED_EXTENSIONS: ['.png', '.jpg', '.jpeg', '.pdf'],
} as const;

// Messages d'erreur courants
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Erreur de connexion. Veuillez vérifier votre connexion internet.',
  UNAUTHORIZED: 'Session expirée. Veuillez vous reconnecter.',
  FORBIDDEN: 'Vous n\'avez pas les permissions nécessaires.',
  NOT_FOUND: 'Ressource introuvable.',
  SERVER_ERROR: 'Une erreur est survenue. Veuillez réessayer.',
  VALIDATION_ERROR: 'Veuillez vérifier les informations saisies.',
  TIMEOUT: 'La requête a pris trop de temps. Veuillez réessayer.',
} as const;

// Messages de succès courants
export const SUCCESS_MESSAGES = {
  SAVED: 'Enregistré avec succès',
  UPDATED: 'Mis à jour avec succès',
  DELETED: 'Supprimé avec succès',
  SENT: 'Envoyé avec succès',
  CREATED: 'Créé avec succès',
} as const;

// Messages de confirmation
export const CONFIRMATION_MESSAGES = {
  DELETE: 'Êtes-vous sûr de vouloir supprimer cet élément ?',
  CANCEL: 'Êtes-vous sûr de vouloir annuler ?',
  LOGOUT: 'Êtes-vous sûr de vouloir vous déconnecter ?',
  DISCARD_CHANGES: 'Vos modifications ne seront pas sauvegardées. Continuer ?',
} as const;

// États de chargement
export const LOADING_STATES = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
} as const;

// Types de plateforme de RDV
export const APPOINTMENT_PLATFORMS = {
  DOCTOLIB: 'doctolib',
  MEDOUCINE: 'medoucine',
  MANUAL: 'manual',
} as const;

export const PLATFORM_LABELS = {
  doctolib: 'Doctolib',
  medoucine: 'Médoucine',
  manual: 'Manuel',
} as const;

// Statuts des rendez-vous
export const APPOINTMENT_STATUSES = {
  SCHEDULED: 'scheduled',
  CONFIRMED: 'confirmed',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  NO_SHOW: 'no_show',
} as const;

export const APPOINTMENT_STATUS_LABELS = {
  scheduled: 'Planifié',
  confirmed: 'Confirmé',
  completed: 'Terminé',
  cancelled: 'Annulé',
  no_show: 'Absent',
} as const;

// Types de conversation
export const CONVERSATION_STATUSES = {
  ACTIVE: 'active',
  ARCHIVED: 'archived',
  CLOSED: 'closed',
} as const;

// Préfixes pour les clés de stockage local
export const STORAGE_KEYS = {
  AUTH_TOKEN: '@mindlink/auth_token',
  REFRESH_TOKEN: '@mindlink/refresh_token',
  USER_DATA: '@mindlink/user_data',
  THEME: '@mindlink/theme',
  LANGUAGE: '@mindlink/language',
  ONBOARDING_COMPLETED: '@mindlink/onboarding_completed',
  DRAFT_MESSAGE: '@mindlink/draft_message_',
} as const;

// Langues disponibles
export const LANGUAGES = {
  FR: 'fr',
  EN: 'en',
} as const;

export const LANGUAGE_LABELS = {
  fr: 'Français',
  en: 'English',
} as const;

// Regex utiles
export const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_FR: /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
  URL: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
} as const;

// URLs des politiques
export const LEGAL_URLS = {
  TERMS: 'https://mindlink.health/terms',
  PRIVACY: 'https://mindlink.health/privacy',
  CGU: 'https://mindlink.health/cgu',
  HDS: 'https://mindlink.health/hds',
} as const;

// Configuration de l'IA (placeholder pour futur)
export const AI_CONFIG = {
  MODEL: 'gpt-4',
  MAX_TOKENS: 500,
  TEMPERATURE: 0.7,
  RESPONSE_DELAY_MS: 1000, // Délai avant réponse pour effet "typing"
} as const;

// Limites de l'application
export const APP_LIMITS = {
  MAX_PATIENTS_FREE: 10,
  MAX_PATIENTS_STARTER: 50,
  MAX_PATIENTS_PRO: -1, // Illimité
  MAX_CONVERSATIONS_PER_DAY: 100,
  MAX_SYNTHESES_PER_MONTH: 200,
} as const;

// Plans tarifaires (pour référence future)
export const SUBSCRIPTION_TIERS = {
  FREE: 'free',
  STARTER: 'starter',
  PRO: 'pro',
} as const;

export const TIER_LABELS = {
  free: 'Gratuit',
  starter: 'Starter',
  pro: 'Pro',
} as const;