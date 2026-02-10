import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PatientHeader = ({ patient, onBack, onEdit }) => {
  const isWeb = Platform.OS === 'web';

  return (
    <View className="bg-white px-4 py-4 border-b border-gray-200">
      <View className="flex-row items-center justify-between mb-4">
        <TouchableOpacity 
          onPress={onBack}
          className={isWeb ? 'hover:bg-gray-100 p-2 rounded-lg -ml-2' : ''}
        >
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        
        <View className="flex-1 mx-4">
          <Text className="text-xl font-bold text-gray-900">
            {patient.firstName} {patient.lastName}
          </Text>
          <Text className="text-sm text-gray-600">{patient.email}</Text>
        </View>

        <TouchableOpacity 
          onPress={onEdit}
          className={isWeb ? 'hover:bg-gray-100 p-2 rounded-lg' : ''}
        >
          <Ionicons name="create-outline" size={24} color="#6B7280" />
        </TouchableOpacity>
      </View>

      {patient.criticalStatus && (
        <View className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
          <View className="flex-row items-center">
            <Ionicons name="warning" size={20} color="#ef4444" />
            <Text className="text-red-600 font-semibold ml-2 flex-1">
              Patient en situation critique - Surveillance renforcée
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default PatientHeader;