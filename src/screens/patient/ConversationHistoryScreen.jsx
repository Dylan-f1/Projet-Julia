import React, { useEffect } from 'react';
import { View, FlatList, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ConversationItem from '../../components/chat/ConversationItem';
import Loading from '../../components/common/Loading';
import EmptyState from '../../components/common/EmptyState';
import Button from '../../components/common/Button';
import { useChat } from '../../contexts/ChatContext';

const ConversationHistoryScreen = ({ navigation }) => {
  const { conversations, loading, loadConversations, loadConversation, startNewConversation } = useChat();

  useEffect(() => {
    loadConversations();
  }, []);

  const handleConversationPress = async (conversation) => {
    await loadConversation(conversation._id);
    navigation.navigate('Chat');
  };

  const handleNewConversation = () => {
    startNewConversation();
    navigation.navigate('Chat');
  };

  if (loading) {
    return <Loading message="Chargement de vos conversations..." />;
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['bottom']}>
      <View className="flex-1">
        {/* Header */}
        <View className="px-4 py-4 border-b border-gray-200">
          <Text className="text-2xl font-bold text-gray-900 mb-2">
            Mes conversations
          </Text>
          <Button
            title="Nouvelle conversation"
            onPress={handleNewConversation}
            variant="primary"
            icon={<Ionicons name="add-circle-outline" size={20} color="white" />}
          />
        </View>

        {conversations.length === 0 ? (
          <EmptyState
            icon={<Ionicons name="chatbubbles-outline" size={80} color="#9CA3AF" />}
            title="Aucune conversation"
            message="Commencez une nouvelle conversation avec Julia pour partager vos pensées et émotions."
            actionLabel="Nouvelle conversation"
            onAction={handleNewConversation}
          />
        ) : (
          <FlatList
            data={conversations}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <ConversationItem
                conversation={item}
                onPress={handleConversationPress}
              />
            )}
            refreshing={loading}
            onRefresh={loadConversations}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default ConversationHistoryScreen;
