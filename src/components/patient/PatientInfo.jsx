import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../common/Card';

const PatientInfo = ({ patient }) => {
  return (
    <>
      <Card className="mb-4">
        <Text className="text-lg font-semibold text-gray-900 mb-4">
          Informations
        </Text>
        
        {patient.birthDate && (
          <View className="flex-row items-center mb-3">
            <Ionicons name="calendar-outline" size={20} color="#6B7280" />
            <Text className="text-gray-700 ml-3">
              Né(e) le {new Date(patient.birthDate).toLocaleDateString('fr-FR')}
            </Text>
          </View>
        )}

        {patient.phone && (
          <View className="flex-row items-center mb-3">
            <Ionicons name="call-outline" size={20} color="#6B7280" />
            <Text className="text-gray-700 ml-3">{patient.phone}</Text>
          </View>
        )}

        <View className="flex-row items-center mb-3">
          <Ionicons name="mail-outline" size={20} color="#6B7280" />
          <Text className="text-gray-700 ml-3">{patient.email}</Text>
        </View>

        {patient.lastContact && (
          <View className="flex-row items-center">
            <Ionicons name="time-outline" size={20} color="#6B7280" />
            <Text className="text-gray-700 ml-3">
              Dernier contact: {new Date(patient.lastContact).toLocaleDateString('fr-FR')}
            </Text>
          </View>
        )}
      </Card>

      {patient.notes && (
        <Card className="mb-4">
          <Text className="text-lg font-semibold text-gray-900 mb-2">
            Notes privées
          </Text>
          <Text className="text-gray-700 leading-6">{patient.notes}</Text>
        </Card>
      )}
    </>
  );
};

export default PatientInfo;