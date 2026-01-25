import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../src/contexts/AuthContext';
import Button from '../../src/components/common/Button';
import Card from '../../src/components/common/Card';
import Divider from '../../src/components/common/Divider';

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 p-4">
        <Card className="mb-4 items-center py-6">
          <View className="w-24 h-24 bg-primary-100 rounded-full items-center justify-center mb-4">
            <Ionicons name="person" size={48} color="#0284c7" />
          </View>
          
          {user && (
            <>
              <Text className="text-xl font-bold text-gray-900 mb-1">
                {user.firstName} {user.lastName}
              </Text>
              <Text className="text-sm text-gray-600">{user.email}</Text>
            </>
          )}
        </Card>

        <Card className="mb-4">
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            À propos de Julia
          </Text>
          <Text className="text-gray-700 leading-6 mb-3">
            Julia est votre compagnon thérapeutique disponible 24/7. Partagez vos pensées, 
            émotions et préoccupations en toute confidentialité.
          </Text>
          <Text className="text-gray-700 leading-6">
            Vos conversations sont privées et accessibles uniquement par vous et votre thérapeute.
          </Text>
        </Card>

        <Card className="mb-4">
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            Paramètres
          </Text>
          
          <View className="mb-3">
            <Text className="text-sm text-gray-500 mb-1">Notifications</Text>
            <Text className="text-base text-gray-900">Activées</Text>
          </View>

          <Divider />

          <View className="mb-3">
            <Text className="text-sm text-gray-500 mb-1">Langue</Text>
            <Text className="text-base text-gray-900">Français</Text>
          </View>

          <Divider />

          <View>
            <Text className="text-sm text-gray-500 mb-1">Version</Text>
            <Text className="text-base text-gray-900">1.0.0</Text>
          </View>
        </Card>

        <Button
          title="Se déconnecter"
          onPress={handleLogout}
          variant="outline"
          icon={<Ionicons name="log-out-outline" size={20} color="#0284c7" />}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
