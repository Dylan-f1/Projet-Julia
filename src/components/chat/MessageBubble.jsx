import React, { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const MessageBubble = ({ message, isUser }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, []);

  const formatTime = (timestamp) => {
    try {
      return format(new Date(timestamp), 'HH:mm', { locale: fr });
    } catch {
      return '';
    }
  };

  return (
    <Animated.View
      style={{ opacity: fadeAnim }}
      className={`mb-4 ${isUser ? 'items-end' : 'items-start'}`}
    >
      <View
        className={`flex-row ${isUser ? 'justify-end' : 'justify-start'}`}
        style={{ maxWidth: '78%' }}
      >
        {/* Avatar Julia — AI messages only */}
        {!isUser && (
          <View
            className="w-8 h-8 bg-ai-400 rounded-full items-center justify-center mr-2 mt-1"
          >
            <Ionicons name="heart" size={16} color="white" />
          </View>
        )}

        {/* Bubble */}
        <View className="flex-1">
          <View
            className={`px-4 py-3 ${
              isUser
                ? 'bg-patient-400 rounded-[20px] rounded-br-[4px]'
                : 'bg-ai-50 rounded-[20px] rounded-bl-[4px] border border-ai-200'
            }`}
          >
            <Text
              className={`text-base leading-6 ${
                isUser ? 'text-white' : 'text-text-900'
              }`}
            >
              {message.content}
            </Text>
          </View>

          {/* Timestamp */}
          {message.timestamp && (
            <Text
              className={`text-xs text-text-300 mt-1 ${
                isUser ? 'text-right mr-1' : 'ml-1'
              }`}
            >
              {formatTime(message.timestamp)}
            </Text>
          )}
        </View>
      </View>
    </Animated.View>
  );
};

export default MessageBubble;
