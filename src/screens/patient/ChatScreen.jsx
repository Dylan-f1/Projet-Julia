// src/screens/patient/ChatScreen.jsx
import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, Platform, ActivityIndicator, Text , TouchableOpacity } from 'react-native';
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

    // ✅ Si pas de conversation active, en créer une avec le premier message
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

    // ✅ Sinon, envoyer le message dans la conversation active
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
    <SafeAreaView className="flex-1 bg-white">
      <View className={`flex-1 ${isWeb ? 'flex-row' : ''}`}>
        
        {/* 🔥 SIDEBAR GAUCHE (Desktop) */}
        {isWeb && showSidebar && (
          <View className="w-80 border-r border-gray-200 bg-gray-50">
            {/* Header sidebar */}
            <View className="p-4 border-b border-gray-200 bg-white">
              <Text className="text-lg font-bold text-gray-900 mb-2">
                Mes conversations
              </Text>
              <TouchableOpacity
                onPress={handleNewConversation}
                className="bg-primary-600 rounded-lg py-2 px-4 flex-row items-center justify-center"
              >
                <Ionicons name="add" size={20} color="white" />
                <Text className="text-white font-semibold ml-2">
                  Nouvelle discussion
                </Text>
              </TouchableOpacity>
            </View>

            {/* Liste des conversations */}
            <ScrollView className="flex-1">
              {conversations.map(conv => (
                <ConversationCard
                  key={conv._id}
                  conversation={conv}
                  isActive={conv._id === activeConversation}
                  onPress={() => handleSelectConversation(conv._id)}
                />
              ))}
            </ScrollView>
          </View>
        )}

        {/* 🔥 ZONE DE CHAT PRINCIPALE */}
        <View className="flex-1">
          {/* Header chat */}
          <View className="bg-white px-4 py-4 border-b border-gray-200 flex-row items-center">
            <View className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full items-center justify-center mr-3">
              <Ionicons name="sparkles" size={20} color="white" />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-bold text-gray-900">Jul-IA</Text>
              <Text className="text-sm text-gray-500">Toujours là pour vous écouter</Text>
            </View>
          </View>

          {/* Messages */}
          <ScrollView
            ref={scrollViewRef}
            className="flex-1 px-4 py-4 bg-gray-50"
            showsVerticalScrollIndicator={false}
          >
            {loading ? (
              <View className="flex-1 justify-center items-center py-20">
                <ActivityIndicator size="large" color="#0284c7" />
              </View>
            ) : messages.length === 0 ? (
              <View className="flex-1 justify-center items-center py-20">
                <View className="w-20 h-20 bg-primary-100 rounded-full items-center justify-center mb-4">
                  <Ionicons name="chatbubbles" size={40} color="#0284c7" />
                </View>
                <Text className="text-lg font-semibold text-gray-900 mb-2">
                  Bienvenue !
                </Text>
                <Text className="text-gray-600 text-center px-6">
                  Je suis Jul-IA, votre compagnon d'écoute disponible 24/7.
                  {'\n'}Comment puis-je vous aider aujourd'hui ?
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
                {isTyping && <TypingIndicator />}
              </>
            )}
          </ScrollView>

          <ChatInput onSend={handleSendMessage} disabled={isTyping} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;