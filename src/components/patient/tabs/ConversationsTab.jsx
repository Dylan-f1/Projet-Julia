import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ConversationsTab = ({ conversations = [], onViewConversation }) => {
  const isWeb = Platform.OS === 'web';
  const safeConversations = Array.isArray(conversations) ? conversations : [];

  if (safeConversations.length === 0) {
    return (
      <View className="p-4">
        <View className="bg-white rounded-xl p-8 items-center border border-surface-200">
          <View className="w-14 h-14 bg-patient-50 rounded-full items-center justify-center mb-3">
            <Ionicons name="chatbubbles-outline" size={28} color="#5B9BD5" />
          </View>
          <Text className="text-text-300 text-center">
            Aucune conversation pour le moment
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View className="p-4">
      <View className={isWeb ? 'flex-row flex-wrap gap-3' : ''}>
        {safeConversations.map((conv) => (
          <View
            key={conv._id}
            className={isWeb ? 'flex-1 min-w-[300px] mb-3' : 'mb-3'}
          >
            <TouchableOpacity
              onPress={() => onViewConversation(conv)}
              activeOpacity={0.7}
              className="bg-white rounded-xl p-4 border border-surface-200"
            >
              <View className="flex-row justify-between items-start mb-2">
                <View className="flex-row items-center flex-1 mr-2">
                  <View className="w-8 h-8 bg-patient-50 rounded-full items-center justify-center mr-3">
                    <Ionicons name="chatbubble-outline" size={16} color="#5B9BD5" />
                  </View>
                  <Text className="text-base font-semibold text-text-900 flex-1">
                    {typeof conv.summary === 'string'
                      ? conv.summary
                      : conv.summary?.mainConcern || 'Conversation'}
                  </Text>
                </View>
                <Text className="text-xs text-text-300">
                  {new Date(conv.updatedAt).toLocaleDateString('fr-FR')}
                </Text>
              </View>
              <View className="flex-row items-center ml-11">
                <Ionicons name="chatbubbles-outline" size={14} color="#A0A0A0" />
                <Text className="text-sm text-text-300 ml-1.5">
                  {conv.messages?.length || 0} messages
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

export default ConversationsTab;
