import React from 'react';
import { View, Text } from 'react-native';

const Badge = ({ 
  label, 
  variant = 'default', 
  size = 'medium',
  className = '' 
}) => {
  const variantClasses = {
    default: 'bg-gray-100 text-gray-700',
    primary: 'bg-primary-100 text-primary-700',
    secondary: 'bg-secondary-100 text-secondary-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-700',
    danger: 'bg-red-100 text-red-700',
    info: 'bg-blue-100 text-blue-700',
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

  const colors = variantClasses[variant].split(' ');
  const bgColor = colors[0];
  const textColor = colors[1];

  return (
    <View className={`${bgColor} ${sizeClasses[size]} rounded-full self-start ${className}`}>
      <Text className={`${textColor} ${textSizeClasses[size]} font-semibold`}>
        {label}
      </Text>
    </View>
  );
};

export default Badge;
