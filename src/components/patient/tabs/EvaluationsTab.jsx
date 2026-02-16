import React from 'react';
import { View, Text, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ScoreCircle = ({ label, value, icon, accentColor, iconColor }) => {
  return (
    <View className="items-center flex-1">
      <View className="w-10 h-10 bg-surface-100 rounded-full items-center justify-center mb-1.5">
        <Ionicons name={icon} size={18} color={iconColor} />
      </View>
      <Text className="text-xs text-text-300 mb-1">{label}</Text>
      <View className="flex-row items-baseline">
        <Text className="text-2xl font-bold" style={{ color: accentColor }}>
          {value}
        </Text>
        <Text className="text-text-300 text-sm">/5</Text>
      </View>
    </View>
  );
};

const EvaluationsTab = ({ evaluations = [] }) => {
  const isWeb = Platform.OS === 'web';
  const safeEvaluations = Array.isArray(evaluations) ? evaluations : [];

  if (safeEvaluations.length === 0) {
    return (
      <View className="p-4">
        <View className="bg-white rounded-xl p-8 items-center border border-surface-200">
          <View className="w-14 h-14 bg-therapist-50 rounded-full items-center justify-center mb-3">
            <Ionicons name="analytics-outline" size={28} color="#E8A838" />
          </View>
          <Text className="text-text-300 text-center">
            Aucune evaluation pour le moment
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View className="p-4">
      <View className={isWeb ? 'flex-row flex-wrap gap-3' : ''}>
        {safeEvaluations.map((evaluation) => (
          <View
            key={evaluation._id}
            className={isWeb ? 'flex-1 min-w-[300px] mb-3' : 'mb-3'}
          >
            <View className="bg-white rounded-xl p-5">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-base font-semibold text-text-900">
                  {new Date(evaluation.date).toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                  })}
                </Text>
              </View>

              <View className="flex-row justify-between">
                <ScoreCircle
                  label="Humeur"
                  value={evaluation.mood}
                  icon="happy-outline"
                  accentColor="#5B9BD5"
                  iconColor="#5B9BD5"
                />
                <ScoreCircle
                  label="Anxiete"
                  value={evaluation.anxiety}
                  icon="pulse-outline"
                  accentColor="#E8A838"
                  iconColor="#E8A838"
                />
                <ScoreCircle
                  label="Sommeil"
                  value={evaluation.sleep}
                  icon="moon-outline"
                  accentColor="#F0A8A0"
                  iconColor="#F0A8A0"
                />
              </View>

              {evaluation.notes && (
                <View className="mt-4 pt-4 border-t border-surface-200">
                  <Text className="text-sm text-text-500 leading-5">
                    {evaluation.notes}
                  </Text>
                </View>
              )}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default EvaluationsTab;
