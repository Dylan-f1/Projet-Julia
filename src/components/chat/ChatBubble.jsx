// src/components/chat/ChatBubble.jsx
import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ChatBubble = ({ message, isUser }) => {
  return (
    <View className={`flex-row mb-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {/* Avatar Julia */}
      {!isUser && (
        <View className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full items-center justify-center mr-2">
          <Ionicons name="sparkles" size={16} color="white" />
        </View>
      )}

      {/* Bulle de message */}
      <View className={`max-w-[75%] ${isUser ? 'items-end' : 'items-start'}`}>
        {/* Nom */}
        {!isUser && (
          <Text className="text-xs text-gray-500 mb-1 ml-2">JuliApp</Text>
        )}

        {/* Message */}
        <View
          className={`px-4 py-3 rounded-2xl ${
            isUser
              ? 'bg-primary-600 rounded-tr-sm'
              : 'bg-gray-200 rounded-tl-sm'
          }`}
        >
          <Text
            className={`text-base leading-5 ${
              isUser ? 'text-white' : 'text-gray-900'
            }`}
          >
            {message.content}
          </Text>
        </View>

        {/* Heure */}
        <Text className={`text-xs text-gray-400 mt-1 ${isUser ? 'mr-2' : 'ml-2'}`}>
          {new Date(message.timestamp).toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </View>

      {/* Avatar utilisateur */}
      {isUser && (
        <View className="w-8 h-8 bg-gray-300 rounded-full items-center justify-center ml-2">
          <Ionicons name="person" size={16} color="#6B7280" />
        </View>
      )}
    </View>
  );
};

export default ChatBubble;