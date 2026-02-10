import React from 'react';
import { View, Text, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../src/contexts/AuthContext';
import Button from '../../src/components/common/Button';
import Card from '../../src/components/common/Card';
import Divider from '../../src/components/common/Divider';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const isWeb = Platform.OS === 'web';

  const handleLogout = async () => {
    await logout();
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Conteneur responsive centré */}
      <View className={`flex-1 ${isWeb ? 'max-w-4xl mx-auto w-full' : ''}`}>
        <ScrollView 
          className="flex-1" 
          contentContainerStyle={{ padding: isWeb ? 32 : 16 }}
          showsVerticalScrollIndicator={!isWeb}
        >
          {/* Header avec avatar et infos */}
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

          {/* Layout en grille sur desktop */}
          <View className={isWeb ? 'flex-row gap-4' : ''}>
            {/* Colonne gauche : À propos de Julia */}
            <View className={isWeb ? 'flex-1' : ''}>
              <Card className="mb-4">
                <View className="flex-row items-center mb-4">
                  <View className="w-10 h-10 bg-primary-100 rounded-full items-center justify-center mr-3">
                    <Ionicons name="heart" size={20} color="#0284c7" />
                  </View>
                  <Text className="text-lg font-semibold text-gray-900">
                    À propos de Julia
                  </Text>
                </View>
                
                <Text className="text-gray-700 leading-6 mb-3">
                  Julia est votre compagnon thérapeutique disponible 24/7. Partagez vos pensées, 
                  émotions et préoccupations en toute confidentialité.
                </Text>
                <Text className="text-gray-700 leading-6">
                  Vos conversations sont privées et accessibles uniquement par vous et votre thérapeute.
                </Text>
              </Card>
            </View>

            {/* Colonne droite : Paramètres */}
            <View className={isWeb ? 'flex-1' : ''}>
              <Card className="mb-4">
                <View className="flex-row items-center mb-4">
                  <View className="w-10 h-10 bg-primary-100 rounded-full items-center justify-center mr-3">
                    <Ionicons name="settings" size={20} color="#0284c7" />
                  </View>
                  <Text className="text-lg font-semibold text-gray-900">
                    Paramètres
                  </Text>
                </View>
                
                <View className="mb-3">
                  <Text className="text-sm text-gray-500 mb-1">Notifications</Text>
                  <View className="flex-row items-center justify-between">
                    <Text className="text-base text-gray-900">Activées</Text>
                    <View className="w-2 h-2 bg-green-500 rounded-full" />
                  </View>
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
            </View>
          </View>

          {/* Informations sur la confidentialité */}
          <Card className="mb-4 bg-blue-50 border-blue-200">
            <View className="flex-row items-start">
              <Ionicons name="shield-checkmark" size={24} color="#0284c7" className="mr-3" />
              <View className="flex-1 ml-3">
                <Text className="text-sm font-semibold text-blue-900 mb-1">
                  Vos données sont sécurisées
                </Text>
                <Text className="text-xs text-blue-700 leading-5">
                  Toutes vos conversations sont cryptées de bout en bout. Seul votre thérapeute peut 
                  accéder à vos données avec votre consentement.
                </Text>
              </View>
            </View>
          </Card>

          {/* Bouton de déconnexion */}
          <View className={isWeb ? 'max-w-md mx-auto w-full' : ''}>
            <Button
              title="Se déconnecter"
              onPress={handleLogout}
              variant="outline"
              icon={<Ionicons name="log-out-outline" size={20} color="#0284c7" />}
              className={isWeb ? 'hover:bg-red-50 hover:border-red-500' : ''}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}