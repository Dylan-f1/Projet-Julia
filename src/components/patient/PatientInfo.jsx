import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const InfoRow = ({ icon, label, value, isLast = false }) => (
  <View className={`flex-row items-center py-3 ${!isLast ? 'border-b border-surface-200' : ''}`}>
    <View className="w-8 h-8 bg-surface-100 rounded-full items-center justify-center mr-3">
      <Ionicons name={icon} size={16} color="#6B6B6B" />
    </View>
    <View className="flex-1">
      <Text className="text-xs text-text-300 mb-0.5">{label}</Text>
      <Text className="text-sm font-medium text-text-700">{value}</Text>
    </View>
  </View>
);

const PatientInfo = ({ patient }) => {
  return (
    <>
      <View className="bg-white rounded-xl p-5 mb-4">
        <Text className="text-lg font-semibold text-text-900 mb-3">
          Informations
        </Text>

        {patient.birthDate && (
          <InfoRow
            icon="calendar-outline"
            label="Date de naissance"
            value={`Ne(e) le ${new Date(patient.birthDate).toLocaleDateString('fr-FR')}`}
          />
        )}

        {patient.phone && (
          <InfoRow
            icon="call-outline"
            label="Telephone"
            value={patient.phone}
          />
        )}

        <InfoRow
          icon="mail-outline"
          label="Email"
          value={patient.email}
          isLast={!patient.lastContact}
        />

        {patient.lastContact && (
          <InfoRow
            icon="time-outline"
            label="Dernier contact"
            value={new Date(patient.lastContact).toLocaleDateString('fr-FR')}
            isLast
          />
        )}
      </View>

      {patient.notes && (
        <View className="bg-white rounded-xl p-5 mb-4">
          <Text className="text-lg font-semibold text-text-900 mb-2">
            Notes privees
          </Text>
          <View className="bg-surface-50 rounded-lg p-3 border border-surface-200">
            <Text className="text-text-700 leading-6">{patient.notes}</Text>
          </View>
        </View>
      )}
    </>
  );
};

export default PatientInfo;
