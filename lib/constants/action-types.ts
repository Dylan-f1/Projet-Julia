/**
 * Constantes pour les types d'actions et recommandations thérapeutiques
 */

import { ActionType, ActionCategory } from '@/types/recommendation';

// Types d'actions disponibles
export const ACTION_TYPES: Record<ActionType, { label: string; icon: string; description: string }> = {
  exercise: {
    label: 'Exercice physique',
    icon: '🏃',
    description: 'Activité physique pour libérer les tensions',
  },
  breathing: {
    label: 'Respiration',
    icon: '🫁',
    description: 'Exercices de respiration pour se calmer',
  },
  walk: {
    label: 'Marche',
    icon: '🚶',
    description: 'Promenade en extérieur',
  },
  writing: {
    label: 'Écriture',
    icon: '✍️',
    description: 'Expression écrite de ses émotions',
  },
  music: {
    label: 'Musique',
    icon: '🎵',
    description: 'Écoute de musique apaisante',
  },
  call_friend: {
    label: 'Appeler un proche',
    icon: '📞',
    description: 'Contact avec une personne de confiance',
  },
  meditation: {
    label: 'Méditation',
    icon: '🧘',
    description: 'Pratique méditative guidée',
  },
  reading: {
    label: 'Lecture',
    icon: '📖',
    description: 'Lecture pour se détendre',
  },
  sport: {
    label: 'Sport',
    icon: '⚽',
    description: 'Activité sportive',
  },
  creative: {
    label: 'Activité créative',
    icon: '🎨',
    description: 'Dessin, peinture, artisanat',
  },
  social: {
    label: 'Activité sociale',
    icon: '👥',
    description: 'Interaction sociale positive',
  },
  other: {
    label: 'Autre',
    icon: '✨',
    description: 'Autre activité personnalisée',
  },
} as const;

// Catégories d'actions
export const ACTION_CATEGORIES: Record<ActionCategory, { label: string; color: string }> = {
  immediat: {
    label: 'Action immédiate',
    color: '#C17B6F', // Terracotta rosé
  },
  quotidien: {
    label: 'Pratique quotidienne',
    color: '#D9A05B', // Ambre doux
  },
  hebdomadaire: {
    label: 'Activité hebdomadaire',
    color: '#7FB685', // Vert menthe
  },
  urgence: {
    label: 'Urgence',
    color: '#8B5347', // Brun rosé foncé
  },
} as const;

// Exercices de respiration prédéfinis
export const BREATHING_EXERCISES = [
  {
    id: 'coherence_cardiaque',
    title: 'Cohérence cardiaque',
    description: 'Technique de respiration 3-6-5',
    instructions: `
1. Trouvez une position confortable, assis ou allongé
2. Inspirez profondément par le nez pendant 5 secondes
3. Expirez lentement par la bouche pendant 5 secondes
4. Répétez pendant 5 minutes (30 cycles)

Cette technique aide à réguler le rythme cardiaque et calmer le système nerveux.
    `.trim(),
    duration: 5,
    difficulty: 'easy' as const,
  },
  {
    id: 'respiration_4_7_8',
    title: 'Respiration 4-7-8',
    description: 'Technique pour s\'endormir et se détendre',
    instructions: `
1. Installez-vous confortablement
2. Inspirez par le nez en comptant jusqu'à 4
3. Retenez votre respiration en comptant jusqu'à 7
4. Expirez complètement par la bouche en comptant jusqu'à 8
5. Répétez 4 à 8 fois

Parfait pour calmer l'anxiété et favoriser l'endormissement.
    `.trim(),
    duration: 3,
    difficulty: 'easy' as const,
  },
  {
    id: 'respiration_abdominale',
    title: 'Respiration abdominale',
    description: 'Respiration profonde par le ventre',
    instructions: `
1. Allongez-vous ou asseyez-vous confortablement
2. Placez une main sur votre ventre
3. Inspirez lentement par le nez en gonflant le ventre
4. Sentez votre main se soulever
5. Expirez lentement par la bouche en rentrant le ventre
6. Continuez pendant 5 à 10 minutes

Cette respiration active le système parasympathique et favorise la détente.
    `.trim(),
    duration: 10,
    difficulty: 'easy' as const,
  },
] as const;

// Exercices d'écriture prédéfinis
export const WRITING_EXERCISES = [
  {
    id: 'journal_gratitude',
    title: 'Journal de gratitude',
    description: 'Noter 3 choses positives de la journée',
    instructions: `
Prenez quelques minutes pour écrire :

1. Trois choses pour lesquelles vous êtes reconnaissant aujourd'hui
2. Un moment agréable que vous avez vécu
3. Une qualité personnelle que vous appréciez chez vous

Pas besoin d'écrire beaucoup, l'important est de se concentrer sur le positif.
    `.trim(),
    duration: 10,
    difficulty: 'easy' as const,
  },
  {
    id: 'ecriture_libre',
    title: 'Écriture libre',
    description: 'Exprimer ses émotions sans filtre',
    instructions: `
1. Prenez un cahier ou ouvrez un document
2. Réglez un timer sur 15 minutes
3. Écrivez tout ce qui vous passe par la tête
4. Ne vous jugez pas, ne vous relisez pas
5. Laissez vos émotions s'exprimer librement

Cette pratique permet de libérer les tensions émotionnelles.
    `.trim(),
    duration: 15,
    difficulty: 'medium' as const,
  },
  {
    id: 'lettre_a_soi',
    title: 'Lettre à soi-même',
    description: 'Écrire une lettre bienveillante',
    instructions: `
Écrivez une lettre à vous-même comme si vous écriviez à un ami cher :

1. Commencez par "Cher/Chère [votre prénom]"
2. Exprimez de la compassion pour ce que vous vivez
3. Rappelez-vous vos forces et réussites
4. Encouragez-vous avec bienveillance
5. Terminez par un message d'espoir

Relisez cette lettre quand vous en avez besoin.
    `.trim(),
    duration: 20,
    difficulty: 'medium' as const,
  },
] as const;

