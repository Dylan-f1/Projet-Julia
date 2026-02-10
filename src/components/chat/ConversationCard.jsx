// src/components/chat/ConversationCard.jsx
import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ConversationCard = ({ conversation, isActive, onPress }) => {
  const isWeb = Platform.OS === 'web';

  // Extraire les mots-clés de la synthèse
  const keywords = conversation.keywords || [];
  
  // Couleur selon le degré de gravité
  const getCrisisColor = (level) => {
    switch (level) {
      case 'high': return { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300', icon: 'alert-circle' };
      case 'medium': return { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-300', icon: 'warning' };
      case 'low': return { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300', icon: 'checkmark-circle' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-300', icon: 'chatbubble' };
    }
  };

  const crisisStyle = getCrisisColor(conversation.crisisLevel);

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`p-3 border-b border-gray-200 ${isActive ? 'bg-primary-50' : 'bg-white'} ${isWeb ? 'hover:bg-gray-50' : ''}`}
      activeOpacity={0.7}
    >
      <View className="flex-row items-start justify-between mb-2">
        {/* Date et heure */}
        <Text className="text-xs text-gray-500">
          {new Date(conversation.createdAt).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>

        {/* Indicateur de crise */}
        {conversation.crisisLevel && conversation.crisisLevel !== 'none' && (
          <View className={`px-2 py-1 rounded-full ${crisisStyle.bg} border ${crisisStyle.border} flex-row items-center`}>
            <Ionicons name={crisisStyle.icon} size={12} color={crisisStyle.text.replace('text-', '#')} />
            <Text className={`text-xs ml-1 ${crisisStyle.text} font-semibold`}>
              {conversation.crisisLevel === 'high' ? 'Urgent' : conversation.crisisLevel === 'medium' ? 'Attention' : 'Normal'}
            </Text>
          </View>
        )}
      </View>

      {/* Synthèse de la conversation */}
      <Text className="text-sm text-gray-900 font-medium mb-2" numberOfLines={2}>
        {conversation.summary || 'Discussion avec Julia'}
      </Text>

      {/* Mots-clés */}
      {keywords.length > 0 && (
        <View className="flex-row flex-wrap gap-1">
          {keywords.slice(0, 3).map((keyword, index) => (
            <View key={index} className="bg-primary-100 px-2 py-1 rounded-full">
              <Text className="text-xs text-primary-700">
                {keyword}
              </Text>
            </View>
          ))}
          {keywords.length > 3 && (
            <Text className="text-xs text-gray-500 self-center">
              +{keywords.length - 3}
            </Text>
          )}
        </View>
      )}

      {/* Nombre de messages */}
      <View className="flex-row items-center mt-2">
        <Ionicons name="chatbubble-outline" size={12} color="#9CA3AF" />
        <Text className="text-xs text-gray-500 ml-1">
          {conversation.messageCount || 0} messages
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ConversationCard;