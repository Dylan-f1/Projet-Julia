import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Platform, KeyboardAvoidingView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ChatInput = ({ onSend, sending = false, placeholder = 'Écrivez votre message...' }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && !sending) {
      onSend(message);
      setMessage('');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <View className="bg-white border-t border-gray-200 px-4 py-3">
        <View className="flex-row items-center">
          <View className="flex-1 bg-gray-100 rounded-full px-4 py-2 mr-2">
            <TextInput
              value={message}
              onChangeText={setMessage}
              placeholder={placeholder}
              placeholderTextColor="#9CA3AF"
              multiline
              maxLength={1000}
              className="text-base text-gray-900 max-h-24"
              editable={!sending}
            />
          </View>
          
          <TouchableOpacity
            onPress={handleSend}
            disabled={!message.trim() || sending}
            className={`w-12 h-12 rounded-full items-center justify-center ${
              message.trim() && !sending ? 'bg-primary-600' : 'bg-gray-300'
            }`}
          >
            <Ionicons
              name={sending ? 'hourglass-outline' : 'send'}
              size={20}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatInput;
