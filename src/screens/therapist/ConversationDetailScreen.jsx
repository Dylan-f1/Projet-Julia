import React, { useEffect, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import MessageBubble from '../../components/chat/MessageBubble';
import Loading from '../../components/common/Loading';
import chatService from '../../services/chatService';

const ConversationDetailScreen = ({ route }) => {
  const router = useRouter();
  const { conversationId } = route.params;
  const [conversation, setConversation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadConversation();
  }, []);

  const loadConversation = async () => {
    setLoading(true);
    const result = await chatService.getConversation(conversationId);
    setLoading(false);

    if (result.success) {
      setConversation(result.data);
    }
  };

  if (loading) {
    return <Loading message="Chargement de la conversation..." />;
  }

  if (!conversation) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <Ionicons name="chatbubbles-outline" size={80} color="#9CA3AF" />
        <Text className="text-gray-600 mt-4">Conversation introuvable</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-white px-4 py-4 border-b border-gray-200">
        <View className="flex-row items-center">
          <Text className="text-lg font-semibold text-gray-900 flex-1">
            {conversation.summary || 'Conversation'}
          </Text>
          <View className="bg-secondary-100 px-3 py-1 rounded-full">
            <Text className="text-secondary-700 text-xs font-semibold">
              LECTURE SEULE
            </Text>
          </View>
        </View>
        <Text className="text-sm text-gray-600 mt-1">
          {new Date(conversation.createdAt).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </View>

      {/* Messages */}
      <FlatList
        data={conversation.messages || []}
        keyExtractor={(item, index) => item._id || index.toString()}
        renderItem={({ item }) => (
          <MessageBubble message={item} isUser={item.role === 'user'} />
        )}
        contentContainerStyle={{ padding: 16 }}
      />

      {/* Info footer */}
      <View className="bg-gray-50 px-4 py-3 border-t border-gray-200">
        <View className="flex-row items-center">
          <Ionicons name="information-circle-outline" size={16} color="#6B7280" />
          <Text className="text-xs text-gray-600 ml-2">
            Cette conversation est en lecture seule. Le patient peut continuer à échanger avec Julia.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ConversationDetailScreen;
