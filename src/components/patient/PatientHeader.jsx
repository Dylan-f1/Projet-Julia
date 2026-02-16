import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PatientHeader = ({ patient, onBack, onEdit }) => {
  const isWeb = Platform.OS === 'web';

  return (
    <View className="bg-therapist-50 px-4 py-5 border-b border-therapist-100">
      <View className="flex-row items-center justify-between mb-4">
        <TouchableOpacity
          onPress={onBack}
          className={`w-10 h-10 bg-surface-100 rounded-full items-center justify-center ${
            isWeb ? 'hover:bg-surface-200' : ''
          }`}
        >
          <Ionicons name="arrow-back" size={20} color="#404040" />
        </TouchableOpacity>

        <View className="flex-1 mx-4">
          <Text className="text-xl font-bold text-text-900">
            {patient.firstName} {patient.lastName}
          </Text>
          <Text className="text-sm text-text-300 mt-0.5">{patient.email}</Text>
        </View>

        <TouchableOpacity
          onPress={onEdit}
          className={`w-10 h-10 bg-surface-100 rounded-full items-center justify-center ${
            isWeb ? 'hover:bg-surface-200' : ''
          }`}
        >
          <Ionicons name="create-outline" size={20} color="#404040" />
        </TouchableOpacity>
      </View>

      {patient.criticalStatus && (
        <View
          className="bg-danger-50 rounded-xl p-4"
          style={{ borderLeftWidth: 4, borderLeftColor: '#E05B5B' }}
        >
          <View className="flex-row items-center">
            <View className="w-8 h-8 bg-danger-100 rounded-full items-center justify-center mr-3">
              <Ionicons name="warning" size={18} color="#E05B5B" />
            </View>
            <Text className="text-danger-600 font-semibold flex-1">
              Patient en situation critique - Surveillance renforcee
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default PatientHeader;
