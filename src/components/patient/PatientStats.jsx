import React from 'react';
import { View, Text, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MainStatCard = ({ icon, label, value, borderColor, iconBg, iconColor, flex = 1 }) => {
  const isWeb = Platform.OS === 'web';

  return (
    <View
      className={`bg-white rounded-xl p-4 mx-1.5 ${
        isWeb ? 'min-w-[120px]' : ''
      }`}
      style={{ flex, borderLeftWidth: 4, borderLeftColor: borderColor }}
    >
      <View className="flex-row items-center mb-2">
        <View className={`w-9 h-9 rounded-full items-center justify-center mr-2 ${iconBg}`}>
          <Ionicons name={icon} size={18} color={iconColor} />
        </View>
        <Text className="text-xs text-text-300">{label}</Text>
      </View>
      <Text className="text-2xl font-bold text-text-900">{value}</Text>
    </View>
  );
};

const CompactStat = ({ icon, label, value, iconColor, trend }) => {
  return (
    <View className="flex-1 items-center bg-white rounded-xl p-3 mx-1.5">
      <View className="w-8 h-8 bg-surface-100 rounded-full items-center justify-center mb-1.5">
        <Ionicons name={icon} size={16} color={iconColor} />
      </View>
      <Text className="text-lg font-bold text-text-900">{value}</Text>
      <Text className="text-xs text-text-300 text-center mt-0.5">{label}</Text>
      {trend && (
        <View
          className={`mt-1.5 px-2.5 py-0.5 rounded-full ${
            trend === 'improving'
              ? 'bg-success-50'
              : trend === 'declining'
              ? 'bg-danger-50'
              : 'bg-surface-100'
          }`}
        >
          <Text
            className={`text-xs font-medium ${
              trend === 'improving'
                ? 'text-success-400'
                : trend === 'declining'
                ? 'text-danger-400'
                : 'text-text-300'
            }`}
          >
            {trend === 'improving'
              ? '\u2197 Amelioration'
              : trend === 'declining'
              ? '\u2198 Deterioration'
              : '\u2192 Stable'}
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
      {/* Main stats with varied sizes and left borders */}
      <View
        className={`pb-4 mb-4 ${
          isWeb ? 'flex-row flex-wrap justify-around gap-3' : 'flex-row'
        }`}
      >
        <MainStatCard
          icon="chatbubbles"
          label="Conversations"
          value={stats.totalConversations || 0}
          borderColor="#5B9BD5"
          iconBg="bg-patient-50"
          iconColor="#5B9BD5"
          flex={1.5}
        />
        <MainStatCard
          icon="calendar"
          label="Evaluations"
          value={evaluationsCount}
          borderColor="#E8A838"
          iconBg="bg-therapist-50"
          iconColor="#E8A838"
        />
        <MainStatCard
          icon="document-text"
          label="Notes"
          value={notesCount}
          borderColor="#F0A8A0"
          iconBg="bg-ai-50"
          iconColor="#F0A8A0"
        />
      </View>

      {/* Compact averages */}
      <View className={isWeb ? 'flex-row flex-wrap justify-around gap-3' : 'flex-row'}>
        <CompactStat
          icon="happy"
          label="Humeur moy."
          value={stats.averageMood?.toFixed(1) || 'N/A'}
          iconColor="#5B9BD5"
          trend={stats.moodTrend}
        />
        <CompactStat
          icon="pulse"
          label="Anxiete moy."
          value={stats.averageAnxiety?.toFixed(1) || 'N/A'}
          iconColor="#E8A838"
          trend={stats.anxietyTrend}
        />
        <CompactStat
          icon="moon"
          label="Sommeil moy."
          value={stats.averageSleep?.toFixed(1) || 'N/A'}
          iconColor="#F0A8A0"
        />
      </View>
    </>
  );
};

export default PatientStats;
