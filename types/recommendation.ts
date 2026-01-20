/**
 * Types pour les recommandations et actions thérapeutiques
 */

export type ActionType = 
  | 'exercise' 
  | 'breathing' 
  | 'walk' 
  | 'writing' 
  | 'music' 
  | 'call_friend' 
  | 'meditation'
  | 'reading'
  | 'sport'
  | 'creative'
  | 'social'
  | 'other';

export type ActionCategory = 'immediat' | 'quotidien' | 'hebdomadaire' | 'urgence';

export interface RecommendationTemplate {
  id: string;
  psyId: string;
  
  // Identification
  type: ActionType;
  category: ActionCategory;
  title: string;
  description: string;
  
  // Détails de l'action
  instructions?: string; // Instructions détaillées
  duration?: number; // Durée estimée en minutes
  difficulty?: 'facile' | 'moyen' | 'difficile';
  
  // Ressources
  resources?: ActionResource[];
  
  // Conditions d'affichage
  triggerConditions?: TriggerCondition[];
  targetSeverityLevels?: (1 | 2 | 3)[]; // Pour quels niveaux de gravité
  
  // Tracking
  timesRecommended: number;
  timesCompleted: number;
  averageCompletionRate: number;
  
  // Personnalisation
  isCustom: boolean; // Créé par le psy vs template par défaut
  isActive: boolean;
  order: number; // Ordre d'affichage
  
  // Métadonnées
  createdAt: Date;
  updatedAt: Date;
}

export interface ActionResource {
  id: string;
  type: 'link' | 'video' | 'audio' | 'pdf' | 'image' | 'texte';
  title: string;
  url?: string;
  content?: string; // Pour type 'texte'
  thumbnail?: string;
  duration?: number; // Pour audio/video
}

export interface TriggerCondition {
  type: 'mot-clé' | 'émotion' | 'Heure_de_la_journée' | 'gravité' | 'fréquence';
  value: string | number;
  operator?: 'equales' | 'contient' | 'supérieur_à' | 'inférieur_à';
}

// Instance d'une recommandation donnée à un patient
export interface RecommendationInstance {
  _id: string;
  conversationId: string;
  patientId: string;
  psyId: string;
  templateId: string; // Référence vers RecommendationTemplate
  
  // Détails (copie du template au moment de la recommandation)
  type: ActionType;
  title: string;
  description: string;
  instructions?: string;
  duration?: number;
  resources?: ActionResource[];
  
  // Contexte de recommandation
  recommendedAt: Date;
  recommendedBy: 'ia' | 'psy'; // Automatique ou manuel
  context?: string; // Pourquoi cette recommandation maintenant
  severityAtRecommendation?: number;
  
  // Statut patient
  status: 'en attente' | 'vu' | 'commencé' | 'completé' | 'skippé' | 'échoué';
  viewedAt?: Date;
  startedAt?: Date;
  completedAt?: Date;
  skippedAt?: Date;
  
  // Feedback patient
  feedback?: {
    rating?: number; // 1-5
    helpful?: boolean;
    comment?: string;
    difficulty?: 'facile' | 'moyen' | 'difficile';
    submittedAt: Date;
  };
  
  // Notes psy
  psyNotes?: string;
  
  // Suivi
  reminderSent?: boolean;
  reminderSentAt?: Date;
}

// Configuration globale des recommandations pour un psy
export interface RecommendationConfig {
  psyId: string;
  
  // Templates actifs
  activeTemplates: string[]; // IDs des templates
  
  // Paramètres d'affichage
  maxRecommendationsPerSession: number; // Par défaut: 3
  priorityOrder: 'sévérité' | 'personnalité' | 'aléatoire';
  
  // Activation des catégories
  enabledCategories: {
    immediate: boolean;
    daily: boolean;
    weekly: boolean;
    emergency: boolean;
  };
  
  // Rendez-vous
  nextSessionReminder: {
    enabled: boolean;
    message?: string;
    showBookingLink: boolean;
    platforms: ('doctolib' | 'medoucine')[];
  };
  
  // Urgence
  emergencyProtocol: {
    enabled: boolean;
    phoneNumber?: string;
    message?: string;
    alternativeContacts?: EmergencyContact[];
  };
  
  // Relance automatique
  autoFollowUp: {
    enabled: boolean;
    delayInDays: number; // Relance après X jours sans conversation
    message?: string;
    includeBookingLink: boolean;
  };
  
  updatedAt: Date;
}

export interface EmergencyContact {
  id: string;
  name: string;
  relation: string; // Ex: "Psychologue de garde", "SAMU", "Ligne d'écoute"
  phone: string;
  available24h: boolean;
  description?: string;
}

// Pour les exercices prédéfinis
export interface DefaultExercise {
  id: string;
  type: ActionType;
  category: ActionCategory;
  title: string;
  description: string;
  instructions: string;
  duration: number;
  difficulty: 'facile' | 'moyen' | 'difficile';
  resources?: ActionResource[];
  icon: string; // Nom de l'icône
  tags: string[];
}

// Statistiques d'utilisation des recommandations
export interface RecommendationStats {
  templateId: string;
  
  totalRecommendations: number;
  totalCompletions: number;
  completionRate: number;
  
  averageRating?: number;
  totalFeedbacks: number;
  
  statusDistribution: {
    pending: number;
    viewed: number;
    started: number;
    completed: number;
    skipped: number;
    failed: number;
  };
  
  popularityTrend: 'amélioration' | 'stable' | 'aggravation';
  
  lastRecommended?: Date;
  mostRecommendedTime?: string; // Plage horaire (ex: "14h-16h")
}

// Input pour créer une recommandation personnalisée
export interface CreateRecommendationInput {
  psyId: string;
  type: ActionType;
  category: ActionCategory;
  title: string;
  description: string;
  instructions?: string;
  duration?: number;
  difficulty?: 'facile' | 'moyen' | 'difficile';
  resources?: Omit<ActionResource, 'id'>[];
  targetSeverityLevels?: (1 | 2 | 3)[];
  isActive?: boolean;
  order?: number;
}

// Input pour recommander une action à un patient
export interface RecommendActionInput {
  conversationId: string;
  patientId: string;
  templateId: string;
  recommendedBy: 'ia' | 'psy';
  context?: string;
}