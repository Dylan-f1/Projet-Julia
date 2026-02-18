import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Alert,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  Animated,
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
  { id: 2, label: 'Contenu' },
  { id: 3, label: 'Document' },
  { id: 4, label: 'Upload' },
];

const AddSessionNoteScreen = () => {
  const router = useRouter();
  const { id: patientId } = useLocalSearchParams();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  const [sessionDate, setSessionDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [noteContent, setNoteContent] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Animated scale for success checkmark
  const [scaleAnim] = useState(new Animated.Value(0));

  // Step actuel pour l'indicateur de progression
  const currentStep = uploadSuccess ? 4 : selectedFile ? 3 : noteContent.trim() ? 2 : sessionDate ? 1 : 0;

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
        'Permission refusee',
        "Vous devez autoriser l'acces a la camera"
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
        'Permission refusee',
        "Vous devez autoriser l'acces a la galerie"
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
      Alert.alert('Erreur', 'Impossible de selectionner le document');
    }
  };

  // --- Upload ---
  const handleUpload = async () => {
    if (!selectedFile && !noteContent.trim()) {
      Alert.alert('Erreur', 'Veuillez saisir du contenu ou selectionner un fichier');
      return;
    }

    if (!sessionDate) {
      Alert.alert('Erreur', 'Veuillez selectionner une date de seance');
      return;
    }

    setUploading(true);
    const result = await sessionNoteService.uploadSessionNote(
      patientId,
      selectedFile,
      sessionDate,
      noteContent.trim()
    );
    setUploading(false);

    if (result.success) {
      setUploadSuccess(true);
      // Animate the checkmark with spring
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 60,
        useNativeDriver: true,
      }).start();
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
  // ECRAN DE SUCCES
  // ============================================================
  if (uploadSuccess) {
    return (
      <SafeAreaView className="flex-1" style={{ backgroundColor: '#FAFAFA' }}>
        <View
          className="flex-1 justify-center items-center px-6"
          style={isDesktop ? { alignSelf: 'center', maxWidth: 480 } : undefined}
        >
          {/* Animated success checkmark */}
          <Animated.View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: '#EDFAF2',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20,
              transform: [{ scale: scaleAnim }],
              shadowColor: '#4CAF82',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.15,
              shadowRadius: 12,
              elevation: 4,
            }}
          >
            <Ionicons name="checkmark-circle" size={50} color="#4CAF82" />
          </Animated.View>

          <Text style={{ fontSize: 24, fontWeight: '700', color: '#1A1A1A', marginBottom: 12, textAlign: 'center' }}>
            Note uploadee !
          </Text>
          <Text style={{ fontSize: 15, color: '#6B6B6B', textAlign: 'center', marginBottom: 8 }}>
            La note de seance a ete uploadee avec succes.
          </Text>
          <Text style={{ fontSize: 13, color: '#A0A0A0', textAlign: 'center', marginBottom: 32 }}>
            L'OCR va extraire le texte et generer un resume automatiquement.
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
              icon={<Ionicons name="person-outline" size={18} color="white" />}
              className={isDesktop ? '' : 'mb-3'}
              style={isDesktop ? { minWidth: 180 } : undefined}
            />
            <Button
              title="Retour au dashboard"
              onPress={goToDashboard}
              variant="outline"
              icon={<Ionicons name="grid-outline" size={18} color="#E8A838" />}
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
    <SafeAreaView className="flex-1" style={{ backgroundColor: '#FAFAFA' }}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          padding: isDesktop ? 40 : 24,
          alignItems: isDesktop ? 'center' : undefined,
        }}
      >
        <View style={isDesktop ? { width: '100%', maxWidth: 640 } : undefined}>
          {/* ---- Breadcrumb ---- */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 }}>
            <TouchableOpacity
              onPress={goToDashboard}
              style={{ flexDirection: 'row', alignItems: 'center' }}
              activeOpacity={0.7}
            >
              <Ionicons name="grid-outline" size={16} color="#A0A0A0" />
              <Text style={{ fontSize: 13, color: '#A0A0A0', marginLeft: 4 }}>Dashboard</Text>
            </TouchableOpacity>

            <Ionicons name="chevron-forward" size={14} color="#E2DFDD" />

            <TouchableOpacity
              onPress={goToPatient}
              style={{ flexDirection: 'row', alignItems: 'center' }}
              activeOpacity={0.7}
            >
              <Ionicons name="person-outline" size={16} color="#A0A0A0" />
              <Text style={{ fontSize: 13, color: '#A0A0A0', marginLeft: 4 }}>Patient</Text>
            </TouchableOpacity>

            <Ionicons name="chevron-forward" size={14} color="#E2DFDD" />

            <Text style={{ fontSize: 13, color: '#1A1A1A', fontWeight: '500' }}>
              Nouvelle note
            </Text>
          </View>

          {/* ---- Header ---- */}
          <View style={{ marginBottom: 24 }}>
            <Text style={{ fontSize: 24, fontWeight: '700', color: '#1A1A1A', marginBottom: 8 }}>
              Ajouter une note de seance
            </Text>
            <Text style={{ fontSize: 15, color: '#6B6B6B', lineHeight: 22 }}>
              Prenez en photo ou uploadez vos notes manuscrites. L'OCR extraira
              automatiquement le texte.
            </Text>
          </View>

          {/* ---- Step indicator ---- */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 32, gap: 4 }}>
            {STEPS.map((step, index) => (
              <React.Fragment key={step.id}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 14,
                      backgroundColor: currentStep >= step.id ? '#E8A838' : '#EEECEB',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {currentStep > step.id ? (
                      <Ionicons name="checkmark" size={14} color="white" />
                    ) : (
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: '700',
                          color: currentStep >= step.id ? 'white' : '#A0A0A0',
                        }}
                      >
                        {step.id}
                      </Text>
                    )}
                  </View>
                  <Text
                    style={{
                      fontSize: 12,
                      marginLeft: 6,
                      color: currentStep >= step.id ? '#E8A838' : '#A0A0A0',
                      fontWeight: currentStep >= step.id ? '600' : '400',
                    }}
                  >
                    {step.label}
                  </Text>
                </View>
                {index < STEPS.length - 1 && (
                  <View
                    style={{
                      flex: 1,
                      height: 2,
                      marginHorizontal: 8,
                      borderRadius: 1,
                      backgroundColor: currentStep > step.id ? '#E8A838' : '#EEECEB',
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </View>

          {/* ---- Date de seance ---- */}
          <View
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 16,
              padding: isDesktop ? 28 : 20,
              marginBottom: 16,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.04,
              shadowRadius: 8,
              elevation: 2,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <View
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  backgroundColor: '#FAE8C4',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 12,
                }}
              >
                <Ionicons name="calendar-outline" size={16} color="#E8A838" />
              </View>
              <Text style={{ fontSize: 17, fontWeight: '600', color: '#1A1A1A' }}>
                Date de la seance
              </Text>
            </View>
            <Input
              placeholder="AAAA-MM-JJ"
              value={sessionDate}
              onChangeText={setSessionDate}
              keyboardType="default"
              icon={<Ionicons name="calendar-outline" size={20} color="#E8A838" />}
            />
          </View>

          {/* ---- Contenu de la note ---- */}
          <View
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 16,
              padding: isDesktop ? 28 : 20,
              marginBottom: 16,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.04,
              shadowRadius: 8,
              elevation: 2,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <View
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  backgroundColor: '#FAE8C4',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 12,
                }}
              >
                <Ionicons name="create-outline" size={16} color="#E8A838" />
              </View>
              <Text style={{ fontSize: 17, fontWeight: '600', color: '#1A1A1A' }}>
                Contenu de la note
              </Text>
            </View>
            <Input
              placeholder="Redigez vos observations, remarques ou notes de seance..."
              value={noteContent}
              onChangeText={setNoteContent}
              multiline
              numberOfLines={6}
              icon={<Ionicons name="create-outline" size={20} color="#E8A838" />}
            />
            <Text style={{ fontSize: 12, color: '#A0A0A0', marginTop: -8, textAlign: 'right' }}>
              {noteContent.length} caractere{noteContent.length > 1 ? 's' : ''}
            </Text>
          </View>

          {/* ---- Selection de fichier ---- */}
          <View
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 16,
              padding: isDesktop ? 28 : 20,
              marginBottom: 16,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.04,
              shadowRadius: 8,
              elevation: 2,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
              <View
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  backgroundColor: '#FAE8C4',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 12,
                }}
              >
                <Ionicons name="document-outline" size={16} color="#E8A838" />
              </View>
              <Text style={{ fontSize: 17, fontWeight: '600', color: '#1A1A1A' }}>
                Document (optionnel)
              </Text>
            </View>

            {selectedFile ? (
              <View>
                {/* Preview image */}
                {selectedFile.mimeType?.startsWith('image/') &&
                  selectedFile.uri && (
                    <Image
                      source={{ uri: selectedFile.uri }}
                      style={{
                        width: '100%',
                        borderRadius: 12,
                        marginBottom: 12,
                        backgroundColor: '#F5F5F4',
                        height: isDesktop ? 320 : 256,
                      }}
                      resizeMode="contain"
                    />
                  )}

                {/* PDF indicator */}
                {selectedFile.mimeType === 'application/pdf' && (
                  <View
                    style={{
                      backgroundColor: '#FEF0F0',
                      borderWidth: 1,
                      borderColor: '#FCCECE',
                      borderRadius: 12,
                      padding: 24,
                      marginBottom: 12,
                      alignItems: 'center',
                    }}
                  >
                    <Ionicons name="document" size={40} color="#E05B5B" />
                    <Text style={{ color: '#E05B5B', fontWeight: '600', marginTop: 8 }}>
                      Document PDF
                    </Text>
                  </View>
                )}

                {/* File info */}
                <View
                  style={{
                    backgroundColor: '#EDFAF2',
                    borderWidth: 1,
                    borderColor: '#C8F0D6',
                    borderRadius: 12,
                    padding: 12,
                  }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name="checkmark-circle" size={20} color="#4CAF82" />
                    <Text style={{ color: '#2E8B5E', fontWeight: '600', marginLeft: 8, flex: 1 }}>
                      Fichier selectionne
                    </Text>
                  </View>
                  <Text style={{ color: '#2E8B5E', fontSize: 13, marginTop: 4, opacity: 0.8 }}>
                    {selectedFile.name || 'Image'}
                    {selectedFile.fileSize
                      ? ` - ${formatFileSize(selectedFile.fileSize)}`
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
                {/* Upload zone — dashed border */}
                <View
                  style={{
                    borderWidth: 2,
                    borderStyle: 'dashed',
                    borderColor: '#E2DFDD',
                    borderRadius: 14,
                    padding: 24,
                    alignItems: 'center',
                    marginBottom: 16,
                    backgroundColor: '#FAFAFA',
                  }}
                >
                  <Ionicons name="cloud-upload-outline" size={40} color="#C8C4C0" />
                  <Text style={{ color: '#A0A0A0', marginTop: 8, fontSize: 14, textAlign: 'center' }}>
                    Selectionnez un fichier ci-dessous
                  </Text>
                </View>

                {/* Buttons */}
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
                      icon={<Ionicons name="camera-outline" size={20} color="white" />}
                      className={isDesktop ? '' : 'mb-3'}
                    />
                  </View>

                  <View style={isDesktop ? { flex: 1 } : undefined}>
                    <Button
                      title="Galerie"
                      onPress={pickFromGallery}
                      variant="outline"
                      icon={<Ionicons name="images-outline" size={20} color="#E8A838" />}
                      className={isDesktop ? '' : 'mb-3'}
                    />
                  </View>

                  <View style={isDesktop ? { flex: 1 } : undefined}>
                    <Button
                      title="Document"
                      onPress={pickDocument}
                      variant="outline"
                      icon={<Ionicons name="document-outline" size={20} color="#E8A838" />}
                    />
                  </View>
                </View>

                <Text style={{ fontSize: 12, color: '#A0A0A0', marginTop: 12, textAlign: 'center' }}>
                  Formats acceptes : JPG, PNG, PDF - 10 Mo max
                </Text>
              </View>
            )}
          </View>

          {/* ---- Info OCR ---- */}
          <View
            style={{
              backgroundColor: '#FDF6EA',
              borderWidth: 1,
              borderColor: '#FAE8C4',
              borderRadius: 14,
              padding: 16,
              marginBottom: 16,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
              <Ionicons name="information-circle" size={20} color="#E8A838" />
              <View style={{ marginLeft: 10, flex: 1 }}>
                <Text style={{ fontSize: 14, color: '#8C5C18', fontWeight: '600', marginBottom: 4 }}>
                  Analyse automatique par OCR
                </Text>
                <Text style={{ fontSize: 14, color: '#B07820', lineHeight: 20 }}>
                  Le texte sera extrait automatiquement et un resume sera genere
                  par l'IA pour faciliter le suivi.
                </Text>
              </View>
            </View>
          </View>

          {/* ---- Progress bar during upload ---- */}
          {uploading && (
            <View
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 14,
                padding: 16,
                marginBottom: 16,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.04,
                shadowRadius: 6,
                elevation: 2,
              }}
            >
              <Text style={{ fontSize: 14, color: '#E8A838', fontWeight: '600', marginBottom: 8 }}>
                Upload en cours...
              </Text>
              <View
                style={{
                  height: 6,
                  backgroundColor: '#EEECEB',
                  borderRadius: 3,
                  overflow: 'hidden',
                }}
              >
                <View
                  style={{
                    width: '60%',
                    height: '100%',
                    backgroundColor: '#E8A838',
                    borderRadius: 3,
                  }}
                />
              </View>
            </View>
          )}

          {/* ---- Actions ---- */}
          <View
            style={
              isDesktop
                ? { flexDirection: 'row-reverse', gap: 12 }
                : undefined
            }
          >
            {/* Main button */}
            <View style={isDesktop ? { minWidth: 200 } : undefined}>
              <TouchableOpacity
                onPress={handleUpload}
                disabled={(!selectedFile && !noteContent.trim()) || uploading}
                activeOpacity={0.8}
                style={{
                  backgroundColor: (selectedFile || noteContent.trim()) && !uploading ? '#E8A838' : '#C8C4C0',
                  borderRadius: 14,
                  paddingVertical: 16,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: isDesktop ? 0 : 12,
                  opacity: uploading ? 0.6 : 1,
                  shadowColor: (selectedFile || noteContent.trim()) ? '#E8A838' : 'transparent',
                  shadowOffset: { width: 0, height: 3 },
                  shadowOpacity: 0.2,
                  shadowRadius: 8,
                  elevation: (selectedFile || noteContent.trim()) ? 3 : 0,
                }}
              >
                {uploading ? (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name="hourglass-outline" size={18} color="#FFFFFF" />
                    <Text style={{ color: '#FFFFFF', fontWeight: '600', fontSize: 16, marginLeft: 8 }}>
                      Upload...
                    </Text>
                  </View>
                ) : (
                  <>
                    <Ionicons
                      name="cloud-upload-outline"
                      size={20}
                      color={(selectedFile || noteContent.trim()) ? '#FFFFFF' : '#A0A0A0'}
                    />
                    <Text
                      style={{
                        color: (selectedFile || noteContent.trim()) ? '#FFFFFF' : '#A0A0A0',
                        fontWeight: '600',
                        fontSize: 16,
                        marginLeft: 8,
                      }}
                    >
                      Enregistrer la note
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            </View>

            {/* Secondary buttons */}
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
                icon={<Ionicons name="grid-outline" size={16} color="#E8A838" />}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddSessionNoteScreen;
