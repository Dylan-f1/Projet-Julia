import React, { useState } from 'react';
import { View, Text, ScrollView, Alert, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useAuth } from '../../contexts/AuthContext';

const TherapistRegisterScreen = () => {
  const router = useRouter();
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

  const isWeb = Platform.OS === 'web';

  const specialties = [
    'Psychiatre',
    'Psychotherapeute',
    'Psychologue',
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
      Alert.alert('Erreur', 'Le mot de passe doit contenir au moins 8 caracteres');
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
      Alert.alert('Erreur', result.error || 'Erreur inconnue lors de l\'inscription');
    }
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: '#FAFAFA' }}>
      <View className={`flex-1 ${isWeb ? 'max-w-3xl mx-auto w-full' : ''}`}>
        {/* Header strip with therapist-50 background */}
        <View
          style={{
            backgroundColor: '#FDF6EA',
            paddingHorizontal: isWeb ? 32 : 24,
            paddingVertical: 24,
            borderBottomWidth: 1,
            borderBottomColor: '#FAE8C4',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: '#FAE8C4',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 14,
              }}
            >
              <Ionicons name="leaf" size={24} color="#E8A838" />
            </View>
            <View>
              <Text style={{ fontSize: 24, fontWeight: '700', color: '#1A1A1A' }}>
                Julia
              </Text>
              <Text style={{ fontSize: 14, color: '#6B6B6B' }}>
                Inscription Therapeute
              </Text>
            </View>
          </View>
          <Text style={{ fontSize: 14, color: '#6B6B6B', lineHeight: 20 }}>
            Creez votre compte professionnel
          </Text>
        </View>

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ padding: isWeb ? 32 : 20, paddingBottom: 40 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={!isWeb}
        >
          {/* ---- Section: Informations personnelles ---- */}
          <View
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 16,
              padding: isWeb ? 28 : 20,
              marginBottom: 16,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.04,
              shadowRadius: 8,
              elevation: 2,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
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
                <Ionicons name="person-outline" size={18} color="#E8A838" />
              </View>
              <Text style={{ fontSize: 17, fontWeight: '600', color: '#1A1A1A' }}>
                Informations personnelles
              </Text>
            </View>

            <View className={isWeb ? 'flex-row gap-4' : ''}>
              <View className={isWeb ? 'flex-1' : ''}>
                <Input
                  label="Prenom *"
                  placeholder="Jean"
                  value={formData.firstName}
                  onChangeText={(value) => updateField('firstName', value)}
                  autoCapitalize="words"
                  icon={<Ionicons name="person-outline" size={20} color="#E8A838" />}
                />
              </View>

              <View className={isWeb ? 'flex-1' : ''}>
                <Input
                  label="Nom *"
                  placeholder="Dupont"
                  value={formData.lastName}
                  onChangeText={(value) => updateField('lastName', value)}
                  autoCapitalize="words"
                  icon={<Ionicons name="person-outline" size={20} color="#E8A838" />}
                />
              </View>
            </View>

            <Input
              label="Email professionnel *"
              placeholder="jean.dupont@cabinet.fr"
              value={formData.email}
              onChangeText={(value) => updateField('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              icon={<Ionicons name="mail-outline" size={20} color="#E8A838" />}
            />

            <Input
              label="Telephone"
              placeholder="+33 6 12 34 56 78"
              value={formData.phone}
              onChangeText={(value) => updateField('phone', value)}
              keyboardType="phone-pad"
              icon={<Ionicons name="call-outline" size={20} color="#E8A838" />}
            />
          </View>

          {/* ---- Section: Informations professionnelles ---- */}
          <View
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 16,
              padding: isWeb ? 28 : 20,
              marginBottom: 16,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.04,
              shadowRadius: 8,
              elevation: 2,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
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
                <Ionicons name="briefcase-outline" size={18} color="#E8A838" />
              </View>
              <Text style={{ fontSize: 17, fontWeight: '600', color: '#1A1A1A' }}>
                Informations professionnelles
              </Text>
            </View>

            {/* Specialty pills */}
            <View style={{ marginBottom: 16 }}>
              <Text style={{ color: '#404040', fontWeight: '500', marginBottom: 12, fontSize: 14 }}>
                Specialite *
              </Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: isWeb ? 12 : 8 }}>
                {specialties.map((specialty) => (
                  <TouchableOpacity
                    key={specialty}
                    onPress={() => updateField('specialty', specialty)}
                    activeOpacity={0.7}
                    style={{
                      paddingHorizontal: 20,
                      paddingVertical: 12,
                      borderRadius: 20,
                      backgroundColor: formData.specialty === specialty ? '#E8A838' : '#F5F5F4',
                      ...(formData.specialty === specialty
                        ? {
                            shadowColor: '#E8A838',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.25,
                            shadowRadius: 6,
                            elevation: 3,
                          }
                        : {}),
                    }}
                  >
                    <Text
                      style={{
                        color: formData.specialty === specialty ? '#FFFFFF' : '#404040',
                        fontWeight: formData.specialty === specialty ? '600' : '400',
                        fontSize: 14,
                      }}
                    >
                      {specialty}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <Input
              label="Numero ADELI ou RPPS"
              placeholder="123456789"
              value={formData.licenseNumber}
              onChangeText={(value) => updateField('licenseNumber', value)}
              keyboardType="numeric"
              icon={<Ionicons name="shield-checkmark-outline" size={20} color="#E8A838" />}
            />
          </View>

          {/* ---- Section: Securite ---- */}
          <View
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 16,
              padding: isWeb ? 28 : 20,
              marginBottom: 24,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.04,
              shadowRadius: 8,
              elevation: 2,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
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
                <Ionicons name="lock-closed-outline" size={18} color="#E8A838" />
              </View>
              <Text style={{ fontSize: 17, fontWeight: '600', color: '#1A1A1A' }}>
                Securite
              </Text>
            </View>

            <Input
              label="Mot de passe *"
              placeholder="Minimum 8 caracteres"
              value={formData.password}
              onChangeText={(value) => updateField('password', value)}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              icon={<Ionicons name="lock-closed-outline" size={20} color="#E8A838" />}
              rightIcon={
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color="#E8A838"
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
              icon={<Ionicons name="lock-closed-outline" size={20} color="#E8A838" />}
              rightIcon={
                <Ionicons
                  name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color="#E8A838"
                />
              }
              onRightIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          </View>

          {/* Submit button */}
          <TouchableOpacity
            onPress={handleRegister}
            disabled={loading}
            activeOpacity={0.8}
            style={{
              backgroundColor: '#E8A838',
              borderRadius: 16,
              paddingVertical: 16,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16,
              opacity: loading ? 0.5 : 1,
              shadowColor: '#E8A838',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.25,
              shadowRadius: 8,
              elevation: 4,
            }}
          >
            {loading ? (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="hourglass-outline" size={20} color="#ffffff" />
                <Text style={{ color: '#ffffff', fontWeight: '600', fontSize: 16, marginLeft: 8 }}>
                  Creation en cours...
                </Text>
              </View>
            ) : (
              <Text style={{ color: '#ffffff', fontWeight: '600', fontSize: 16 }}>
                Creer mon compte
              </Text>
            )}
          </TouchableOpacity>

          {/* Login link */}
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 24 }}>
            <Text style={{ color: '#6B6B6B', fontSize: 14 }}>Deja un compte ? </Text>
            <TouchableOpacity onPress={() => router.push('/auth/therapist-login')}>
              <Text style={{ color: '#D4942A', fontWeight: '600', fontSize: 14 }}>
                Se connecter
              </Text>
            </TouchableOpacity>
          </View>

          {/* Back to home */}
          <View
            style={{
              paddingTop: 20,
              borderTopWidth: 1,
              borderTopColor: '#EEECEB',
            }}
          >
            <TouchableOpacity
              onPress={() => router.push('/')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 8,
              }}
            >
              <Ionicons name="arrow-back-outline" size={18} color="#D4942A" />
              <Text style={{ color: '#D4942A', fontWeight: '500', marginLeft: 8 }}>
                Retour a l'accueil
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default TherapistRegisterScreen;
