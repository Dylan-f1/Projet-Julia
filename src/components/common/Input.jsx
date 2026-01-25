import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';

const Input = ({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  secureTextEntry = false,
  keyboardType = 'default',
  multiline = false,
  numberOfLines = 1,
  icon = null,
  rightIcon = null,
  onRightIconPress = null,
  editable = true,
  className = '',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const borderColor = error 
    ? 'border-red-500' 
    : isFocused 
    ? 'border-primary-600' 
    : 'border-gray-300';

  return (
    <View className={`mb-4 ${className}`}>
      {label && (
        <Text className="text-gray-700 font-medium mb-2">{label}</Text>
      )}
      
      <View className={`flex-row items-center border rounded-lg px-3 ${borderColor} ${!editable ? 'bg-gray-100' : 'bg-white'}`}>
        {icon && (
          <View className="mr-2">{icon}</View>
        )}
        
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          multiline={multiline}
          numberOfLines={numberOfLines}
          editable={editable}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`flex-1 py-3 text-gray-900 ${multiline ? 'min-h-[100px] text-top' : ''}`}
          {...props}
        />
        
        {rightIcon && (
          <TouchableOpacity 
            onPress={onRightIconPress}
            className="ml-2"
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>

      {error && (
        <Text className="text-red-500 text-sm mt-1">{error}</Text>
      )}
    </View>
  );
};

export default Input;
