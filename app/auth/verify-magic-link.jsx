// app/(auth)/verify-magic-link.jsx
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
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
      setErrorMessage('Token manquant. Veuillez utiliser le lien reçu par email.');
      return;
    }

    setStatus('verifying');
    
    const result = await verifyMagicLink(token);

    if (result.success) {
      setStatus('success');
      
      // 🔥 CHANGEMENT ICI : Vérifier le consentement avant de rediriger
      setTimeout(async () => {
        const consentAccepted = await AsyncStorage.getItem('dataConsentAccepted');
        
        if (!consentAccepted || consentAccepted !== 'true') {
          // Pas de consentement → écran de consentement
          console.log('📋 Redirection vers first-time-consent');
          router.replace('/patient/first-time-consent');
        } else {
          // Consentement déjà donné → home
          console.log('✅ Redirection vers home');
          router.replace('/patient/home');
        }
      }, 1500);
    } else {
      setStatus('error');
      setErrorMessage(result.error || 'Le lien est invalide ou expiré.');
    }
  };

  const handleRetry = () => {
    handleVerifyToken();
  };

  if (status === 'verifying') {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 justify-center items-center p-6">
          <Loading message="Vérification de votre lien..." size="large" />
          <Text className="text-gray-600 text-center mt-4">
            Veuillez patienter...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (status === 'success') {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 justify-center items-center p-6">
          <View className="w-20 h-20 bg-green-100 rounded-full items-center justify-center mb-6">
            <Ionicons name="checkmark-circle" size={64} color="#22c55e" />
          </View>
          <Text className="text-2xl font-bold text-gray-900 mb-2 text-center">
            Connexion réussie !
          </Text>
          <Text className="text-gray-600 text-center">
            Redirection en cours...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (status === 'error') {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 justify-center items-center p-6">
          <View className="w-20 h-20 bg-red-100 rounded-full items-center justify-center mb-6">
            <Ionicons name="close-circle" size={64} color="#ef4444" />
          </View>
          
          <Text className="text-2xl font-bold text-gray-900 mb-2 text-center">
            Erreur de connexion
          </Text>
          
          <Alert
            type="danger"
            message={errorMessage}
            className="mb-6"
          />

          <Text className="text-gray-600 text-center mb-6">
            Le lien de connexion peut avoir expiré. Veuillez contacter votre thérapeute pour recevoir un nouveau lien.
          </Text>

          <Button
            title="Réessayer"
            onPress={handleRetry}
            icon={<Ionicons name="refresh" size={20} color="white" />}
          />
        </View>
      </SafeAreaView>
    );
  }

  return null;
}