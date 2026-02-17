import React from 'react';
import { View, TouchableOpacity } from 'react-native';

const Card = ({
  children,
  onPress,
  variant = 'default',
  className = '',
  ...props
}) => {
  const Component = onPress ? TouchableOpacity : View;

  if (variant === 'hero') {
    return (
      <Component
        onPress={onPress}
        activeOpacity={onPress ? 0.7 : 1}
        className={`rounded-3xl p-6 mb-3 overflow-hidden ${className}`}
        style={{
          backgroundColor: '#EEF4FB',
          shadowColor: '#5B9BD5',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 12,
          elevation: 6,
        }}
        {...props}
      >
        {/* Decorative circle element - top-right overflow */}
        <View
          style={{
            position: 'absolute',
            top: -20,
            right: -20,
            width: 100,
            height: 100,
            borderRadius: 9999,
            backgroundColor: '#A9C9EB',
            opacity: 0.15,
          }}
        />
        {/* Second decorative circle for gradient-like depth */}
        <View
          style={{
            position: 'absolute',
            bottom: -30,
            left: -15,
            width: 80,
            height: 80,
            borderRadius: 9999,
            backgroundColor: '#D4E4F5',
            opacity: 0.2,
          }}
        />
        {children}
      </Component>
    );
  }

  if (variant === 'stat') {
    return (
      <Component
        onPress={onPress}
        activeOpacity={onPress ? 0.7 : 1}
        className={`bg-surface-50 rounded-2xl p-4 mb-3 items-center justify-center border border-surface-200 ${className}`}
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 4,
          elevation: 2,
          aspectRatio: undefined,
        }}
        {...props}
      >
        {children}
      </Component>
    );
  }

  if (variant === 'action') {
    return (
      <Component
        onPress={onPress}
        activeOpacity={onPress ? 0.7 : 1}
        className={`rounded-xl p-4 mb-3 flex-row ${className}`}
        style={{
          backgroundColor: '#FFFFFF',
          borderLeftWidth: 4,
          borderLeftColor: '#5B9BD5',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 8,
          elevation: 4,
        }}
        {...props}
      >
        {children}
      </Component>
    );
  }

  if (variant === 'floating') {
    return (
      <Component
        onPress={onPress}
        activeOpacity={onPress ? 0.7 : 1}
        className={`rounded-2xl p-4 mb-3 ${className}`}
        style={{
          backgroundColor: '#FFFFFF',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.12,
          shadowRadius: 16,
          elevation: 8,
        }}
        {...props}
      >
        {children}
      </Component>
    );
  }

  return (
    <Component
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      className={`bg-surface-50 rounded-xl p-4 mb-3 border border-surface-200 ${className}`}
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 3,
        elevation: 1,
      }}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Card;
