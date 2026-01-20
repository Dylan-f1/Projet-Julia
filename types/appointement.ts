/**
 * Types pour les rendez-vous et intégrations externes (Doctolib, Médoucine)
 */

export type AppointmentPlatform = 'doctolib' | 'medoucine' | 'manual';
export type AppointmentStatus = 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';
export type AppointmentType = 'physical' | 'visio' | 'phone';

export interface Appointment {
  _id: string;
  patientId: string;
  psyId: string;
  
  // Informations de base
  date: Date;
  duration: number; // En minutes
  type: AppointmentType;
  status: AppointmentStatus;
  
  // Plateforme
  platform: AppointmentPlatform;
  externalId?: string; // ID de l'appointment sur Doctolib/Médoucine
  bookingUrl?: string;
  
  // Localisation (si physique)
  location?: {
    address: string;
    city: string;
    postalCode: string;
    additionalInfo?: string;
  };
  
  // Visio
  visioLink?: string;
  visioPassword?: string;
  
  // Rappels
  reminders: AppointmentReminder[];
  
  // Notes
  patientNotes?: string; // Notes du patient avant RDV
  psyNotes?: string; // Notes du psy après RDV
  
  // Paiement
  payment?: {
    amount: number;
    currency: string;
    status: 'pending' | 'paid' | 'refunded' | 'cancelled';
    paidAt?: Date;
    method?: 'card' | 'cash' | 'check' | 'insurance';
  };
  
  // Métadonnées
  createdAt: Date;
  updatedAt: Date;
  cancelledAt?: Date;
  cancellationReason?: string;
}

export interface AppointmentReminder {
  id: string;
  type: 'email' | 'sms' | 'push';
  scheduledFor: Date; // Ex: 24h avant, 1h avant
  sent: boolean;
  sentAt?: Date;
  error?: string;
}

// Intégration Doctolib
export interface DoctolibIntegration {
  psyId: string;
  
  connected: boolean;
  practitionerId?: string;
  practitionerName?: string;
  
  // Configuration
  config?: {
    calendarUrl: string;
    webhookUrl?: string;
    syncEnabled: boolean;
    autoConfirm: boolean;
  };
  
  // Authentification
  auth?: {
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: Date;
  };
  
  // Synchronisation
  lastSync?: Date;
  syncStatus?: 'success' | 'error' | 'pending';
  syncError?: string;
  
  // Statistiques
  stats?: {
    totalAppointments: number;
    upcomingAppointments: number;
    lastAppointmentDate?: Date;
  };
  
  createdAt: Date;
  updatedAt: Date;
}

// Intégration Médoucine
export interface MedoucineIntegration {
  psyId: string;
  
  connected: boolean;
  practitionerId?: string;
  practitionerName?: string;
  
  // Configuration
  config?: {
    calendarUrl: string;
    publicProfileUrl?: string;
    syncEnabled: boolean;
  };
  
  // Authentification
  auth?: {
    apiKey?: string;
    secretKey?: string;
  };
  
  // Synchronisation
  lastSync?: Date;
  syncStatus?: 'success' | 'error' | 'pending';
  syncError?: string;
  
  // Statistiques
  stats?: {
    totalAppointments: number;
    upcomingAppointments: number;
    lastAppointmentDate?: Date;
  };
  
  createdAt: Date;
  updatedAt: Date;
}

// Créneaux disponibles (pour booking)
export interface AvailableSlot {
  id: string;
  psyId: string;
  date: Date;
  duration: number;
  type: AppointmentType[];
  available: boolean;
  platform: AppointmentPlatform;
  bookingUrl?: string;
}

// Input pour créer un RDV
export interface CreateAppointmentInput {
  patientId: string;
  psyId: string;
  date: Date;
  duration?: number; // Défaut: 50 minutes
  type: AppointmentType;
  platform?: AppointmentPlatform; // Défaut: 'manual'
  location?: Appointment['location'];
  visioLink?: string;
  patientNotes?: string;
}

// Input pour mettre à jour un RDV
export interface UpdateAppointmentInput {
  status?: AppointmentStatus;
  date?: Date;
  type?: AppointmentType;
  location?: Appointment['location'];
  visioLink?: string;
  psyNotes?: string;
  cancellationReason?: string;
}

// Sync depuis plateformes externes
export interface SyncAppointmentsInput {
  psyId: string;
  platform: 'doctolib' | 'medoucine';
  dateFrom?: Date;
  dateTo?: Date;
}

export interface SyncAppointmentsResponse {
  success: boolean;
  synced: number;
  created: number;
  updated: number;
  errors: string[];
  appointments: Appointment[];
}

// Pour l'affichage calendrier
export interface CalendarDay {
  date: Date;
  appointments: Appointment[];
  hasAvailableSlots: boolean;
  isToday: boolean;
  isPast: boolean;
}

export interface CalendarWeek {
  weekNumber: number;
  days: CalendarDay[];
}

// Statistiques RDV
export interface AppointmentStats {
  total: number;
  upcoming: number;
  past: number;
  cancelled: number;
  noShow: number;
  
  byType: {
    physical: number;
    visio: number;
    phone: number;
  };
  
  byPlatform: {
    doctolib: number;
    medoucine: number;
    manual: number;
  };
  
  averageDuration: number;
  nextAppointment?: Appointment;
  lastAppointment?: Appointment;
}