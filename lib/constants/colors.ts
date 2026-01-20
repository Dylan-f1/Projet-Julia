/**
 * Palette de couleurs chaleureuse et apaisante pour MindLink
 * Évite les couleurs vives, le rouge et le noir
 * Ambiance douce, rassurante et professionnelle
 */

export const colors = {
  // Couleurs principales - tons terre et pêche
  primary: {
    50: '#FFF4ED',   // Pêche très pâle
    100: '#FFE8D9',  // Pêche pâle
    200: '#FECFB4',  // Pêche clair
    300: '#FDB08A',  // Pêche
    400: '#FB8C5F',  // Pêche soutenu
    500: '#F87142',  // Terracotta doux (principal)
    600: '#E55A2B',  // Terracotta
    700: '#C14721',  // Terre
    800: '#9D3A1C',  // Terre foncé
    900: '#81331C',  // Chocolat doux
  },

  // Couleurs secondaires - bleu gris apaisant
  secondary: {
    50: '#F8FAFC',   // Bleu gris très clair
    100: '#F1F5F9',  // Bleu gris clair
    200: '#E2E8F0',  // Bleu gris
    300: '#CBD5E1',  // Bleu gris moyen
    400: '#94A3B8',  // Bleu gris
    500: '#64748B',  // Bleu gris foncé
    600: '#475569',  // Ardoise
    700: '#334155',  // Ardoise foncé
    800: '#1E293B',  // Ardoise très foncé
    900: '#0F172A',  // Presque noir (à utiliser avec parcimonie)
  },

  // Couleurs d'identité pour les messages (bulle de chat)
  chat: {
    ia: {
      main: '#8B7AB8',      // Violet doux et chaleureux
      light: '#B4A5D9',     // Violet pâle
      lighter: '#E8E3F3',   // Violet très pâle (background)
      text: '#4A3B6B',      // Violet foncé pour texte
    },
    psy: {
      main: '#6B9E78',      // Vert sauge apaisant
      light: '#9BC19F',     // Vert sauge clair
      lighter: '#E8F3EA',   // Vert très pâle (background)
      text: '#3D5A43',      // Vert foncé pour texte
    },
    patient: {
      main: '#6B8CAE',      // Bleu gris chaleureux
      light: '#9BB3CC',     // Bleu gris clair
      lighter: '#E8EDF4',   // Bleu très pâle (background)
      text: '#3D4F63',      // Bleu foncé pour texte
    },
  },

  // Niveaux de gravité - palette douce et progressive
  severity: {
    low: {
      main: '#7FB685',     // Vert menthe doux
      light: '#A8D4AE',    // Vert menthe clair
      lighter: '#E5F4E7',  // Vert menthe très pâle
      text: '#476B4D',     // Vert foncé pour texte
      label: 'Niveau bas',
    },
    medium: {
      main: '#D9A05B',     // Ambre doux (pas de jaune vif)
      light: '#E8C189',    // Ambre clair
      lighter: '#F7EFE3',  // Ambre très pâle
      text: '#8B6835',     // Brun doré pour texte
      label: 'Niveau modéré',
    },
    high: {
      main: '#C17B6F',     // Terracotta rosé (pas de rouge vif)
      light: '#D9A49B',    // Terracotta rosé clair
      lighter: '#F2E8E6',  // Rose très pâle
      text: '#8B5347',     // Brun rosé pour texte
      label: 'Niveau élevé',
    },
  },

  // Backgrounds - tons chauds et neutres
  background: {
    primary: '#FFFCF9',    // Blanc cassé chaud
    secondary: '#FFF8F3',  // Crème très pâle
    tertiary: '#F9F5F1',   // Beige très pâle
    card: '#FFFFFF',       // Blanc pur
    elevated: '#FFFFFF',   // Blanc pur pour éléments élevés
    overlay: 'rgba(15, 23, 42, 0.5)', // Overlay doux
  },

  // Surfaces et bordures
  surface: {
    default: '#FFFFFF',
    hover: '#FFF8F3',      // Crème au survol
    pressed: '#F9F5F1',    // Beige au clic
    disabled: '#F1F5F9',   // Gris très clair
    subtle: '#F8FAFC',     // Bleu gris très clair
  },

  border: {
    light: '#E8E3DC',      // Beige clair
    default: '#D4CFC5',    // Beige
    dark: '#B8B1A6',       // Beige foncé
    focus: '#F87142',      // Terracotta (primary)
  },

  // Texte - hiérarchie douce
  text: {
    primary: '#2C2318',    // Brun très foncé (pas noir)
    secondary: '#5C5347',  // Brun moyen
    tertiary: '#8B8378',   // Taupe
    disabled: '#B8B1A6',   // Beige grisé
    placeholder: '#C7C2B8', // Beige clair
    inverse: '#FFFFFF',    // Blanc
    link: '#6B8CAE',       // Bleu gris chaleureux
  },

  // États - palette douce
  state: {
    success: {
      main: '#7FB685',     // Vert menthe doux
      light: '#E5F4E7',
      text: '#476B4D',
    },
    warning: {
      main: '#D9A05B',     // Ambre doux
      light: '#F7EFE3',
      text: '#8B6835',
    },
    error: {
      main: '#C17B6F',     // Terracotta rosé (pas rouge)
      light: '#F2E8E6',
      text: '#8B5347',
    },
    info: {
      main: '#6B8CAE',     // Bleu gris
      light: '#E8EDF4',
      text: '#3D4F63',
    },
  },

  // Statuts des actions
  action: {
    active: '#F87142',     // Terracotta
    hover: '#E55A2B',      // Terracotta foncé
    disabled: '#E2E8F0',   // Gris clair
    disabledText: '#94A3B8', // Gris
  },

  // Notifications et badges
  notification: {
    unread: '#F87142',     // Terracotta
    badge: '#C14721',      // Terre
  },

  // Graphiques et data viz
  chart: {
    colors: [
      '#8B7AB8',  // Violet doux
      '#6B9E78',  // Vert sauge
      '#6B8CAE',  // Bleu gris
      '#D9A05B',  // Ambre
      '#C17B6F',  // Terracotta rosé
      '#7FB685',  // Vert menthe
      '#B4A5D9',  // Violet pâle
      '#9BC19F',  // Vert sauge clair
    ],
  },

  // Overlay et modales
  overlay: {
    light: 'rgba(248, 245, 241, 0.95)',  // Beige translucide
    dark: 'rgba(44, 35, 24, 0.6)',       // Brun translucide
    blur: 'rgba(255, 252, 249, 0.8)',    // Blanc chaud translucide
  },

  // Shadow colors
  shadow: {
    sm: 'rgba(44, 35, 24, 0.05)',
    md: 'rgba(44, 35, 24, 0.08)',
    lg: 'rgba(44, 35, 24, 0.12)',
    xl: 'rgba(44, 35, 24, 0.15)',
  },
} as const;

