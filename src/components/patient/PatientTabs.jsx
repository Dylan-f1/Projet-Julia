import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TABS = [
  { id: 'overview',       label: "Vue d'ensemble", icon: 'grid-outline' },
  { id: 'conversations',  label: 'Conversations',  icon: 'chatbubbles-outline' },
  { id: 'evaluations',    label: 'Évaluations',    icon: 'analytics-outline' },
  { id: 'notes',          label: 'Notes',          icon: 'document-text-outline' },
];

const TabButton = ({ id, label, icon, activeTab, onPress, isWeb }) => {
  const isActive = activeTab === id;

  return (
    <TouchableOpacity
      onPress={() => onPress(id)}
      style={{
        flex: isWeb ? 1 : undefined,
        minWidth: isWeb ? undefined : 130,
        paddingVertical: 14,
        paddingHorizontal: isWeb ? 8 : 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 3,
        borderBottomColor: isActive ? '#E8A838' : 'transparent',
        backgroundColor: isActive ? '#FFFAF0' : 'transparent',
      }}
    >
      <Ionicons
        name={icon}
        size={20}
        color={isActive ? '#E8A838' : '#A0A0A0'}
      />
      <Text
        style={{
          fontSize: 12,
          marginTop: 4,
          fontWeight: isActive ? '700' : '500',
          color: isActive ? '#1A1A1A' : '#A0A0A0',
        }}
        numberOfLines={1}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const PatientTabs = ({ activeTab, onTabChange }) => {
  const isWeb = Platform.OS === 'web';

  if (isWeb) {
    return (
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#FFFFFF',
          borderBottomWidth: 1,
          borderBottomColor: '#EEECEB',
        }}
      >
        {TABS.map((tab) => (
          <TabButton
            key={tab.id}
            {...tab}
            activeTab={activeTab}
            onPress={onTabChange}
            isWeb={isWeb}
          />
        ))}
      </View>
    );
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#EEECEB' }}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View style={{ flexDirection: 'row' }}>
        {TABS.map((tab) => (
          <TabButton
            key={tab.id}
            {...tab}
            activeTab={activeTab}
            onPress={onTabChange}
            isWeb={false}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default PatientTabs;
