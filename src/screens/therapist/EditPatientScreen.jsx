import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Alert, Platform, TouchableOpacity } from 'react-native';
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
      Alert.alert('Succes', 'Les informations du patient ont ete mises a jour', [
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
      <SafeAreaView className="flex-1 justify-center items-center" style={{ backgroundColor: '#FAFAFA' }}>
        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 20,
            padding: 32,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.06,
            shadowRadius: 12,
            elevation: 3,
          }}
        >
          <View
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: '#FDF6EA',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 12,
            }}
          >
            <Ionicons name="hourglass-outline" size={22} color="#E8A838" />
          </View>
          <Text style={{ color: '#6B6B6B' }}>Chargement...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!patient) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center" style={{ backgroundColor: '#FAFAFA' }}>
        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 20,
            padding: 32,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.06,
            shadowRadius: 12,
            elevation: 3,
          }}
        >
          <View
            style={{
              width: 64,
              height: 64,
              borderRadius: 32,
              backgroundColor: '#FEF0F0',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16,
            }}
          >
            <Ionicons name="person-outline" size={28} color="#E05B5B" />
          </View>
          <Text style={{ color: '#1A1A1A', fontWeight: '600', fontSize: 16 }}>
            Patient introuvable
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: '#FAFAFA' }}>
      <View className={`flex-1 ${isWeb ? 'max-w-2xl mx-auto w-full' : ''}`}>
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ padding: isWeb ? 32 : 24 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={!isWeb}
        >
          {/* Header */}
          <View style={{ marginBottom: 24 }}>
            {isWeb && (
              <TouchableOpacity
                onPress={() => router.back()}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 16,
                }}
              >
                <Ionicons name="arrow-back" size={22} color="#E8A838" style={{ marginRight: 8 }} />
                <Text style={{ fontSize: 14, color: '#E8A838' }}>Retour</Text>
              </TouchableOpacity>
            )}
            <Text style={{ fontSize: 24, fontWeight: '700', color: '#1A1A1A', marginBottom: 8 }}>
              Modifier le patient
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: '#FDF6EA',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 10,
                }}
              >
                <Ionicons name="person" size={16} color="#E8A838" />
              </View>
              <Text style={{ fontSize: 15, color: '#6B6B6B' }}>
                {patient.firstName} {patient.lastName}
              </Text>
            </View>
          </View>

          {/* Informations personnelles */}
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

            <View className={isWeb ? 'flex-row gap-4 mb-4' : ''}>
              <View className={isWeb ? 'flex-1' : ''}>
                <Input
                  label="Prenom *"
                  placeholder="Marie"
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
              label="Email *"
              placeholder="marie.dupont@email.com"
              value={formData.email}
              onChangeText={(value) => updateField('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              icon={<Ionicons name="mail-outline" size={20} color="#E8A838" />}
            />

            <View className={isWeb ? 'flex-row gap-4' : ''}>
              <View className={isWeb ? 'flex-1' : ''}>
                <Input
                  label="Telephone"
                  placeholder="+33 6 12 34 56 78"
                  value={formData.phone}
                  onChangeText={(value) => updateField('phone', value)}
                  keyboardType="phone-pad"
                  icon={<Ionicons name="call-outline" size={20} color="#E8A838" />}
                />
              </View>

              <View className={isWeb ? 'flex-1' : ''}>
                <Input
                  label="Date de naissance"
                  placeholder="JJ/MM/AAAA"
                  value={formData.dateOfBirth}
                  onChangeText={(value) => updateField('dateOfBirth', value)}
                  icon={<Ionicons name="calendar-outline" size={20} color="#E8A838" />}
                />
              </View>
            </View>
          </View>

          {/* Notes privees */}
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
                <Ionicons name="document-text-outline" size={18} color="#E8A838" />
              </View>
              <Text style={{ fontSize: 17, fontWeight: '600', color: '#1A1A1A' }}>
                Notes privees
              </Text>
            </View>

            <Input
              label="Notes (visibles uniquement par vous)"
              placeholder="Informations importantes, motif de consultation, etc."
              value={formData.notes}
              onChangeText={(value) => updateField('notes', value)}
              multiline
              numberOfLines={6}
              icon={<Ionicons name="document-text-outline" size={20} color="#E8A838" />}
            />
          </View>

          {/* Boutons d'action */}
          <View className={isWeb ? 'flex-row gap-4' : ''}>
            <View className={isWeb ? 'flex-1' : ''}>
              <TouchableOpacity
                onPress={handleSubmit}
                disabled={submitting}
                activeOpacity={0.8}
                style={{
                  backgroundColor: '#E8A838',
                  borderRadius: 14,
                  paddingVertical: 16,
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: submitting ? 0.5 : 1,
                  marginBottom: 12,
                  shadowColor: '#E8A838',
                  shadowOffset: { width: 0, height: 3 },
                  shadowOpacity: 0.2,
                  shadowRadius: 8,
                  elevation: 3,
                }}
              >
                {submitting ? (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name="hourglass-outline" size={18} color="#FFFFFF" />
                    <Text style={{ color: '#FFFFFF', fontWeight: '600', fontSize: 16, marginLeft: 8 }}>
                      Enregistrement...
                    </Text>
                  </View>
                ) : (
                  <Text style={{ color: '#FFFFFF', fontWeight: '600', fontSize: 16 }}>
                    Enregistrer les modifications
                  </Text>
                )}
              </TouchableOpacity>
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
