import React from 'react';
import { View, TouchableOpacity } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  className?: string;
  variant?: 'default' | 'elevated' | 'outlined';
}

export const Card: React.FC<CardProps> = ({
  children,
  onPress,
  className = '',
  variant = 'default',
}) => {
  const baseStyles = 'rounded-2xl p-4';
  
  const variantStyles = {
    default: 'bg-white',
    elevated: 'bg-white shadow-md',
    outlined: 'bg-white border-2 border-[#E8E3DC]',
  };
  
  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        className={combinedStyles}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return <View className={combinedStyles}>{children}</View>;
};

export default Card;