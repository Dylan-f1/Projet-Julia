// app/patient/withdraw-consent.jsx
import React, { useState } from 'react';
import { View, Text, Platform, Alert, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import Button from '../../src/components/common/Button';
import Card from '../../src/components/common/Card';

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
          'Consentement retiré',
          'Votre consentement a été retiré. Vos données seront supprimées dans un délai de 30 jours.',
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
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className={`flex-1 ${isWeb ? 'max-w-2xl mx-auto w-full' : ''}`}>
        {/* Header */}
        <View className="bg-white border-b border-gray-200 px-6 py-4">
          <View className="flex-row items-center">
            <Button
              title="← Retour"
              onPress={() => router.back()}
              variant="ghost"
            />
            <Text className="text-xl font-bold text-gray-900 ml-4">
              Retirer le consentement
            </Text>
          </View>
        </View>

        <View className="flex-1 p-6">
          <Card className="mb-4 bg-orange-50 border-orange-200">
            <View className="flex-row items-start">
              <Ionicons name="warning" size={24} color="#f59e0b" />
              <View className="flex-1 ml-3">
                <Text className="text-sm font-semibold text-orange-900 mb-1">
                  Attention
                </Text>
                <Text className="text-xs text-orange-700 leading-5">
                  En retirant votre consentement, vous ne pourrez plus utiliser Julia App. 
                  Toutes vos données seront supprimées dans un délai de 30 jours conformément au RGPD.
                </Text>
              </View>
            </View>
          </Card>

          <Card className="mb-4">
            <Text className="text-base font-semibold text-gray-900 mb-3">
              Pouvez-vous nous dire pourquoi ? (optionnel)
            </Text>
            <TextInput
              value={reason}
              onChangeText={setReason}
              placeholder="Votre raison..."
              multiline
              numberOfLines={4}
              className="border border-gray-300 rounded-lg p-3 text-gray-900 bg-white"
              style={{ textAlignVertical: 'top' }}
            />
          </Card>

          <Button
            title={loading ? 'Traitement...' : 'Confirmer le retrait'}
            onPress={handleWithdraw}
            disabled={loading}
            variant="danger"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}