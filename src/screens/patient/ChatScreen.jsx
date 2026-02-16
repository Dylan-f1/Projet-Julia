// src/screens/patient/ChatScreen.jsx
import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, Platform, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import ChatBubble from '../../components/chat/ChatBubble';
import ChatInput from '../../components/chat/ChatInput';
import TypingIndicator from '../../components/chat/TypingIndicator';
import ConversationCard from '../../components/chat/ConversationCard';

import { useChat } from '../../contexts/ChatContext';

const ChatScreen = () => {
  // Utiliser le ChatContext comme source de vérité unique
  const {
    conversations,
    currentConversation,
    messages,
    loading,
    sending,
    loadConversations,
    sendMessage,
    startNewConversation,
    activeConversation,
    setActiveConversation,
  } = useChat();

  const [showSidebar, setShowSidebar] = useState(true);
  const scrollViewRef = useRef(null);
  const isWeb = Platform.OS === 'web';

  useEffect(() => {
    loadConversations();
  }, []);

  // Auto-scroll quand les messages changent
  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  const handleSendMessage = async (content) => {
    if (!content.trim()) return;

    console.log('📤 Envoi message:', content);

    // sendMessage du contexte gère tout :
    // - Création de conversation si besoin
    // - Optimistic update
    // - Appel API avec le bon conversationId
    // - Mise à jour des messages avec la réponse IA
    await sendMessage(content);
    scrollToBottom();
  };

  const handleSelectConversation = (conversationId) => {
    setActiveConversation(conversationId);
  };

  const handleNewConversation = () => {
    console.log('🆕 Nouvelle conversation');
    startNewConversation();
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 150);
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: '#FAFAFA' }}>
      <View className={`flex-1 ${isWeb ? 'flex-row' : ''}`}>

        {/* ========== SIDEBAR (Web only) ========== */}
        {isWeb && showSidebar && (
          <View
            className="w-80"
            style={{
              borderRightWidth: 1,
              borderRightColor: '#EEECEB',
              backgroundColor: '#FAFAFA',
            }}
          >
            {/* Header sidebar */}
            <View
              className="p-5"
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#EEECEB',
              }}
            >
              <Text className="text-lg font-bold mb-3" style={{ color: '#1A1A1A' }}>
                Mes conversations
              </Text>
              <TouchableOpacity
                onPress={handleNewConversation}
                className="py-3 px-4 flex-row items-center justify-center"
                style={{
                  backgroundColor: '#5B9BD5',
                  borderRadius: 14,
                }}
              >
                <Ionicons name="add" size={20} color="white" />
                <Text className="text-white font-semibold ml-2">
                  Nouvelle discussion
                </Text>
              </TouchableOpacity>
            </View>

            {/* Conversation list */}
            <ScrollView className="flex-1 p-2">
              {conversations.map(conv => {
                const isActive = conv._id === activeConversation;
                return (
                  <TouchableOpacity
                    key={conv._id}
                    onPress={() => handleSelectConversation(conv._id)}
                    activeOpacity={0.7}
                    style={{
                      borderLeftWidth: 4,
                      borderLeftColor: isActive ? '#5B9BD5' : 'transparent',
                      backgroundColor: isActive ? '#EEF4FB' : 'transparent',
                      borderRadius: 8,
                      marginBottom: 4,
                    }}
                  >
                    <ConversationCard
                      conversation={conv}
                      isActive={isActive}
                      onPress={() => handleSelectConversation(conv._id)}
                    />
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        )}

        {/* ========== MAIN CHAT AREA ========== */}
        <View className="flex-1">
          {/* Header */}
          <View
            className="px-5 py-4 flex-row items-center"
            style={{
              backgroundColor: '#FFFFFF',
              borderBottomWidth: 1,
              borderBottomColor: '#EEECEB',
            }}
          >
            {/* Avatar */}
            <View
              className="items-center justify-center mr-3"
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: '#F0A8A0',
              }}
            >
              <Ionicons name="sparkles" size={18} color="#FFFFFF" />
            </View>
            <View className="flex-1">
              <View className="flex-row items-center">
                <Text className="text-lg font-bold mr-2" style={{ color: '#1A1A1A' }}>Jul-IA</Text>
                {/* Green online dot */}
                <View
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: '#4CAF82',
                  }}
                />
              </View>
              <Text className="text-sm" style={{ color: '#6B6B6B' }}>Toujours là pour vous écouter</Text>
            </View>
          </View>

          {/* Messages area */}
          <ScrollView
            ref={scrollViewRef}
            className="flex-1 px-4 py-4"
            style={{ backgroundColor: '#FAFAFA' }}
            showsVerticalScrollIndicator={false}
          >
            {loading ? (
              <View className="flex-1 justify-center items-center py-20">
                <ActivityIndicator size="large" color="#5B9BD5" />
              </View>
            ) : messages.length === 0 ? (
              /* ========== EMPTY STATE ========== */
              <View className="flex-1 justify-center items-center py-20">
                {/* Large 80px ai-400 circle with heart */}
                <View
                  className="items-center justify-center mb-6"
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 40,
                    backgroundColor: '#F0A8A0',
                  }}
                >
                  <Ionicons name="heart" size={40} color="#FFFFFF" />
                </View>
                <Text className="text-xl font-bold mb-2" style={{ color: '#1A1A1A' }}>
                  Bienvenue !
                </Text>
                <Text className="text-center px-8 leading-5 mb-6" style={{ color: '#6B6B6B' }}>
                  Je suis Jul-IA, votre compagnon d'écoute disponible 24/7.
                  {'\n'}Comment puis-je vous aider aujourd'hui ?
                </Text>
                <Text className="text-sm text-center px-12" style={{ color: '#A0A0A0' }}>
                  Tapez votre message ci-dessous pour commencer
                </Text>
              </View>
            ) : (
              <>
                {messages.map((msg, index) => (
                  <ChatBubble
                    key={msg._id || index}
                    message={msg}
                    isUser={msg.sender === 'patient'}
                  />
                ))}
                {sending && <TypingIndicator />}
              </>
            )}
          </ScrollView>

          {/* ========== INPUT AREA ========== */}
          <View
            style={{
              backgroundColor: '#F5F5F4',
              borderTopWidth: 1,
              borderTopColor: '#EEECEB',
            }}
          >
            <ChatInput onSend={handleSendMessage} disabled={sending} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;
