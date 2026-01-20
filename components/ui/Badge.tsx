import React from 'react';
import { View, Text } from 'react-native';

type BadgeVariant = 'primary' | 'success' | 'warning' | 'error' | 'info';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  children?: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  count?: number;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  dot = false,
  count,
  className = '',
}) => {
  const variantStyles = {
    primary: 'bg-[#F87142]',
    success: 'bg-[#7FB685]',
    warning: 'bg-[#D9A05B]',
    error: 'bg-[#C17B6F]',
    info: 'bg-[#6B8CAE]',
  };

  const sizeStyles = {
    sm: dot ? 'w-2 h-2' : 'px-2 py-0.5 min-w-[20px] min-h-[20px]',
    md: dot ? 'w-3 h-3' : 'px-2.5 py-1 min-w-[24px] min-h-[24px]',
    lg: dot ? 'w-4 h-4' : 'px-3 py-1.5 min-w-[28px] min-h-[28px]',
  };

  const textSizeStyles = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  const baseStyles = dot ? 'rounded-full' : 'rounded-full items-center justify-center';
  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (dot) {
    return <View className={combinedStyles} />;
  }

  const displayContent = count !== undefined ? (count > 99 ? '99+' : count.toString()) : children;

  return (
    <View className={combinedStyles}>
      <Text className={`${textSizeStyles[size]} text-white font-semibold`}>
        {displayContent}
      </Text>
    </View>
  );
};

export default Badge;