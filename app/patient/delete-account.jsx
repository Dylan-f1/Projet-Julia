// app/patient/delete-account.jsx
import React, { useState } from 'react';
import { View, Text, Platform, Alert, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

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
          'Compte supprime',
          'Votre compte et toutes vos donnees ont ete supprimes.',
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
              style={{ backgroundColor: '#FEF0F0' }}
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-back" size={22} color="#E05B5B" />
            </TouchableOpacity>
            <Text className="text-xl font-bold" style={{ color: '#1A1A1A' }}>
              Supprimer le compte
            </Text>
          </View>
        </View>

        <View className="flex-1 p-6">
          {/* Danger card - bg danger-50, left border 4px danger-400 */}
          <View
            className="mb-4 rounded-xl p-5"
            style={{
              backgroundColor: '#FEF0F0',
              borderLeftWidth: 4,
              borderLeftColor: '#E05B5B',
            }}
          >
            <View className="flex-row items-start">
              <View
                className="w-10 h-10 rounded-xl items-center justify-center"
                style={{ backgroundColor: '#FCCECE' }}
              >
                <Ionicons name="alert-circle" size={22} color="#E05B5B" />
              </View>
              <View className="flex-1 ml-3">
                <Text className="text-sm font-semibold mb-1" style={{ color: '#E05B5B' }}>
                  Action irreversible
                </Text>
                <Text className="text-xs leading-5" style={{ color: '#B83A3A' }}>
                  Cette action supprimera definitivement votre compte et toutes vos donnees.
                  Cette action ne peut pas etre annulee.
                </Text>
              </View>
            </View>
          </View>

          {/* What will happen card */}
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
              Que va-t-il se passer ?
            </Text>
            <Text className="leading-7" style={{ color: '#404040' }}>
              {'\u2022'} Suppression immediate de votre compte{'\n'}
              {'\u2022'} Suppression de toutes vos conversations{'\n'}
              {'\u2022'} Suppression de vos donnees de suivi{'\n'}
              {'\u2022'} Suppression de vos notes de session{'\n'}
              {'\u2022'} Votre therapeute sera notifie
            </Text>
          </View>

          {/* Confirmation input - border danger-200 */}
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
              Pour confirmer, tapez "SUPPRIMER"
            </Text>
            <TextInput
              value={confirmation}
              onChangeText={setConfirmation}
              placeholder="SUPPRIMER"
              placeholderTextColor="#FCCECE"
              className="rounded-xl p-4"
              style={{
                borderWidth: 1,
                borderColor: '#FCCECE',
                color: '#1A1A1A',
                backgroundColor: '#FAFAFA',
              }}
            />
          </View>

          {/* Delete button - bg danger-400 */}
          <TouchableOpacity
            onPress={handleDelete}
            disabled={loading || confirmation !== 'SUPPRIMER'}
            className="flex-row items-center justify-center py-4 rounded-xl"
            style={{
              backgroundColor: '#E05B5B',
              opacity: (loading || confirmation !== 'SUPPRIMER') ? 0.5 : 1,
            }}
            activeOpacity={0.8}
          >
            <Ionicons name="trash" size={20} color="white" />
            <Text className="text-white font-bold text-base ml-2">
              {loading ? 'Suppression...' : 'Supprimer definitivement mon compte'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
