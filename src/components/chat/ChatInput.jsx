// src/components/chat/ChatInput.jsx
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Platform, KeyboardAvoidingView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ChatInput = ({ onSend, disabled }) => {
  const [message, setMessage] = useState('');
  const isWeb = Platform.OS === 'web';

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage('');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      <View className="bg-white border-t border-gray-200 px-4 py-3">
        <View className="flex-row items-end gap-2">
          {/* Input */}
          <View className="flex-1 bg-gray-100 rounded-3xl px-4 py-2 min-h-[44px] justify-center">
            <TextInput
              value={message}
              onChangeText={setMessage}
              placeholder="Envoyer un message..."
              placeholderTextColor="#9CA3AF"
              multiline
              maxLength={1000}
              editable={!disabled}
              onSubmitEditing={handleSend}
              returnKeyType="send"
              className="text-base text-gray-900"
              style={{ maxHeight: 100 }}
            />
          </View>

          {/* Bouton envoyer */}
          <TouchableOpacity
            onPress={handleSend}
            disabled={!message.trim() || disabled}
            className={`w-11 h-11 rounded-full items-center justify-center ${
              message.trim() && !disabled
                ? 'bg-primary-600'
                : 'bg-gray-300'
            }`}
            activeOpacity={0.7}
          >
            <Ionicons
              name="arrow-up"
              size={24}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatInput;