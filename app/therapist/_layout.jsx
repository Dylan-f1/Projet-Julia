import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

export default function TherapistLayout() {
  const isWeb = Platform.OS === 'web';

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#c026d3',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          // Cache la tab bar sur web si tu préfères une sidebar
          display: isWeb ? 'none' : 'flex',
        },
        headerStyle: {
          backgroundColor: '#ffffff',
        },
        headerTitleStyle: {
          fontWeight: '700',
          fontSize: 18,
        },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid" size={size} color={color} />
          ),
          headerTitle: 'Mes patients',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
          headerTitle: 'Mon profil',
        }}
      />
    </Tabs>
  );
}