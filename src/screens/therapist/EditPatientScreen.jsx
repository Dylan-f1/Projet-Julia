import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import patientService from '../../services/patientService';

const EditPatientScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const patientId = id;
  
  const [patient, setPatient] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    notes: '',
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const isWeb = Platform.OS === 'web';

  useEffect(() => {
    if (patientId) {
      loadPatient();
    }
  }, [patientId]);

  const loadPatient = async () => {
    setLoading(true);
    const result = await patientService.getPatient(patientId);
    setLoading(false);

    if (result.success) {
      const patientData = result.data;
      setPatient(patientData);
      setFormData({
        firstName: patientData.firstName || '',
        lastName: patientData.lastName || '',
        email: patientData.email || '',
        phone: patientData.phone || '',
        dateOfBirth: patientData.dateOfBirth 
          ? new Date(patientData.dateOfBirth).toLocaleDateString('fr-FR') 
          : '',
        notes: patientData.notes || '',
      });
    }
  };

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim()) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires');
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

    setSubmitting(true);
    const result = await patientService.updatePatient(patientId, formData);
    setSubmitting(false);

    if (result.success) {
      Alert.alert('Succès', 'Les informations du patient ont été mises à jour', [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]);
    } else {
      Alert.alert('Erreur', result.error);
    }
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <Text className="text-gray-600">Chargement...</Text>
      </SafeAreaView>
    );
  }

  if (!patient) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <Text className="text-gray-600">Patient introuvable</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Conteneur responsive centré */}
      <View className={`flex-1 ${isWeb ? 'max-w-2xl mx-auto w-full' : ''}`}>
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ padding: isWeb ? 32 : 24 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={!isWeb}
        >
          {/* Header */}
          <View className="mb-6">
            <Text className="text-2xl font-bold text-gray-900 mb-2">
              Modifier le patient
            </Text>
            <Text className="text-base text-gray-600">
              {patient.firstName} {patient.lastName}
            </Text>
          </View>

          {/* Informations personnelles */}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-gray-900 mb-4">
              Informations personnelles
            </Text>

            <View className={isWeb ? 'flex-row gap-4 mb-4' : ''}>
              <View className={isWeb ? 'flex-1' : ''}>
                <Input
                  label="Prénom *"
                  placeholder="Marie"
                  value={formData.firstName}
                  onChangeText={(value) => updateField('firstName', value)}
                  autoCapitalize="words"
                  icon={<Ionicons name="person-outline" size={20} color="#6B7280" />}
                />
              </View>

              <View className={isWeb ? 'flex-1' : ''}>
                <Input
                  label="Nom *"
                  placeholder="Dupont"
                  value={formData.lastName}
                  onChangeText={(value) => updateField('lastName', value)}
                  autoCapitalize="words"
                  icon={<Ionicons name="person-outline" size={20} color="#6B7280" />}
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
              icon={<Ionicons name="mail-outline" size={20} color="#6B7280" />}
            />

            <View className={isWeb ? 'flex-row gap-4' : ''}>
              <View className={isWeb ? 'flex-1' : ''}>
                <Input
                  label="Téléphone"
                  placeholder="+33 6 12 34 56 78"
                  value={formData.phone}
                  onChangeText={(value) => updateField('phone', value)}
                  keyboardType="phone-pad"
                  icon={<Ionicons name="call-outline" size={20} color="#6B7280" />}
                />
              </View>

              <View className={isWeb ? 'flex-1' : ''}>
                <Input
                  label="Date de naissance"
                  placeholder="JJ/MM/AAAA"
                  value={formData.dateOfBirth}
                  onChangeText={(value) => updateField('dateOfBirth', value)}
                  icon={<Ionicons name="calendar-outline" size={20} color="#6B7280" />}
                />
              </View>
            </View>
          </View>

          {/* Notes privées */}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-gray-900 mb-4">
              Notes privées
            </Text>

            <Input
              label="Notes (visibles uniquement par vous)"
              placeholder="Informations importantes, motif de consultation, etc."
              value={formData.notes}
              onChangeText={(value) => updateField('notes', value)}
              multiline
              numberOfLines={6}
              icon={<Ionicons name="document-text-outline" size={20} color="#6B7280" />}
            />
          </View>

          {/* Boutons d'action */}
          <View className={isWeb ? 'flex-row gap-4' : ''}>
            <View className={isWeb ? 'flex-1' : ''}>
              <Button
                title="Enregistrer les modifications"
                onPress={handleSubmit}
                loading={submitting}
                size="large"
                className="mb-4"
              />
            </View>

            <View className={isWeb ? 'flex-1' : ''}>
              <Button
                title="Annuler"
                onPress={() => router.back()}
                variant="outline"
                size="large"
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default EditPatientScreen;