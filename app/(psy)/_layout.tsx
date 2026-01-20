import { Tabs } from 'expo-router';
import { Text, View } from 'react-native';
import { Badge } from '@/components/ui';

export default function PsyLayout() {
  const unreadAlerts = 2; 

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
        name="dashboard"
        options={{
          title: 'Patients',
          tabBarIcon: () => <Text style={{ fontSize: 24 }}>👥</Text>,
        }}
      />
      <Tabs.Screen
        name="syntheses"
        options={{
          title: 'Synthèses',
          tabBarIcon: () => <Text style={{ fontSize: 24 }}>📝</Text>,
        }}
      />
      <Tabs.Screen
        name="alertes"
        options={{
          title: 'Alertes',
          tabBarIcon: () => (
            <View>
              <Text style={{ fontSize: 24 }}>🔔</Text>
              {unreadAlerts > 0 && (
                <View className="absolute -top-1 -right-1">
                  <Badge count={unreadAlerts} size="sm" variant="error" />
                </View>
              )}
            </View>
          ),
        }}
      />
    </Tabs>
  );
}