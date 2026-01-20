/**
 * Constantes pour les niveaux de gravité et leur gestion
 */

import { SeverityLevel } from '@/types/conversation';

export const SEVERITY_LEVELS = {
  LOW: 1,
  MEDIUM: 2,
  HIGH: 3,
} as const;

// Configuration par défaut des seuils de gravité
export const DEFAULT_SEVERITY_THRESHOLDS = {
  low: {
    label: 'Bien-être général',
    description: 'État émotionnel stable, conversation de suivi régulier',
    color: '#7FB685', // Vert menthe doux
    keywords: [
      'bien',
      'mieux',
      'calme',
      'serein',
      'apaisé',
      'stable',
      'positif',
      'confiant',
      'motivé',
      'heureux',
    ],
  },
  medium: {
    label: 'Vigilance modérée',
    description: 'Signes de stress ou d\'anxiété, suivi attentif recommandé',
    color: '#D9A05B', // Ambre doux
    keywords: [
      'inquiet',
      'stressé',
      'anxieux',
      'préoccupé',
      'tendu',
      'nerveux',
      'difficile',
      'compliqué',
      'fatigue',
      'insomnie',
    ],
  },
  high: {
    label: 'Attention particulière',
    description: 'État émotionnel fragile, surveillance rapprochée nécessaire',
    color: '#C17B6F', // Terracotta rosé
    keywords: [
      'mal',
      'triste',
      'déprimé',
      'désespéré',
      'perdu',
      'vide',
      'seul',
      'isolé',
      'crise',
      'panique',
    ],
  },
} as const;

// Mots-clés d'urgence (déclenchent une alerte immédiate)
export const EMERGENCY_KEYWORDS = [
  'suicide',
  'suicidaire',
  'mourir',
  'finir',
  'disparaître',
  'en finir',
  'plus envie',
  'overdose',
  'surdose',
  'me faire du mal',
  'me blesser',
] as const;

// Mots-clés de crise (niveau élevé mais pas urgence vitale)
export const CRISIS_KEYWORDS = [
  'crise',
  'panique',
  'angoisse',
  'terrifié',
  'effondré',
  'effondrement',
  'épuisé',
  'épuisement',
  'burnout',
  'débordé',
  'submerge',
  'submergé',
] as const;

// Labels pour l'affichage
export const SEVERITY_LABELS: Record<SeverityLevel, string> = {
  1: 'Niveau bas',
  2: 'Niveau modéré',
  3: 'Niveau élevé',
} as const;

// Descriptions courtes pour chaque niveau
export const SEVERITY_DESCRIPTIONS: Record<SeverityLevel, string> = {
  1: 'Bien-être général',
  2: 'Vigilance modérée',
  3: 'Attention particulière',
} as const;

// Messages d'auto-évaluation pour le patient
export const SEVERITY_EVALUATION_MESSAGES: Record<SeverityLevel, string> = {
  1: 'Je me sens plutôt bien aujourd\'hui',
  2: 'Je ressens un peu de stress ou d\'anxiété',
  3: 'Je traverse un moment difficile',
} as const;

// Questions d'auto-évaluation
export const SEVERITY_QUESTIONS = [
  {
    id: 'emotional_state',
    question: 'Comment vous sentez-vous en ce moment ?',
    options: [
      { level: 1, label: 'Plutôt bien, calme' },
      { level: 2, label: 'Un peu anxieux/stressé' },
      { level: 3, label: 'Très mal, en difficulté' },
    ],
  },
  {
    id: 'sleep_quality',
    question: 'Comment dormez-vous ces derniers temps ?',
    options: [
      { level: 1, label: 'Bien, sommeil réparateur' },
      { level: 2, label: 'Quelques difficultés' },
      { level: 3, label: 'Très mal, insomnies' },
    ],
  },
  {
    id: 'daily_activities',
    question: 'Arrivez-vous à faire vos activités quotidiennes ?',
    options: [
      { level: 1, label: 'Oui, sans problème' },
      { level: 2, label: 'Avec quelques difficultés' },
      { level: 3, label: 'C\'est très difficile' },
    ],
  },
] as const;

