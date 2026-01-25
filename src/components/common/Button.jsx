import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';

const Button = ({ 
  onPress, 
  title, 
  variant = 'primary', 
  size = 'medium',
  loading = false,
  disabled = false,
  icon = null,
  className = '',
  ...props 
}) => {
  const baseClasses = 'rounded-lg flex-row items-center justify-center';
  
  const variantClasses = {
    primary: 'bg-primary-600 active:bg-primary-700',
    secondary: 'bg-secondary-600 active:bg-secondary-700',
    outline: 'border-2 border-primary-600 bg-transparent',
    ghost: 'bg-transparent',
    danger: 'bg-red-600 active:bg-red-700',
  };

  const sizeClasses = {
    small: 'px-3 py-2',
    medium: 'px-4 py-3',
    large: 'px-6 py-4',
  };

  const textClasses = {
    primary: 'text-white font-semibold',
    secondary: 'text-white font-semibold',
    outline: 'text-primary-600 font-semibold',
    ghost: 'text-primary-600 font-semibold',
    danger: 'text-white font-semibold',
  };

  const textSizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
  };

  const isDisabled = disabled || loading;
  const disabledClass = isDisabled ? 'opacity-50' : '';

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClass} ${className}`}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' || variant === 'ghost' ? '#0284c7' : '#ffffff'} />
      ) : (
        <>
          {icon && <View className="mr-2">{icon}</View>}
          <Text className={`${textClasses[variant]} ${textSizeClasses[size]}`}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default Button;
