import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Badge } from '@/components/ui';

interface HeaderProps {
  title: string;
  subtitle?: string;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  badge?: number;
  backButton?: boolean;
  onBackPress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  rightIcon,
  onRightIconPress,
  badge,
  backButton = false,
  onBackPress,
}) => {
  return (
    <View className="px-6 py-4 bg-white border-b border-[#E8E3DC]">
      <View className="flex-row items-center justify-between">
        {/* Left side */}
        <View className="flex-1 flex-row items-center">
          {/* Back button */}
          {backButton && onBackPress && (
            <TouchableOpacity
              onPress={onBackPress}
              className="mr-3 w-10 h-10 items-center justify-center"
              activeOpacity={0.7}
            >
              <Text className="text-2xl">←</Text>
            </TouchableOpacity>
          )}

          {/* Title & subtitle */}
          <View className="flex-1">
            <Text className="text-2xl font-bold text-[#2C2318]">
              {title}
            </Text>
            {subtitle && (
              <Text className="text-sm text-[#8B8378] mt-1">
                {subtitle}
              </Text>
            )}
          </View>
        </View>

        {/* Right icon */}
        {rightIcon && (
          <TouchableOpacity
            onPress={onRightIconPress}
            className="relative"
            activeOpacity={0.7}
          >
            {rightIcon}
            {badge !== undefined && badge > 0 && (
              <View className="absolute -top-1 -right-1">
                <Badge count={badge} size="sm" variant="error" />
              </View>
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Header;