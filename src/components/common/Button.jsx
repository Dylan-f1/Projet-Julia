import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';

const COLORS = {
  patient: {
    bg: 'bg-patient-400',
    text: 'text-white',
    shadow: '#5B9BD5',
    hex: '#5B9BD5',
    border: 'border-patient-400',
    ghostText: 'text-patient-500',
    spinnerActive: '#ffffff',
    spinnerInactive: '#5B9BD5',
  },
  therapist: {
    bg: 'bg-therapist-400',
    text: 'text-white',
    shadow: '#E8A838',
    hex: '#E8A838',
    border: 'border-therapist-400',
    ghostText: 'text-therapist-500',
    spinnerActive: '#ffffff',
    spinnerInactive: '#E8A838',
  },
  ai: {
    bg: 'bg-ai-400',
    text: 'text-white',
    shadow: '#F0A8A0',
    hex: '#F0A8A0',
    border: 'border-ai-400',
    ghostText: 'text-ai-500',
    spinnerActive: '#ffffff',
    spinnerInactive: '#F0A8A0',
  },
};

const Button = ({
  onPress,
  title,
  variant = 'patient',
  size = 'medium',
  color = 'patient',
  loading = false,
  disabled = false,
  icon = null,
  className = '',
  ...props
}) => {
  const baseClasses = 'flex-row items-center justify-center';

  const accent = COLORS[color] || COLORS.patient;

  const sizeClasses = {
    small: 'px-5 py-2.5',
    medium: 'px-6 py-3.5',
    large: 'px-10 py-5',
  };

  const textSizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
  };

  const getVariantConfig = () => {
    switch (variant) {
      case 'patient': {
        const c = COLORS.patient;
        return {
          containerClass: `${c.bg} rounded-xl`,
          textClass: `${c.text} font-semibold`,
          style: {
            shadowColor: c.shadow,
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.3,
            shadowRadius: 6,
            elevation: 4,
          },
          spinnerColor: c.spinnerActive,
        };
      }
      case 'therapist': {
        const c = COLORS.therapist;
        return {
          containerClass: `${c.bg} rounded-xl`,
          textClass: `${c.text} font-semibold`,
          style: {
            shadowColor: c.shadow,
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.3,
            shadowRadius: 6,
            elevation: 4,
          },
          spinnerColor: c.spinnerActive,
        };
      }
      case 'ai': {
        const c = COLORS.ai;
        return {
          containerClass: `${c.bg} rounded-xl`,
          textClass: `${c.text} font-semibold`,
          style: {
            shadowColor: c.shadow,
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.3,
            shadowRadius: 6,
            elevation: 4,
          },
          spinnerColor: c.spinnerActive,
        };
      }
      case 'outline':
        return {
          containerClass: `bg-transparent border-2 ${accent.border} rounded-xl`,
          textClass: `${accent.ghostText} font-semibold`,
          style: {},
          spinnerColor: accent.spinnerInactive,
        };
      case 'ghost':
        return {
          containerClass: 'bg-transparent',
          textClass: `${accent.ghostText} font-semibold`,
          style: {},
          spinnerColor: accent.spinnerInactive,
        };
      case 'danger':
        return {
          containerClass: 'bg-danger-400 rounded-xl',
          textClass: 'text-white font-semibold',
          style: {
            shadowColor: '#E05B5B',
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.3,
            shadowRadius: 6,
            elevation: 4,
          },
          spinnerColor: '#ffffff',
        };
      default: {
        const c = COLORS.patient;
        return {
          containerClass: `${c.bg} rounded-xl`,
          textClass: `${c.text} font-semibold`,
          style: {
            shadowColor: c.shadow,
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.3,
            shadowRadius: 6,
            elevation: 4,
          },
          spinnerColor: c.spinnerActive,
        };
      }
    }
  };

  const config = getVariantConfig();
  const isDisabled = disabled || loading;
  const disabledClass = isDisabled ? 'opacity-50' : '';

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      className={`${baseClasses} ${config.containerClass} ${sizeClasses[size]} ${disabledClass} ${className}`}
      style={config.style}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={config.spinnerColor} />
      ) : (
        <>
          {icon && <View className="mr-2">{icon}</View>}
          <Text className={`${config.textClass} ${textSizeClasses[size]}`}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default Button;
