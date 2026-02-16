// app/patient/first-time-consent.jsx
import React, { useState } from 'react';
import { View, Text, ScrollView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Button from '../../src/components/common/Button';

export default function FirstTimeConsentScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const isWeb = Platform.OS === 'web';

  const handleAccept = async () => {
    try {
      setLoading(true);

      // Stockage LOCAL du consentement (pas besoin de l'API pour l'instant)
      await AsyncStorage.setItem('dataConsentAccepted', 'true');
      await AsyncStorage.setItem('dataConsentDate', new Date().toISOString());

      console.log('✅ Consentement accepté et stocké localement');

      // TODO: Appeler l'API backend quand l'endpoint sera créé
      // const response = await fetch(`${API_URL}/api/patient/consent/accept`, {
      //   method: 'POST',
      //   headers: { 
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`
      //   }
      // });

      // Redirection vers home
      router.replace('/patient/home');

    } catch (error) {
      console.error('Erreur acceptation consentement:', error);
      
      // Affichage d'erreur compatible web + mobile
      if (Platform.OS === 'web') {
        alert('Erreur lors de l\'enregistrement du consentement');
      } else {
        Alert.alert(
          'Erreur',
          'Erreur lors de l\'enregistrement du consentement',
          [{ text: 'OK' }]
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDecline = () => {
    if (Platform.OS === 'web') {
      if (confirm('Sans consentement, vous ne pouvez pas utiliser l\'application. Souhaitez-vous vraiment refuser ?')) {
        router.replace('/auth/therapist-login');
      }
    } else {
      Alert.alert(
        'Refus du consentement',
        'Sans consentement, vous ne pouvez pas utiliser l\'application. Souhaitez-vous vraiment refuser ?',
        [
          { text: 'Annuler', style: 'cancel' },
          { 
            text: 'Refuser', 
            style: 'destructive',
            onPress: () => router.replace('/auth/therapist-login')
          }
        ]
      );
    }
  };

  const handleViewPolicy = () => {
    router.push('/patient/data-policy');
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className={`flex-1 ${isWeb ? 'max-w-2xl mx-auto w-full' : ''}`}>
        
        {/* Header */}
        <View className="bg-primary-600 px-6 py-8">
          <View className="items-center mb-4">
            <View className="w-20 h-20 bg-white/20 rounded-full items-center justify-center mb-4">
              <Ionicons name="shield-checkmark" size={40} color="white" />
            </View>
            <Text className="text-white text-2xl font-bold text-center">
              Protection de vos données
            </Text>
            <Text className="text-white/90 text-center mt-2">
              Votre vie privée est notre priorité
            </Text>
          </View>
        </View>

        {/* Content */}
        <ScrollView className="flex-1 px-6 py-6">
          
          <View className="bg-white rounded-xl p-6 mb-6 shadow-sm">
            <Text className="text-lg font-semibold text-gray-900 mb-4">
              Pourquoi avons-nous besoin de votre consentement ?
            </Text>
            
            <View className="space-y-4">
              <View className="flex-row items-start">
                <Ionicons name="checkmark-circle" size={24} color="#22c55e" className="mr-3 mt-1" />
                <View className="flex-1 ml-3">
                  <Text className="text-gray-900 font-medium mb-1">
                    Conformité RGPD
                  </Text>
                  <Text className="text-gray-600 text-sm">
                    Nous respectons le Règlement Général sur la Protection des Données
                  </Text>
                </View>
              </View>

              <View className="flex-row items-start">
                <Ionicons name="checkmark-circle" size={24} color="#22c55e" className="mr-3 mt-1" />
                <View className="flex-1 ml-3">
                  <Text className="text-gray-900 font-medium mb-1">
                    Transparence totale
                  </Text>
                  <Text className="text-gray-600 text-sm">
                    Vous savez exactement quelles données sont collectées et pourquoi
                  </Text>
                </View>
              </View>

              <View className="flex-row items-start">
                <Ionicons name="checkmark-circle" size={24} color="#22c55e" className="mr-3 mt-1" />
                <View className="flex-1 ml-3">
                  <Text className="text-gray-900 font-medium mb-1">
                    Contrôle de vos données
                  </Text>
                  <Text className="text-gray-600 text-sm">
                    Vous pouvez retirer votre consentement à tout moment
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View className="bg-blue-50 rounded-xl p-6 mb-6 border border-blue-200">
            <View className="flex-row items-start">
              <Ionicons name="information-circle" size={24} color="#3b82f6" className="mr-3" />
              <View className="flex-1 ml-3">
                <Text className="text-blue-900 font-medium mb-2">
                  Données collectées
                </Text>
                <Text className="text-blue-800 text-sm mb-2">
                  • Messages avec l'IA Jul-IA
                </Text>
                <Text className="text-blue-800 text-sm mb-2">
                  • Auto-évaluations et suivis
                </Text>
                <Text className="text-blue-800 text-sm mb-2">
                  • Informations de profil
                </Text>
                <Text className="text-blue-800 text-sm">
                  • Données de navigation (anonymisées)
                </Text>
              </View>
            </View>
          </View>

          <View className="mb-6">
            <Button
              variant="outline"
              onPress={handleViewPolicy}
              className="mb-4"
            >
              📄 Lire la politique complète
            </Button>
          </View>

        </ScrollView>

        {/* Footer Actions */}
        <View className="bg-white border-t border-gray-200 px-6 py-4">
          <Button
            onPress={handleAccept}
            loading={loading}
            className="mb-3"
          >
            ✓ J'accepte et je continue
          </Button>
          
          <Button
            variant="ghost"
            onPress={handleDecline}
            disabled={loading}
          >
            Refuser
          </Button>
        </View>

      </View>
    </SafeAreaView>
  );
}