// Playlists musicales apaisantes (exemples)
export const MUSIC_PLAYLISTS = [
  {
    id: 'relaxation',
    title: 'Relaxation profonde',
    description: 'Musiques douces pour se détendre',
    genre: 'Ambiant, Piano',
    duration: 60,
  },
  {
    id: 'nature',
    title: 'Sons de la nature',
    description: 'Pluie, forêt, océan',
    genre: 'Nature',
    duration: 45,
  },
  {
    id: 'meditation',
    title: 'Méditation guidée',
    description: 'Musiques pour la méditation',
    genre: 'Méditation',
    duration: 30,
  },
  {
    id: 'classical',
    title: 'Classique apaisant',
    description: 'Morceaux classiques relaxants',
    genre: 'Classique',
    duration: 90,
  },
] as const;

// Activités de marche suggérées
export const WALK_ACTIVITIES = [
  {
    id: 'mindful_walk',
    title: 'Marche en pleine conscience',
    description: 'Marche méditative en observant son environnement',
    instructions: `
1. Marchez lentement, sans destination précise
2. Portez attention à chaque pas
3. Observez ce qui vous entoure : couleurs, sons, odeurs
4. Respirez profondément
5. Revenez au moment présent si votre esprit vagabonde

Durée recommandée : 15-30 minutes
    `.trim(),
    duration: 20,
    difficulty: 'easy' as const,
  },
  {
    id: 'park_walk',
    title: 'Promenade au parc',
    description: 'Contact avec la nature',
    instructions: `
Trouvez un parc ou un espace vert près de chez vous :

1. Marchez à votre rythme
2. Profitez de la verdure et de l'air frais
3. Asseyez-vous sur un banc si vous le souhaitez
4. Observez la nature autour de vous

Le contact avec la nature réduit le stress et améliore l'humeur.
    `.trim(),
    duration: 30,
    difficulty: 'easy' as const,
  },
] as const;

// Actions d'urgence
export const EMERGENCY_ACTIONS = {
  hotlines: [
    {
      id: 'samu',
      name: 'SAMU',
      phone: '15',
      description: 'Urgence médicale',
      available24h: true,
    },
    {
      id: 'sos_amitie',
      name: 'SOS Amitié',
      phone: '09 72 39 40 50',
      description: 'Écoute et soutien',
      available24h: true,
    },
    {
      id: 'suicide_ecoute',
      name: 'Suicide Écoute',
      phone: '01 45 39 40 00',
      description: 'Prévention du suicide',
      available24h: true,
    },
    {
      id: 'numero_vert',
      name: '3114 - Numéro national',
      phone: '3114',
      description: 'Numéro national de prévention du suicide',
      available24h: true,
    },
  ],
  immediateActions: [
    {
      id: 'contact_psy',
      label: 'Contacter mon psychologue',
      priority: 1,
    },
    {
      id: 'call_emergency',
      label: 'Appeler les urgences (15 ou 112)',
      priority: 2,
    },
    {
      id: 'contact_trusted_person',
      label: 'Appeler une personne de confiance',
      priority: 3,
    },
    {
      id: 'go_to_hospital',
      label: 'Me rendre aux urgences',
      priority: 4,
    },
  ],
} as const;

// Messages de rappel pour la prochaine séance
export const NEXT_SESSION_MESSAGES = [
  'Votre prochain rendez-vous est prévu le {date} à {time}.',
  'N\'oubliez pas votre séance du {date} à {time}.',
  'À bientôt le {date} à {time} pour notre prochaine séance.',
] as const;

// Messages de relance si pas de RDV fixé
export const FOLLOW_UP_MESSAGES = [
  'Bonjour, comment allez-vous ? Souhaitez-vous prendre rendez-vous ?',
  'Je pense à vous. N\'hésitez pas à prendre rendez-vous si vous en ressentez le besoin.',
  'Comment se passe votre semaine ? Je reste disponible si vous souhaitez échanger.',
] as const;

// Helper pour obtenir le label d'une action
export const getActionLabel = (type: ActionType): string => {
  return ACTION_TYPES[type]?.label || type;
};

// Helper pour obtenir l'icône d'une action
export const getActionIcon = (type: ActionType): string => {
  return ACTION_TYPES[type]?.icon || '✨';
};

// Helper pour obtenir la description d'une action
export const getActionDescription = (type: ActionType): string => {
  return ACTION_TYPES[type]?.description || '';
};