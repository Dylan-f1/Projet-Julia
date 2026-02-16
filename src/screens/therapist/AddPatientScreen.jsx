import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Alert,
  TouchableOpacity,
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
        'Veuillez remplir tous les champs obligatoires (nom, prenom, email)'
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
        'Succes',
        'Le patient a ete cree avec succes. Un email de connexion lui a ete envoye.',
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
    <SafeAreaView className="flex-1" style={{ backgroundColor: '#FAFAFA' }}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          padding: isDesktop ? 40 : 24,
          alignItems: isDesktop ? 'center' : undefined,
        }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Container centre en desktop */}
        <View style={isDesktop ? { width: '100%', maxWidth: 640 } : undefined}>
          {/* ---- Header ---- */}
          <View style={{ marginBottom: 24 }}>
            {isDesktop && (
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
              Ajouter un patient
            </Text>
            <Text style={{ fontSize: 15, color: '#6B6B6B', lineHeight: 22 }}>
              Creez un nouveau dossier patient. Un email de connexion sera
              automatiquement envoye.
            </Text>
          </View>

          {/* ---- Informations personnelles ---- */}
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

            {/* Prenom / Nom */}
            <View
              style={
                isDesktop
                  ? { flexDirection: 'row', gap: 16 }
                  : undefined
              }
            >
              <View style={isDesktop ? { flex: 1 } : undefined}>
                <Input
                  label="Prenom *"
                  placeholder="Marie"
                  value={formData.firstName}
                  onChangeText={(value) => updateField('firstName', value)}
                  autoCapitalize="words"
                  icon={<Ionicons name="person-outline" size={20} color="#E8A838" />}
                />
              </View>
              <View style={isDesktop ? { flex: 1 } : undefined}>
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

            {/* Telephone / Date de naissance */}
            <View
              style={
                isDesktop
                  ? { flexDirection: 'row', gap: 16 }
                  : undefined
              }
            >
              <View style={isDesktop ? { flex: 1 } : undefined}>
                <Input
                  label="Telephone"
                  placeholder="+33 6 12 34 56 78"
                  value={formData.phone}
                  onChangeText={(value) => updateField('phone', value)}
                  keyboardType="phone-pad"
                  icon={<Ionicons name="call-outline" size={20} color="#E8A838" />}
                />
              </View>
              <View style={isDesktop ? { flex: 1 } : undefined}>
                <Input
                  label="Date de naissance"
                  placeholder="JJ/MM/AAAA"
                  value={formData.dateOfBirth}
                  onChangeText={(value) => updateField('dateOfBirth', value)}
                  keyboardType="numeric"
                  icon={<Ionicons name="calendar-outline" size={20} color="#E8A838" />}
                />
              </View>
            </View>
          </View>

          {/* ---- Notes privees ---- */}
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
              numberOfLines={isDesktop ? 8 : 6}
              icon={<Ionicons name="document-text-outline" size={20} color="#E8A838" />}
            />
          </View>

          {/* ---- Info banner ---- */}
          <View
            style={{
              backgroundColor: '#EDFAF2',
              borderWidth: 1,
              borderColor: '#C8F0D6',
              borderRadius: 14,
              padding: 16,
              marginBottom: 24,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
              <Ionicons name="information-circle" size={20} color="#4CAF82" />
              <Text style={{ fontSize: 14, color: '#2E8B5E', marginLeft: 10, flex: 1, lineHeight: 20 }}>
                Le patient recevra un email contenant un lien de connexion
                securise pour acceder a l'application.
              </Text>
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
            <View style={isDesktop ? { minWidth: 200 } : undefined}>
              <TouchableOpacity
                onPress={handleSubmit}
                disabled={loading}
                activeOpacity={0.8}
                style={{
                  backgroundColor: '#E8A838',
                  borderRadius: 14,
                  paddingVertical: 16,
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: loading ? 0.5 : 1,
                  marginBottom: isDesktop ? 0 : 12,
                  shadowColor: '#E8A838',
                  shadowOffset: { width: 0, height: 3 },
                  shadowOpacity: 0.2,
                  shadowRadius: 8,
                  elevation: 3,
                }}
              >
                {loading ? (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name="hourglass-outline" size={18} color="#FFFFFF" />
                    <Text style={{ color: '#FFFFFF', fontWeight: '600', fontSize: 16, marginLeft: 8 }}>
                      Creation...
                    </Text>
                  </View>
                ) : (
                  <Text style={{ color: '#FFFFFF', fontWeight: '600', fontSize: 16 }}>
                    Creer le patient
                  </Text>
                )}
              </TouchableOpacity>
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
