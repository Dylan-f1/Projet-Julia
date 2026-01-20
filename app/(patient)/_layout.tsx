import { Tabs } from 'expo-router';
import { Text } from 'react-native';

export default function PatientLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#F87142',
        tabBarInactiveTintColor: '#B8B1A6',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E8E3DC',
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Discussion',
          tabBarIcon: () => <Text style={{ fontSize: 24 }}>💬</Text>,
        }}
      />
      <Tabs.Screen
        name="suivi"
        options={{
          title: 'Mon suivi',
          tabBarIcon: () => <Text style={{ fontSize: 24 }}>📊</Text>,
        }}
      />
    </Tabs>
  );
}