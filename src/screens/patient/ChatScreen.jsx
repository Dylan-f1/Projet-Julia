import React, { useEffect, useRef } from 'react';
import { View, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MessageBubble from '../../components/chat/MessageBubble';
import ChatInput from '../../components/chat/ChatInput';
import Loading from '../../components/common/Loading';
import EmptyState from '../../components/common/EmptyState';
import { useChat } from '../../contexts/ChatContext';
import { Ionicons } from '@expo/vector-icons';

const ChatScreen = () => {
  const { messages = [], sending, sendMessage, loading } = useChat(); // ✅ Valeur par défaut []
  const flatListRef = useRef(null);

  useEffect(() => {
    // Scroll vers le bas quand de nouveaux messages arrivent
    if (messages && messages.length > 0 && flatListRef.current) { // ✅ Vérifie que messages existe
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const handleSend = async (message) => {
    await sendMessage(message);
  };

  if (loading && (!messages || messages.length === 0)) { // ✅ Vérifie que messages existe
    return <Loading message="Chargement de la conversation..." />;
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['bottom']}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        {!messages || messages.length === 0 ? ( // ✅ Vérifie que messages existe
          <EmptyState
            icon={<Ionicons name="chatbubbles-outline" size={80} color="#9CA3AF" />}
            title="Commencez une conversation"
            message="Julia est là pour vous écouter et vous accompagner. N'hésitez pas à partager ce que vous ressentez."
          />
        ) : (
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item, index) => item._id || index.toString()}
            renderItem={({ item }) => (
              <MessageBubble
                message={item}
                isUser={item.role === 'user'}
              />
            )}
            contentContainerStyle={{ padding: 16, paddingBottom: 8 }}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          />
        )}

        <ChatInput
          onSend={handleSend}
          sending={sending}
          placeholder="Partagez ce que vous ressentez..."
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;