import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Avatar = ({ 
  name, 
  size = 'medium', 
  imageUrl = null,
  type = 'user', // user, therapist, patient
  className = '' 
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
    user: 'bg-primary-500',
    therapist: 'bg-secondary-500',
    patient: 'bg-accent-500',
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

  return (
    <View 
      className={`${sizeClasses[size]} ${bgColorClasses[type]} rounded-full items-center justify-center ${className}`}
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
          name={type === 'therapist' ? 'medical' : 'person'} 
          size={iconSizes[size]} 
          color="white" 
        />
      )}
    </View>
  );
};

export default Avatar;
