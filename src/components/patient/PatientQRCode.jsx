// src/components/patient/PatientQRCode.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../common/Card';
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
      Alert.alert('Succès', 'Lien copié !');
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de copier le lien');
    }
  };

  const handleResend = async () => {
    const result = await patientService.resendMagicLink(patientId);
    
    if (result.success) {
      setQrData(result.data);
      setExpired(false);
      Alert.alert('Succès', 'Nouveau lien généré et envoyé par email');
    } else {
      Alert.alert('Erreur', result.error);
    }
  };

  if (loading) {
    return (
      <Card className="mb-4">
        <View className="items-center py-8">
          <Text className="text-gray-500">Chargement...</Text>
        </View>
      </Card>
    );
  }

  if (expired || !qrData) {
    return (
      <Card className="mb-4">
        <View className="flex-row items-center justify-between mb-3">
          <Text className="text-lg font-semibold text-gray-900">
            QR Code d'accès
          </Text>
          <View className="bg-red-100 px-2 py-1 rounded">
            <Text className="text-xs text-red-700 font-medium">Expiré</Text>
          </View>
        </View>

        <View className="items-center py-6 bg-gray-50 rounded-lg mb-4">
          <Ionicons name="alert-circle-outline" size={48} color="#ef4444" />
          <Text className="text-gray-600 text-center mt-3">
            Le lien d'accès a expiré
          </Text>
        </View>

        <Button
          title="Générer un nouveau lien"
          onPress={handleResend}
          icon={<Ionicons name="refresh-outline" size={20} color="white" />}
        />
      </Card>
    );
  }

  const expiresAt = new Date(qrData.expiresAt);
  const daysLeft = Math.ceil((expiresAt - new Date()) / (1000 * 60 * 60 * 24));

  return (
    <Card className="mb-4">
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-lg font-semibold text-gray-900">
          QR Code d'accès patient
        </Text>
        <View className={`px-2 py-1 rounded ${daysLeft <= 2 ? 'bg-orange-100' : 'bg-green-100'}`}>
          <Text className={`text-xs font-medium ${daysLeft <= 2 ? 'text-orange-700' : 'text-green-700'}`}>
            {daysLeft} jour{daysLeft > 1 ? 's' : ''} restant{daysLeft > 1 ? 's' : ''}
          </Text>
        </View>
      </View>

      <Text className="text-sm text-gray-600 mb-4">
        Le patient peut scanner ce QR code pour accéder à son espace personnel
      </Text>

      {/* QR Code */}
      <View className={`items-center mb-4 ${isWeb ? 'flex-row justify-around' : ''}`}>
        <View className="bg-white p-4 rounded-lg shadow-md border-2 border-gray-100">
          <Image
            source={{ uri: qrData.qrCode }}
            style={{ width: 180, height: 180 }}
            resizeMode="contain"
          />
        </View>

        {isWeb && (
          <View className="flex-1 ml-6">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Instructions
            </Text>
            <View className="space-y-2">
              <View className="flex-row items-start">
                <View className="w-6 h-6 bg-primary-100 rounded-full items-center justify-center mr-2">
                  <Text className="text-xs text-primary-700 font-bold">1</Text>
                </View>
                <Text className="text-sm text-gray-600 flex-1">
                  Scanner le QR code avec l'appareil photo du téléphone
                </Text>
              </View>
              <View className="flex-row items-start">
                <View className="w-6 h-6 bg-primary-100 rounded-full items-center justify-center mr-2">
                  <Text className="text-xs text-primary-700 font-bold">2</Text>
                </View>
                <Text className="text-sm text-gray-600 flex-1">
                  Ou copier le lien ci-dessous et l'envoyer au patient
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>

      {/* Lien */}
      <View className="bg-gray-50 rounded-lg p-3 mb-3">
        <Text className="text-xs text-gray-600 mb-2">Lien d'accès direct</Text>
        <TouchableOpacity 
          onPress={handleCopyLink}
          className="flex-row items-center justify-between"
        >
          <Text 
            className="text-xs text-gray-700 flex-1 mr-2" 
            numberOfLines={1}
            ellipsizeMode="middle"
          >
            {qrData.magicLink}
          </Text>
          <Ionicons name="copy-outline" size={18} color="#0284c7" />
        </TouchableOpacity>
      </View>

      {/* Actions */}
      <View className={isWeb ? 'flex-row gap-3' : 'space-y-2'}>
        <View className={isWeb ? 'flex-1' : ''}>
          <Button
            title="Copier le lien"
            onPress={handleCopyLink}
            variant="outline"
            icon={<Ionicons name="copy-outline" size={18} color="#0284c7" />}
          />
        </View>
        <View className={isWeb ? 'flex-1' : ''}>
          <Button
            title="Renvoyer par email"
            onPress={handleResend}
            variant="outline"
            icon={<Ionicons name="mail-outline" size={18} color="#0284c7" />}
          />
        </View>
      </View>
    </Card>
  );
};

export default PatientQRCode;