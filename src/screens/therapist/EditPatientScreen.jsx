import React, { useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import patientService from '../../services/patientService';

const EditPatientScreen = ({ route, navigation }) => {
  const { patientId, patient } = route.params;
  const [formData, setFormData] = useState({
    firstName: patient.firstName || '',
    lastName: patient.lastName || '',
    email: patient.email || '',
    phone: patient.phone || '',
    dateOfBirth: patient.dateOfBirth ? new Date(patient.dateOfBirth).toLocaleDateString('fr-FR') : '',
    notes: patient.notes || '',
  });
  const [loading, setLoading] = useState(false);

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

    setLoading(true);
    const result = await patientService.updatePatient(patientId, formData);
    setLoading(false);

    if (result.success) {
      Alert.alert('Succès', 'Les informations du patient ont été mises à jour', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } else {
      Alert.alert('Erreur', result.error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 24 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="mb-6">
          <Text className="text-2xl font-bold text-gray-900 mb-2">
            Modifier le patient
          </Text>
          <Text className="text-base text-gray-600">
            {patient.firstName} {patient.lastName}
          </Text>
        </View>

        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            Informations personnelles
          </Text>

          <Input
            label="Prénom *"
            placeholder="Marie"
            value={formData.firstName}
            onChangeText={(value) => updateField('firstName', value)}
            autoCapitalize="words"
            icon={<Ionicons name="person-outline" size={20} color="#6B7280" />}
          />

          <Input
            label="Nom *"
            placeholder="Dupont"
            value={formData.lastName}
            onChangeText={(value) => updateField('lastName', value)}
            autoCapitalize="words"
            icon={<Ionicons name="person-outline" size={20} color="#6B7280" />}
          />

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

          <Input
            label="Téléphone"
            placeholder="+33 6 12 34 56 78"
            value={formData.phone}
            onChangeText={(value) => updateField('phone', value)}
            keyboardType="phone-pad"
            icon={<Ionicons name="call-outline" size={20} color="#6B7280" />}
          />

          <Input
            label="Date de naissance"
            placeholder="JJ/MM/AAAA"
            value={formData.dateOfBirth}
            onChangeText={(value) => updateField('dateOfBirth', value)}
            icon={<Ionicons name="calendar-outline" size={20} color="#6B7280" />}
          />
        </View>

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

        <Button
          title="Enregistrer les modifications"
          onPress={handleSubmit}
          loading={loading}
          size="large"
          className="mb-4"
        />

        <Button
          title="Annuler"
          onPress={() => navigation.goBack()}
          variant="outline"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditPatientScreen;
