import React, { useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import patientService from '../../services/patientService';

const AddPatientScreen = () => {
  const router = useRouter();
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
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim()) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires (nom, prénom, email)');
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
    console.log('🔴 === DÉBUT handleSubmit ===');
    console.log('📋 FormData:', formData);
    
    if (!validateForm()) {
      console.log('❌ Validation échouée');
      return;
    }
    
    console.log('✅ Validation OK');
    console.log('⏳ Appel API createPatient...');

    setLoading(true);
    
    const result = await patientService.createPatient(formData);
    
    console.log('📥 Résultat:', result);
    console.log('📥 Success:', result.success);
    console.log('📥 Data:', result.data);
    console.log('📥 Error:', result.error);
    
    setLoading(false);

    if (result.success) {
      console.log('✅ Création réussie !');
      Alert.alert(
        'Succès',
        'Le patient a été créé avec succès. Un email de connexion lui a été envoyé.',
        [
          {
            text: 'OK',
            onPress: () => {
              console.log('🔙 Retour au dashboard');
              router.back();
            },
          },
        ]
      );
    } else {
      console.log('❌ Erreur création:', result.error);
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
            Ajouter un patient
          </Text>
          <Text className="text-base text-gray-600">
            Créez un nouveau dossier patient. Un email de connexion sera automatiquement envoyé.
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
            keyboardType="numeric"
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

        <View className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <View className="flex-row items-start">
            <Ionicons name="information-circle" size={20} color="#0284c7" />
            <Text className="text-sm text-blue-700 ml-2 flex-1">
              Le patient recevra un email contenant un lien de connexion sécurisé pour accéder à l'application.
            </Text>
          </View>
        </View>

        <Button
          title="Créer le patient"
          onPress={handleSubmit}
          loading={loading}
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

export default AddPatientScreen;
