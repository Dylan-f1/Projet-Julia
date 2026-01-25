import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../src/contexts/AuthContext';
import Button from '../../src/components/common/Button';
import Card from '../../src/components/common/Card';
import Divider from '../../src/components/common/Divider';
import Badge from '../../src/components/common/Badge';

export default function TherapistProfileScreen() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 p-4">
        <Card className="mb-4 items-center py-6">
          <View className="w-24 h-24 bg-secondary-100 rounded-full items-center justify-center mb-4">
            <Ionicons name="medical" size={48} color="#c026d3" />
          </View>
          
          {user && (
            <>
              <Text className="text-xl font-bold text-gray-900 mb-1">
                Dr. {user.firstName} {user.lastName}
              </Text>
              <Text className="text-sm text-gray-600 mb-3">{user.email}</Text>
              {user.specialty && (
                <Badge label={user.specialty} variant="secondary" />
              )}
            </>
          )}
        </Card>

        <Card className="mb-4">
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            Informations professionnelles
          </Text>
          
          {user?.specialty && (
            <>
              <View className="mb-3">
                <Text className="text-sm text-gray-500 mb-1">Spécialité</Text>
                <Text className="text-base text-gray-900">{user.specialty}</Text>
              </View>
              <Divider />
            </>
          )}

          {user?.phone && (
            <>
              <View className="mb-3">
                <Text className="text-sm text-gray-500 mb-1">Téléphone</Text>
                <Text className="text-base text-gray-900">{user.phone}</Text>
              </View>
              <Divider />
            </>
          )}

          {user?.licenseNumber && (
            <>
              <View className="mb-3">
                <Text className="text-sm text-gray-500 mb-1">Numéro ADELI/RPPS</Text>
                <Text className="text-base text-gray-900">{user.licenseNumber}</Text>
              </View>
              <Divider />
            </>
          )}

          <View>
            <Text className="text-sm text-gray-500 mb-1">Membre depuis</Text>
            <Text className="text-base text-gray-900">
              {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('fr-FR') : 'N/A'}
            </Text>
          </View>
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
          icon={<Ionicons name="log-out-outline" size={20} color="#c026d3" />}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
