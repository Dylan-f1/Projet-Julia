import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

const Tabs = ({ 
  tabs = [], // [{ id: 'tab1', label: 'Tab 1', icon: <Icon /> }]
  activeTab,
  onTabChange,
  variant = 'default', // default, pills
  className = '' 
}) => {
  if (variant === 'pills') {
    return (
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        className={`flex-row ${className}`}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            onPress={() => onTabChange(tab.id)}
            className={`px-4 py-2 rounded-full mr-2 ${
              activeTab === tab.id
                ? 'bg-primary-600'
                : 'bg-gray-100'
            }`}
          >
            <View className="flex-row items-center">
              {tab.icon && (
                <View className="mr-2">{tab.icon}</View>
              )}
              <Text
                className={`font-medium ${
                  activeTab === tab.id
                    ? 'text-white'
                    : 'text-gray-700'
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
          className={`flex-1 py-3 border-b-2 ${
            activeTab === tab.id
              ? 'border-primary-600'
              : 'border-transparent'
          }`}
        >
          <View className="items-center">
            {tab.icon && (
              <View className="mb-1">{tab.icon}</View>
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
