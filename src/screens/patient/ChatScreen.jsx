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
              /* ========== MESSAGE D'INTRODUCTION AVEC 4 OPTIONS ========== */
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
