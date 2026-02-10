// src/components/patient/PatientActions.jsx
import React from 'react';
import { View, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../common/Button';

const PatientActions = ({ onAddNote, onEdit, onArchive, onResendMagicLink }) => {
  const isWeb = Platform.OS === 'web';

  return (
    <View className={isWeb ? 'flex-row flex-wrap gap-3' : 'mb-4'}>
      {/* 🔥 NOUVEAU BOUTON : Renvoyer le lien d'accès */}
      <View className={isWeb ? 'flex-1 min-w-[250px]' : 'mb-3'}>
        <Button
          title="Renvoyer le lien d'accès"
          onPress={onResendMagicLink}
          variant="secondary"
          icon={<Ionicons name="qr-code-outline" size={20} color="white" />}
        />
      </View>

      <View className={isWeb ? 'flex-1 min-w-[250px]' : 'mb-3'}>
        <Button
          title="Ajouter une note de séance"
          onPress={onAddNote}
          icon={<Ionicons name="add-circle-outline" size={20} color="white" />}
        />
      </View>

      <View className={isWeb ? 'flex-1 min-w-[250px]' : 'mb-3'}>
        <Button
          title="Modifier les informations"
          onPress={onEdit}
          variant="outline"
          icon={<Ionicons name="create-outline" size={20} color="#0284c7" />}
        />
      </View>

      <View className={isWeb ? 'flex-1 min-w-[250px]' : ''}>
        <Button
          title="Archiver le patient"
          onPress={onArchive}
          variant="danger"
          icon={<Ionicons name="archive-outline" size={20} color="white" />}
        />
      </View>
    </View>
  );
};

export default PatientActions;