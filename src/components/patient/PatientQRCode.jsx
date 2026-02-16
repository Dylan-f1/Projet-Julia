// src/components/patient/PatientQRCode.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../common/Button';
import patientService from '../../services/patientService';
import { Clipboard } from 'react-native';

const PatientQRCode = ({ patientId, patientEmail }) => {
  const [loading, setLoading] = useState(true);
  const [qrData, setQrData] = useState(null);
  const [expired, setExpired] = useState(false);
  const isWeb = Platform.OS === 'web';

  useEffect(() => {
    loadQRCode();
  }, [patientId]);

  const loadQRCode = async () => {
    setLoading(true);
    const result = await patientService.getMagicLink(patientId);

    if (result.success) {
      setQrData(result.data);
      setExpired(false);
    } else if (result.expired) {
      setExpired(true);
    }
    setLoading(false);
  };

  const handleCopyLink = async () => {
    try {
      if (Platform.OS === 'web') {
        await navigator.clipboard.writeText(qrData.magicLink);
      } else {
        Clipboard.setString(qrData.magicLink);
      }
      Alert.alert('Succes', 'Lien copie !');
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de copier le lien');
    }
  };

  const handleResend = async () => {
    const result = await patientService.resendMagicLink(patientId);

    if (result.success) {
      setQrData(result.data);
      setExpired(false);
      Alert.alert('Succes', 'Nouveau lien genere et envoye par email');
    } else {
      Alert.alert('Erreur', result.error);
    }
  };

  if (loading) {
    return (
      <View className="bg-white rounded-xl p-5 mb-4">
        <View className="items-center py-8">
          <View className="w-12 h-12 bg-surface-100 rounded-full items-center justify-center mb-3">
            <Ionicons name="qr-code-outline" size={24} color="#5B9BD5" />
          </View>
          <Text className="text-text-300">Chargement...</Text>
        </View>
      </View>
    );
  }

  if (expired || !qrData) {
    return (
      <View className="bg-white rounded-xl p-5 mb-4">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-lg font-semibold text-text-900">
            QR Code d'acces
          </Text>
          <View className="bg-danger-50 border border-danger-100 px-3 py-1 rounded-full">
            <Text className="text-xs text-danger-400 font-medium">Expire</Text>
          </View>
        </View>

        <View className="items-center py-6 bg-danger-50 rounded-xl mb-4">
          <View className="w-14 h-14 bg-danger-100 rounded-full items-center justify-center mb-3">
            <Ionicons name="alert-circle-outline" size={32} color="#E05B5B" />
          </View>
          <Text className="text-text-500 text-center">
            Le lien d'acces a expire
          </Text>
        </View>

        <Button
          title="Generer un nouveau lien"
          onPress={handleResend}
          icon={<Ionicons name="refresh-outline" size={20} color="white" />}
        />
      </View>
    );
  }

  const expiresAt = new Date(qrData.expiresAt);
  const daysLeft = Math.ceil((expiresAt - new Date()) / (1000 * 60 * 60 * 24));

  return (
    <View className="bg-white rounded-xl p-5 mb-4">
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center">
          <View className="w-9 h-9 bg-patient-50 rounded-full items-center justify-center mr-3">
            <Ionicons name="qr-code-outline" size={18} color="#5B9BD5" />
          </View>
          <Text className="text-lg font-semibold text-text-900">
            QR Code d'acces patient
          </Text>
        </View>
        <View className={`px-3 py-1.5 rounded-full ${
          daysLeft <= 2
            ? 'bg-therapist-100'
            : 'bg-surface-100'
        }`}>
          <Text className={`text-xs font-medium ${
            daysLeft <= 2 ? 'text-therapist-600' : 'text-text-500'
          }`}>
            {daysLeft} jour{daysLeft > 1 ? 's' : ''} restant{daysLeft > 1 ? 's' : ''}
          </Text>
        </View>
      </View>

      <Text className="text-sm text-text-300 mb-4">
        Le patient peut scanner ce QR code pour acceder a son espace personnel
      </Text>

      {/* QR Code */}
      <View className={`items-center mb-4 ${isWeb ? 'flex-row justify-around' : ''}`}>
        <View className="bg-surface-50 p-5 rounded-xl border border-surface-200">
          <Image
            source={{ uri: qrData.qrCode }}
            style={{ width: 180, height: 180 }}
            resizeMode="contain"
          />
        </View>

        {isWeb && (
          <View className="flex-1 ml-6">
            <Text className="text-sm font-medium text-text-700 mb-3">
              Instructions
            </Text>
            <View className="space-y-3">
              <View className="flex-row items-start">
                <View className="w-7 h-7 bg-patient-100 rounded-full items-center justify-center mr-3">
                  <Text className="text-xs text-patient-700 font-bold">1</Text>
                </View>
                <Text className="text-sm text-text-500 flex-1">
                  Scanner le QR code avec l'appareil photo du telephone
                </Text>
              </View>
              <View className="flex-row items-start">
                <View className="w-7 h-7 bg-patient-100 rounded-full items-center justify-center mr-3">
                  <Text className="text-xs text-patient-700 font-bold">2</Text>
                </View>
                <Text className="text-sm text-text-500 flex-1">
                  Ou copier le lien ci-dessous et l'envoyer au patient
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>

      {/* Lien */}
      <View className="bg-surface-50 rounded-xl p-4 mb-4 border border-surface-200">
        <Text className="text-xs text-text-300 mb-2">Lien d'acces direct</Text>
        <TouchableOpacity
          onPress={handleCopyLink}
          className="flex-row items-center justify-between"
        >
          <Text
            className="text-xs text-text-700 flex-1 mr-2"
            numberOfLines={1}
            ellipsizeMode="middle"
          >
            {qrData.magicLink}
          </Text>
          <View className="w-8 h-8 bg-patient-50 rounded-full items-center justify-center">
            <Ionicons name="copy-outline" size={16} color="#5B9BD5" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Actions */}
      <View className={isWeb ? 'flex-row gap-3' : 'space-y-2'}>
        <View className={isWeb ? 'flex-1' : ''}>
          <TouchableOpacity
            onPress={handleCopyLink}
            activeOpacity={0.7}
            className="border border-patient-400 rounded-xl py-3 flex-row items-center justify-center"
          >
            <Ionicons name="copy-outline" size={18} color="#5B9BD5" />
            <Text className="text-patient-400 font-semibold ml-2 text-sm">Copier le lien</Text>
          </TouchableOpacity>
        </View>
        <View className={isWeb ? 'flex-1' : ''}>
          <Button
            title="Renvoyer par email"
            onPress={handleResend}
            variant="outline"
            icon={<Ionicons name="mail-outline" size={18} color="#5B9BD5" />}
          />
        </View>
      </View>
    </View>
  );
};

export default PatientQRCode;
