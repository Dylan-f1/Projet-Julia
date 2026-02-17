import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Platform, KeyboardAvoidingView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MAX_LENGTH = 1000;

const ChatInput = ({ onSend, disabled }) => {
  const [message, setMessage] = useState('');
  const isWeb = Platform.OS === 'web';

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage('');
    }
  };

  const characterCount = message.length;
  const isNearLimit = characterCount > MAX_LENGTH * 0.85;
  const canSend = message.trim() && !disabled;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      <View
        className="bg-surface-100"
        style={{ paddingHorizontal: 16, paddingVertical: 12 }}
      >
        {/* Input wrapper — pill shape */}
        <View
          className="bg-white rounded-full border border-surface-200 flex-row items-end"
          style={{ minHeight: 48 }}
        >
          {/* TextInput */}
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Ecrivez votre message ici..."
            placeholderTextColor="#A0A0A0"
            multiline
            maxLength={MAX_LENGTH}
            editable={!disabled}
            onSubmitEditing={handleSend}
            returnKeyType="send"
            className="flex-1 text-base text-text-900"
            style={{
              paddingHorizontal: 16,
              paddingTop: 12,
              paddingBottom: 12,
              maxHeight: 100,
              borderWidth: 0,
            }}
          />

          {/* Send button — inside the pill */}
          <TouchableOpacity
            onPress={handleSend}
            disabled={!canSend}
            className={`items-center justify-center rounded-full mr-1 mb-1 ${
              canSend ? 'bg-patient-400' : 'bg-surface-200'
            }`}
            style={{ width: 44, height: 44 }}
            activeOpacity={0.7}
          >
            <Ionicons
              name="arrow-up"
              size={22}
              color={canSend ? 'white' : '#C8C4C0'}
            />
          </TouchableOpacity>
        </View>

        {/* Character counter — below the input */}
        {characterCount > 0 && (
          <View className="flex-row justify-end mt-1 mr-2">
            <Text
              className={`text-xs ${
                isNearLimit ? 'text-danger-400 font-medium' : 'text-text-300'
              }`}
            >
              {characterCount}/{MAX_LENGTH}
            </Text>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatInput;
