import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TabButton = ({ id, label, icon, activeTab, onPress }) => {
  const isWeb = Platform.OS === 'web';
  const isActive = activeTab === id;

  return (
    <TouchableOpacity
      onPress={() => onPress(id)}
      className={`py-3.5 border-b-2 ${
        isActive ? 'border-therapist-400' : 'border-transparent'
      } ${isWeb ? 'flex-1 hover:bg-surface-50' : 'min-w-[140px]'}`}
    >
      <View className="items-center">
        <Ionicons
          name={icon}
          size={20}
          color={isActive ? '#E8A838' : '#A0A0A0'}
        />
        <Text
          className={`text-sm mt-1 ${
            isActive ? 'text-text-900 font-semibold' : 'text-text-300'
          }`}
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const PatientTabs = ({ activeTab, onTabChange }) => {
  const isWeb = Platform.OS === 'web';

  const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: 'grid-outline' },
    { id: 'conversations', label: 'Conversations', icon: 'chatbubbles-outline' },
    { id: 'evaluations', label: 'Evaluations', icon: 'analytics-outline' },
    { id: 'notes', label: 'Notes', icon: 'document-text-outline' },
  ];

  if (isWeb) {
    return (
      <View className="flex-row bg-white border-b border-surface-200">
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            {...tab}
            activeTab={activeTab}
            onPress={onTabChange}
          />
        ))}
      </View>
    );
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="bg-white border-b border-surface-200"
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View className="flex-row">
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            {...tab}
            activeTab={activeTab}
            onPress={onTabChange}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default PatientTabs;
