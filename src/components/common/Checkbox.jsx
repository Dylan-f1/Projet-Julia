import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Checkbox = ({ 
  label, 
  checked, 
  onChange,
  disabled = false,
  className = '' 
}) => {
  return (
    <TouchableOpacity
      onPress={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={`flex-row items-center ${className}`}
      activeOpacity={0.7}
    >
      <View
        className={`w-6 h-6 rounded border-2 items-center justify-center mr-3 ${
          checked
            ? 'bg-primary-600 border-primary-600'
            : disabled
            ? 'bg-gray-100 border-gray-300'
            : 'bg-white border-gray-300'
        }`}
      >
        {checked && (
          <Ionicons name="checkmark" size={16} color="white" />
        )}
      </View>

      {label && (
        <Text
          className={`flex-1 ${
            disabled ? 'text-gray-400' : 'text-gray-900'
          }`}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Checkbox;
