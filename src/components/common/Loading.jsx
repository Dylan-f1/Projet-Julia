import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';

const Loading = ({ message = 'Chargement...', size = 'large' }) => {
  return (
    <View className="flex-1 justify-center items-center bg-surface-50">
      <ActivityIndicator size={size} color="#5B9BD5" />
      {message && (
        <Text className="text-text-500 mt-4 text-base font-light">
          {message}
        </Text>
      )}
    </View>
  );
};

export default Loading;
