import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Alert,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import sessionNoteService from '../../services/sessionNoteService';

const STEPS = [
  { id: 1, label: 'Date' },
  { id: 2, label: 'Document' },
  { id: 3, label: 'Upload' },
];

const AddSessionNoteScreen = () => {
  const router = useRouter();
  const { id: patientId } = useLocalSearchParams();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  const [sessionDate, setSessionDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Step actuel pour l'indicateur de progression
  const currentStep = uploadSuccess ? 3 : selectedFile ? 2 : sessionDate ? 1 : 0;

  // --- Navigation ---
  const goToPatient = () => {
    if (patientId) {
      router.push(`/therapist/patients/${patientId}`);
    } else {
      router.push('/therapist/dashboard');
    }
  };

  const goToDashboard = () => {
    router.push('/therapist/dashboard');
  };

  // --- File pickers ---
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        'Permission refusée',
        "Vous devez autoriser l'accès à la caméra"
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedFile(result.assets[0]);
    }
  };

  const pickFromGallery = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        'Permission refusée',
        "Vous devez autoriser l'accès à la galerie"
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedFile(result.assets[0]);
    }
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['image/*', 'application/pdf'],
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        setSelectedFile(result.assets[0]);
      }
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de sélectionner le document');
    }
  };

  // --- Upload ---
  const handleUpload = async () => {
    if (!selectedFile) {
      Alert.alert('Erreur', 'Veuillez sélectionner un fichier');
      return;
    }

    if (!sessionDate) {
      Alert.alert('Erreur', 'Veuillez sélectionner une date de séance');
      return;
    }

    setUploading(true);
    const result = await sessionNoteService.uploadSessionNote(
      patientId,
      selectedFile,
      sessionDate
    );
    setUploading(false);

    if (result.success) {
      setUploadSuccess(true);
    } else {
      Alert.alert('Erreur', result.error);
    }
  };

  // --- Helpers ---
  const formatFileSize = (size) => {
    if (!size) return '';
    if (size < 1024) return `${size} o`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} Ko`;
    return `${(size / (1024 * 1024)).toFixed(1)} Mo`;
  };

  // ============================================================
  // ÉCRAN DE SUCCÈS
  // ============================================================
  if (uploadSuccess) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <View
          className="flex-1 justify-center items-center px-6"
          style={isDesktop ? { alignSelf: 'center', maxWidth: 480 } : undefined}
        >
          <View className="w-20 h-20 bg-green-100 rounded-full items-center justify-center mb-4">
            <Ionicons name="checkmark-circle" size={50} color="#22c55e" />
          </View>
          <Text className="text-2xl font-bold text-gray-900 mb-3 text-center">
            Note uploadée !
          </Text>
          <Text className="text-base text-gray-600 text-center mb-2">
            La note de séance a été uploadée avec succès.
          </Text>
          <Text className="text-sm text-gray-500 text-center mb-8">
            L'OCR va extraire le texte et générer un résumé automatiquement.
          </Text>

          <View
            style={
              isDesktop
                ? { flexDirection: 'row', gap: 12 }
                : { width: '100%' }
            }
          >
            <Button
              title="Retour au patient"
              onPress={goToPatient}
              variant="primary"
              icon={
                <Ionicons name="person-outline" size={18} color="white" />
              }
              className={isDesktop ? '' : 'mb-3'}
              style={isDesktop ? { minWidth: 180 } : undefined}
            />
            <Button
              title="Retour au dashboard"
              onPress={goToDashboard}
              variant="outline"
              icon={
                <Ionicons name="grid-outline" size={18} color="#0284c7" />
              }
              style={isDesktop ? { minWidth: 180 } : undefined}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // ============================================================
  // FORMULAIRE PRINCIPAL
  // ============================================================
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          padding: isDesktop ? 40 : 24,
          alignItems: isDesktop ? 'center' : undefined,
        }}
      >
        <View style={isDesktop ? { width: '100%', maxWidth: 640 } : undefined}>
          {/* ---- Breadcrumb ---- */}
          <View className="flex-row items-center mb-2" style={{ gap: 8 }}>
            <TouchableOpacity
              onPress={goToDashboard}
              className="flex-row items-center"
              activeOpacity={0.7}
              style={isDesktop ? { cursor: 'pointer' } : undefined}
            >
              <Ionicons name="grid-outline" size={16} color="#94a3b8" />
              <Text className="text-sm text-gray-400 ml-1">Dashboard</Text>
            </TouchableOpacity>

            <Ionicons name="chevron-forward" size={14} color="#cbd5e1" />

            <TouchableOpacity
              onPress={goToPatient}
              className="flex-row items-center"
              activeOpacity={0.7}
              style={isDesktop ? { cursor: 'pointer' } : undefined}
            >
              <Ionicons name="person-outline" size={16} color="#94a3b8" />
              <Text className="text-sm text-gray-400 ml-1">Patient</Text>
            </TouchableOpacity>

            <Ionicons name="chevron-forward" size={14} color="#cbd5e1" />

            <Text className="text-sm text-gray-700 font-medium">
              Nouvelle note
            </Text>
          </View>

          {/* ---- Header ---- */}
          <View className="mb-6">
            <Text className="text-2xl font-bold text-gray-900 mb-2">
              Ajouter une note de séance
            </Text>
            <Text className="text-base text-gray-600">
              Prenez en photo ou uploadez vos notes manuscrites. L'OCR extraira
              automatiquement le texte.
            </Text>
          </View>

          {/* ---- Stepper ---- */}
          <View className="flex-row items-center mb-8" style={{ gap: 4 }}>
            {STEPS.map((step, index) => (
              <React.Fragment key={step.id}>
                <View className="flex-row items-center">
                  <View
                    className={`w-7 h-7 rounded-full items-center justify-center ${
                      currentStep >= step.id
                        ? 'bg-primary-600'
                        : 'bg-gray-200'
                    }`}
                  >
                    {currentStep > step.id ? (
                      <Ionicons name="checkmark" size={14} color="white" />
                    ) : (
                      <Text
                        className={`text-xs font-bold ${
                          currentStep >= step.id
                            ? 'text-white'
                            : 'text-gray-500'
                        }`}
                      >
                        {step.id}
                      </Text>
                    )}
                  </View>
                  <Text
                    className={`text-xs ml-1.5 ${
                      currentStep >= step.id
                        ? 'text-primary-600 font-semibold'
                        : 'text-gray-400'
                    }`}
                  >
                    {step.label}
                  </Text>
                </View>
                {index < STEPS.length - 1 && (
                  <View
                    className={`flex-1 h-0.5 mx-2 rounded-full ${
                      currentStep > step.id ? 'bg-primary-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </View>

          {/* ---- Date de séance ---- */}
          <Card
            className="mb-6"
            style={
              isDesktop
                ? {
                    backgroundColor: '#fff',
                    borderRadius: 16,
                    borderWidth: 1,
                    borderColor: '#e5e7eb',
                    padding: 32,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.05,
                    shadowRadius: 6,
                    elevation: 2,
                  }
                : undefined
            }
          >
            <View className="flex-row items-center mb-3">
              <View className="w-8 h-8 bg-primary-100 rounded-full items-center justify-center mr-3">
                <Ionicons name="calendar-outline" size={16} color="#0284c7" />
              </View>
              <Text className="text-lg font-semibold text-gray-900">
                Date de la séance
              </Text>
            </View>
            <Input
              placeholder="AAAA-MM-JJ"
              value={sessionDate}
              onChangeText={setSessionDate}
              keyboardType="default"
              icon={
                <Ionicons name="calendar-outline" size={20} color="#6B7280" />
              }
            />
          </Card>

          {/* ---- Sélection de fichier ---- */}
          <Card
            className="mb-6"
            style={
              isDesktop
                ? {
                    backgroundColor: '#fff',
                    borderRadius: 16,
                    borderWidth: 1,
                    borderColor: '#e5e7eb',
                    padding: 32,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.05,
                    shadowRadius: 6,
                    elevation: 2,
                  }
                : undefined
            }
          >
            <View className="flex-row items-center mb-4">
              <View className="w-8 h-8 bg-primary-100 rounded-full items-center justify-center mr-3">
                <Ionicons name="document-outline" size={16} color="#0284c7" />
              </View>
              <Text className="text-lg font-semibold text-gray-900">
                Document
              </Text>
            </View>

            {selectedFile ? (
              <View>
                {/* Preview image */}
                {selectedFile.mimeType?.startsWith('image/') &&
                  selectedFile.uri && (
                    <Image
                      source={{ uri: selectedFile.uri }}
                      className="w-full rounded-lg mb-3"
                      resizeMode="contain"
                      style={{
                        backgroundColor: '#f8fafc',
                        height: isDesktop ? 320 : 256,
                      }}
                    />
                  )}

                {/* PDF indicator */}
                {selectedFile.mimeType === 'application/pdf' && (
                  <View className="bg-red-50 border border-red-200 rounded-lg p-6 mb-3 items-center">
                    <Ionicons name="document" size={40} color="#ef4444" />
                    <Text className="text-red-700 font-medium mt-2">
                      Document PDF
                    </Text>
                  </View>
                )}

                {/* File info */}
                <View className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <View className="flex-row items-center">
                    <Ionicons
                      name="checkmark-circle"
                      size={20}
                      color="#22c55e"
                    />
                    <Text className="text-green-700 font-semibold ml-2 flex-1">
                      Fichier sélectionné
                    </Text>
                  </View>
                  <Text className="text-green-600 text-sm mt-1">
                    {selectedFile.name || 'Image'}
                    {selectedFile.fileSize
                      ? ` · ${formatFileSize(selectedFile.fileSize)}`
                      : ''}
                  </Text>
                </View>

                <Button
                  title="Changer le fichier"
                  onPress={() => setSelectedFile(null)}
                  variant="outline"
                  size="small"
                  className="mt-3"
                />
              </View>
            ) : (
              <View>
                {/* Desktop : boutons en row / Mobile : empilés */}
                <View
                  style={
                    isDesktop
                      ? { flexDirection: 'row', gap: 12 }
                      : undefined
                  }
                >
                  <View style={isDesktop ? { flex: 1 } : undefined}>
                    <Button
                      title="Prendre une photo"
                      onPress={pickImage}
                      icon={
                        <Ionicons
                          name="camera-outline"
                          size={20}
                          color="white"
                        />
                      }
                      className={isDesktop ? '' : 'mb-3'}
                    />
                  </View>

                  <View style={isDesktop ? { flex: 1 } : undefined}>
                    <Button
                      title="Galerie"
                      onPress={pickFromGallery}
                      variant="outline"
                      icon={
                        <Ionicons
                          name="images-outline"
                          size={20}
                          color="#0284c7"
                        />
                      }
                      className={isDesktop ? '' : 'mb-3'}
                    />
                  </View>

                  <View style={isDesktop ? { flex: 1 } : undefined}>
                    <Button
                      title="Document"
                      onPress={pickDocument}
                      variant="outline"
                      icon={
                        <Ionicons
                          name="document-outline"
                          size={20}
                          color="#0284c7"
                        />
                      }
                    />
                  </View>
                </View>

                <Text className="text-xs text-gray-400 mt-3 text-center">
                  Formats acceptés : JPG, PNG, PDF · 10 Mo max
                </Text>
              </View>
            )}
          </Card>

          {/* ---- Info OCR ---- */}
          <View className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <View className="flex-row items-start">
              <Ionicons name="information-circle" size={20} color="#0284c7" />
              <View className="ml-2 flex-1">
                <Text className="text-sm text-blue-700 font-semibold mb-1">
                  Analyse automatique par OCR
                </Text>
                <Text className="text-sm text-blue-600">
                  Le texte sera extrait automatiquement et un résumé sera généré
                  par l'IA pour faciliter le suivi.
                </Text>
              </View>
            </View>
          </View>

          {/* ---- Actions ---- */}
          <View
            style={
              isDesktop
                ? { flexDirection: 'row-reverse', gap: 12 }
                : undefined
            }
          >
            {/* Bouton principal */}
            <View style={isDesktop ? { minWidth: 200 } : undefined}>
              <Button
                title="Uploader la note"
                onPress={handleUpload}
                loading={uploading}
                disabled={!selectedFile}
                size="large"
                className={isDesktop ? '' : 'mb-3'}
                icon={
                  !uploading ? (
                    <Ionicons
                      name="cloud-upload-outline"
                      size={20}
                      color={selectedFile ? 'white' : '#9ca3af'}
                    />
                  ) : undefined
                }
              />
            </View>

            {/* Boutons secondaires */}
            <View
              style={
                isDesktop
                  ? { flexDirection: 'row', gap: 12 }
                  : undefined
              }
            >
              <Button
                title="Retour au patient"
                onPress={goToPatient}
                variant="outline"
                className={isDesktop ? '' : 'mb-3'}
              />
              <Button
                title="Dashboard"
                onPress={goToDashboard}
                variant="outline"
                icon={
                  <Ionicons name="grid-outline" size={16} color="#0284c7" />
                }
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddSessionNoteScreen;