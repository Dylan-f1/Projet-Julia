import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';

interface ChatInputProps {
  onSend: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSend,
  placeholder = 'Écrivez votre message...',
  disabled = false,
}) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage('');
    }
  };

  return (
    <View className="flex-row items-end px-4 py-3 bg-white border-t border-[#E8E3DC]">
      <View className="flex-1 mr-2">
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder={placeholder}
          placeholderTextColor="#C7C2B8"
          multiline
          maxLength={2000}
          editable={!disabled}
          className="bg-[#FFF8F3] rounded-2xl px-4 py-3 max-h-[120px] text-base text-[#2C2318]"
          style={{ minHeight: 44 }}
        />
      </View>

      <TouchableOpacity
        onPress={handleSend}
        disabled={!message.trim() || disabled}
        className={`w-12 h-12 rounded-full items-center justify-center ${
          message.trim() && !disabled ? 'bg-[#F87142]' : 'bg-gray-200'
        }`}
        activeOpacity={0.7}
      >
        <Text className="text-2xl">
          {message.trim() && !disabled ? '↑' : '↑'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChatInput;