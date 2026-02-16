import React from 'react';
import { View, Text, Platform } from 'react-native';
import PatientStats from '../PatientStats';
import PatientInfo from '../PatientInfo';
import PatientActions from '../PatientActions';
import PatientQRCode from '../PatientQRCode';

const OverviewTab = ({
  patient,
  stats,
  recentEvaluations = [],
  sessionNotes = [],
  onAddNote,
  onEdit,
  onArchive,
}) => {
  const isWeb = Platform.OS === 'web';

  return (
    <View className={`p-4 ${isWeb ? 'pb-8' : ''}`}>
      {/* Statistiques */}
      {stats && (
        <View className="bg-white rounded-xl p-5 mb-4">
          <Text className="text-lg font-semibold text-text-900 mb-4">
            Statistiques
          </Text>
          <PatientStats
            stats={stats}
            evaluationsCount={recentEvaluations.length}
            notesCount={sessionNotes.length}
          />
        </View>
      )}

      {/* QR CODE */}
      <PatientQRCode
        patientId={patient._id}
        patientEmail={patient.email}
      />

      {/* Informations patient */}
      <PatientInfo patient={patient} />

      {/* Actions */}
      <PatientActions
        onAddNote={onAddNote}
        onEdit={onEdit}
        onArchive={onArchive}
      />
    </View>
  );
};

export default OverviewTab;
