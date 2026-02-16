import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Alert = ({
  type = 'info',
  title,
  message,
  onClose,
  icon = true,
  className = '',
}) => {
  const typeConfig = {
    info: {
      bg: 'bg-patient-50',
      border: 'border-patient-200',
      iconColor: '#5B9BD5',
      iconName: 'information-circle',
      titleColor: 'text-patient-600',
      messageColor: 'text-patient-500',
    },
    success: {
      bg: 'bg-success-50',
      border: 'border-success-100',
      iconColor: '#4CAF82',
      iconName: 'checkmark-circle',
      titleColor: 'text-success-600',
      messageColor: 'text-success-400',
    },
    warning: {
      bg: 'bg-therapist-50',
      border: 'border-therapist-200',
      iconColor: '#E8A838',
      iconName: 'alert-circle',
      titleColor: 'text-therapist-600',
      messageColor: 'text-therapist-500',
    },
    danger: {
      bg: 'bg-danger-50',
      border: 'border-danger-100',
      iconColor: '#E05B5B',
      iconName: 'warning',
      titleColor: 'text-danger-600',
      messageColor: 'text-danger-400',
    },
  };

  const config = typeConfig[type];

  return (
    <View className={`${config.bg} border ${config.border} rounded-2xl p-4 ${className}`}>
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
            <Text className={`${config.messageColor} text-sm leading-5`}>
              {message}
            </Text>
          )}
        </View>

        {onClose && (
          <TouchableOpacity onPress={onClose} className="ml-2 p-1 rounded-full">
            <Ionicons name="close" size={18} color={config.iconColor} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Alert;
