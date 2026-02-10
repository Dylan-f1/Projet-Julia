import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Alert,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import patientService from '../../services/patientService';

const AddPatientScreen = () => {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    notes: '',
  });
  const [loading, setLoading] = useState(false);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.email.trim()
    ) {
      Alert.alert(
        'Erreur',
        'Veuillez remplir tous les champs obligatoires (nom, prénom, email)'
      );
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Alert.alert('Erreur', 'Adresse email invalide');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    const result = await patientService.createPatient(formData);
    setLoading(false);

    if (result.success) {
      Alert.alert(
        'Succès',
        'Le patient a été créé avec succès. Un email de connexion lui a été envoyé.',
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
        contentContainerStyle={{
          padding: isDesktop ? 40 : 24,
          alignItems: isDesktop ? 'center' : undefined,
        }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Container centré en desktop */}
        <View style={isDesktop ? { width: '100%', maxWidth: 640 } : undefined}>
          {/* ---- Header ---- */}
          <View className="mb-6">
            {isDesktop && (
              <View className="flex-row items-center mb-4">
                <Ionicons
                  name="arrow-back"
                  size={22}
                  color="#64748b"
                  onPress={() => router.back()}
                  style={{ marginRight: 12, cursor: 'pointer' }}
                />
                <Text className="text-sm text-gray-500">Retour</Text>
              </View>
            )}
            <Text className="text-2xl font-bold text-gray-900 mb-2">
              Ajouter un patient
            </Text>
            <Text className="text-base text-gray-600">
              Créez un nouveau dossier patient. Un email de connexion sera
              automatiquement envoyé.
            </Text>
          </View>

          {/* ---- Informations personnelles ---- */}
          <View
            className={
              isDesktop
                ? 'bg-white rounded-2xl border border-gray-200 p-8 mb-6'
                : 'mb-6'
            }
            style={
              isDesktop
                ? {
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.05,
                    shadowRadius: 6,
                    elevation: 2,
                  }
                : undefined
            }
          >
            <Text className="text-lg font-semibold text-gray-900 mb-4">
              Informations personnelles
            </Text>

            {/* Prénom / Nom — 2 colonnes desktop */}
            <View
              style={
                isDesktop
                  ? { flexDirection: 'row', gap: 16 }
                  : undefined
              }
            >
              <View style={isDesktop ? { flex: 1 } : undefined}>
                <Input
                  label="Prénom *"
                  placeholder="Marie"
                  value={formData.firstName}
                  onChangeText={(value) => updateField('firstName', value)}
                  autoCapitalize="words"
                  icon={
                    <Ionicons name="person-outline" size={20} color="#6B7280" />
                  }
                />
              </View>
              <View style={isDesktop ? { flex: 1 } : undefined}>
                <Input
                  label="Nom *"
                  placeholder="Dupont"
                  value={formData.lastName}
                  onChangeText={(value) => updateField('lastName', value)}
                  autoCapitalize="words"
                  icon={
                    <Ionicons name="person-outline" size={20} color="#6B7280" />
                  }
                />
              </View>
            </View>

            <Input
              label="Email *"
              placeholder="marie.dupont@email.com"
              value={formData.email}
              onChangeText={(value) => updateField('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              icon={
                <Ionicons name="mail-outline" size={20} color="#6B7280" />
              }
            />

            {/* Téléphone / Date de naissance — 2 colonnes desktop */}
            <View
              style={
                isDesktop
                  ? { flexDirection: 'row', gap: 16 }
                  : undefined
              }
            >
              <View style={isDesktop ? { flex: 1 } : undefined}>
                <Input
                  label="Téléphone"
                  placeholder="+33 6 12 34 56 78"
                  value={formData.phone}
                  onChangeText={(value) => updateField('phone', value)}
                  keyboardType="phone-pad"
                  icon={
                    <Ionicons name="call-outline" size={20} color="#6B7280" />
                  }
                />
              </View>
              <View style={isDesktop ? { flex: 1 } : undefined}>
                <Input
                  label="Date de naissance"
                  placeholder="JJ/MM/AAAA"
                  value={formData.dateOfBirth}
                  onChangeText={(value) => updateField('dateOfBirth', value)}
                  keyboardType="numeric"
                  icon={
                    <Ionicons
                      name="calendar-outline"
                      size={20}
                      color="#6B7280"
                    />
                  }
                />
              </View>
            </View>
          </View>

          {/* ---- Notes privées ---- */}
          <View
            className={
              isDesktop
                ? 'bg-white rounded-2xl border border-gray-200 p-8 mb-6'
                : 'mb-6'
            }
            style={
              isDesktop
                ? {
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.05,
                    shadowRadius: 6,
                    elevation: 2,
                  }
                : undefined
            }
          >
            <Text className="text-lg font-semibold text-gray-900 mb-4">
              Notes privées
            </Text>

            <Input
              label="Notes (visibles uniquement par vous)"
              placeholder="Informations importantes, motif de consultation, etc."
              value={formData.notes}
              onChangeText={(value) => updateField('notes', value)}
              multiline
              numberOfLines={isDesktop ? 8 : 6}
              icon={
                <Ionicons
                  name="document-text-outline"
                  size={20}
                  color="#6B7280"
                />
              }
            />
          </View>

          {/* ---- Info banner ---- */}
          <View className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <View className="flex-row items-start">
              <Ionicons name="information-circle" size={20} color="#0284c7" />
              <Text className="text-sm text-blue-700 ml-2 flex-1">
                Le patient recevra un email contenant un lien de connexion
                sécurisé pour accéder à l'application.
              </Text>
            </View>
          </View>

          {/* ---- Actions — row-reverse en desktop ---- */}
          <View
            style={
              isDesktop
                ? { flexDirection: 'row-reverse', gap: 12 }
                : undefined
            }
          >
            <View style={isDesktop ? { minWidth: 200 } : undefined}>
              <Button
                title="Créer le patient"
                onPress={handleSubmit}
                loading={loading}
                size="large"
                className={isDesktop ? '' : 'mb-4'}
              />
            </View>
            <View style={isDesktop ? { minWidth: 120 } : undefined}>
              <Button
                title="Annuler"
                onPress={() => router.back()}
                variant="outline"
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddPatientScreen;