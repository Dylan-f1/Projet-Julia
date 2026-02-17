import React, { useState } from 'react';
import { View, Text, ScrollView, Platform, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FirstTimeConsentScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const isWeb = Platform.OS === 'web';

  const handleAccept = async () => {
    try {
      setLoading(true);

      await AsyncStorage.setItem('dataConsentAccepted', 'true');
      await AsyncStorage.setItem('dataConsentDate', new Date().toISOString());

      console.log('Consentement accepte et stocke localement');

      // TODO: Appeler l'API backend quand l'endpoint sera cree
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
    <SafeAreaView className="flex-1 bg-surface-50">
      <View className={`flex-1 ${isWeb ? 'max-w-2xl mx-auto w-full' : ''}`}>

        {/* Header area - bg patient-50, rounded-b-3xl */}
        <View
          className="px-6 py-8"
          style={{
            backgroundColor: '#EEF4FB',
            borderBottomLeftRadius: 32,
            borderBottomRightRadius: 32,
          }}
        >
          <View className="items-center mb-4">
            <View
              className="w-20 h-20 rounded-full items-center justify-center mb-4"
              style={{ backgroundColor: 'rgba(91, 155, 213, 0.2)' }}
            >
              <Ionicons name="shield-checkmark" size={40} color="#5B9BD5" />
            </View>
            <Text className="text-2xl font-bold text-center" style={{ color: '#1A1A1A' }}>
              Protection de vos donnees
            </Text>
            <Text className="text-center mt-2" style={{ color: '#6B6B6B' }}>
              Votre vie privee est notre priorite
            </Text>
          </View>
        </View>

        {/* Content */}
        <ScrollView className="flex-1 px-6 py-6">

          {/* Consent items - white cards with success-400 checkmark icons */}
          <View
            className="rounded-xl p-6 mb-6"
            style={{
              backgroundColor: '#FFFFFF',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.04,
              shadowRadius: 4,
              elevation: 2,
            }}
          >
            <Text className="text-lg font-semibold mb-4" style={{ color: '#1A1A1A' }}>
              Pourquoi avons-nous besoin de votre consentement ?
            </Text>

            <View className="space-y-4">
              <View className="flex-row items-start">
                <Ionicons name="checkmark-circle" size={24} color="#4CAF82" style={{ marginTop: 2 }} />
                <View className="flex-1 ml-3">
                  <Text className="font-medium mb-1" style={{ color: '#1A1A1A' }}>
                    Conformite RGPD
                  </Text>
                  <Text className="text-sm" style={{ color: '#6B6B6B' }}>
                    Nous respectons le Reglement General sur la Protection des Donnees
                  </Text>
                </View>
              </View>

              <View className="flex-row items-start">
                <Ionicons name="checkmark-circle" size={24} color="#4CAF82" style={{ marginTop: 2 }} />
                <View className="flex-1 ml-3">
                  <Text className="font-medium mb-1" style={{ color: '#1A1A1A' }}>
                    Transparence totale
                  </Text>
                  <Text className="text-sm" style={{ color: '#6B6B6B' }}>
                    Vous savez exactement quelles donnees sont collectees et pourquoi
                  </Text>
                </View>
              </View>

              <View className="flex-row items-start">
                <Ionicons name="checkmark-circle" size={24} color="#4CAF82" style={{ marginTop: 2 }} />
                <View className="flex-1 ml-3">
                  <Text className="font-medium mb-1" style={{ color: '#1A1A1A' }}>
                    Controle de vos donnees
                  </Text>
                  <Text className="text-sm" style={{ color: '#6B6B6B' }}>
                    Vous pouvez retirer votre consentement a tout moment
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Data collected - bg patient-50, border patient-200 */}
          <View
            className="rounded-xl p-6 mb-6"
            style={{
              backgroundColor: '#EEF4FB',
              borderWidth: 1,
              borderColor: '#A9C9EB',
            }}
          >
            <View className="flex-row items-start">
              <Ionicons name="information-circle" size={24} color="#5B9BD5" style={{ marginTop: 2 }} />
              <View className="flex-1 ml-3">
                <Text className="font-medium mb-2" style={{ color: '#1A1A1A' }}>
                  Donnees collectees
                </Text>
                <Text className="text-sm mb-2" style={{ color: '#404040' }}>
                  {'\u2022'} Messages avec l'IA Jul-IA
                </Text>
                <Text className="text-sm mb-2" style={{ color: '#404040' }}>
                  {'\u2022'} Auto-evaluations et suivis
                </Text>
                <Text className="text-sm mb-2" style={{ color: '#404040' }}>
                  {'\u2022'} Informations de profil
                </Text>
                <Text className="text-sm" style={{ color: '#404040' }}>
                  {'\u2022'} Donnees de navigation (anonymisees)
                </Text>
              </View>
            </View>
          </View>

          <View className="mb-6">
            <TouchableOpacity
              onPress={handleViewPolicy}
              className="flex-row items-center justify-center py-3.5 rounded-xl"
              style={{
                borderWidth: 2,
                borderColor: '#A9C9EB',
                backgroundColor: '#FFFFFF',
              }}
              activeOpacity={0.7}
            >
              <Ionicons name="document-text-outline" size={18} color="#5B9BD5" />
              <Text className="font-semibold ml-2" style={{ color: '#5B9BD5' }}>
                Lire la politique complete
              </Text>
            </TouchableOpacity>
          </View>

        </ScrollView>

        {/* Footer Actions */}
        <View
          className="px-6 py-4"
          style={{
            backgroundColor: '#FAFAFA',
            borderTopWidth: 1,
            borderTopColor: '#EEECEB',
          }}
        >
          {/* Accept button - bg patient-400 */}
          <TouchableOpacity
            onPress={handleAccept}
            disabled={loading}
            className="flex-row items-center justify-center py-4 rounded-xl mb-3"
            style={{
              backgroundColor: '#5B9BD5',
              opacity: loading ? 0.6 : 1,
            }}
            activeOpacity={0.8}
          >
            <Ionicons name="checkmark-circle" size={20} color="white" />
            <Text className="text-white font-bold text-base ml-2">
              {loading ? 'Enregistrement...' : 'J\'accepte et je continue'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleDecline}
            disabled={loading}
            className="flex-row items-center justify-center py-3.5 rounded-xl"
            activeOpacity={0.7}
          >
            <Text className="font-medium text-base" style={{ color: '#6B6B6B' }}>Refuser</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
}
