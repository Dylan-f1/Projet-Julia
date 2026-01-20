import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';
import { colors } from '@/lib/constants/colors';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
  className = '',
}) => {
  // Styles de base
  const baseStyles = 'rounded-xl flex-row items-center justify-center';
  
  // Styles par variante
  const variantStyles = {
    primary: disabled 
      ? 'bg-gray-200' 
      : 'bg-[#F87142] active:bg-[#E55A2B]',
    secondary: disabled
      ? 'bg-gray-100'
      : 'bg-[#6B8CAE] active:bg-[#5A7A9E]',
    outline: disabled
      ? 'border-2 border-gray-200 bg-transparent'
      : 'border-2 border-[#F87142] bg-transparent active:bg-[#FFF4ED]',
    ghost: disabled
      ? 'bg-transparent'
      : 'bg-transparent active:bg-gray-100',
  };
  
  // Styles par taille
  const sizeStyles = {
    sm: 'px-3 py-2 min-h-[36px]',
    md: 'px-4 py-3 min-h-[44px]',
    lg: 'px-6 py-4 min-h-[52px]',
  };
  
  // Styles du texte
  const textVariantStyles = {
    primary: disabled ? 'text-gray-400' : 'text-white font-semibold',
    secondary: disabled ? 'text-gray-400' : 'text-white font-semibold',
    outline: disabled ? 'text-gray-400' : 'text-[#F87142] font-semibold',
    ghost: disabled ? 'text-gray-400' : 'text-[#2C2318] font-medium',
  };
  
  const textSizeStyles = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };
  
  const widthStyle = fullWidth ? 'w-full' : '';
  
  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`;
  const textStyles = `${textVariantStyles[variant]} ${textSizeStyles[size]}`;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      className={combinedStyles}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'primary' || variant === 'secondary' ? '#FFFFFF' : colors.primary[500]} 
        />
      ) : (
        <View className="flex-row items-center gap-2">
          {icon && <View>{icon}</View>}
          <Text className={textStyles}>{children}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Button;