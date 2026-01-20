/**
 * Page Synthèses - Liste des synthèses IA
 */

import React from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { SyntheseCard } from '@/components/psy';
import type { SeverityLevel } from '@/types/conversation';

export default function SynthesesScreen() {
  const syntheses = [
    {
      id: '1',
      patientName: 'Sophie Martin',
      date: new Date(Date.now() - 2 * 60 * 60 * 1000),
      severityLevel: 2 as SeverityLevel,
      severityTrend: 'stable' as const,
      keyPoints: [
        'Évoque des difficultés au travail',
        'Pratique régulière de la cohérence cardiaque',
        'Sommeil de meilleure qualité',
      ],
      hasAlerts: false,
      isRead: false,
    },
    {
      id: '2',
      patientName: 'Emma Bernard',
      date: new Date(Date.now() - 30 * 60 * 1000),
      severityLevel: 3 as SeverityLevel,
      severityTrend: 'worsening' as const,
      keyPoints: [
        'Augmentation de l\'anxiété',
        'Mots-clés d\'urgence détectés',
        'Demande de soutien accrue',
      ],
      hasAlerts: true,
      isRead: false,
    },
    {
      id: '3',
      patientName: 'Thomas Dubois',
      date: new Date(Date.now() - 24 * 60 * 60 * 1000),
      severityLevel: 1 as SeverityLevel,
      severityTrend: 'improving' as const,
      keyPoints: [
        'Sentiment de bien-être général',
        'Retour à des activités sociales',
        'Motivation en hausse',
      ],
      hasAlerts: false,
      isRead: true,
    },
  ];

  const handleSynthesePress = (id: string) => {
    console.log('Synthèse pressed:', id);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FFFCF9]">
      {/* Header */}
      <View className="px-6 py-4 bg-white border-b border-[#E8E3DC]">
        <Text className="text-2xl font-bold text-[#2C2318]">
          Synthèses IA
        </Text>
        <Text className="text-sm text-[#8B8378] mt-1">
          {syntheses.filter(s => !s.isRead).length} nouvelle(s)
        </Text>
      </View>

      {/* Liste */}
      <ScrollView
        className="flex-1 px-6"
        contentContainerStyle={{ paddingVertical: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {syntheses.map((synthese) => (
          <SyntheseCard
            key={synthese.id}
            {...synthese}
            onPress={handleSynthesePress}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}