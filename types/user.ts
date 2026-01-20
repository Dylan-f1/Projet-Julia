/**
 * Types pour les utilisateurs (Patient & Psy)
 */

export type UserRole = 'patient' | 'psy';

export interface BaseUser {
  _id: string;
  email: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Patient extends BaseUser {
  role: 'patient';
  assignedPsyId: string;
  profession?: string;
  familySituation?: 'célibataire' | 'couple' | 'marié' | 'divorcé' | 'autre';
  therapySubject?: string; // Motif de la thérapie
  sessionCount: number; // Nombre de séances effectuées
  lastSessionDate?: Date;
  nextSessionDate?: Date;
  currentSeverityScore?: number; // 1, 2, 3
  averageSeverityScore?: number;
  isActive: boolean;
}

export interface Psy extends BaseUser {
  role: 'psy';
  profession: string; 
  workPlace: string;
  isPhysical: boolean; // Consultation physique
  isVisio: boolean; // Consultation visio
  patients: string[]; // Array of patient IDs
  
  // Intégrations
  integrations?: {
    doctolib?: {
      connected: boolean;
      practitionerId?: string;
      calendarUrl?: string;
    };
    medoucine?: {
      connected: boolean;
      practitionerId?: string;
      calendarUrl?: string;
    };
  };
  
  // Paiement
  billing?: {
    stripeCustomerId?: string;
    hasActiveSubscription: boolean;
    subscriptionTier?: 'free' | 'starter' | 'pro';
  };
  
  // Paramètres
  settings: {
    notificationsEnabled: boolean;
    emailNotifications: boolean;
    severityThresholds: SeverityThresholds;
    recommendations: RecommendationSettings;
  };
  
  onboardingCompleted: boolean;
}

export interface SeverityThresholds {
  low: {
    label: string;
    description: string;
    color: string; // Vert par défaut
    keywords?: string[]; // Mots-clés associés
  };
  medium: {
    label: string;
    description: string;
    color: string; // Orange par défaut
    keywords?: string[];
  };
  high: {
    label: string;
    description: string;
    color: string; // Rouge par défaut
    keywords?: string[];
  };
}

export interface RecommendationSettings {
  exercises: RecommendationAction[];
  nextSession: {
    enabled: boolean;
    message?: string;
    showBookingLink: boolean;
  };
  emergencyCall: {
    enabled: boolean;
    phoneNumber?: string;
    message?: string;
  };
  continueDiscussion: {
    enabled: boolean;
    message?: string;
  };
}

export interface RecommendationAction {
  id: string;
  type: 'Exercice' | 'respiration' | 'marche' | 'écriture' | 'musique' | 'appeler_un_amis' | 'autre';
  title: string;
  description: string;
  icon?: string;
  duration?: number; // En minutes
  instructions?: string;
  enabled: boolean;
  order: number;
}

export type User = Patient | Psy;

// Type guards
export const isPatient = (user: User): user is Patient => {
  return user.role === 'patient';
};

export const isPsy = (user: User): user is Psy => {
  return user.role === 'psy';
};