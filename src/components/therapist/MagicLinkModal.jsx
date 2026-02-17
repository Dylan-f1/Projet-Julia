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
  onResend,
}) => {
  const [sendingEmail, setSendingEmail] = useState(false);
  const isWeb = Platform.OS === 'web';

  const handleCopyLink = async () => {
    try {
      await Clipboard.setStringAsync(magicLink);
      Alert.alert('Succes', 'Lien copie dans le presse-papier');
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de copier le lien');
    }
  };

  const handleResendEmail = async () => {
    setSendingEmail(true);
    const success = await onResend();
    setSendingEmail(false);

    if (success) {
      Alert.alert('Succes', 'Email renvoye au patient');
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
      <View className="flex-1 bg-black/40 justify-center items-center p-4">
        <View className={`bg-white rounded-3xl ${isWeb ? 'w-full max-w-lg' : 'w-full'} max-h-[90vh]`}>
          <ScrollView showsVerticalScrollIndicator={false} className="p-6">
            {/* Success Header */}
            <View className="flex-row justify-between items-start mb-5">
              <View className="flex-1 pr-4">
                <View className="flex-row items-center mb-2">
                  <View className="w-11 h-11 bg-success-50 rounded-full items-center justify-center mr-3">
                    <Ionicons name="checkmark-circle" size={24} color="#4CAF82" />
                  </View>
                  <Text className="text-xl font-bold text-text-900">
                    Patient cree !
                  </Text>
                </View>
                <Text className="text-sm text-text-300 ml-14">
                  Un email d'acces a ete envoye automatiquement
                </Text>
              </View>
              <TouchableOpacity
                onPress={onClose}
                className={`w-10 h-10 bg-surface-100 rounded-full items-center justify-center ${
                  isWeb ? 'hover:bg-surface-200' : ''
                }`}
              >
                <Ionicons name="close" size={20} color="#A0A0A0" />
              </TouchableOpacity>
            </View>

            {/* Info patient */}
            <View className="bg-therapist-50 rounded-xl p-4 mb-6 border border-therapist-100">
              <View className="flex-row items-center mb-2">
                <View className="w-8 h-8 bg-therapist-100 rounded-full items-center justify-center mr-2">
                  <Ionicons name="person" size={16} color="#E8A838" />
                </View>
                <Text className="text-sm font-medium text-text-300">Patient</Text>
              </View>
              <Text className="text-lg font-bold text-text-900 mb-1 ml-10">{patientName}</Text>
              <View className="flex-row items-center ml-10">
                <Ionicons name="mail" size={14} color="#A0A0A0" />
                <Text className="text-sm text-text-300 ml-2">{patientEmail}</Text>
              </View>
            </View>

            {/* QR Code */}
            {qrCodeDataUrl && (
              <View className="items-center mb-6">
                <View className="bg-surface-50 p-5 rounded-xl border border-surface-200">
                  <Image
                    source={{ uri: qrCodeDataUrl }}
                    style={{ width: 220, height: 220 }}
                    resizeMode="contain"
                  />
                </View>
                <Text className="text-xs text-text-300 text-center mt-3 px-4">
                  Le patient peut scanner ce QR code avec son telephone pour acceder a son espace personnel
                </Text>
              </View>
            )}

            {/* Lien magic */}
            <View className="mb-6">
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-sm font-semibold text-text-700">
                  Lien d'acces direct
                </Text>
                <View className="bg-success-50 border border-success-100 px-3 py-1 rounded-full">
                  <Text className="text-xs text-success-600 font-medium">Valide 7 jours</Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={handleCopyLink}
                className="bg-surface-50 rounded-xl p-4 flex-row items-center justify-between border border-surface-200"
                activeOpacity={0.7}
              >
                <Text
                  className="text-xs text-text-500 flex-1 mr-3"
                  numberOfLines={2}
                  ellipsizeMode="middle"
                >
                  {magicLink}
                </Text>
                <View className="w-9 h-9 bg-patient-50 rounded-full items-center justify-center border border-patient-100">
                  <Ionicons name="copy-outline" size={18} color="#5B9BD5" />
                </View>
              </TouchableOpacity>
            </View>

            {/* Actions principales */}
            <View className="space-y-3 mb-4">
              <Button
                title={sendingEmail ? 'Envoi en cours...' : "Renvoyer l'email d'acces"}
                onPress={handleResendEmail}
                disabled={sendingEmail}
                icon={<Ionicons name="mail-outline" size={20} color="white" />}
              />

              <View className={isWeb ? 'flex-row gap-3' : 'space-y-3'}>
                <View className={isWeb ? 'flex-1' : ''}>
                  <TouchableOpacity
                    onPress={handleCopyLink}
                    activeOpacity={0.7}
                    className="border border-patient-400 rounded-xl py-3 flex-row items-center justify-center"
                  >
                    <Ionicons name="copy-outline" size={20} color="#5B9BD5" />
                    <Text className="text-patient-400 font-semibold ml-2 text-sm">Copier le lien</Text>
                  </TouchableOpacity>
                </View>
                {isWeb && qrCodeDataUrl && (
                  <View className="flex-1">
                    <Button
                      title="Imprimer QR"
                      onPress={handlePrintQR}
                      variant="outline"
                      icon={<Ionicons name="print-outline" size={20} color="#5B9BD5" />}
                    />
                  </View>
                )}
              </View>
            </View>

            {/* Info d'aide */}
            <View className="bg-success-50 rounded-xl p-4 mb-4">
              <View className="flex-row items-start">
                <View className="w-8 h-8 bg-success-100 rounded-full items-center justify-center mr-3">
                  <Ionicons name="information-circle" size={18} color="#4CAF82" />
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-semibold text-success-600 mb-1">
                    Comment le patient se connecte ?
                  </Text>
                  <Text className="text-xs text-text-500 leading-5">
                    {'\u2022'} Scanner le QR code avec son telephone{'\n'}
                    {'\u2022'} Cliquer sur le lien dans l'email recu{'\n'}
                    {'\u2022'} Ou copier/coller le lien ci-dessus
                  </Text>
                </View>
              </View>
            </View>

            {/* Bouton fermer */}
            <Button
              title="Fermer"
              onPress={onClose}
              variant="ghost"
              icon={<Ionicons name="checkmark" size={20} color="#A0A0A0" />}
            />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default MagicLinkModal;
