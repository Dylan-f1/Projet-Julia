import React, { useState } from 'react';
import { View, Text, ScrollView, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import sessionNoteService from '../../services/sessionNoteService';

const AddSessionNoteScreen = ({ route }) => {
  const router = useRouter();
  const { patientId } = route.params;
  const [sessionDate, setSessionDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
    if (!permissionResult.granted) {
      Alert.alert('Permission refusée', 'Vous devez autoriser l\'accès à la caméra');
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
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (!permissionResult.granted) {
      Alert.alert('Permission refusée', 'Vous devez autoriser l\'accès à la galerie');
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
      Alert.alert(
        'Succès',
        'La note de séance a été uploadée et analysée par OCR.',
        [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]
      );
    } else {
      Alert.alert('Erreur', result.error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 24 }}
      >
        <View className="mb-6">
          <Text className="text-2xl font-bold text-gray-900 mb-2">
            Ajouter une note de séance
          </Text>
          <Text className="text-base text-gray-600">
            Prenez en photo ou uploadez vos notes manuscrites. L'OCR extraira automatiquement le texte.
          </Text>
        </View>

        {/* Date de séance */}
        <Card className="mb-6">
          <Input
            label="Date de la séance"
            placeholder="AAAA-MM-JJ"
            value={sessionDate}
            onChangeText={setSessionDate}
            keyboardType="default"
            icon={<Ionicons name="calendar-outline" size={20} color="#6B7280" />}
          />
        </Card>

        {/* Sélection de fichier */}
        <Card className="mb-6">
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            Document
          </Text>

          {selectedFile ? (
            <View className="mb-4">
              {selectedFile.mimeType?.startsWith('image/') && selectedFile.uri && (
                <Image
                  source={{ uri: selectedFile.uri }}
                  className="w-full h-64 rounded-lg mb-3"
                  resizeMode="contain"
                />
              )}
              
              <View className="bg-green-50 border border-green-200 rounded-lg p-3">
                <View className="flex-row items-center">
                  <Ionicons name="checkmark-circle" size={20} color="#22c55e" />
                  <Text className="text-green-700 font-semibold ml-2 flex-1">
                    Fichier sélectionné
                  </Text>
                </View>
                <Text className="text-green-600 text-sm mt-1">
                  {selectedFile.name || 'Image'}
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
              <Button
                title="Prendre une photo"
                onPress={pickImage}
                icon={<Ionicons name="camera-outline" size={20} color="white" />}
                className="mb-3"
              />

              <Button
                title="Choisir depuis la galerie"
                onPress={pickFromGallery}
                variant="outline"
                icon={<Ionicons name="images-outline" size={20} color="#0284c7" />}
                className="mb-3"
              />

              <Button
                title="Sélectionner un document"
                onPress={pickDocument}
                variant="outline"
                icon={<Ionicons name="document-outline" size={20} color="#0284c7" />}
              />
            </View>
          )}
        </Card>

        {/* Info OCR */}
        <View className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <View className="flex-row items-start">
            <Ionicons name="information-circle" size={20} color="#0284c7" />
            <View className="ml-2 flex-1">
              <Text className="text-sm text-blue-700 font-semibold mb-1">
                Analyse automatique par OCR
              </Text>
              <Text className="text-sm text-blue-600">
                Le texte sera extrait automatiquement et un résumé sera généré par l'IA pour faciliter le suivi.
              </Text>
            </View>
          </View>
        </View>

        {/* Actions */}
        <Button
          title="Uploader la note"
          onPress={handleUpload}
          loading={uploading}
          disabled={!selectedFile}
          size="large"
          className="mb-4"
        />

        <Button
          title="Annuler"
          onPress={() => router.back()}
          variant="outline"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddSessionNoteScreen;
