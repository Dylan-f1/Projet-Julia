import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Alert = ({ 
  type = 'info', 
  title, 
  message, 
  onClose,
  icon = true,
  className = '' 
}) => {
  const typeConfig = {
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      iconColor: '#0284c7',
      iconName: 'information-circle',
      titleColor: 'text-blue-700',
      messageColor: 'text-blue-600',
    },
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      iconColor: '#22c55e',
      iconName: 'checkmark-circle',
      titleColor: 'text-green-700',
      messageColor: 'text-green-600',
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      iconColor: '#f59e0b',
      iconName: 'alert-circle',
      titleColor: 'text-yellow-700',
      messageColor: 'text-yellow-600',
    },
    danger: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      iconColor: '#ef4444',
      iconName: 'warning',
      titleColor: 'text-red-700',
      messageColor: 'text-red-600',
    },
  };

  const config = typeConfig[type];

  return (
    <View className={`${config.bg} border ${config.border} rounded-lg p-4 ${className}`}>
      <View className="flex-row items-start">
        {icon && (
          <Ionicons 
            name={config.iconName} 
            size={20} 
            color={config.iconColor} 
          />
        )}
        
        <View className="flex-1 ml-3">
          {title && (
            <Text className={`${config.titleColor} font-semibold mb-1`}>
              {title}
            </Text>
          )}
          
          {message && (
            <Text className={`${config.messageColor} text-sm`}>
              {message}
            </Text>
          )}
        </View>

        {onClose && (
          <TouchableOpacity onPress={onClose} className="ml-2">
            <Ionicons name="close" size={20} color={config.iconColor} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Alert;
