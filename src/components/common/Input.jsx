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

  // Border color logic with new tokens
  const borderColor = error
    ? 'border-danger-400'
    : isFocused
    ? 'border-patient-300'
    : 'border-surface-200';

  // Focus glow effect via inline style
  const focusStyle =
    isFocused && !error
      ? {
          shadowColor: '#5B9BD5',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.15,
          shadowRadius: 8,
          elevation: 2,
        }
      : {};

  return (
    <View className={`mb-4 ${className}`}>
      {label && (
        <Text className="text-text-700 font-medium mb-2">{label}</Text>
      )}

      <View
        className={`flex-row items-center border rounded-xl px-3 ${borderColor} ${
          !editable ? 'bg-surface-100' : 'bg-white'
        }`}
        style={focusStyle}
      >
        {icon && <View className="mr-2">{icon}</View>}

        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#A0A0A0"
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          multiline={multiline}
          numberOfLines={numberOfLines}
          editable={editable}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`flex-1 py-3 text-text-900 ${
            multiline ? 'min-h-[100px] text-top' : ''
          }`}
          {...props}
        />

        {rightIcon && (
          <TouchableOpacity onPress={onRightIconPress} className="ml-2">
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>

      {error && (
        <Text className="text-danger-400 text-sm mt-1">{error}</Text>
      )}
    </View>
  );
};

export default Input;
