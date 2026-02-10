import React, { useEffect } from 'react';
import { View, FlatList, Text, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ConversationItem from '../../components/chat/ConversationItem';
import Loading from '../../components/common/Loading';
import EmptyState from '../../components/common/EmptyState';
import Button from '../../components/common/Button';
import { useChat } from '../../contexts/ChatContext';

const ConversationHistoryScreen = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  const {
    conversations,
    loading,
    loadConversations,
    loadConversation,
    startNewConversation,
  } = useChat();

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
    <SafeAreaView className="flex-1 bg-gray-50" edges={['bottom']}>
      <View
        className="flex-1"
        style={
          isDesktop
            ? { alignSelf: 'center', width: '100%', maxWidth: 720 }
            : undefined
        }
      >
        {/* Header */}
        <View
          className="border-b border-gray-200"
          style={{
            paddingHorizontal: isDesktop ? 32 : 16,
            paddingVertical: isDesktop ? 24 : 16,
            backgroundColor: isDesktop ? '#fff' : undefined,
          }}
        >
          <View
            style={
              isDesktop
                ? {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }
                : undefined
            }
          >
            <View style={isDesktop ? { flex: 1 } : undefined}>
              <Text className="text-2xl font-bold text-gray-900">
                Mes conversations
              </Text>
              {isDesktop && (
                <Text className="text-sm text-gray-500 mt-1">
                  Retrouvez l'historique de vos échanges avec Julia
                </Text>
              )}
            </View>
            <View style={isDesktop ? { minWidth: 220 } : { marginTop: 12 }}>
              <Button
                title="Nouvelle conversation"
                onPress={handleNewConversation}
                variant="primary"
                icon={
                  <Ionicons
                    name="add-circle-outline"
                    size={20}
                    color="white"
                  />
                }
              />
            </View>
          </View>
        </View>

        {conversations.length === 0 ? (
          <EmptyState
            icon={
              <Ionicons
                name="chatbubbles-outline"
                size={80}
                color="#9CA3AF"
              />
            }
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
            contentContainerStyle={{
              paddingHorizontal: isDesktop ? 32 : 0,
              paddingVertical: isDesktop ? 16 : 0,
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default ConversationHistoryScreen;