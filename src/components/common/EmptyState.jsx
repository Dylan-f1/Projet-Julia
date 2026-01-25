import React from 'react';
import { View, Text } from 'react-native';
import Button from './Button';

const EmptyState = ({ 
  icon, 
  title, 
  message, 
  actionLabel, 
  onAction,
  className = '' 
}) => {
  return (
    <View className={`flex-1 justify-center items-center px-6 ${className}`}>
      {icon && (
        <View className="mb-4">{icon}</View>
      )}
      
      {title && (
        <Text className="text-xl font-bold text-gray-900 mb-2 text-center">
          {title}
        </Text>
      )}
      
      {message && (
        <Text className="text-base text-gray-600 text-center mb-6">
          {message}
        </Text>
      )}
      
      {actionLabel && onAction && (
        <Button
          title={actionLabel}
          onPress={onAction}
          variant="primary"
        />
      )}
    </View>
  );
};

export default EmptyState;
