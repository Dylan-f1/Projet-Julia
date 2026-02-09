import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ChatProvider } from '../../src/contexts/ChatContext';

export default function PatientLayout() {
  return (
    <ChatProvider>
      <Tabs
        screenOptions={{
          headerShown: true,
          tabBarActiveTintColor: '#0284c7',
          tabBarInactiveTintColor: '#9CA3AF',
        }}
      >
        <Tabs.Screen
          name="chat"
          options={{
            title: 'Chat',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="chatbubbles" size={size} color={color} />
            ),
            headerTitle: 'Julia - Votre compagnon 24/7',
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            title: 'Historique',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="time" size={size} color={color} />
            ),
            headerTitle: 'Mes conversations',
          }}
        />
        <Tabs.Screen
          name="evaluation"
          options={{
            title: 'Évaluation',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="analytics" size={size} color={color} />
            ),
            headerTitle: 'Évaluation quotidienne',
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
    </ChatProvider>
  );
}