// src/screens/patient/ChatScreen.jsx
import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, Platform, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import ChatBubble from '../../components/chat/ChatBubble';
import ChatInput from '../../components/chat/ChatInput';
import TypingIndicator from '../../components/chat/TypingIndicator';
import ConversationCard from '../../components/chat/ConversationCard';
import WelcomeOptions from '../../components/chat/WelcomeOptions';

import { useChat } from '../../contexts/ChatContext';

// Messages d'amorce pour chaque option
const OPTION_MESSAGES = {
  chat: 'Bonjour Jul-IA, j\'aimerais discuter.',
  appointment: 'J\'aimerais prendre ou modifier un rendez-vous avec mon psychologue.',
  actions: 'Quelles sont les actions recommandées pour moi aujourd\'hui ?',
};

const ChatScreen = () => {
  const router = useRouter();

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

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  const handleSendMessage = async (content) => {
    if (!content.trim()) return;
    await sendMessage(content);
    scrollToBottom();
  };

  const handleSelectConversation = (conversationId) => {
    setActiveConversation(conversationId);
  };

  const handleNewConversation = () => {
    startNewConversation();
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 150);
  };

  // Gestion des options du message d'introduction
  const handleWelcomeOption = async (optionId) => {
    const starterMessage = OPTION_MESSAGES[optionId];
    if (starterMessage) {
      await sendMessage(starterMessage);
      scrollToBottom();
    }
    // L'option "emergency" est gérée directement dans WelcomeOptions
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: '#FAFAFA' }}>
      {/* Centrage max-width desktop */}
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          maxWidth: isWeb ? 1100 : undefined,
          width: '100%',
          alignSelf: isWeb ? 'center' : undefined,
          borderLeftWidth: isWeb ? 1 : 0,
          borderRightWidth: isWeb ? 1 : 0,
          borderColor: '#EEECEB',
        }}
      >

        {/* ========== SIDEBAR (Web only) ========== */}
        {isWeb && (
          <View
            style={{
              width: 300,
              borderRightWidth: 1,
              borderRightColor: '#EEECEB',
              backgroundColor: '#FFFFFF',
              flexShrink: 0,
            }}
          >
            {/* Header sidebar */}
            <View
              style={{
                padding: 20,
                borderBottomWidth: 1,
                borderBottomColor: '#EEECEB',
                backgroundColor: '#FEF4F3',
              }}
            >
              {/* Logo Jul-IA */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                <View
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                    backgroundColor: '#F0A8A0',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 10,
                  }}
                >
                  <Ionicons name="sparkles" size={18} color="#FFFFFF" />
                </View>
                <View>
                  <Text style={{ fontSize: 16, fontWeight: '700', color: '#1A1A1A' }}>Jul-IA</Text>
                  <Text style={{ fontSize: 11, color: '#A0A0A0' }}>Vos conversations</Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={handleNewConversation}
                style={{
                  backgroundColor: '#5B9BD5',
                  borderRadius: 12,
                  paddingVertical: 11,
                  paddingHorizontal: 16,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Ionicons name="add" size={20} color="white" />
                <Text style={{ color: '#FFFFFF', fontWeight: '600', marginLeft: 8, fontSize: 14 }}>
                  Nouvelle discussion
                </Text>
              </TouchableOpacity>
            </View>

            {/* Conversation list */}
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
              {conversations.length === 0 ? (
                <View style={{ padding: 24, alignItems: 'center' }}>
                  <Ionicons name="chatbubbles-outline" size={40} color="#C8C4C0" />
                  <Text style={{ color: '#A0A0A0', marginTop: 12, textAlign: 'center', fontSize: 13 }}>
                    Aucune conversation pour l'instant
                  </Text>
                </View>
              ) : (
                conversations.map(conv => {
                  const isActive = conv._id === activeConversation;
                  return (
                    <TouchableOpacity
                      key={conv._id}
                      onPress={() => handleSelectConversation(conv._id)}
                      activeOpacity={0.7}
                      style={{
                        backgroundColor: isActive ? '#EEF4FB' : 'transparent',
                        borderRadius: 0,
                        borderBottomWidth: 1,
                        borderBottomColor: '#F5F5F4',
                      }}
                    >
                      <ConversationCard
                        conversation={conv}
                        isActive={isActive}
                        onPress={() => handleSelectConversation(conv._id)}
                      />
                    </TouchableOpacity>
                  );
                })
              )}
            </ScrollView>
          </View>
        )}

        {/* ========== MAIN CHAT AREA ========== */}
        <View style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
          {/* Header chat */}
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 14,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              borderBottomWidth: 1,
              borderBottomColor: '#EEECEB',
            }}
          >
            {/* Avatar Jul-IA */}
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: '#F0A8A0',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 12,
              }}
            >
              <Ionicons name="sparkles" size={20} color="#FFFFFF" />
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 17, fontWeight: '700', color: '#1A1A1A', marginRight: 8 }}>Jul-IA</Text>
                <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#4CAF82' }} />
              </View>
              <Text style={{ fontSize: 13, color: '#6B6B6B' }}>Toujours là pour vous écouter</Text>
            </View>
            {/* Bouton nouvelle conversation (mobile) */}
            {!isWeb && (
              <TouchableOpacity
                onPress={handleNewConversation}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  backgroundColor: '#EEF4FB',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Ionicons name="add" size={22} color="#5B9BD5" />
              </TouchableOpacity>
            )}
          </View>

          {/* Zone messages */}
          <ScrollView
            ref={scrollViewRef}
            style={{ flex: 1, backgroundColor: '#FAFAFA' }}
            contentContainerStyle={{ paddingHorizontal: isWeb ? 24 : 16, paddingVertical: 16 }}
            showsVerticalScrollIndicator={false}
          >
            {loading ? (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 80 }}>
                <ActivityIndicator size="large" color="#5B9BD5" />
              </View>
            ) : messages.length === 0 ? (
              <WelcomeOptions onSelectOption={handleWelcomeOption} />
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

          {/* Input area */}
          <View
            style={{
              backgroundColor: '#FFFFFF',
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
