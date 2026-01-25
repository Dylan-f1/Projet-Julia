import React from 'react';
import { View, TouchableOpacity } from 'react-native';

const Card = ({ 
  children, 
  onPress, 
  variant = 'default',
  className = '',
  ...props 
}) => {
  const baseClasses = 'rounded-xl p-4 mb-3';
  
  const variantClasses = {
    default: 'bg-white shadow-sm border border-gray-100',
    elevated: 'bg-white shadow-lg',
    outlined: 'bg-white border-2 border-gray-200',
    filled: 'bg-gray-50',
  };

  const Component = onPress ? TouchableOpacity : View;

  return (
    <Component
      onPress={onPress}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      activeOpacity={onPress ? 0.7 : 1}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Card;