// Configuration des alertes selon le niveau
export const SEVERITY_ALERT_CONFIG: Record<
  SeverityLevel,
  {
    shouldNotifyPsy: boolean;
    priority: 'low' | 'medium' | 'high';
    followUpDelay: number; // En jours
    autoSynthesis: boolean;
  }
> = {
  1: {
    shouldNotifyPsy: false,
    priority: 'low',
    followUpDelay: 7,
    autoSynthesis: false,
  },
  2: {
    shouldNotifyPsy: true,
    priority: 'medium',
    followUpDelay: 3,
    autoSynthesis: true,
  },
  3: {
    shouldNotifyPsy: true,
    priority: 'high',
    followUpDelay: 1,
    autoSynthesis: true,
  },
} as const;

// Tendances d'évolution
export const SEVERITY_TRENDS = {
  IMPROVING: 'improving',
  STABLE: 'stable',
  WORSENING: 'worsening',
} as const;

export const SEVERITY_TREND_LABELS = {
  improving: 'En amélioration',
  stable: 'Stable',
  worsening: 'En dégradation',
} as const;

export const SEVERITY_TREND_ICONS = {
  improving: '📈',
  stable: '➡️',
  worsening: '📉',
} as const;

// Helpers
export const getSeverityLevel = (score: number): SeverityLevel => {
  if (score <= 1) return 1;
  if (score <= 2) return 2;
  return 3;
};

export const getSeverityLabel = (level: SeverityLevel): string => {
  return SEVERITY_LABELS[level];
};

export const getSeverityDescription = (level: SeverityLevel): string => {
  return SEVERITY_DESCRIPTIONS[level];
};

export const calculateSeverityTrend = (
  current: SeverityLevel,
  previous?: SeverityLevel
): 'improving' | 'stable' | 'worsening' => {
  if (!previous) return 'stable';
  if (current < previous) return 'improving';
  if (current > previous) return 'worsening';
  return 'stable';
};

// Vérification des mots-clés d'urgence dans un message
export const detectEmergencyKeywords = (message: string): boolean => {
  const lowerMessage = message.toLowerCase();
  return EMERGENCY_KEYWORDS.some(keyword => lowerMessage.includes(keyword));
};

export const detectCrisisKeywords = (message: string): boolean => {
  const lowerMessage = message.toLowerCase();
  return CRISIS_KEYWORDS.some(keyword => lowerMessage.includes(keyword));
};

// Analyse du niveau de gravité basé sur les mots-clés
export const analyzeSeverityFromMessage = (message: string): SeverityLevel => {
  const lowerMessage = message.toLowerCase();

  // Check emergency first
  if (detectEmergencyKeywords(lowerMessage)) {
    return SEVERITY_LEVELS.HIGH;
  }

  // Check crisis
  if (detectCrisisKeywords(lowerMessage)) {
    return SEVERITY_LEVELS.HIGH;
  }

  // Check severity keywords
  const hasHighKeywords = DEFAULT_SEVERITY_THRESHOLDS.high.keywords.some(
    keyword => lowerMessage.includes(keyword)
  );
  if (hasHighKeywords) {
    return SEVERITY_LEVELS.HIGH;
  }

  const hasMediumKeywords = DEFAULT_SEVERITY_THRESHOLDS.medium.keywords.some(
    keyword => lowerMessage.includes(keyword)
  );
  if (hasMediumKeywords) {
    return SEVERITY_LEVELS.MEDIUM;
  }

  const hasLowKeywords = DEFAULT_SEVERITY_THRESHOLDS.low.keywords.some(
    keyword => lowerMessage.includes(keyword)
  );
  if (hasLowKeywords) {
    return SEVERITY_LEVELS.LOW;
  }

  // Default to medium if no keywords detected
  return SEVERITY_LEVELS.MEDIUM;
};