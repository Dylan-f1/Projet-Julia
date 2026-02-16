// src/components/patient/PatientActions.jsx
import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ACTION_CONFIG = {
  resend: {
    borderColor: '#5B9BD5',
    iconBg: 'bg-patient-50',
    iconColor: '#5B9BD5',
    chevronColor: '#5B9BD5',
  },
  addNote: {
    borderColor: '#E8A838',
    iconBg: 'bg-therapist-50',
    iconColor: '#E8A838',
    chevronColor: '#E8A838',
  },
  edit: {
    borderColor: '#5B9BD5',
    iconBg: 'bg-patient-50',
    iconColor: '#5B9BD5',
    chevronColor: '#5B9BD5',
  },
  archive: {
    borderColor: '#E05B5B',
    iconBg: 'bg-danger-50',
    iconColor: '#E05B5B',
    chevronColor: '#E05B5B',
  },
};

const ActionCard = ({ icon, label, onPress, actionType = 'resend' }) => {
  const isWeb = Platform.OS === 'web';
  const config = ACTION_CONFIG[actionType] || ACTION_CONFIG.resend;
  const isDanger = actionType === 'archive';

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className={`bg-white rounded-xl p-4 flex-row items-center ${
        isWeb ? 'hover:shadow-md flex-1 min-w-[250px]' : ''
      }`}
      style={{ borderLeftWidth: 4, borderLeftColor: config.borderColor }}
    >
      <View
        className={`w-9 h-9 rounded-full items-center justify-center mr-3 ${config.iconBg}`}
      >
        <Ionicons name={icon} size={18} color={config.iconColor} />
      </View>
      <Text
        className={`text-sm font-semibold flex-1 ${
          isDanger ? 'text-danger-600' : 'text-text-700'
        }`}
      >
        {label}
      </Text>
      <Ionicons name="chevron-forward" size={18} color={config.chevronColor} />
    </TouchableOpacity>
  );
};

const PatientActions = ({ onAddNote, onEdit, onArchive, onResendMagicLink }) => {
  const isWeb = Platform.OS === 'web';

  return (
    <View className={isWeb ? 'flex-row flex-wrap gap-3' : 'mb-4'}>
      {/* Renvoyer le lien d'acces */}
      <View className={isWeb ? 'flex-1 min-w-[250px]' : 'mb-3'}>
        <ActionCard
          icon="qr-code-outline"
          label="Renvoyer le lien d'acces"
          onPress={onResendMagicLink}
          actionType="resend"
        />
      </View>

      <View className={isWeb ? 'flex-1 min-w-[250px]' : 'mb-3'}>
        <ActionCard
          icon="add-circle-outline"
          label="Ajouter une note de seance"
          onPress={onAddNote}
          actionType="addNote"
        />
      </View>

      <View className={isWeb ? 'flex-1 min-w-[250px]' : 'mb-3'}>
        <ActionCard
          icon="create-outline"
          label="Modifier les informations"
          onPress={onEdit}
          actionType="edit"
        />
      </View>

      <View className={isWeb ? 'flex-1 min-w-[250px]' : ''}>
        <ActionCard
          icon="archive-outline"
          label="Archiver le patient"
          onPress={onArchive}
          actionType="archive"
        />
      </View>
    </View>
  );
};

export default PatientActions;
