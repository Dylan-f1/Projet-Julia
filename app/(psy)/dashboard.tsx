import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { PatientCard } from '@/components/psy';
import { Button, Badge } from '@/components/ui';
import type { SeverityLevel } from '@/types/conversation';

export default function DashboardScreen() {
  const router = useRouter();

  // Données de démonstration
  const patients = [
    {
      id: '1',
      firstName: 'Sophie',
      lastName: 'Martin',
      currentSeverityScore: 2 as SeverityLevel,
      lastConversationDate: new Date(Date.now() - 2 * 60 * 60 * 1000), // Il y a 2h
      hasUnreadSynthesis: true,
      hasActiveAlert: false,
      nextSessionDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Dans 2 jours
    },
    {
      id: '2',
      firstName: 'Thomas',
      lastName: 'Dubois',
      currentSeverityScore: 1 as SeverityLevel,
      lastConversationDate: new Date(Date.now() - 24 * 60 * 60 * 1000), // Hier
      hasUnreadSynthesis: false,
      hasActiveAlert: false,
      nextSessionDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Dans 7 jours
    },
    {
      id: '3',
      firstName: 'Emma',
      lastName: 'Bernard',
      currentSeverityScore: 3 as SeverityLevel,
      lastConversationDate: new Date(Date.now() - 30 * 60 * 1000), // Il y a 30 min
      hasUnreadSynthesis: true,
      hasActiveAlert: true,
      nextSessionDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Demain
    },
    {
      id: '4',
      firstName: 'Lucas',
      lastName: 'Petit',
      currentSeverityScore: 2 as SeverityLevel,
      lastConversationDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // Il y a 3 jours
      hasUnreadSynthesis: false,
      hasActiveAlert: false,
    },
  ];

  const [stats] = useState({
    totalPatients: 12,
    activeConversations: 3,
    unreadSyntheses: 5,
    criticalAlerts: 1,
  });

  const handlePatientPress = (id: string) => {
    console.log('Patient pressed:', id);
    // TODO: Navigation vers la fiche patient
  };

  const handleAddPatient = () => {
    console.log('Add patient');
    // TODO: Navigation vers création patient
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FFFCF9]">
      {/* Header */}
      <View className="px-6 py-4 bg-white border-b border-[#E8E3DC]">
        <View className="flex-row items-center justify-between mb-4">
          <View>
            <Text className="text-2xl font-bold text-[#2C2318]">
              Mes patients
            </Text>
            <Text className="text-sm text-[#8B8378] mt-1">
              {stats.totalPatients} patients suivis
            </Text>
          </View>

          <TouchableOpacity
            onPress={handleAddPatient}
            className="w-12 h-12 rounded-full bg-[#F87142] items-center justify-center"
            activeOpacity={0.7}
          >
            <Text className="text-2xl text-white">+</Text>
          </TouchableOpacity>
        </View>

        {/* Stats rapides */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-3">
            <View className="bg-[#E8EDF4] rounded-2xl px-4 py-3">
              <Text className="text-2xl font-bold text-[#6B8CAE]">
                {stats.activeConversations}
              </Text>
              <Text className="text-xs text-[#3D4F63] mt-1">
                Conversations actives
              </Text>
            </View>

            <View className="bg-[#FFF4ED] rounded-2xl px-4 py-3">
              <Text className="text-2xl font-bold text-[#F87142]">
                {stats.unreadSyntheses}
              </Text>
              <Text className="text-xs text-[#8B5347] mt-1">
                Synthèses non lues
              </Text>
            </View>

            {stats.criticalAlerts > 0 && (
              <View className="bg-[#F2E8E6] rounded-2xl px-4 py-3">
                <Text className="text-2xl font-bold text-[#C17B6F]">
                  {stats.criticalAlerts}
                </Text>
                <Text className="text-xs text-[#8B5347] mt-1">
                  Alerte importante
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>

      {/* Liste des patients */}
      <ScrollView
        className="flex-1 px-6"
        contentContainerStyle={{ paddingVertical: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {patients.map((patient) => (
          <PatientCard
            key={patient.id}
            {...patient}
            onPress={handlePatientPress}
          />
        ))}

        {/* Message si liste vide */}
        {patients.length === 0 && (
          <View className="items-center py-12">
            <Text className="text-6xl mb-4">👥</Text>
            <Text className="text-xl font-semibold text-[#2C2318] mb-2">
              Aucun patient
            </Text>
            <Text className="text-base text-[#8B8378] text-center mb-6">
              Commencez par ajouter votre premier patient
            </Text>
            <Button onPress={handleAddPatient}>
              Ajouter un patient
            </Button>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}