// app/patient/profile.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Platform, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../src/contexts/AuthContext';
import { useRouter } from 'expo-router';
import Button from '../../src/components/common/Button';
import Card from '../../src/components/common/Card';
import Divider from '../../src/components/common/Divider';
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
        
        // Sur web, télécharger le fichier
        if (Platform.OS === 'web') {
          const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `julia-app-data-${new Date().toISOString()}.json`;
          a.click();
          window.URL.revokeObjectURL(url);
          Alert.alert('Succès', 'Vos données ont été exportées');
        } else {
          Alert.alert('Export réussi', 'Vos données ont été exportées');
        }
      } else {
        throw new Error('Erreur export');
      }
    } catch (error) {
      console.error('Erreur export données:', error);
      Alert.alert('Erreur', 'Impossible d\'exporter vos données');
    } finally {
      setLoading(false);
    }
  };

  const handleWithdrawConsent = () => {
    Alert.alert(
      'Retirer le consentement',
      'En retirant votre consentement, vous ne pourrez plus utiliser Julia App. Vos données seront supprimées dans un délai de 30 jours. Souhaitez-vous continuer ?',
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
      'Cette action est irréversible. Toutes vos données seront définitivement supprimées. Êtes-vous absolument sûr ?',
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

  const SettingItem = ({ icon, label, value, onPress, iconColor = "#0284c7", danger = false }) => (
    <TouchableOpacity 
      onPress={onPress}
      className={`flex-row items-center justify-between py-3 ${isWeb ? 'hover:bg-gray-50' : ''}`}
    >
      <View className="flex-row items-center flex-1">
        <View className={`w-8 h-8 ${danger ? 'bg-red-100' : 'bg-gray-100'} rounded-full items-center justify-center mr-3`}>
          <Ionicons name={icon} size={16} color={danger ? '#ef4444' : iconColor} />
        </View>
        <Text className={`text-base ${danger ? 'text-red-600' : 'text-gray-900'}`}>{label}</Text>
      </View>
      {value && <Text className="text-sm text-gray-500 mr-2">{value}</Text>}
      <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
    </TouchableOpacity>
  );

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
            {/* Colonne gauche : À propos de Jul-IA */}
            <View className={isWeb ? 'flex-1' : ''}>
              <Card className="mb-4">
                <View className="flex-row items-center mb-4">
                  <View className="w-10 h-10 bg-primary-100 rounded-full items-center justify-center mr-3">
                    <Ionicons name="heart" size={20} color="#0284c7" />
                  </View>
                  <Text className="text-lg font-semibold text-gray-900">
                    À propos de Jul-IA
                  </Text>
                </View>
                
                <Text className="text-gray-700 leading-6 mb-3">
                  Jul-IA est votre compagnon thérapeutique disponible 24/7. Partagez vos pensées, 
                  émotions et préoccupations en toute confidentialité.
                </Text>
                <Text className="text-gray-700 leading-6">
                  Vos conversations sont privées et accessibles uniquement par vous et votre thérapeute.
                </Text>
              </Card>

              {/* Protection des données */}
              <Card className="mb-4">
                <View className="flex-row items-center mb-4">
                  <View className="w-10 h-10 bg-primary-100 rounded-full items-center justify-center mr-3">
                    <Ionicons name="shield-checkmark" size={20} color="#0284c7" />
                  </View>
                  <Text className="text-lg font-semibold text-gray-900">
                    Protection des données
                  </Text>
                </View>

                {consentDate && (
                  <>
                    <View className="mb-3">
                      <Text className="text-sm text-gray-500 mb-1">Consentement RGPD</Text>
                      <Text className="text-base text-gray-900">Accepté le {consentDate}</Text>
                    </View>
                    <Divider />
                  </>
                )}

                <SettingItem
                  icon="document-text-outline"
                  label="Politique de confidentialité"
                  onPress={() => router.push('/patient/data-policy')}
                />
                
                <Divider />

                <SettingItem
                  icon="download-outline"
                  label="Exporter mes données"
                  onPress={handleExportData}
                />

                <Divider />

                <SettingItem
                  icon="alert-circle-outline"
                  label="Retirer mon consentement"
                  onPress={handleWithdrawConsent}
                  iconColor="#f59e0b"
                />
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

              {/* Support et aide */}
              <Card className="mb-4">
                <View className="flex-row items-center mb-4">
                  <View className="w-10 h-10 bg-primary-100 rounded-full items-center justify-center mr-3">
                    <Ionicons name="help-circle" size={20} color="#0284c7" />
                  </View>
                  <Text className="text-lg font-semibold text-gray-900">
                    Support
                  </Text>
                </View>

                <SettingItem
                  icon="chatbubbles-outline"
                  label="Centre d'aide"
                  onPress={() => router.push('/patient/help')}
                />

                <Divider />

                <SettingItem
                  icon="mail-outline"
                  label="Contacter le support"
                  onPress={() => router.push('/patient/contact-support')}
                />
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

          {/* Zone dangereuse */}
          <Card className="mb-4 border-red-200">
            <View className="flex-row items-center mb-4">
              <View className="w-10 h-10 bg-red-100 rounded-full items-center justify-center mr-3">
                <Ionicons name="warning" size={20} color="#ef4444" />
              </View>
              <Text className="text-lg font-semibold text-red-600">
                Suppresion du Compte
              </Text>
            </View>

            <SettingItem
              icon="trash-outline"
              label="Supprimer mon compte"
              onPress={handleDeleteAccount}
              danger={true}
            />
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