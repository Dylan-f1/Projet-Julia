import React, { useEffect, useRef } from 'react';
import {
  View,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MessageBubble from '../../components/chat/MessageBubble';
import ChatInput from '../../components/chat/ChatInput';
import Loading from '../../components/common/Loading';
import EmptyState from '../../components/common/EmptyState';
import { useChat } from '../../contexts/ChatContext';
import { Ionicons } from '@expo/vector-icons';

const ChatScreen = () => {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  const { messages = [], sending, sendMessage, loading } = useChat();
  const flatListRef = useRef(null);

  useEffect(() => {
    if (messages && messages.length > 0 && flatListRef.current) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const handleSend = async (message) => {
    await sendMessage(message);
  };

  if (loading && (!messages || messages.length === 0)) {
    return <Loading message="Chargement de la conversation..." />;
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['bottom']}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        {/* Container centré en desktop */}
        <View
          className="flex-1"
          style={
            isDesktop
              ? { alignSelf: 'center', width: '100%', maxWidth: 760 }
              : undefined
          }
        >
          {!messages || messages.length === 0 ? (
            <EmptyState
              icon={
                <Ionicons
                  name="chatbubbles-outline"
                  size={80}
                  color="#9CA3AF"
                />
              }
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
              contentContainerStyle={{
                padding: isDesktop ? 24 : 16,
                paddingBottom: 8,
              }}
              onContentSizeChange={() =>
                flatListRef.current?.scrollToEnd({ animated: true })
              }
            />
          )}

          {/* Input zone — bordure top + fond blanc en desktop */}
          <View
            style={
              isDesktop
                ? {
                    borderTopWidth: 1,
                    borderTopColor: '#e5e7eb',
                    backgroundColor: '#fff',
                    borderBottomLeftRadius: 16,
                    borderBottomRightRadius: 16,
                    paddingHorizontal: 8,
                  }
                : undefined
            }
          >
            <ChatInput
              onSend={handleSend}
              sending={sending}
              placeholder="Partagez ce que vous ressentez..."
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;