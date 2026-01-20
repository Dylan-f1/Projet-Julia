import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Avatar, Badge } from '@/components/ui';
import type { SeverityLevel } from '@/types/conversation';
import { getSeverityColor } from '@/lib/constants/colors';

interface PatientCardProps {
  id: string;
  firstName: string;
  lastName: string;
  currentSeverityScore?: SeverityLevel;
  lastConversationDate?: Date;
  hasUnreadSynthesis?: boolean;
  hasActiveAlert?: boolean;
  nextSessionDate?: Date;
  onPress: (id: string) => void;
}

export const PatientCard: React.FC<PatientCardProps> = ({
  id,
  firstName,
  lastName,
  currentSeverityScore,
  lastConversationDate,
  hasUnreadSynthesis = false,
  hasActiveAlert = false,
  nextSessionDate,
  onPress,
}) => {
  const fullName = `${firstName} ${lastName}`;
  const severityColors = currentSeverityScore 
    ? getSeverityColor(currentSeverityScore)
    : null;

  const formatDate = (date: Date): string => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return "Aujourd'hui";
    if (days === 1) return 'Hier';
    if (days < 7) return `Il y a ${days}j`;
    
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'short',
    }).format(date);
  };

  const formatNextSession = (date: Date): string => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <TouchableOpacity
      onPress={() => onPress(id)}
      className="bg-white rounded-2xl p-4 mb-3 border-2 border-[#E8E3DC] active:bg-[#FFF8F3]"
      activeOpacity={0.7}
    >
      <View className="flex-row items-center">
        {/* Avatar */}
        <View className="relative">
          <Avatar name={fullName} size="lg" />
          
          {/* Badge de gravité */}
          {severityColors && (
            <View 
              className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white"
              style={{ backgroundColor: severityColors.main }}
            />
          )}
        </View>

        {/* Infos */}
        <View className="flex-1 ml-4">
          <View className="flex-row items-center justify-between mb-1">
            <Text className="text-lg font-semibold text-[#2C2318]">
              {fullName}
            </Text>
            
            {/* Badges */}
            <View className="flex-row gap-2">
              {hasActiveAlert && <Badge variant="error" dot size="md" />}
              {hasUnreadSynthesis && <Badge variant="primary" dot size="md" />}
            </View>
          </View>

          {/* Dernière conversation */}
          {lastConversationDate && (
            <Text className="text-sm text-[#8B8378] mb-1">
              Dernière conversation : {formatDate(lastConversationDate)}
            </Text>
          )}

          {/* Prochaine séance */}
          {nextSessionDate && (
            <Text className="text-sm text-[#6B9E78] font-medium">
              Prochaine séance : {formatNextSession(nextSessionDate)}
            </Text>
          )}
        </View>
      </View>

      {/* Niveau de gravité */}
      {severityColors && (
        <View 
          className="mt-3 pt-3 border-t border-[#E8E3DC] flex-row items-center"
        >
          <View 
            className="w-3 h-3 rounded-full mr-2"
            style={{ backgroundColor: severityColors.main }}
          />
          <Text className="text-sm" style={{ color: severityColors.text }}>
            {severityColors.label}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default PatientCard;