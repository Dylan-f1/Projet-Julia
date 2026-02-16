import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Checkbox = ({
  label,
  checked,
  onChange,
  disabled = false,
  className = '',
}) => {
  return (
    <TouchableOpacity
      onPress={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={`flex-row items-center ${className}`}
      activeOpacity={0.7}
    >
      <View
        className={`w-6 h-6 rounded-md border-2 items-center justify-center mr-3 ${
          checked
            ? 'bg-patient-400 border-patient-400'
            : disabled
            ? 'bg-surface-100 border-surface-300'
            : 'bg-white border-surface-300'
        }`}
      >
        {checked && (
          <Ionicons name="checkmark" size={16} color="white" />
        )}
      </View>

      {label && (
        <Text
          className={`flex-1 ${
            disabled ? 'text-text-300' : 'text-text-700'
          }`}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Checkbox;
