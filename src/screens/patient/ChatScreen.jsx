// src/screens/patient/ChatScreen.jsx
import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, Platform, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import ChatBubble from '../../components/chat/ChatBubble';
import ChatInput from '../../components/chat/ChatInput';
import TypingIndicator from '../../components/chat/TypingIndicator';
import ConversationCard from '../../components/chat/ConversationCard';

import chatService from '../../services/chatService';
import { useChat } from '../../contexts/ChatContext';

const ChatScreen = () => {
  const { activeConversation, setActiveConversation } = useChat();
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  const scrollViewRef = useRef(null);
  const isWeb = Platform.OS === 'web';

  useEffect(() => {
    loadConversations();
    if (activeConversation) {
      loadMessages(activeConversation);
    }
  }, []);

  const loadConversations = async () => {
    console.log('📂 Chargement des conversations...');
    const result = await chatService.getMyConversations();
    console.log('📂 Résultat:', result);

    if (result.success) {
      const convArray = result.data?.conversation
        ? [result.data.conversation]
        : Array.isArray(result.data)
          ? result.data
          : [];

      console.log('📂 Conversations:', convArray);
      setConversations(convArray);

      if (convArray.length > 0 && !activeConversation) {
        console.log('📂 Sélection conversation active:', convArray[0]._id);
        setActiveConversation(convArray[0]._id);
        loadMessages(convArray[0]._id);
      }
    }
  };

  const loadMessages = async (conversationId) => {
    console.log('💬 Chargement messages pour:', conversationId);
    setLoading(true);
    const result = await chatService.getMessages(conversationId);
    console.log('💬 Résultat:', result);

    if (result.success) {
      const msgArray = Array.isArray(result.data)
        ? result.data
        : result.data?.messages || [];
      console.log('💬 Messages:', msgArray);
      setMessages(msgArray);
      setTimeout(() => scrollToBottom(), 100);
    }
    setLoading(false);
  };

  const handleSendMessage = async (content) => {
    if (!content.trim()) return;

    console.log('📤 Envoi message:', content);
    console.log('📤 Conversation active:', activeConversation);

    // Si pas de conversation active, en creer une avec le premier message
    if (!activeConversation) {
      console.log('📝 Création nouvelle conversation avec premier message');

      setIsTyping(true);
      const createResult = await chatService.createConversation(content);
      setIsTyping(false);

      console.log('📝 Résultat création:', createResult);

      if (createResult.success) {
        const newConv = createResult.data.conversation || createResult.data;
        console.log('✅ Conversation créée:', newConv);

        setActiveConversation(newConv._id);
        setMessages(newConv.messages || []);
        loadConversations();
        scrollToBottom();
      } else {
        console.error('❌ Erreur création conversation:', createResult.error);
      }
      return;
    }

    // Sinon, envoyer le message dans la conversation active
    const userMessage = {
      _id: Date.now().toString(),
      content,
      sender: 'patient',
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    scrollToBottom();

    setIsTyping(true);

    console.log('📤 Envoi vers conversation:', activeConversation);
    const result = await chatService.sendMessage(activeConversation, content);

    setIsTyping(false);

    console.log('📤 Résultat envoi:', result);

    if (result.success) {
      const aiMessage = result.data.message || result.data;
      console.log('✅ Message AI reçu:', aiMessage);
      setMessages(prev => [...prev, aiMessage]);
      scrollToBottom();
      loadConversations();
    } else {
      console.error('❌ Erreur envoi message:', result.error);
    }
  };

  const handleSelectConversation = (conversationId) => {
    setActiveConversation(conversationId);
    loadMessages(conversationId);
  };

  const handleNewConversation = async () => {
    console.log('🆕 Nouvelle conversation');
    const result = await chatService.createConversation('Bonjour');

    if (result.success) {
      const newConv = result.data.conversation || result.data;
      setActiveConversation(newConv._id);
      setMessages(newConv.messages || []);
      loadConversations();
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
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
                      borderLeftWidth: isActive ? 4 : 4,
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
                {/* CTA button */}
                <TouchableOpacity
                  onPress={() => {}}
                  activeOpacity={0.8}
                  className="py-3 px-6"
                  style={{
                    backgroundColor: '#5B9BD5',
                    borderRadius: 14,
                  }}
                >
                  <Text className="text-white font-semibold text-base">
                    Commencer une discussion
                  </Text>
                </TouchableOpacity>
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
                {isTyping && <TypingIndicator />}
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
            <ChatInput onSend={handleSendMessage} disabled={isTyping} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;
