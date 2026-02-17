import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ConversationCard = ({ conversation, isActive, onPress }) => {
  const isWeb = Platform.OS === 'web';

  const getKeywords = (conv) => {
    if (conv.summary?.keywords && Array.isArray(conv.summary.keywords)) {
      return conv.summary.keywords;
    }
    if (Array.isArray(conv.keywords)) {
      return conv.keywords;
    }
    if (conv.analysis?.keywords && Array.isArray(conv.analysis.keywords)) {
      return conv.analysis.keywords;
    }
    return [];
  };

  const keywords = getKeywords(conversation);

  const getCrisisDotColor = (level) => {
    switch (level) {
      case 'high':
        return '#E05B5B'; 
      case 'medium':
        return '#E8A838';
      case 'low':
        return '#4CAF82'; 
      default:
        return null;
    }
  };

  const crisisDotColor = getCrisisDotColor(conversation.crisisLevel);

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`bg-white rounded-xl border border-surface-200 ${
        isActive ? 'bg-patient-50' : ''
      }`}
      style={{
        padding: 14,
        marginBottom: 8,
        borderLeftWidth: 4,
        borderLeftColor: isActive ? '#5B9BD5' : 'transparent', 
      }}
      activeOpacity={0.7}
    >
      {/* Header: date + crisis dot */}
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-xs text-text-300 font-medium">
          {new Date(conversation.createdAt).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>

        {crisisDotColor && (
          <View
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: crisisDotColor,
            }}
          />
        )}
      </View>

      {/* Conversation summary */}
      <Text className="text-sm text-text-700 font-medium mb-2 leading-5" numberOfLines={2}>
        {typeof conversation.summary === 'string'
          ? conversation.summary
          : conversation.summary?.text ||
            conversation.summary?.content ||
            'Discussion avec Julia'}
      </Text>

      {/* Keywords */}
      {keywords.length > 0 && (
        <View className="flex-row flex-wrap gap-1.5 mb-2">
          {keywords.slice(0, 3).map((keyword, index) => (
            <View
              key={index}
              className="bg-surface-100 border border-surface-200 px-2.5 py-1 rounded-full"
            >
              <Text className="text-xs text-text-500 font-medium">{keyword}</Text>
            </View>
          ))}
          {keywords.length > 3 && (
            <Text className="text-xs text-text-300 self-center ml-0.5">
              +{keywords.length - 3}
            </Text>
          )}
        </View>
      )}

      {/* Message count */}
      <View className="flex-row items-center">
        <Ionicons name="chatbubble-outline" size={13} color="#A0A0A0" />
        <Text className="text-xs text-text-300 ml-1.5 font-medium">
          {conversation.messageCount || 0} messages
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ConversationCard;
