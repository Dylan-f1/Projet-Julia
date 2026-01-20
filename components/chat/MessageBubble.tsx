import React from 'react';
import { View, Text } from 'react-native';
import type { MessageSender } from '@/types/conversation';
import { getMessageColor } from '@/lib/constants/colors';

interface MessageBubbleProps {
  sender: MessageSender;
  content: string;
  timestamp: Date;
  senderName?: string;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  sender,
  content,
  timestamp,
  senderName,
}) => {
  const colors = getMessageColor(sender);
  const isPatient = sender === 'patient';
  
  const formatTime = (date: Date): string => {
    return new Intl.DateTimeFormat('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const senderLabels = {
    ia: 'Assistant IA',
    psy: senderName || 'Votre thérapeute',
    patient: 'Vous',
  };

  return (
    <View className={`mb-4 ${isPatient ? 'items-end' : 'items-start'}`}>
      {/* Nom de l'expéditeur */}
      <Text className="text-xs text-[#8B8378] mb-1 px-2">
        {senderLabels[sender]}
      </Text>

      {/* Bulle de message */}
      <View
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isPatient ? 'rounded-tr-sm' : 'rounded-tl-sm'
        }`}
        style={{ backgroundColor: colors.lighter }}
      >
        <Text
          className="text-base leading-5"
          style={{ color: colors.text }}
        >
          {content}
        </Text>
      </View>

      {/* Heure */}
      <Text className="text-xs text-[#B8B1A6] mt-1 px-2">
        {formatTime(timestamp)}
      </Text>
    </View>
  );
};

export default MessageBubble;