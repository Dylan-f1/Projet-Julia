/**
 * Types pour les alertes et notifications
 */

export type AlertType = 
  | 'severity_increase'      // Augmentation niveau de gravité
  | 'severity_high'          // Niveau de gravité élevé détecté
  | 'emergency_keywords'     // Mots-clés d'urgence détectés
  | 'inactivity'            // Patient inactif depuis X jours
  | 'behavioral_change'      // Changement comportemental détecté
  | 'crisis_signal'         // Signal de crise
  | 'new_conversation'      // Nouvelle conversation démarrée
  | 'appointment_reminder'  // Rappel de RDV
  | 'synthesis_ready'       // Nouvelle synthèse disponible
  | 'patient_feedback';     // Feedback patient sur action

export type AlertSeverity = 'faible' | 'moyen' | 'élevé' | 'critique';
export type AlertStatus = 'non-lu' | 'lu' | 'pris en compte' | 'résolu' | 'rejeté';

export interface Alert {
  _id: string;
  psyId: string;
  patientId: string;
  conversationId?: string;
  
  // Type et gravité
  type: AlertType;
  severity: AlertSeverity;
  status: AlertStatus;
  
  // Contenu
  title: string;
  message: string;
  details?: string; // Détails supplémentaires
  
  // Contexte
  context?: {
    severityLevel?: number;
    keywords?: string[];
    messageExcerpt?: string; // Extrait du message ayant déclenché l'alerte
    previousSeverity?: number;
    currentSeverity?: number;
  };
  
  // Actions suggérées
  suggestedActions?: AlertAction[];
  
  // Actions prises
  actionsTaken?: {
    action: string;
    takenAt: Date;
    takenBy: string;
    notes?: string;
  }[];
  
  // Timing
  createdAt: Date;
  readAt?: Date;
  acknowledgedAt?: Date;
  resolvedAt?: Date;
  dismissedAt?: Date;
  
  // Flags
  requiresImmediateAction: boolean;
  notificationSent: boolean;
  notificationSentAt?: Date;
  
  // Notes du psy
  psyNotes?: string;
  
  // Auto-dismiss (pour certains types d'alertes)
  autoDismissAt?: Date;
}

export interface AlertAction {
  id: string;
  type: 'call_patient' | 'send_message' | 'schedule_appointment' | 'escalate' | 'other';
  label: string;
  description?: string;
  priority: number;
  actionUrl?: string;
}

// Configuration des alertes pour un psy
export interface AlertConfig {
  psyId: string;
  
  // Activation par type
  enabledAlertTypes: {
    severityIncrease: boolean;
    severityHigh: boolean;
    emergencyKeywords: boolean;
    inactivity: boolean;
    behavioralChange: boolean;
    crisisSignal: boolean;
    newConversation: boolean;
    appointmentReminder: boolean;
    synthesisReady: boolean;
    patientFeedback: boolean;
  };
  
  // Seuils
  thresholds: {
    severityIncreaseThreshold: number; // Augmentation de X niveaux
    inactivityDays: number; // Alerte après X jours d'inactivité
    highSeverityLevel: number; // Niveau considéré comme "élevé"
  };
  
  // Mots-clés d'urgence personnalisés
  emergencyKeywords: string[];
  crisisKeywords: string[];
  
  // Canaux de notification
  notificationChannels: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  
  // Planification des notifications
  notificationSchedule: {
    enabled: boolean;
    quietHours?: {
      start: string; // Format: "22:00"
      end: string;   // Format: "08:00"
    };
    weekendsEnabled: boolean;
    groupDigest: boolean; // Regrouper les alertes non-critiques
    digestFrequency?: 'horaire' | 'quotidien' | 'hebdomadaire';
  };
  
  updatedAt: Date;
}

// Notification (différent d'une alerte - peut être moins critique)
export interface Notification {
  _id: string;
  userId: string; // Peut être psy ou patient
  userRole: 'psy' | 'patient';
  
  type: NotificationType;
  title: string;
  message: string;
  
  // Lien d'action
  actionUrl?: string;
  actionLabel?: string;
  
  // Icône et style
  icon?: string;
  color?: string;
  
  // Statut
  read: boolean;
  readAt?: Date;
  
  // Métadonnées
  data?: Record<string, any>; // Données additionnelles
  
  // Timing
  createdAt: Date;
  expiresAt?: Date; // Auto-suppression après X jours
}

export type NotificationType = 
  | 'new_message'
  | 'new_synthesis'
  | 'appointment_reminder'
  | 'appointment_confirmed'
  | 'appointment_cancelled'
  | 'action_completed'
  | 'action_reminder'
  | 'system_update'
  | 'welcome'
  | 'follow_up';

// Statistiques des alertes
export interface AlertStats {
  total: number;
  unread: number;
  acknowledged: number;
  resolved: number;
  
  bySeverity: {
    low: number;
    medium: number;
    high: number;
    critical: number;
  };
  
  byType: Record<AlertType, number>;
  
  averageResolutionTime?: number; // En heures
  oldestUnresolvedAlert?: Alert;
}

// Input pour créer une alerte
export interface CreateAlertInput {
  psyId: string;
  patientId: string;
  conversationId?: string;
  type: AlertType;
  severity: AlertSeverity;
  title: string;
  message: string;
  details?: string;
  context?: Alert['context'];
  suggestedActions?: AlertAction[];
  requiresImmediateAction?: boolean;
}

// Input pour mettre à jour une alerte
export interface UpdateAlertInput {
  status?: AlertStatus;
  psyNotes?: string;
  actionsTaken?: Alert['actionsTaken'];
}

// Filtres pour la liste des alertes
export interface AlertFilters {
  patientId?: string;
  type?: AlertType[];
  severity?: AlertSeverity[];
  status?: AlertStatus[];
  dateFrom?: Date;
  dateTo?: Date;
  requiresImmediateAction?: boolean;
  sortBy?: 'date' | 'sévérité' | 'patient';
  sortOrder?: 'asc' | 'desc';
}

// Pour les notifications push
export interface PushNotificationPayload {
  title: string;
  body: string;
  data?: Record<string, any>;
  badge?: number;
  sound?: string;
  priority?: 'default' | 'élevé' | 'immédiat';
  channelId?: string;
}

// Préférences de notification utilisateur
export interface NotificationPreferences {
  userId: string;
  
  // Canaux
  email: {
    enabled: boolean;
    address?: string;
    frequency?: 'immédiat' | 'horaire' | 'quotidien';
  };
  
  push: {
    enabled: boolean;
    deviceTokens?: string[];
    categories?: NotificationType[];
  };
  
  sms: {
    enabled: boolean;
    phoneNumber?: string;
    onlyCritical?: boolean;
  };
  
  // Ne pas déranger
  doNotDisturb?: {
    enabled: boolean;
    start: string; // "22:00"
    end: string;   // "08:00"
    days?: number[]; // 0-6 (Dimanche-Samedi)
  };
  
  updatedAt: Date;
}