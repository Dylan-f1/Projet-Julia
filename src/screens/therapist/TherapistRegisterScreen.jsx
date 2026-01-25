import React, { useState } from 'react';
import { View, Text, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useAuth } from '../../contexts/AuthContext';

const TherapistRegisterScreen = ({ navigation }) => {
  const { registerTherapist } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    specialty: '',
    phone: '',
    licenseNumber: '',
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const specialties = [
    'Psychologue clinicien',
    'Psychiatre',
    'Psychothérapeute',
    'Psychanalyste',
    'Neuropsychologue',
    'Psychologue du travail',
    'Autre',
  ];

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.email || !formData.password || !formData.firstName || 
        !formData.lastName || !formData.specialty) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires');
      return false;
    }

    if (formData.password.length < 8) {
      Alert.alert('Erreur', 'Le mot de passe doit contenir au moins 8 caractères');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Alert.alert('Erreur', 'Adresse email invalide');
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);
    const { confirmPassword, ...registrationData } = formData;
    const result = await registerTherapist(registrationData);
    setLoading(false);

    if (!result.success) {
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
        {/* Header */}
        <View className="items-center mb-8">
          <View className="w-20 h-20 bg-secondary-100 rounded-full items-center justify-center mb-4">
            <Ionicons name="medical" size={40} color="#c026d3" />
          </View>
          <Text className="text-3xl font-bold text-gray-900 mb-2">
            Inscription Thérapeute
          </Text>
          <Text className="text-base text-gray-600 text-center">
            Créez votre compte professionnel
          </Text>
        </View>

        {/* Formulaire */}
        <View className="mb-6">
          <Text className="text-xl font-semibold text-gray-900 mb-4">
            Informations personnelles
          </Text>

          <Input
            label="Prénom *"
            placeholder="Jean"
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
            label="Email professionnel *"
            placeholder="jean.dupont@cabinet.fr"
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
        </View>

        <View className="mb-6">
          <Text className="text-xl font-semibold text-gray-900 mb-4">
            Informations professionnelles
          </Text>

          <View className="mb-4">
            <Text className="text-gray-700 font-medium mb-2">Spécialité *</Text>
            <View className="flex-row flex-wrap">
              {specialties.map((specialty) => (
                <TouchableOpacity
                  key={specialty}
                  onPress={() => updateField('specialty', specialty)}
                  className={`px-4 py-2 rounded-full mr-2 mb-2 ${
                    formData.specialty === specialty
                      ? 'bg-secondary-600'
                      : 'bg-gray-200'
                  }`}
                >
                  <Text
                    className={`${
                      formData.specialty === specialty
                        ? 'text-white font-semibold'
                        : 'text-gray-700'
                    }`}
                  >
                    {specialty}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <Input
            label="Numéro ADELI ou RPPS"
            placeholder="123456789"
            value={formData.licenseNumber}
            onChangeText={(value) => updateField('licenseNumber', value)}
            keyboardType="numeric"
            icon={<Ionicons name="shield-checkmark-outline" size={20} color="#6B7280" />}
          />
        </View>

        <View className="mb-6">
          <Text className="text-xl font-semibold text-gray-900 mb-4">
            Sécurité
          </Text>

          <Input
            label="Mot de passe *"
            placeholder="Minimum 8 caractères"
            value={formData.password}
            onChangeText={(value) => updateField('password', value)}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            icon={<Ionicons name="lock-closed-outline" size={20} color="#6B7280" />}
            rightIcon={
              <Ionicons
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color="#6B7280"
              />
            }
            onRightIconPress={() => setShowPassword(!showPassword)}
          />

          <Input
            label="Confirmer le mot de passe *"
            placeholder="Retapez votre mot de passe"
            value={formData.confirmPassword}
            onChangeText={(value) => updateField('confirmPassword', value)}
            secureTextEntry={!showConfirmPassword}
            autoCapitalize="none"
            icon={<Ionicons name="lock-closed-outline" size={20} color="#6B7280" />}
            rightIcon={
              <Ionicons
                name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color="#6B7280"
              />
            }
            onRightIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
          />
        </View>

        <Button
          title="Créer mon compte"
          onPress={handleRegister}
          loading={loading}
          size="large"
          className="mb-4"
        />

        <View className="flex-row justify-center mb-6">
          <Text className="text-gray-600">Déjà un compte ? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('TherapistLogin')}>
            <Text className="text-secondary-600 font-semibold">Se connecter</Text>
          </TouchableOpacity>
        </View>

        <View className="pt-6 border-t border-gray-200">
          <Button
            title="← Retour à l'accueil"
            onPress={() => navigation.navigate('PatientLogin')}
            variant="ghost"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TherapistRegisterScreen;
