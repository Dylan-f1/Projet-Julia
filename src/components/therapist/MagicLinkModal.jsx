// src/components/therapist/MagicLinkModal.jsx
import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, Platform, Alert, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import Button from '../common/Button';

const MagicLinkModal = ({ 
  visible, 
  onClose, 
  magicLink, 
  qrCodeDataUrl, 
  patientName, 
  patientEmail, 
  patientId,
  onResend 
}) => {
  const [sendingEmail, setSendingEmail] = useState(false);
  const isWeb = Platform.OS === 'web';

  const handleCopyLink = async () => {
    try {
      await Clipboard.setStringAsync(magicLink);
      Alert.alert('Succès', 'Lien copié dans le presse-papier');
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de copier le lien');
    }
  };

  const handleResendEmail = async () => {
    setSendingEmail(true);
    const success = await onResend();
    setSendingEmail(false);
    
    if (success) {
      Alert.alert('Succès', 'Email renvoyé au patient');
    } else {
      Alert.alert('Erreur', 'Impossible de renvoyer l\'email');
    }
  };

  const handlePrintQR = () => {
    if (isWeb) {
      window.print();
    } else {
      Alert.alert('Info', 'Fonction d\'impression disponible sur web uniquement');
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-center items-center p-4">
        <View className={`bg-white rounded-2xl ${isWeb ? 'w-full max-w-lg' : 'w-full'} max-h-[90vh]`}>
          <ScrollView showsVerticalScrollIndicator={false} className="p-6">
            {/* Header */}
            <View className="flex-row justify-between items-start mb-4">
              <View className="flex-1 pr-4">
                <View className="flex-row items-center mb-2">
                  <View className="w-10 h-10 bg-green-100 rounded-full items-center justify-center mr-3">
                    <Ionicons name="checkmark-circle" size={24} color="#22c55e" />
                  </View>
                  <Text className="text-xl font-bold text-gray-900">
                    Patient créé !
                  </Text>
                </View>
                <Text className="text-sm text-gray-600">
                  Un email d'accès a été envoyé automatiquement
                </Text>
              </View>
              <TouchableOpacity 
                onPress={onClose}
                className={isWeb ? 'hover:bg-gray-100 p-2 rounded-lg -mt-2' : ''}
              >
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            {/* Info patient */}
            <View className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-4 mb-6">
              <View className="flex-row items-center mb-2">
                <Ionicons name="person" size={20} color="#0284c7" />
                <Text className="text-sm font-medium text-gray-600 ml-2">Patient</Text>
              </View>
              <Text className="text-lg font-bold text-gray-900 mb-1">{patientName}</Text>
              <View className="flex-row items-center">
                <Ionicons name="mail" size={16} color="#6B7280" />
                <Text className="text-sm text-gray-600 ml-2">{patientEmail}</Text>
              </View>
            </View>

            {/* QR Code */}
            {qrCodeDataUrl && (
              <View className="items-center mb-6">
                <View className="bg-white p-4 rounded-xl shadow-lg border-2 border-gray-100">
                  <Image
                    source={{ uri: qrCodeDataUrl }}
                    style={{ width: 220, height: 220 }}
                    resizeMode="contain"
                  />
                </View>
                <Text className="text-xs text-gray-500 text-center mt-3 px-4">
                  Le patient peut scanner ce QR code avec son téléphone pour accéder à son espace personnel
                </Text>
              </View>
            )}

            {/* Lien magic */}
            <View className="mb-6">
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-sm font-semibold text-gray-700">
                  Lien d'accès direct
                </Text>
                <View className="bg-green-100 px-2 py-1 rounded">
                  <Text className="text-xs text-green-700 font-medium">Valide 7 jours</Text>
                </View>
              </View>
              <TouchableOpacity 
                onPress={handleCopyLink}
                className="bg-gray-50 rounded-lg p-4 flex-row items-center justify-between border border-gray-200"
                activeOpacity={0.7}
              >
                <Text 
                  className="text-xs text-gray-700 flex-1 mr-3" 
                  numberOfLines={2}
                  ellipsizeMode="middle"
                >
                  {magicLink}
                </Text>
                <View className="bg-primary-100 p-2 rounded-lg">
                  <Ionicons name="copy-outline" size={20} color="#0284c7" />
                </View>
              </TouchableOpacity>
            </View>

            {/* Actions principales */}
            <View className="space-y-3 mb-4">
              <Button
                title={sendingEmail ? "Envoi en cours..." : "Renvoyer l'email d'accès"}
                onPress={handleResendEmail}
                disabled={sendingEmail}
                icon={<Ionicons name="mail-outline" size={20} color="white" />}
              />

              <View className={isWeb ? 'flex-row gap-3' : 'space-y-3'}>
                <View className={isWeb ? 'flex-1' : ''}>
                  <Button
                    title="Copier le lien"
                    onPress={handleCopyLink}
                    variant="outline"
                    icon={<Ionicons name="copy-outline" size={20} color="#0284c7" />}
                  />
                </View>
                {isWeb && qrCodeDataUrl && (
                  <View className="flex-1">
                    <Button
                      title="Imprimer QR"
                      onPress={handlePrintQR}
                      variant="outline"
                      icon={<Ionicons name="print-outline" size={20} color="#0284c7" />}
                    />
                  </View>
                )}
              </View>
            </View>

            {/* Info d'aide */}
            <View className="bg-blue-50 rounded-lg p-4 mb-4">
              <View className="flex-row items-start">
                <Ionicons name="information-circle" size={20} color="#3b82f6" />
                <View className="flex-1 ml-3">
                  <Text className="text-sm font-semibold text-blue-900 mb-1">
                    Comment le patient se connecte ?
                  </Text>
                  <Text className="text-xs text-blue-700 leading-5">
                    • Scanner le QR code avec son téléphone{'\n'}
                    • Cliquer sur le lien dans l'email reçu{'\n'}
                    • Ou copier/coller le lien ci-dessus
                  </Text>
                </View>
              </View>
            </View>

            {/* Bouton fermer */}
            <Button
              title="Fermer"
              onPress={onClose}
              variant="ghost"
              icon={<Ionicons name="checkmark" size={20} color="#6B7280" />}
            />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default MagicLinkModal;