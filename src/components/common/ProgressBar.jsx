import React from 'react';
import { View, Text, useWindowDimensions } from 'react-native';

const ProgressBar = ({
  progress = 0, // 0-100
  label,
  showPercentage = true,
  color = 'primary',
  size = 'medium',
  className = '',
}) => {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  const colorClasses = {
    primary: 'bg-primary-600',
    secondary: 'bg-secondary-600',
    success: 'bg-green-600',
    warning: 'bg-yellow-600',
    danger: 'bg-red-600',
  };

  // Desktop : barres légèrement plus épaisses
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
            <Text className="text-sm text-gray-700">{label}</Text>
          )}
          {showPercentage && (
            <Text className="text-sm text-gray-600 font-semibold">
              {Math.round(clampedProgress)}%
            </Text>
          )}
        </View>
      )}

      <View
        className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizeClasses[size]}`}
        style={
          isDesktop
            ? { transition: 'all 0.3s ease' }
            : undefined
        }
      >
        <View
          className={`${colorClasses[color]} ${sizeClasses[size]} rounded-full`}
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