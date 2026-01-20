import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Badge } from '@/components/ui';
import type { SeverityLevel } from '@/types/conversation';
import { getSeverityColor } from '@/lib/constants/colors';

interface SyntheseCardProps {
  id: string;
  patientName: string;
  date: Date;
  severityLevel: SeverityLevel;
  severityTrend: 'improving' | 'stable' | 'worsening';
  keyPoints: string[];
  hasAlerts?: boolean;
  isRead?: boolean;
  onPress: (id: string) => void;
}

export const SyntheseCard: React.FC<SyntheseCardProps> = ({
  id,
  patientName,
  date,
  severityLevel,
  severityTrend,
  keyPoints,
  hasAlerts = false,
  isRead = false,
  onPress,
}) => {
  const severityColors = getSeverityColor(severityLevel);
  
  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const trendIcons = {
    improving: '📈',
    stable: '➡️',
    worsening: '📉',
  };

  const trendLabels = {
    improving: 'En amélioration',
    stable: 'Stable',
    worsening: 'En dégradation',
  };

  const trendColors = {
    improving: '#7FB685',
    stable: '#6B8CAE',
    worsening: '#C17B6F',
  };

  return (
    <TouchableOpacity
      onPress={() => onPress(id)}
      className={`rounded-2xl p-4 mb-3 border-2 ${
        isRead ? 'bg-white border-[#E8E3DC]' : 'bg-[#FFF4ED] border-[#F87142]'
      }`}
      activeOpacity={0.7}
    >
      {/* Header */}
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-1">
          <Text className="text-lg font-semibold text-[#2C2318] mb-1">
            {patientName}
          </Text>
          <Text className="text-sm text-[#8B8378]">
            {formatDate(date)}
          </Text>
        </View>

        <View className="flex-row gap-2">
          {!isRead && <Badge variant="primary" dot size="md" />}
          {hasAlerts && <Badge variant="error" dot size="md" />}
        </View>
      </View>

      {/* Niveau de gravité */}
      <View className="flex-row items-center mb-3">
        <View
          className="w-3 h-3 rounded-full mr-2"
          style={{ backgroundColor: severityColors.main }}
        />
        <Text className="text-sm font-medium" style={{ color: severityColors.text }}>
          {severityColors.label}
        </Text>

        <View className="ml-4 flex-row items-center">
          <Text className="text-base mr-1">{trendIcons[severityTrend]}</Text>
          <Text className="text-sm" style={{ color: trendColors[severityTrend] }}>
            {trendLabels[severityTrend]}
          </Text>
        </View>
      </View>

      {/* Points clés */}
      <View className="bg-[#F9F5F1] rounded-xl p-3">
        <Text className="text-xs font-semibold text-[#5C5347] mb-2">
          Points clés
        </Text>
        {keyPoints.slice(0, 3).map((point, index) => (
          <Text key={index} className="text-sm text-[#2C2318] mb-1">
            • {point}
          </Text>
        ))}
      </View>
    </TouchableOpacity>
  );
};

export default SyntheseCard;