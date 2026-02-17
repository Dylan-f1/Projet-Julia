import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ChatProvider } from '../../src/contexts/ChatContext';

export default function PatientLayout() {
  return (
    <ChatProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#5B9BD5',
          tabBarInactiveTintColor: '#A0A0A0',
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            borderTopWidth: 0,
            paddingBottom: 6,
            paddingTop: 6,
            height: 64,
            elevation: 8,
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: -3 },
            shadowOpacity: 0.06,
            shadowRadius: 12,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '600',
            letterSpacing: 0.2,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Accueil',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="chat"
          options={{
            title: 'Jul-IA',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="chatbubbles" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="evaluation"
          options={{
            title: 'Bilan',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="analytics" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="history"
          options={{
            title: 'Historique',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="time" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profil',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen name="first-time-consent" options={{ href: null }} />
        <Tabs.Screen name="data-policy" options={{ href: null }} />
        <Tabs.Screen name="withdraw-consent" options={{ href: null }} />
        <Tabs.Screen name="delete-account" options={{ href: null }} />
      </Tabs>
    </ChatProvider>
  );
}
