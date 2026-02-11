import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import MessageBubble from '../../components/chat/MessageBubble';
import Loading from '../../components/common/Loading';
import chatService from '../../services/chatService';

const ConversationDetailScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const conversationId = id;
  
  const [conversation, setConversation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (conversationId) {
      loadConversation();
    }
  }, [conversationId]);

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

  const isWeb = Platform.OS === 'web';

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Conteneur responsive */}
      <View className={`flex-1 ${isWeb ? 'max-w-4xl mx-auto w-full' : ''}`}>
        {/* Header */}
        <View className="bg-white px-4 py-4 border-b border-gray-200">
          <View className="flex-row items-center">
            {/* Bouton retour sur mobile uniquement */}
            {!isWeb && (
              <TouchableOpacity onPress={() => router.back()} className="mr-3">
                <Ionicons name="arrow-back" size={24} color="#1F2937" />
              </TouchableOpacity>
            )}
            
            <View className="flex-1">
              <Text className="text-lg font-semibold text-gray-900">
                {conversation.summary || 'Conversation'}
              </Text>
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

            <View className="bg-secondary-100 px-3 py-1 rounded-full">
              <Text className="text-secondary-700 text-xs font-semibold">
                LECTURE SEULE
              </Text>
            </View>
          </View>
        </View>

        {/* Messages - Zone scrollable avec hauteur fixe sur web */}
        <View className={`flex-1 ${isWeb ? 'overflow-y-auto' : ''}`}>
          <FlatList
            data={conversation.messages || []}
            keyExtractor={(item, index) => item._id || index.toString()}
            renderItem={({ item }) => (
              <MessageBubble message={item} isUser={item.role === 'user'} />
            )}
            contentContainerStyle={{ padding: 16 }}
            showsVerticalScrollIndicator={!isWeb}
          />
        </View>

        {/* Info footer */}
        <View className="bg-gray-50 px-4 py-3 border-t border-gray-200">
          <View className="flex-row items-center">
            <Ionicons name="information-circle-outline" size={16} color="#6B7280" />
            <Text className="text-xs text-gray-600 ml-2 flex-1">
              Cette conversation est en lecture seule. Le patient peut continuer à échanger avec Jul-IA .
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ConversationDetailScreen;