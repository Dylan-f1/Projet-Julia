/**
 * Composant AlertCard - Card d'alerte pour le psy
 */

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Badge } from '@/components/ui';

type AlertSeverity = 'low' | 'medium' | 'high' | 'critical';
type AlertType = 
  | 'severity_increase'
  | 'severity_high'
  | 'emergency_keywords'
  | 'inactivity'
  | 'new_conversation';

interface AlertCardProps {
  id: string;
  type: AlertType;
  severity: AlertSeverity;
  patientName: string;
  title: string;
  message: string;
  timestamp: Date;
  isRead?: boolean;
  onPress: (id: string) => void;
  onDismiss?: (id: string) => void;
}

export const AlertCard: React.FC<AlertCardProps> = ({
  id,
  type,
  severity,
  patientName,
  title,
  message,
  timestamp,
  isRead = false,
  onPress,
  onDismiss,
}) => {
  const severityConfig = {
    low: {
      color: '#7FB685',
      bgColor: '#E5F4E7',
      label: 'Info',
    },
    medium: {
      color: '#D9A05B',
      bgColor: '#F7EFE3',
      label: 'Attention',
    },
    high: {
      color: '#F87142',
      bgColor: '#FFF4ED',
      label: 'Important',
    },
    critical: {
      color: '#C17B6F',
      bgColor: '#F2E8E6',
      label: 'Urgent',
    },
  };

  const typeIcons: Record<AlertType, string> = {
    severity_increase: '📈',
    severity_high: '⚠️',
    emergency_keywords: '🆘',
    inactivity: '💤',
    new_conversation: '💬',
  };

  const config = severityConfig[severity];

  const formatTime = (date: Date): string => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return "À l'instant";
    if (minutes < 60) return `Il y a ${minutes} min`;
    if (hours < 24) return `Il y a ${hours}h`;
    return `Il y a ${days}j`;
  };

  return (
    <TouchableOpacity
      onPress={() => onPress(id)}
      className={`rounded-2xl p-4 mb-3 border-2 ${
        isRead ? 'bg-white border-[#E8E3DC]' : 'border-transparent'
      }`}
      style={{ backgroundColor: isRead ? '#FFFFFF' : config.bgColor }}
      activeOpacity={0.7}
    >
      {/* Header */}
      <View className="flex-row items-start justify-between mb-2">
        <View className="flex-1 flex-row items-center">
          <Text className="text-2xl mr-2">{typeIcons[type]}</Text>
          <View className="flex-1">
            <Text className="text-base font-semibold text-[#2C2318] mb-1">
              {patientName}
            </Text>
            <Text className="text-xs text-[#8B8378]">
              {formatTime(timestamp)}
            </Text>
          </View>
        </View>

        {!isRead && <Badge variant="error" dot size="md" />}
      </View>

      {/* Severity badge */}
      <View className="mb-2">
        <View
          className="self-start px-2 py-1 rounded-lg"
          style={{ backgroundColor: config.color }}
        >
          <Text className="text-xs font-semibold text-white">
            {config.label}
          </Text>
        </View>
      </View>

      {/* Title */}
      <Text className="text-base font-semibold text-[#2C2318] mb-2">
        {title}
      </Text>

      {/* Message */}
      <Text className="text-sm text-[#5C5347] leading-5 mb-3">
        {message}
      </Text>

      {/* Actions */}
      <View className="flex-row gap-2">
        <TouchableOpacity
          onPress={() => onPress(id)}
          className="flex-1 bg-[#F87142] rounded-xl py-2 items-center"
          activeOpacity={0.7}
        >
          <Text className="text-white font-medium text-sm">
            Voir le détail
          </Text>
        </TouchableOpacity>

        {onDismiss && (
          <TouchableOpacity
            onPress={() => onDismiss(id)}
            className="px-4 bg-gray-100 rounded-xl py-2 items-center"
            activeOpacity={0.7}
          >
            <Text className="text-[#5C5347] font-medium text-sm">
              Ignorer
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default AlertCard;