import React, { useEffect } from 'react';
import { View, FlatList, Text, useWindowDimensions, TouchableOpacity } from 'react-native';
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
    <SafeAreaView className="flex-1" style={{ backgroundColor: '#FAFAFA' }} edges={['bottom']}>
      <View
        className="flex-1"
        style={
          isDesktop
            ? { alignSelf: 'center', width: '100%', maxWidth: 720 }
            : undefined
        }
      >
        {/* ========== HEADER ========== */}
        <View
          style={{
            paddingHorizontal: isDesktop ? 32 : 20,
            paddingVertical: isDesktop ? 24 : 20,
            backgroundColor: '#FFFFFF',
            borderBottomWidth: 1,
            borderBottomColor: '#EEECEB',
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
              <Text className="text-2xl font-bold" style={{ color: '#1A1A1A' }}>
                Mes conversations
              </Text>
              {isDesktop && (
                <Text className="text-sm mt-1" style={{ color: '#6B6B6B' }}>
                  Retrouvez l'historique de vos échanges avec Jul-IA
                </Text>
              )}
            </View>
            <View style={isDesktop ? { minWidth: 220 } : { marginTop: 16 }}>
              <TouchableOpacity
                onPress={handleNewConversation}
                activeOpacity={0.8}
                className="py-3 px-5 flex-row items-center justify-center"
                style={{
                  backgroundColor: '#5B9BD5',
                  borderRadius: 14,
                  shadowColor: '#5B9BD5',
                  shadowOffset: { width: 0, height: 3 },
                  shadowOpacity: 0.18,
                  shadowRadius: 10,
                  elevation: 3,
                }}
              >
                <Ionicons
                  name="add-circle-outline"
                  size={20}
                  color="white"
                />
                <Text className="text-white font-semibold ml-2">
                  Nouvelle conversation
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {conversations.length === 0 ? (
          /* ========== EMPTY STATE ========== */
          <View className="flex-1 justify-center items-center px-8">
            {/* patient-100 circle with chatbubbles icon */}
            <View
              className="items-center justify-center mb-5"
              style={{
                width: 88,
                height: 88,
                borderRadius: 44,
                backgroundColor: '#D4E4F5',
              }}
            >
              <Ionicons
                name="chatbubbles-outline"
                size={44}
                color="#5B9BD5"
              />
            </View>
            <Text className="text-xl font-bold mb-3 text-center" style={{ color: '#1A1A1A' }}>
              Aucune conversation
            </Text>
            <Text className="text-base text-center leading-5 mb-8" style={{ color: '#6B6B6B' }}>
              Commencez une nouvelle conversation avec Jul-IA pour partager vos pensées et émotions.
            </Text>
            <TouchableOpacity
              onPress={handleNewConversation}
              activeOpacity={0.8}
              className="py-3 px-6 flex-row items-center justify-center"
              style={{
                backgroundColor: '#5B9BD5',
                borderRadius: 14,
                shadowColor: '#5B9BD5',
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.18,
                shadowRadius: 10,
                elevation: 3,
              }}
            >
              <Ionicons name="add-circle-outline" size={20} color="white" />
              <Text className="text-white font-semibold ml-2">Nouvelle conversation</Text>
            </TouchableOpacity>
          </View>
        ) : (
          /* ========== CONVERSATION LIST ========== */
          <FlatList
            data={conversations}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 14,
                  marginBottom: 10,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.05,
                  shadowRadius: 6,
                  elevation: 2,
                  overflow: 'hidden',
                }}
              >
                <ConversationItem
                  conversation={item}
                  onPress={handleConversationPress}
                />
              </View>
            )}
            refreshing={loading}
            onRefresh={loadConversations}
            contentContainerStyle={{
              paddingHorizontal: isDesktop ? 32 : 16,
              paddingVertical: isDesktop ? 20 : 12,
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default ConversationHistoryScreen;
