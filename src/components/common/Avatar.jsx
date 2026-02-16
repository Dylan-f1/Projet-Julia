import React from 'react';
import { View, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Avatar = ({
  name,
  size = 'medium',
  imageUrl = null,
  type = 'patient', // patient, therapist, ai
  className = '',
}) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16',
    xlarge: 'w-24 h-24',
  };

  const textSizeClasses = {
    small: 'text-xs',
    medium: 'text-base',
    large: 'text-xl',
    xlarge: 'text-3xl',
  };

  const bgColorClasses = {
    patient: 'bg-patient-400',
    therapist: 'bg-therapist-400',
    ai: 'bg-ai-400',
  };

  const getInitials = (fullName) => {
    if (!fullName) return '?';
    const names = fullName.trim().split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

  const iconSizes = {
    small: 16,
    medium: 24,
    large: 32,
    xlarge: 48,
  };

  const iconName = type === 'therapist' ? 'medical' : type === 'ai' ? 'sparkles' : 'person';

  return (
    <View
      className={`${sizeClasses[size]} ${bgColorClasses[type] || bgColorClasses.patient} rounded-full items-center justify-center shadow-sm ${className}`}
    >
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          className={`${sizeClasses[size]} rounded-full`}
        />
      ) : name ? (
        <Text className={`${textSizeClasses[size]} font-bold text-white`}>
          {getInitials(name)}
        </Text>
      ) : (
        <Ionicons
          name={iconName}
          size={iconSizes[size]}
          color="white"
        />
      )}
    </View>
  );
};

export default Avatar;
