import React from 'react';
import { View, Text, Platform } from 'react-native';
import Card from '../../common/Card';

const ConversationsTab = ({ conversations = [], onViewConversation }) => {
  const isWeb = Platform.OS === 'web';
  const safeConversations = Array.isArray(conversations) ? conversations : [];

  if (safeConversations.length === 0) {
    return (
      <View className="p-4">
        <Card>
          <Text className="text-gray-600 text-center">
            Aucune conversation pour le moment
          </Text>
        </Card>
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
            <Card onPress={() => onViewConversation(conv)}>
              <View className="flex-row justify-between items-start mb-2">
                <Text className="text-base font-semibold text-gray-900 flex-1">
                  {conv.summary || 'Conversation'}
                </Text>
                <Text className="text-xs text-gray-500 ml-2">
                  {new Date(conv.updatedAt).toLocaleDateString('fr-FR')}
                </Text>
              </View>
              <Text className="text-sm text-gray-600">
                {conv.messages?.length || 0} messages
              </Text>
            </Card>
          </View>
        ))}
      </View>
    </View>
  );
};

export default ConversationsTab;