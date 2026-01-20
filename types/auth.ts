/**
 * Types pour l'authentification et la gestion des sessions
 */

export type AuthProvider = 'magic_link' | 'email_password' | 'google' | 'apple';
export type TokenType = 'access' | 'refresh' | 'magic_link' | 'password_reset';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number; // Secondes jusqu'à expiration
  expiresAt: Date;
  tokenType: 'Bearer';
}

export interface MagicLinkAuth {
  token: string;
  email: string;
  expiresAt: Date;
  usedAt?: Date;
  userId?: string;
  role?: 'patient' | 'psy';
  
  // Pour les patients - lien envoyé par le psy
  createdByPsyId?: string;
  patientId?: string;
  isFirstLogin?: boolean;
  
  createdAt: Date;
}

export interface AuthSession {
  _id: string;
  userId: string;
  userRole: 'patient' | 'psy';
  
  // Tokens
  accessToken: string;
  refreshToken: string;
  
  // Device info
  deviceInfo?: {
    deviceId?: string;
    deviceName?: string;
    deviceType?: 'mobile' | 'tablet' | 'desktop';
    os?: string;
    appVersion?: string;
  };
  
  // Network info
  ipAddress?: string;
  userAgent?: string;
  
  // Timing
  createdAt: Date;
  lastActivityAt: Date;
  expiresAt: Date;
  
  // Status
  isActive: boolean;
  revokedAt?: Date;
  revokedReason?: string;
}

// Input pour login avec magic link
export interface MagicLinkLoginInput {
  email: string;
  role: 'patient' | 'psy';
  deviceInfo?: AuthSession['deviceInfo'];
}

export interface MagicLinkLoginResponse {
  success: boolean;
  message: string;
  emailSent: boolean;
  expiresAt: Date;
}

// Input pour vérifier le magic link
export interface VerifyMagicLinkInput {
  token: string;
  deviceInfo?: AuthSession['deviceInfo'];
}

export interface VerifyMagicLinkResponse {
  success: boolean;
  isFirstLogin: boolean;
  tokens: AuthTokens;
  user: {
    _id: string;
    email: string;
    role: 'patient' | 'psy';
    firstName?: string;
    lastName?: string;
  };
}

// Input pour refresh token
export interface RefreshTokenInput {
  refreshToken: string;
  deviceInfo?: AuthSession['deviceInfo'];
}

export interface RefreshTokenResponse {
  tokens: AuthTokens;
}

// Pour le psy qui crée un magic link pour un patient
export interface CreatePatientMagicLinkInput {
  psyId: string;
  patientId: string;
  patientEmail: string;
  expiresInHours?: number; // Défaut: 48h
  sendEmail?: boolean; // Envoyer automatiquement par email
  customMessage?: string; // Message personnalisé dans l'email
}

export interface CreatePatientMagicLinkResponse {
  success: boolean;
  token: string;
  url: string;
  expiresAt: Date;
  emailSent: boolean;
}

// État d'authentification dans l'app
export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: AuthUser | null;
  tokens: AuthTokens | null;
  error: string | null;
}

export interface AuthUser {
  _id: string;
  email: string;
  role: 'patient' | 'psy';
  firstName?: string;
  lastName?: string;
  
  // Pour patient
  assignedPsyId?: string;
  
  // Pour psy
  onboardingCompleted?: boolean;
}

// Actions d'authentification
export type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: { user: AuthUser; tokens: AuthTokens } }
  | { type: 'LOGIN_ERROR'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'REFRESH_TOKEN_SUCCESS'; payload: AuthTokens }
  | { type: 'UPDATE_USER'; payload: Partial<AuthUser> }
  | { type: 'CLEAR_ERROR' };

// Sécurité
export interface SecurityLog {
  _id: string;
  userId: string;
  eventType: SecurityEventType;
  
  // Détails
  ipAddress?: string;
  userAgent?: string;
  deviceInfo?: AuthSession['deviceInfo'];
  location?: {
    country?: string;
    city?: string;
  };
  
  // Résultat
  success: boolean;
  failureReason?: string;
  
  timestamp: Date;
}

export type SecurityEventType =
  | 'login_attempt'
  | 'login_success'
  | 'login_failure'
  | 'logout'
  | 'token_refresh'
  | 'password_reset_request'
  | 'password_reset_success'
  | 'session_revoked'
  | 'suspicious_activity';

// Validation de token
export interface TokenValidation {
  isValid: boolean;
  userId?: string;
  role?: 'patient' | 'psy';
  expiresAt?: Date;
  error?: string;
}

// Onboarding (pour les nouveaux utilisateurs)
export interface OnboardingStatus {
  userId: string;
  role: 'patient' | 'psy';
  
  steps: {
    profileCompleted: boolean;
    preferencesSet: boolean;
    firstSessionCompleted?: boolean; // Pour patient
    firstPatientAdded?: boolean; // Pour psy
    integrationsConfigured?: boolean; // Pour psy
    recommendationsConfigured?: boolean; // Pour psy
  };
  
  currentStep?: string;
  completedAt?: Date;
  skippedAt?: Date;
}

// Pour l'affichage des sessions actives (sécurité)
export interface ActiveSession {
  _id: string;
  deviceName?: string;
  deviceType?: 'mobile' | 'tablet' | 'desktop';
  os?: string;
  location?: string;
  lastActivityAt: Date;
  isCurrent: boolean;
}

// Input pour révoquer une session
export interface RevokeSessionInput {
  sessionId: string;
  reason?: string;
}

// Permissions et rôles (pour évolutions futures)
export interface Permission {
  resource: string; // Ex: "patients", "syntheses", "alerts"
  actions: ('create' | 'read' | 'update' | 'delete')[];
}

export interface Role {
  name: 'patient' | 'psy' | 'admin';
  permissions: Permission[];
}