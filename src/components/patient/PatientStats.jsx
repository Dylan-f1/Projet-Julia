import React from 'react';
import { View, Text, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const StatBox = ({ icon, label, value, color = 'primary', trend }) => {
  const isWeb = Platform.OS === 'web';
  
  return (
    <View className={`flex-1 items-center p-4 ${isWeb ? 'min-w-[120px]' : ''}`}>
      <View className={`w-12 h-12 bg-${color}-100 rounded-full items-center justify-center mb-2`}>
        <Ionicons 
          name={icon} 
          size={24} 
          color={
            color === 'primary' ? '#0284c7' : 
            color === 'accent' ? '#22c55e' : 
            '#ef4444'
          } 
        />
      </View>
      <Text className="text-2xl font-bold text-gray-900">{value}</Text>
      <Text className="text-sm text-gray-600 text-center">{label}</Text>
      {trend && (
        <View className={`mt-1 px-2 py-1 rounded ${
          trend === 'improving' ? 'bg-green-100' : 
          trend === 'declining' ? 'bg-red-100' : 
          'bg-gray-100'
        }`}>
          <Text className={`text-xs ${
            trend === 'improving' ? 'text-green-600' : 
            trend === 'declining' ? 'text-red-600' : 
            'text-gray-600'
          }`}>
            {trend === 'improving' ? '↗ Amélioration' : 
             trend === 'declining' ? '↘ Détérioration' : 
             '→ Stable'}
          </Text>
        </View>
      )}
    </View>
  );
};

const PatientStats = ({ stats, evaluationsCount, notesCount }) => {
  const isWeb = Platform.OS === 'web';

  if (!stats) return null;

  return (
    <>
      <View className={`border-b border-gray-200 pb-4 mb-4 ${
        isWeb ? 'flex-row flex-wrap justify-around' : 'flex-row'
      }`}>
        <StatBox
          icon="chatbubbles"
          label="Conversations"
          value={stats.totalConversations || 0}
        />
        <StatBox
          icon="calendar"
          label="Évaluations"
          value={evaluationsCount}
        />
        <StatBox
          icon="document-text"
          label="Notes"
          value={notesCount}
        />
      </View>

      <View className={isWeb ? 'flex-row flex-wrap justify-around' : 'flex-row'}>
        <StatBox
          icon="happy"
          label="Humeur moy."
          value={stats.averageMood?.toFixed(1) || 'N/A'}
          color="accent"
          trend={stats.moodTrend}
        />
        <StatBox
          icon="pulse"
          label="Anxiété moy."
          value={stats.averageAnxiety?.toFixed(1) || 'N/A'}
          color={stats.averageAnxiety > 3 ? 'red' : 'accent'}
          trend={stats.anxietyTrend}
        />
        <StatBox
          icon="moon"
          label="Sommeil moy."
          value={stats.averageSleep?.toFixed(1) || 'N/A'}
          color="primary"
        />
      </View>
    </>
  );
};

export default PatientStats;