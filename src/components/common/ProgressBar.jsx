import React from 'react';
import { View, Text } from 'react-native';

const ProgressBar = ({ 
  progress = 0, // 0-100
  label,
  showPercentage = true,
  color = 'primary',
  size = 'medium',
  className = '' 
}) => {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  const colorClasses = {
    primary: 'bg-primary-600',
    secondary: 'bg-secondary-600',
    success: 'bg-green-600',
    warning: 'bg-yellow-600',
    danger: 'bg-red-600',
  };

  const sizeClasses = {
    small: 'h-1',
    medium: 'h-2',
    large: 'h-3',
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

      <View className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <View
          className={`${colorClasses[color]} ${sizeClasses[size]} rounded-full`}
          style={{ width: `${clampedProgress}%` }}
        />
      </View>
    </View>
  );
};

export default ProgressBar;
