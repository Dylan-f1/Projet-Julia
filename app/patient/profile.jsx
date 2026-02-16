// app/patient/profile.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Platform, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../src/contexts/AuthContext';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const isWeb = Platform.OS === 'web';
  const [consentDate, setConsentDate] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadConsentInfo();
  }, []);

  const loadConsentInfo = async () => {
    try {
      const consent = await AsyncStorage.getItem('dataConsentDate');
      if (consent) {
        setConsentDate(new Date(consent).toLocaleDateString('fr-FR'));
      }
    } catch (error) {
      console.error('Erreur chargement consentement:', error);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  const handleExportData = async () => {
    try {
      setLoading(true);

      const storage = Platform.OS === 'web' ? AsyncStorage : SecureStore;
      const token = await (Platform.OS === 'web'
        ? storage.getItem('patientToken')
        : storage.getItemAsync('patientToken'));

      const response = await fetch('http://localhost:3000/api/patient/export-data', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();

        // Sur web, telecharger le fichier
        if (Platform.OS === 'web') {
          const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `julia-app-data-${new Date().toISOString()}.json`;
          a.click();
          window.URL.revokeObjectURL(url);
          Alert.alert('Succes', 'Vos donnees ont ete exportees');
        } else {
          Alert.alert('Export reussi', 'Vos donnees ont ete exportees');
        }
      } else {
        throw new Error('Erreur export');
      }
    } catch (error) {
      console.error('Erreur export donnees:', error);
      Alert.alert('Erreur', 'Impossible d\'exporter vos donnees');
    } finally {
      setLoading(false);
    }
  };

  const handleWithdrawConsent = () => {
    Alert.alert(
      'Retirer le consentement',
      'En retirant votre consentement, vous ne pourrez plus utiliser Julia App. Vos donnees seront supprimees dans un delai de 30 jours. Souhaitez-vous continuer ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Retirer',
          style: 'destructive',
          onPress: () => router.push('/patient/withdraw-consent')
        }
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Supprimer le compte',
      'Cette action est irreversible. Toutes vos donnees seront definitivement supprimees. Etes-vous absolument sur ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: () => router.push('/patient/delete-account')
        }
      ]
    );
  };

  const SettingItem = ({ icon, label, value, onPress, iconColor = "#5B9BD5", danger = false }) => (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center justify-between py-3.5"
      activeOpacity={0.7}
    >
      <View className="flex-row items-center flex-1">
        <View
          className="w-9 h-9 rounded-xl items-center justify-center mr-3"
          style={{ backgroundColor: danger ? '#FEF0F0' : '#EEF4FB' }}
        >
          <Ionicons name={icon} size={16} color={danger ? '#E05B5B' : iconColor} />
        </View>
        <Text
          className="text-base"
          style={{ color: danger ? '#E05B5B' : '#1A1A1A' }}
        >
          {label}
        </Text>
      </View>
      {value && <Text className="text-sm mr-2" style={{ color: '#6B6B6B' }}>{value}</Text>}
      <Ionicons name="chevron-forward" size={18} color={danger ? '#FCCECE' : '#D4E4F5'} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-surface-50">
      <View className={`flex-1 ${isWeb ? 'max-w-4xl mx-auto w-full' : ''}`}>
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ padding: isWeb ? 32 : 16 }}
          showsVerticalScrollIndicator={!isWeb}
        >
          {/* Profile Header Card - LARGE centered avatar, patient-400 bg, white card rounded-3xl */}
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
              style={{ backgroundColor: '#5B9BD5' }}
            >
              <Ionicons name="person" size={48} color="#FFFFFF" />
            </View>

            {user && (
              <>
                <Text className="text-xl font-bold mb-1" style={{ color: '#1A1A1A' }}>
                  {user.firstName} {user.lastName}
                </Text>
                <Text className="text-sm" style={{ color: '#6B6B6B' }}>{user.email}</Text>
              </>
            )}
          </View>

          {/* Layout en grille sur desktop */}
          <View className={isWeb ? 'flex-row gap-4' : ''}>
            {/* Colonne gauche */}
            <View className={isWeb ? 'flex-1' : ''}>

              {/* About Jul-IA Section - white card, left border 4px ai-400 */}
              <View
                className="mb-4 rounded-xl p-5"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderLeftWidth: 4,
                  borderLeftColor: '#F0A8A0',
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
                    style={{ backgroundColor: '#FEF4F3' }}
                  >
                    <Ionicons name="heart" size={20} color="#F0A8A0" />
                  </View>
                  <Text className="text-lg font-semibold" style={{ color: '#1A1A1A' }}>
                    A propos de Jul-IA
                  </Text>
                </View>

                <Text className="leading-6 mb-3" style={{ color: '#404040' }}>
                  Jul-IA est votre compagnon therapeutique disponible 24/7. Partagez vos pensees,
                  emotions et preoccupations en toute confidentialite.
                </Text>
                <Text className="leading-6" style={{ color: '#404040' }}>
                  Vos conversations sont privees et accessibles uniquement par vous et votre therapeute.
                </Text>
              </View>

              {/* Data Protection - white card, left border 4px patient-400 */}
              <View
                className="mb-4 rounded-xl p-5"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderLeftWidth: 4,
                  borderLeftColor: '#5B9BD5',
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
                    style={{ backgroundColor: '#EEF4FB' }}
                  >
                    <Ionicons name="shield-checkmark" size={20} color="#5B9BD5" />
                  </View>
                  <Text className="text-lg font-semibold" style={{ color: '#1A1A1A' }}>
                    Protection des donnees
                  </Text>
                </View>

                {consentDate && (
                  <View className="mb-3 pb-3" style={{ borderBottomWidth: 1, borderBottomColor: '#EEECEB' }}>
                    <Text className="text-sm mb-1" style={{ color: '#6B6B6B' }}>Consentement RGPD</Text>
                    <Text className="text-base" style={{ color: '#1A1A1A' }}>Accepte le {consentDate}</Text>
                  </View>
                )}

                <SettingItem
                  icon="document-text-outline"
                  label="Politique de confidentialite"
                  onPress={() => router.push('/patient/data-policy')}
                />

                <View style={{ height: 1, backgroundColor: '#EEECEB' }} />

                <SettingItem
                  icon="download-outline"
                  label="Exporter mes donnees"
                  onPress={handleExportData}
                />

                <View style={{ height: 1, backgroundColor: '#EEECEB' }} />

                <SettingItem
                  icon="alert-circle-outline"
                  label="Retirer mon consentement"
                  onPress={handleWithdrawConsent}
                  iconColor="#E8A838"
                />
              </View>
            </View>

            {/* Colonne droite */}
            <View className={isWeb ? 'flex-1' : ''}>

              {/* Settings - white card, standard (no border accent) */}
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

              {/* Support */}
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
                    style={{ backgroundColor: '#EEF4FB' }}
                  >
                    <Ionicons name="help-circle" size={20} color="#5B9BD5" />
                  </View>
                  <Text className="text-lg font-semibold" style={{ color: '#1A1A1A' }}>
                    Support
                  </Text>
                </View>

                <SettingItem
                  icon="chatbubbles-outline"
                  label="Centre d'aide"
                  onPress={() => router.push('/patient/help')}
                />

                <View style={{ height: 1, backgroundColor: '#EEECEB' }} />

                <SettingItem
                  icon="mail-outline"
                  label="Contacter le support"
                  onPress={() => router.push('/patient/contact-support')}
                />
              </View>
            </View>
          </View>

          {/* Danger Zone - bg danger-50, left border 4px danger-400 */}
          <View
            className="mb-4 rounded-xl p-5"
            style={{
              backgroundColor: '#FEF0F0',
              borderLeftWidth: 4,
              borderLeftColor: '#E05B5B',
            }}
          >
            <View className="flex-row items-center mb-4">
              <View
                className="w-10 h-10 rounded-xl items-center justify-center mr-3"
                style={{ backgroundColor: '#FCCECE' }}
              >
                <Ionicons name="warning" size={20} color="#E05B5B" />
              </View>
              <Text className="text-lg font-semibold" style={{ color: '#E05B5B' }}>
                Zone dangereuse
              </Text>
            </View>

            <SettingItem
              icon="trash-outline"
              label="Supprimer mon compte"
              onPress={handleDeleteAccount}
              danger={true}
            />
          </View>

          {/* Logout button - outline, border danger-400, text danger-400, rounded-xl */}
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
