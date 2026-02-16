import React from 'react';
import { View, Text } from 'react-native';

const Badge = ({
  label,
  variant = 'default',
  size = 'medium',
  className = '',
}) => {
  const variantClasses = {
    default: { bg: 'bg-surface-200', text: 'text-text-500' },
    patient: { bg: 'bg-patient-100', text: 'text-patient-600' },
    therapist: { bg: 'bg-therapist-100', text: 'text-therapist-600' },
    ai: { bg: 'bg-ai-100', text: 'text-ai-600' },
    success: { bg: 'bg-success-100', text: 'text-success-600' },
    danger: { bg: 'bg-danger-100', text: 'text-danger-600' },
  };

  const sizeClasses = {
    small: 'px-2 py-0.5',
    medium: 'px-3 py-1',
    large: 'px-4 py-1.5',
  };

  const textSizeClasses = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base',
  };

  const colors = variantClasses[variant] || variantClasses.default;

  return (
    <View className={`${colors.bg} ${sizeClasses[size]} rounded-full self-start ${className}`}>
      <Text className={`${colors.text} ${textSizeClasses[size]} font-semibold`}>
        {label}
      </Text>
    </View>
  );
};

export default Badge;
