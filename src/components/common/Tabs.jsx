import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from 'react-native';

const Tabs = ({
  tabs = [], // [{ id: 'tab1', label: 'Tab 1', icon: <Icon /> }]
  activeTab,
  onTabChange,
  variant = 'default', // default, pills
  className = '',
}) => {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  if (variant === 'pills') {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className={`flex-row ${className}`}
        contentContainerStyle={
          isDesktop ? { gap: 8 } : undefined
        }
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            onPress={() => onTabChange(tab.id)}
            activeOpacity={isDesktop ? 0.8 : 0.6}
            className={`px-4 py-2 rounded-full ${
              isDesktop ? '' : 'mr-2'
            } ${
              activeTab === tab.id ? 'bg-primary-600' : 'bg-gray-100'
            }`}
            style={isDesktop ? { cursor: 'pointer' } : undefined}
          >
            <View className="flex-row items-center">
              {tab.icon && <View className="mr-2">{tab.icon}</View>}
              <Text
                className={`font-medium ${
                  activeTab === tab.id ? 'text-white' : 'text-gray-700'
                }`}
              >
                {tab.label}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }

  return (
    <View className={`flex-row border-b border-gray-200 ${className}`}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          onPress={() => onTabChange(tab.id)}
          activeOpacity={isDesktop ? 0.8 : 0.6}
          className={`flex-1 border-b-2 ${
            activeTab === tab.id
              ? 'border-primary-600'
              : 'border-transparent'
          }`}
          style={
            isDesktop
              ? { cursor: 'pointer', paddingVertical: 14 }
              : { paddingVertical: 12 }
          }
        >
          <View
            className="items-center"
            style={
              isDesktop
                ? { flexDirection: 'row', justifyContent: 'center', gap: 8 }
                : undefined
            }
          >
            {tab.icon && (
              <View className={isDesktop ? '' : 'mb-1'}>{tab.icon}</View>
            )}
            <Text
              className={`text-sm font-medium ${
                activeTab === tab.id
                  ? 'text-primary-600'
                  : 'text-gray-600'
              }`}
            >
              {tab.label}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Tabs;