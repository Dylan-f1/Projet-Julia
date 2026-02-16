import React from 'react';
import { View, Text, useWindowDimensions } from 'react-native';

const ProgressBar = ({
  progress = 0, // 0-100
  label,
  showPercentage = true,
  color = 'patient',
  size = 'medium',
  className = '',
}) => {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  const colorClasses = {
    patient: 'bg-patient-400',
    therapist: 'bg-therapist-400',
    ai: 'bg-ai-400',
    success: 'bg-success-400',
    danger: 'bg-danger-400',
  };

  const percentageTextColors = {
    patient: 'text-patient-500',
    therapist: 'text-therapist-500',
    ai: 'text-ai-500',
    success: 'text-success-600',
    danger: 'text-danger-600',
  };

  // Desktop: slightly thicker bars
  const sizeClasses = {
    small: isDesktop ? 'h-1.5' : 'h-1',
    medium: isDesktop ? 'h-2.5' : 'h-2',
    large: isDesktop ? 'h-4' : 'h-3',
  };

  return (
    <View className={className}>
      {(label || showPercentage) && (
        <View className="flex-row justify-between items-center mb-2">
          {label && (
            <Text className="text-sm text-text-500">{label}</Text>
          )}
          {showPercentage && (
            <Text className={`text-sm ${percentageTextColors[color] || percentageTextColors.patient} font-semibold`}>
              {Math.round(clampedProgress)}%
            </Text>
          )}
        </View>
      )}

      <View
        className={`w-full bg-surface-200 rounded-full overflow-hidden ${sizeClasses[size]}`}
        style={
          isDesktop
            ? { transition: 'all 0.3s ease' }
            : undefined
        }
      >
        <View
          className={`${colorClasses[color] || colorClasses.patient} ${sizeClasses[size]} rounded-full`}
          style={{
            width: `${clampedProgress}%`,
            ...(isDesktop ? { transition: 'width 0.4s ease-out' } : {}),
          }}
        />
      </View>
    </View>
  );
};

export default ProgressBar;
