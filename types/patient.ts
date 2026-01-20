/**
 * Types pour la gestion des patients (côté Psy)
 */

import { SeverityLevel } from './conversation';

export interface PatientProfile {
  _id: string;
  userId: string; 
  psyId: string;
  
  // Informations personnelles
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth?: Date;
  age?: number; 
  
  // Informations thérapeutiques
  profession?: string;
  familySituation?: 'célibataire' | 'couple' | 'marié' | 'divorcé' | 'autre';
  therapySubject?: string; // Motif de consultation
  therapyGoals?: string[]; // Objectifs définis ensemble
  
  // Suivi des séances
  sessionCount: number;
  lastSessionDate?: Date;
  nextSessionDate?: Date;
  sessionFrequency?: 'hebdomadaire' | 'toutes les deux semaines' | 'une fois par mois' | 'personnalisée';
  
  // Scoring et évaluation
  currentSeverityScore?: SeverityLevel;
  averageSeverityScore?: number;
  severityHistory: SeverityHistoryEntry[];
  
  // Statistiques conversations
  conversationStats: {
    totalConversations: number;
    lastConversationDate?: Date;
    averageMessagesPerConversation: number;
    mostActiveHours?: number[]; 
  };
  
  // Statut et flags
  isActive: boolean;
  hasUnreadSynthesis: boolean;
  hasActiveAlert: boolean;
  needsFollowUp: boolean; 
  
  // Magic link
  magicLinkToken?: string;
  magicLinkSentAt?: Date;
  magicLinkUsedAt?: Date;
  
  // Métadonnées
  createdAt: Date;
  updatedAt: Date;
  notes?: string; 
}

export interface SeverityHistoryEntry {
  date: Date;
  level: SeverityLevel;
  conversationId?: string;
  source: 'patient_evaluation' | 'ia_detection' | 'psy_assessment';
  notes?: string;
}

export interface PatientScoring {
  patientId: string;
  
  // Score actuel
  currentScore: SeverityLevel;
  previousScore?: SeverityLevel;
  scoreTrend: 'en amélioration' | 'stable' | 'aggravation';
  
  // Historique
  history: SeverityHistoryEntry[];
  
  // Évolution sur période
  weeklyAverage?: number;
  monthlyAverage?: number;
  
  // Indicateurs
  indicators: {
    conversationFrequency: 'faible' | 'normale' | 'élevée';
    responseTime: 'rapide' | 'normale' | 'lente';
    engagementLevel: 'faible' | 'moyenne' | 'élevée';
  };
  
  lastUpdated: Date;
}

// Input pour créer un patient
export interface CreatePatientInput {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth?: Date;
  profession?: string;
  familySituation?: 'célibataire' | 'couple' | 'marié' | 'divorcé' | 'autre';
  therapySubject?: string;
  therapyGoals?: string[];
  sessionFrequency?: 'hebdomadaire' | 'toutes les deux semaines' | 'une fois par mois' | 'personnalisée';
  notes?: string;
}

// Input pour mettre à jour un patient
export interface UpdatePatientInput {
  firstName?: string;
  lastName?: string;
  phone?: string;
  profession?: string;
  familySituation?: 'célibataire' | 'couple' | 'marié' | 'divorcé' | 'autre';
  therapySubject?: string;
  therapyGoals?: string[];
  sessionCount?: number;
  lastSessionDate?: Date;
  nextSessionDate?: Date;
  sessionFrequency?: 'hebdomadaire' | 'toutes les deux semaines' | 'une fois par mois' | 'personnalisée';
  isActive?: boolean;
  notes?: string;
}

// Pour la génération du magic link
export interface MagicLinkRequest {
  patientId: string;
  psyId: string;
  expiresInHours?: number; 
}

export interface MagicLinkResponse {
  token: string;
  url: string;
  expiresAt: Date;
}

// Vue simplifiée pour la liste
export interface PatientListItem {
  _id: string;
  firstName: string;
  lastName: string;
  currentSeverityScore?: SeverityLevel;
  lastConversationDate?: Date;
  hasUnreadSynthesis: boolean;
  hasActiveAlert: boolean;
  needsFollowUp: boolean;
  nextSessionDate?: Date;
  isActive: boolean;
}

// Filtres pour la liste des patients
export interface PatientFilters {
  search?: string; // Recherche par nom
  severityLevel?: SeverityLevel[];
  hasAlert?: boolean;
  hasUnreadSynthesis?: boolean;
  needsFollowUp?: boolean;
  isActive?: boolean;
  sortBy?: 'nom' | 'Dernière conversation' | 'Gravité' | 'Prochaine séance';
  sortOrder?: 'asc' | 'desc';
}