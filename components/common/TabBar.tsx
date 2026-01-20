import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Badge } from '@/components/ui';

interface TabItem {
  key: string;
  label: string;
  icon: string;
  badge?: number;
}

interface TabBarProps {
  tabs: TabItem[];
  activeTab: string;
  onTabPress: (key: string) => void;
}

export const TabBar: React.FC<TabBarProps> = ({
  tabs,
  activeTab,
  onTabPress,
}) => {
  return (
    <View className="flex-row bg-white border-t border-[#E8E3DC] px-2 py-2">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        
        return (
          <TouchableOpacity
            key={tab.key}
            onPress={() => onTabPress(tab.key)}
            className="flex-1 items-center justify-center py-2"
            activeOpacity={0.7}
          >
            <View className="relative">
              {/* Icon */}
              <Text className="text-2xl mb-1">
                {tab.icon}
              </Text>

              {/* Badge */}
              {tab.badge !== undefined && tab.badge > 0 && (
                <View className="absolute -top-1 -right-1">
                  <Badge count={tab.badge} size="sm" variant="error" />
                </View>
              )}
            </View>

            {/* Label */}
            <Text
              className={`text-xs font-medium ${
                isActive ? 'text-[#F87142]' : 'text-[#B8B1A6]'
              }`}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBar;