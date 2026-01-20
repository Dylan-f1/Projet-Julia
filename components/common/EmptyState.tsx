import React from 'react';
import { View, Text } from 'react-native';
import { Button } from '@/components/ui';

interface EmptyStateProps {
  icon?: string;
  title: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = '📭',
  title,
  message,
  actionLabel,
  onAction,
}) => {
  return (
    <View className="flex-1 items-center justify-center px-6 py-12">
      {/* Icône */}
      <Text className="text-6xl mb-4">{icon}</Text>

      {/* Titre */}
      <Text className="text-2xl font-bold text-[#2C2318] mb-2 text-center">
        {title}
      </Text>

      {/* Message */}
      {message && (
        <Text className="text-base text-[#8B8378] text-center mb-6">
          {message}
        </Text>
      )}

      {/* Action */}
      {actionLabel && onAction && (
        <Button onPress={onAction}>
          {actionLabel}
        </Button>
      )}
    </View>
  );
};

export default EmptyState;