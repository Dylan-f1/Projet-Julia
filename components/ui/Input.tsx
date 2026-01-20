import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  multiline?: boolean;
  numberOfLines?: number;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  multiline = false,
  numberOfLines = 1,
  disabled = false,
  leftIcon,
  rightIcon,
  onRightIconPress,
  className = '',
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const containerStyles = `${className}`;
  
  const inputContainerStyles = `
    flex-row items-center rounded-xl px-4 py-3 border-2
    ${error ? 'border-[#C17B6F]' : isFocused ? 'border-[#F87142]' : 'border-[#E8E3DC]'}
    ${disabled ? 'bg-gray-50' : 'bg-white'}
  `;

  const inputStyles = `
    flex-1 text-base text-[#2C2318]
    ${multiline ? 'min-h-[100px]' : ''}
  `;

  return (
    <View className={containerStyles}>
      {label && (
        <Text className="text-sm font-medium text-[#5C5347] mb-2">
          {label}
        </Text>
      )}
      
      <View className={inputContainerStyles}>
        {leftIcon && <View className="mr-2">{leftIcon}</View>}
        
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#C7C2B8"
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          multiline={multiline}
          numberOfLines={numberOfLines}
          editable={!disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={inputStyles}
        />
        
        {rightIcon && (
          <TouchableOpacity onPress={onRightIconPress} className="ml-2">
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
      
      {error && (
        <Text className="text-sm text-[#C17B6F] mt-1">
          {error}
        </Text>
      )}
    </View>
  );
};

export default Input;