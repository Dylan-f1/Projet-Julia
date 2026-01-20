import React from 'react';
import { View, Text, Image } from 'react-native';

interface AvatarProps {
  name?: string;
  imageUri?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  name = '',
  imageUri,
  size = 'md',
  className = '',
}) => {
  const sizeStyles = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  const textSizeStyles = {
    sm: 'text-xs',
    md: 'text-base',
    lg: 'text-xl',
    xl: 'text-3xl',
  };

  const getInitials = (name: string): string => {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const initials = getInitials(name);
  const combinedStyles = `${sizeStyles[size]} rounded-full items-center justify-center ${className}`;

  if (imageUri) {
    return (
      <View className={combinedStyles}>
        <Image
          source={{ uri: imageUri }}
          className="w-full h-full rounded-full"
          resizeMode="cover"
        />
      </View>
    );
  }

  return (
    <View className={`${combinedStyles} bg-[#F87142]`}>
      <Text className={`${textSizeStyles[size]} text-white font-semibold`}>
        {initials}
      </Text>
    </View>
  );
};

export default Avatar;