// Types pour TypeScript
export type ColorPalette = typeof colors;
export type PrimaryColor = keyof typeof colors.primary;
export type SeverityColor = keyof typeof colors.severity;
export type ChatColor = keyof typeof colors.chat;

// Helpers pour accéder aux couleurs
export const getMessageColor = (sender: 'ia' | 'psy' | 'patient') => {
  return colors.chat[sender];
};

export const getSeverityColor = (level: 1 | 2 | 3) => {
  const severityMap = {
    1: colors.severity.low,
    2: colors.severity.medium,
    3: colors.severity.high,
  };
  return severityMap[level];
};

// Palette de gradient pour les backgrounds
export const gradients = {
  warm: 'linear-gradient(135deg, #FFF4ED 0%, #FFF8F3 100%)',
  subtle: 'linear-gradient(180deg, #FFFCF9 0%, #FFF8F3 100%)',
  card: 'linear-gradient(135deg, #FFFFFF 0%, #FFF8F3 100%)',
  primary: 'linear-gradient(135deg, #F87142 0%, #E55A2B 100%)',
  chat: {
    ia: 'linear-gradient(135deg, #B4A5D9 0%, #8B7AB8 100%)',
    psy: 'linear-gradient(135deg, #9BC19F 0%, #6B9E78 100%)',
    patient: 'linear-gradient(135deg, #9BB3CC 0%, #6B8CAE 100%)',
  },
} as const;

// Export default pour utilisation simple
export default colors;