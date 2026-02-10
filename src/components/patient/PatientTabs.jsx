// src/components/patient/PatientTabs.jsx
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TabButton = ({ id, label, icon, activeTab, onPress }) => {
  const isWeb = Platform.OS === 'web';
  
  return (
    <TouchableOpacity
      onPress={() => onPress(id)}
      className={`py-3 border-b-2 ${
        activeTab === id ? 'border-secondary-600' : 'border-gray-200'
      } ${isWeb ? 'flex-1 hover:bg-gray-50' : 'min-w-[140px]'}`}
    >
      <View className="items-center">
        <Ionicons 
          name={icon} 
          size={20} 
          color={activeTab === id ? '#c026d3' : '#9CA3AF'} 
        />
        <Text className={`text-sm mt-1 ${
          activeTab === id ? 'text-secondary-600 font-semibold' : 'text-gray-600'
        }`}>
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
    { id: 'evaluations', label: 'Évaluations', icon: 'analytics-outline' },
    { id: 'notes', label: 'Notes', icon: 'document-text-outline' },
  ];

  if (isWeb) {
    return (
      <View className="flex-row bg-white">
        {tabs.map(tab => (
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
      className="bg-white"
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View className="flex-row">
        {tabs.map(tab => (
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