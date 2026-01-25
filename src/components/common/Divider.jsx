import React from 'react';
import { View, Text } from 'react-native';

const Divider = ({ 
  label, 
  orientation = 'horizontal',
  className = '' 
}) => {
  if (orientation === 'vertical') {
    return (
      <View className={`w-px bg-gray-200 ${className}`} />
    );
  }

  if (label) {
    return (
      <View className={`flex-row items-center my-4 ${className}`}>
        <View className="flex-1 h-px bg-gray-200" />
        <Text className="px-4 text-sm text-gray-500">{label}</Text>
        <View className="flex-1 h-px bg-gray-200" />
      </View>
    );
  }

  return (
    <View className={`h-px bg-gray-200 my-4 ${className}`} />
  );
};

export default Divider;
