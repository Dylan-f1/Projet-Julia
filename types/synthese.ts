/**
 * Types pour les synthèses générées par l'IA
 */

import { SeverityLevel } from './conversation';

export interface Synthese {
  _id: string;
  conversationId: string;
  patientId: string;
  psyId: string;
  
  // Période couverte
  period: {
    start: Date;
    end: Date;
    duration: number; // En minutes
  };
  
  // Contenu de la synthèse
  summary: string; // Résumé général de la conversation
  keyPoints: string[]; // Points clés à retenir
  
  // Mots-clés et thématiques
  keywords: KeywordAnalysis[];
  emotionalThemes: string[]; // Thèmes émotionnels détectés
  
  // Évolution de la gravité
  severityEvolution: SeverityEvolutionEntry[];
  finalSeverityLevel?: SeverityLevel;
  severityTrend: 'amélioration' | 'stable' | 'aggravation';
  
  // Recommandations de l'IA pour le psy
  aiRecommendations: AIRecommendation[];
  
  // Actions effectuées par le patient
  patientActions: PatientActionSummary[];
  
  // Indicateurs comportementaux
  behavioralIndicators: {
    responseTime: 'immediat' | 'normal' | 'retardé';
    messageLength: 'court' | 'moyen' | 'long';
    emotionalExpression: 'faible' | 'moyenne' | 'élevée';
    engagementLevel: 'faible' | 'moyenne' | 'élevée';
  };
  
  // Signaux d'alerte détectés
  alerts: SynthesisAlert[];
  
  // Statut
  readByPsy: boolean;
  readAt?: Date;
  starred: boolean; // Marqué comme important
  
  // Métadonnées
  generatedAt: Date;
  generatedBy: 'ia' | 'prévu'; // IA temps réel ou génération planifiée
  version: number; // Pour tracking des versions de synthèse
}

export interface KeywordAnalysis {
  word: string;
  frequency: number;
  sentiment?: 'positive' | 'neutre' | 'négative';
  category?: 'émotion' | 'symptome' | 'activité' | 'relation' | 'autre';
}

export interface SeverityEvolutionEntry {
  timestamp: Date;
  level: SeverityLevel;
  trigger?: string; // Ce qui a causé le changement
  confidence: number; // 0-1, confiance de l'IA dans l'évaluation
}

export interface AIRecommendation {
  id: string;
  type: 'clinique' | 'comportemental' | 'relationnel' | 'medicamenteux' | 'autre';
  priority: 'faible' | 'moyenne' | 'élevée';
  title: string;
  description: string;
  reasoning: string; // Pourquoi l'IA recommande ceci
  suggestedActions?: string[];
  acknowledged?: boolean;
  acknowledgedAt?: Date;
}

export interface PatientActionSummary {
  actionType: 'exercice' | 'respiration' | 'marche' | 'écriture' | 'musique' | 'appel_à_un_ami(e)' | 'rendez-vous' | 'urgences' | 'autre';
  actionTitle: string;
  timestamp: Date;
  completed?: boolean;
  patientFeedback?: string;
}

export interface SynthesisAlert {
  id: string;
  type: 'augmentation_de_la_gravité' | 'mots_clés_d_urgence' | 'inactivité' | 'changement_de_comportement' | 'signal_de_crise';
  severity: 'faible' | 'moyenne' | 'élevée' | 'critique';
  title: string;
  description: string;
  detectedAt: Date;
  keywords?: string[]; // Mots-clés qui ont déclenché l'alerte
  requiresImmediateAction: boolean;
  acknowledged?: boolean;
  acknowledgedAt?: Date;
  notes?: string; // Notes du psy sur l'alerte
}

// Vue groupée par patient
export interface PatientSynthesisSummary {
  patientId: string;
  patientName: string;
  
  // Synthèses
  totalSyntheses: number;
  unreadSyntheses: number;
  lastSynthesisDate?: Date;
  
  // Tendances
  overallTrend: 'amélioration' | 'stable' | 'aggravation';
  averageSeverity: number;
  
  // Alertes actives
  activeAlerts: number;
  criticalAlerts: number;
  
  recentSyntheses: Synthese[]; // 3-5 dernières
}

// Input pour générer une synthèse
export interface GenerateSyntheseInput {
  conversationId: string;
  patientId: string;
  psyId: string;
  forceRegenerate?: boolean; // Régénérer même si existe déjà
}

// Statistiques globales des synthèses
export interface SyntheseStats {
  totalSyntheses: number;
  unreadSyntheses: number;
  starredSyntheses: number;
  
  severityDistribution: {
    low: number;
    medium: number;
    high: number;
  };
  
  trendDistribution: {
    improving: number;
    stable: number;
    worsening: number;
  };
  
  activeAlerts: {
    total: number;
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  
  lastGenerated?: Date;
}

// Filtres pour la liste des synthèses
export interface SyntheseFilters {
  patientId?: string;
  dateFrom?: Date;
  dateTo?: Date;
  severity?: SeverityLevel[];
  trend?: ('amélioration' | 'stable' | 'aggravation')[];
  hasAlerts?: boolean;
  onlyUnread?: boolean;
  onlyStarred?: boolean;
  sortBy?: 'date' | 'gravité' | 'alertes';
  sortOrder?: 'asc' | 'desc';
}

// Pour l'export et le partage
export interface SyntheseExport {
  synthese: Synthese;
  format: 'pdf' | 'json' | 'text';
  includePatientInfo: boolean;
  includeConversationHistory: boolean;
}