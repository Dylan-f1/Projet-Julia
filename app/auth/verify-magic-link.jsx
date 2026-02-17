import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../src/contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../../src/components/common/Loading';
import Alert from '../../src/components/common/Alert';
import Button from '../../src/components/common/Button';

export default function MagicLinkVerifyScreen() {
  const { token } = useLocalSearchParams();
  const { verifyMagicLink } = useAuth();
  const router = useRouter();
  const [status, setStatus] = useState('verifying');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    handleVerifyToken();
  }, [token]);

  const handleVerifyToken = async () => {
    if (!token) {
      setStatus('error');
      setErrorMessage('Token manquant. Veuillez utiliser le lien recu par email.');
      return;
    }

    setStatus('verifying');

    const result = await verifyMagicLink(token);

    if (result.success) {
      setStatus('success');

      // Verifier le consentement avant de rediriger
      setTimeout(async () => {
        const consentAccepted = await AsyncStorage.getItem('dataConsentAccepted');

        if (!consentAccepted || consentAccepted !== 'true') {
          // Pas de consentement -> ecran de consentement
          console.log('Redirection vers first-time-consent');
          router.replace('/patient/first-time-consent');
        } else {
          // Consentement deja donne -> home
          console.log('Redirection vers home');
          router.replace('/patient/home');
        }
      }, 1500);
    } else {
      setStatus('error');
      setErrorMessage(result.error || 'Le lien est invalide ou expire.');
    }
  };

  const handleRetry = () => {
    handleVerifyToken();
  };

  if (status === 'verifying') {
    return (
      <SafeAreaView className="flex-1 bg-cream-50">
        <View className="flex-1 justify-center items-center p-8">
          {/* Cercle animé avec spinner teal */}
          <View className="w-24 h-24 bg-primary-50 rounded-full items-center justify-center mb-8 border-2 border-primary-100"
            style={{
              shadowColor: '#14b8a6',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 16,
              elevation: 4,
            }}
          >
            <ActivityIndicator size="large" color="#14b8a6" />
          </View>
          <Text className="text-xl font-semibold text-primary-700 mb-2 text-center">
            Verification en cours
          </Text>
          <Text className="text-gray-500 text-center text-sm leading-5">
            Veuillez patienter pendant que nous verifions votre lien de connexion...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (status === 'success') {
    return (
      <SafeAreaView className="flex-1 bg-cream-50">
        <View className="flex-1 justify-center items-center p-8">
          {/* Cercle de succes accent-500 */}
          <View className="w-24 h-24 bg-accent-50 rounded-full items-center justify-center mb-8 border-2 border-accent-100"
            style={{
              shadowColor: '#22c55e',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.15,
              shadowRadius: 16,
              elevation: 4,
            }}
          >
            <Ionicons name="checkmark-circle" size={56} color="#22c55e" />
          </View>
          <Text className="text-2xl font-bold text-primary-700 mb-3 text-center">
            Connexion reussie !
          </Text>
          <Text className="text-gray-500 text-center text-sm leading-5">
            Redirection vers votre espace en cours...
          </Text>

          {/* Barre de progression douce */}
          <View className="w-48 h-1.5 bg-cream-200 rounded-full mt-8 overflow-hidden">
            <View className="h-full bg-accent-400 rounded-full w-2/3" />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  if (status === 'error') {
    return (
      <SafeAreaView className="flex-1 bg-cream-50">
        <View className="flex-1 justify-center items-center p-8">
          {/* Cercle d'erreur rose */}
          <View className="w-24 h-24 bg-rose-50 rounded-full items-center justify-center mb-8 border-2 border-rose-100"
            style={{
              shadowColor: '#f43f5e',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.12,
              shadowRadius: 16,
              elevation: 4,
            }}
          >
            <Ionicons name="close-circle" size={56} color="#f43f5e" />
          </View>

          <Text className="text-2xl font-bold text-primary-700 mb-3 text-center">
            Erreur de connexion
          </Text>

          {/* Alerte dans une carte douce */}
          <View className="w-full bg-white rounded-2xl p-5 mb-6"
            style={{
              shadowColor: '#f43f5e',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.06,
              shadowRadius: 12,
              elevation: 2,
            }}
          >
            <Alert
              type="danger"
              message={errorMessage}
            />
          </View>

          <Text className="text-gray-500 text-center text-sm leading-5 mb-8 px-4">
            Le lien de connexion peut avoir expire. Veuillez contacter votre therapeute pour recevoir un nouveau lien.
          </Text>

          {/* Bouton reessayer */}
          <TouchableOpacity
            onPress={handleRetry}
            className="bg-primary-500 rounded-2xl px-8 py-4 flex-row items-center justify-center"
            activeOpacity={0.8}
            style={{
              shadowColor: '#14b8a6',
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.2,
              shadowRadius: 8,
              elevation: 3,
            }}
          >
            <Ionicons name="refresh" size={20} color="#ffffff" />
            <Text className="text-white font-semibold text-base ml-2">Reessayer</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return null;
}
