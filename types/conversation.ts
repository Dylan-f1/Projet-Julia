/**
 * Types pour les conversations et messages
 */

export type MessageSender = 'patient' | 'ia' | 'psy';

export type SeverityLevel = 1 | 2 | 3;

export interface Message {
  _id: string;
  conversationId: string;
  sender: MessageSender;
  content: string;
  timestamp: Date;
  
  metadata?: {
    severityScore?: SeverityLevel; 
    emotionalState?: string; // État émotionnel détecté
    keywords?: string[]; // Mots-clés extraits par l'IA
    isEmergency?: boolean; // Détection d'urgence
    actionsTaken?: string[]; // Actions recommandées suite au message
  };
  
  // Pour les messages IA avec recommandations
  recommendations?: MessageRecommendation[];
  
  // Statut
  isRead: boolean;
  readAt?: Date;
}

export interface MessageRecommendation {
  id: string;
  type: 'Exercice' | 'Rendez-vous' | 'Urgence' | 'continuer';
  title: string;
  description?: string;
  actionUrl?: string; // Lien Doctolib, numéro urgence, etc.
  icon?: string;
  selected?: boolean; 
  selectedAt?: Date;
}

export interface Conversation {
  _id: string;
  patientId: string;
  psyId: string;
  
  // Messages
  messages: Message[];
  lastMessage?: Message;
  lastActivity: Date;
  
  // Évaluation de la session
  currentSeverityLevel?: SeverityLevel;
  severityEvaluatedAt?: Date;
  severityEvaluatedBy?: 'patient' | 'ia'; // Auto-évaluation ou détection IA
  
  // Statut
  status: 'active' | 'archived' | 'closed';
  
  // Métadonnées de session
  sessionMetadata?: {
    startedAt: Date;
    endedAt?: Date;
    duration?: number; // En minutes
    messageCount: number;
    patientSatisfaction?: number; // 1-5
  };
  
  // Synthèse générée
  synthesisGenerated: boolean;
  synthesisId?: string;
  
  // Notifications
  psyNotified: boolean;
  psyNotifiedAt?: Date;
  psyViewedAt?: Date;
  
  createdAt: Date;
  updatedAt: Date;
}

export interface ConversationStats {
  totalConversations: number;
  activeConversations: number;
  averageSeverity: number;
  severityDistribution: {
    low: number;
    medium: number;
    high: number;
  };
  lastConversationDate?: Date;
}

// Pour l'affichage groupé par date
export interface ConversationGroup {
  date: string; // Format: "2024-01-20"
  label: string; // "Aujourd'hui", "Hier", "20 janvier 2024"
  conversations: Conversation[];
}

// Input pour créer un nouveau message
export interface CreateMessageInput {
  conversationId: string;
  sender: MessageSender;
  content: string;
  metadata?: Message['metadata'];
  recommendations?: MessageRecommendation[];
}

// Input pour créer une nouvelle conversation
export interface CreateConversationInput {
  patientId: string;
  psyId: string;
  initialMessage?: string; // Premier message automatique du bot
}

// Pour la saisie en cours (typing indicator)
export interface TypingStatus {
  conversationId: string;
  userId: string;
  userRole: MessageSender;
  isTyping: boolean;
  timestamp: Date;
}