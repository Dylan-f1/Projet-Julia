// app/patient/withdraw-consent.jsx
import React, { useState } from 'react';
import { View, Text, Platform, Alert, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

export default function WithdrawConsent() {
  const router = useRouter();
  const isWeb = Platform.OS === 'web';
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);

  const handleWithdraw = async () => {
    try {
      setLoading(true);

      const storage = Platform.OS === 'web' ? AsyncStorage : SecureStore;
      const token = await (Platform.OS === 'web'
        ? storage.getItem('patientToken')
        : storage.getItemAsync('patientToken'));

      const response = await fetch('http://localhost:3000/api/patient/withdraw-consent', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ reason })
      });

      if (response.ok) {
        await AsyncStorage.removeItem('dataConsentAccepted');
        await AsyncStorage.removeItem('dataConsentDate');

        Alert.alert(
          'Consentement retire',
          'Votre consentement a ete retire. Vos donnees seront supprimees dans un delai de 30 jours.',
          [
            {
              text: 'OK',
              onPress: () => router.replace('/')
            }
          ]
        );
      } else {
        throw new Error('Erreur retrait consentement');
      }
    } catch (error) {
      console.error('Erreur retrait consentement:', error);
      Alert.alert('Erreur', 'Impossible de retirer le consentement');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-surface-50">
      <View className={`flex-1 ${isWeb ? 'max-w-2xl mx-auto w-full' : ''}`}>
        {/* Header */}
        <View
          className="px-6 py-4"
          style={{
            backgroundColor: '#FAFAFA',
            borderBottomWidth: 1,
            borderBottomColor: '#EEECEB',
          }}
        >
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={() => router.back()}
              className="w-10 h-10 rounded-xl items-center justify-center mr-3"
              style={{ backgroundColor: '#EEF4FB' }}
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-back" size={22} color="#5B9BD5" />
            </TouchableOpacity>
            <Text className="text-xl font-bold" style={{ color: '#1A1A1A' }}>
              Retirer le consentement
            </Text>
          </View>
        </View>

        <View className="flex-1 p-6">
          {/* Warning card - bg therapist-50, left border 4px therapist-400 (gold = warning) */}
          <View
            className="mb-4 rounded-xl p-5"
            style={{
              backgroundColor: '#FDF6EA',
              borderLeftWidth: 4,
              borderLeftColor: '#E8A838',
            }}
          >
            <View className="flex-row items-start">
              <View
                className="w-10 h-10 rounded-xl items-center justify-center"
                style={{ backgroundColor: '#FAE8C4' }}
              >
                <Ionicons name="warning" size={22} color="#E8A838" />
              </View>
              <View className="flex-1 ml-3">
                <Text className="text-sm font-semibold mb-1" style={{ color: '#8C5C18' }}>
                  Attention
                </Text>
                <Text className="text-xs leading-5" style={{ color: '#B07820' }}>
                  En retirant votre consentement, vous ne pourrez plus utiliser Julia App.
                  Toutes vos donnees seront supprimees dans un delai de 30 jours conformement au RGPD.
                </Text>
              </View>
            </View>
          </View>

          {/* Reason card */}
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
            <Text className="text-base font-semibold mb-3" style={{ color: '#1A1A1A' }}>
              Pouvez-vous nous dire pourquoi ? (optionnel)
            </Text>
            <TextInput
              value={reason}
              onChangeText={setReason}
              placeholder="Votre raison..."
              placeholderTextColor="#A0A0A0"
              multiline
              numberOfLines={4}
              className="rounded-xl p-4"
              style={{
                borderWidth: 1,
                borderColor: '#EEECEB',
                color: '#1A1A1A',
                backgroundColor: '#FAFAFA',
                textAlignVertical: 'top',
              }}
            />
          </View>

          {/* Withdraw button - bg danger-400 */}
          <TouchableOpacity
            onPress={handleWithdraw}
            disabled={loading}
            className="flex-row items-center justify-center py-4 rounded-xl"
            style={{
              backgroundColor: '#E05B5B',
              opacity: loading ? 0.6 : 1,
            }}
            activeOpacity={0.8}
          >
            <Ionicons name="close-circle" size={20} color="white" />
            <Text className="text-white font-bold text-base ml-2">
              {loading ? 'Traitement...' : 'Confirmer le retrait'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
