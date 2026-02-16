import React from 'react';
import { View, Text } from 'react-native';

const Divider = ({
  label,
  orientation = 'horizontal',
  className = '',
}) => {
  if (orientation === 'vertical') {
    return (
      <View className={`w-px bg-surface-200 ${className}`} />
    );
  }

  if (label) {
    return (
      <View className={`flex-row items-center my-4 ${className}`}>
        <View className="flex-1 h-px bg-surface-200" />
        <Text className="px-4 text-sm text-text-300">{label}</Text>
        <View className="flex-1 h-px bg-surface-200" />
      </View>
    );
  }

  return (
    <View className={`h-px bg-surface-200 my-4 ${className}`} />
  );
};

export default Divider;
