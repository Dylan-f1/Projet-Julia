// app/patient/delete-account.jsx
import React, { useState } from 'react';
import { View, Text, Platform, Alert, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import Button from '../../src/components/common/Button';
import Card from '../../src/components/common/Card';

export default function DeleteAccount() {
  const router = useRouter();
  const isWeb = Platform.OS === 'web';
  const [confirmation, setConfirmation] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (confirmation !== 'SUPPRIMER') {
      Alert.alert('Erreur', 'Veuillez taper SUPPRIMER pour confirmer');
      return;
    }

    try {
      setLoading(true);

      const storage = Platform.OS === 'web' ? AsyncStorage : SecureStore;
      const token = await (Platform.OS === 'web'
        ? storage.getItem('patientToken')
        : storage.getItemAsync('patientToken'));

      const response = await fetch('http://localhost:3000/api/patient/delete-account', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        // Clear all local storage
        if (Platform.OS === 'web') {
          await AsyncStorage.clear();
        } else {
          await SecureStore.deleteItemAsync('patientToken');
          await SecureStore.deleteItemAsync('patientEmail');
          await SecureStore.deleteItemAsync('patientId');
        }
        
        Alert.alert(
          'Compte supprimé',
          'Votre compte et toutes vos données ont été supprimés.',
          [
            {
              text: 'OK',
              onPress: () => router.replace('/')
            }
          ]
        );
      } else {
        throw new Error('Erreur suppression compte');
      }
    } catch (error) {
      console.error('Erreur suppression compte:', error);
      Alert.alert('Erreur', 'Impossible de supprimer le compte');
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
              Supprimer le compte
            </Text>
          </View>
        </View>

        <View className="flex-1 p-6">
          <Card className="mb-4 bg-red-50 border-red-200">
            <View className="flex-row items-start">
              <Ionicons name="alert-circle" size={24} color="#ef4444" />
              <View className="flex-1 ml-3">
                <Text className="text-sm font-semibold text-red-900 mb-1">
                  Action irréversible
                </Text>
                <Text className="text-xs text-red-700 leading-5">
                  Cette action supprimera définitivement votre compte et toutes vos données. 
                  Cette action ne peut pas être annulée.
                </Text>
              </View>
            </View>
          </Card>

          <Card className="mb-4">
            <Text className="text-base font-semibold text-gray-900 mb-3">
              Que va-t-il se passer ?
            </Text>
            <Text className="text-gray-700 leading-6">
              • Suppression immédiate de votre compte{'\n'}
              • Suppression de toutes vos conversations{'\n'}
              • Suppression de vos données de suivi{'\n'}
              • Suppression de vos notes de session{'\n'}
              • Votre thérapeute sera notifié
            </Text>
          </Card>

          <Card className="mb-4">
            <Text className="text-base font-semibold text-gray-900 mb-3">
              Pour confirmer, tapez "SUPPRIMER"
            </Text>
            <TextInput
              value={confirmation}
              onChangeText={setConfirmation}
              placeholder="SUPPRIMER"
              className="border border-gray-300 rounded-lg p-3 text-gray-900 bg-white"
            />
          </Card>

          <Button
            title={loading ? 'Suppression...' : 'Supprimer définitivement mon compte'}
            onPress={handleDelete}
            disabled={loading || confirmation !== 'SUPPRIMER'}
            variant="danger"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}