import React from 'react';
import { View, Text } from 'react-native';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const MessageBubble = ({ message, isUser }) => {
  const bubbleClasses = isUser
    ? 'bg-primary-600 ml-12'
    : 'bg-gray-100 mr-12';

  const textClasses = isUser ? 'text-white' : 'text-gray-900';

  const alignmentClasses = isUser ? 'items-end' : 'items-start';

  const formatTime = (timestamp) => {
    try {
      return format(new Date(timestamp), 'HH:mm', { locale: fr });
    } catch {
      return '';
    }
  };

  return (
    <View className={`mb-4 ${alignmentClasses}`}>
      <View className={`rounded-2xl px-4 py-3 max-w-[80%] ${bubbleClasses}`}>
        <Text className={`${textClasses} text-base leading-6`}>
          {message.content}
        </Text>
      </View>
      
      {message.timestamp && (
        <Text className="text-xs text-gray-500 mt-1 px-2">
          {formatTime(message.timestamp)}
        </Text>
      )}
    </View>
  );
};

export default MessageBubble;
