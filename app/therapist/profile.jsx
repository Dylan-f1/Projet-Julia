import React from 'react';
import { View, Text, ScrollView, Platform, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../src/contexts/AuthContext';
import Badge from '../../src/components/common/Badge';

export default function TherapistProfileScreen() {
  const { user, logout } = useAuth();
  const isWeb = Platform.OS === 'web';

  const handleLogout = async () => {
    await logout();
  };

  return (
    <SafeAreaView className="flex-1 bg-surface-50">
      {/* Conteneur responsive centre */}
      <View className={`flex-1 ${isWeb ? 'max-w-4xl mx-auto w-full' : ''}`}>
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ padding: isWeb ? 32 : 16 }}
          showsVerticalScrollIndicator={!isWeb}
        >
          {/* Header avec avatar et infos principales - white card, avatar bg therapist-400 */}
          <View
            className="mb-4 items-center py-8 rounded-3xl"
            style={{
              backgroundColor: '#FFFFFF',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.06,
              shadowRadius: 8,
              elevation: 3,
            }}
          >
            <View
              className="w-24 h-24 rounded-full items-center justify-center mb-4"
              style={{ backgroundColor: '#E8A838' }}
            >
              <Ionicons name="medical" size={48} color="#FFFFFF" />
            </View>

            {user && (
              <>
                <Text className="text-xl font-bold mb-1" style={{ color: '#1A1A1A' }}>
                  Dr. {user.firstName} {user.lastName}
                </Text>
                <Text className="text-sm mb-3" style={{ color: '#6B6B6B' }}>{user.email}</Text>
                {user.specialty && (
                  <Badge label={user.specialty} variant="secondary" />
                )}
              </>
            )}
          </View>

          {/* Layout en grille sur desktop */}
          <View className={isWeb ? 'flex-row gap-4' : ''}>
            {/* Colonne gauche : Informations professionnelles - left border 4px therapist-400 */}
            <View className={isWeb ? 'flex-1' : ''}>
              <View
                className="mb-4 rounded-xl p-5"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderLeftWidth: 4,
                  borderLeftColor: '#E8A838',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.04,
                  shadowRadius: 4,
                  elevation: 2,
                }}
              >
                <View className="flex-row items-center mb-4">
                  <View
                    className="w-10 h-10 rounded-xl items-center justify-center mr-3"
                    style={{ backgroundColor: '#FDF6EA' }}
                  >
                    <Ionicons name="briefcase" size={20} color="#E8A838" />
                  </View>
                  <Text className="text-lg font-semibold" style={{ color: '#1A1A1A' }}>
                    Informations professionnelles
                  </Text>
                </View>

                {user?.specialty && (
                  <>
                    <View className="mb-3">
                      <Text className="text-sm mb-1" style={{ color: '#6B6B6B' }}>Specialite</Text>
                      <Text className="text-base" style={{ color: '#1A1A1A' }}>{user.specialty}</Text>
                    </View>
                    <View style={{ height: 1, backgroundColor: '#EEECEB' }} />
                  </>
                )}

                {user?.phone && (
                  <>
                    <View className="mb-3 mt-3">
                      <Text className="text-sm mb-1" style={{ color: '#6B6B6B' }}>Telephone</Text>
                      <Text className="text-base" style={{ color: '#1A1A1A' }}>{user.phone}</Text>
                    </View>
                    <View style={{ height: 1, backgroundColor: '#EEECEB' }} />
                  </>
                )}

                {user?.licenseNumber && (
                  <>
                    <View className="mb-3 mt-3">
                      <Text className="text-sm mb-1" style={{ color: '#6B6B6B' }}>Numero ADELI/RPPS</Text>
                      <Text className="text-base" style={{ color: '#1A1A1A' }}>{user.licenseNumber}</Text>
                    </View>
                    <View style={{ height: 1, backgroundColor: '#EEECEB' }} />
                  </>
                )}

                <View className="mt-3">
                  <Text className="text-sm mb-1" style={{ color: '#6B6B6B' }}>Membre depuis</Text>
                  <Text className="text-base" style={{ color: '#1A1A1A' }}>
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('fr-FR') : 'N/A'}
                  </Text>
                </View>
              </View>
            </View>

            {/* Colonne droite : Parametres - white card, rounded-xl */}
            <View className={isWeb ? 'flex-1' : ''}>
              <View
                className="mb-4 rounded-xl p-5"
                style={{
                  backgroundColor: '#FFFFFF',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.04,
                  shadowRadius: 4,
                  elevation: 2,
                }}
              >
                <View className="flex-row items-center mb-4">
                  <View
                    className="w-10 h-10 rounded-xl items-center justify-center mr-3"
                    style={{ backgroundColor: '#F5F5F4' }}
                  >
                    <Ionicons name="settings" size={20} color="#6B6B6B" />
                  </View>
                  <Text className="text-lg font-semibold" style={{ color: '#1A1A1A' }}>
                    Parametres
                  </Text>
                </View>

                <View className="mb-3">
                  <Text className="text-sm mb-1" style={{ color: '#6B6B6B' }}>Notifications</Text>
                  <View className="flex-row items-center justify-between">
                    <Text className="text-base" style={{ color: '#1A1A1A' }}>Activees</Text>
                    <View className="w-2 h-2 rounded-full" style={{ backgroundColor: '#4CAF82' }} />
                  </View>
                </View>

                <View style={{ height: 1, backgroundColor: '#EEECEB' }} />

                <View className="mb-3 mt-3">
                  <Text className="text-sm mb-1" style={{ color: '#6B6B6B' }}>Langue</Text>
                  <Text className="text-base" style={{ color: '#1A1A1A' }}>Francais</Text>
                </View>

                <View style={{ height: 1, backgroundColor: '#EEECEB' }} />

                <View className="mt-3">
                  <Text className="text-sm mb-1" style={{ color: '#6B6B6B' }}>Version</Text>
                  <Text className="text-base" style={{ color: '#1A1A1A' }}>1.0.0</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Bouton de deconnexion - outline, border danger-400 */}
          <View className={isWeb ? 'max-w-md mx-auto w-full' : ''}>
            <TouchableOpacity
              onPress={handleLogout}
              className="flex-row items-center justify-center py-4 rounded-xl mb-6"
              style={{
                borderWidth: 2,
                borderColor: '#E05B5B',
                backgroundColor: 'transparent',
              }}
              activeOpacity={0.7}
            >
              <Ionicons name="log-out-outline" size={20} color="#E05B5B" />
              <Text className="font-semibold text-base ml-2" style={{ color: '#E05B5B' }}>
                Se deconnecter
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
