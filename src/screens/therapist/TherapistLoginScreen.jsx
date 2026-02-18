import React, { useState } from 'react';
import { View, Text, ScrollView, Alert, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useAuth } from '../../contexts/AuthContext';

const TherapistLoginScreen = () => {
  const router = useRouter();
  const { loginTherapist } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isWeb = Platform.OS === 'web';

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    setLoading(true);
    const result = await loginTherapist(email, password);
    setLoading(false);

    if (!result.success) {
      Alert.alert('Erreur', result.error);
    } else {
      router.replace('/therapist');
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isWeb ? '#FDF6EA' : '#FFFFFF',
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: isWeb ? 'center' : undefined,
          alignItems: isWeb ? 'center' : undefined,
        }}
      >
        <ScrollView
          style={{ width: '100%' }}
          contentContainerStyle={
            isWeb
              ? { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }
              : { flexGrow: 1 }
          }
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
        {/* Wrapper carte desktop */}
        <View
          style={
            isWeb
              ? {
                  width: '100%',
                  maxWidth: 440,
                  backgroundColor: '#FFFFFF',
                  borderRadius: 24,
                  overflow: 'hidden',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 8 },
                  shadowOpacity: 0.10,
                  shadowRadius: 24,
                  elevation: 8,
                }
              : { flex: 1 }
          }
        >
          {/* ============================================ */}
          {/* TOP 45% — Warm gold background with decoration */}
          {/* ============================================ */}
          <View
            style={{
              backgroundColor: '#FDF6EA',
              minHeight: 340,
              paddingTop: 48,
              paddingHorizontal: 24,
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {/* Decorative circle — top-right, absolute */}
            <View
              style={{
                position: 'absolute',
                top: -40,
                right: -40,
                width: 200,
                height: 200,
                borderRadius: 100,
                backgroundColor: '#FAE8C4',
                opacity: 0.4,
              }}
            />

            {/* Second smaller decorative circle — bottom-left */}
            <View
              style={{
                position: 'absolute',
                bottom: 30,
                left: -30,
                width: 120,
                height: 120,
                borderRadius: 60,
                backgroundColor: '#FAE8C4',
                opacity: 0.25,
              }}
            />

            {/* Icon in circle */}
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: '#FAE8C4',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 16,
                shadowColor: '#E8A838',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 12,
                elevation: 4,
              }}
            >
              <Ionicons name="leaf" size={38} color="#E8A838" />
            </View>

            {/* Julia branding */}
            <Text
              style={{
                fontSize: 30,
                fontWeight: '700',
                color: '#1A1A1A',
                marginBottom: 4,
              }}
            >
              Julia
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: '#6B6B6B',
                fontWeight: '500',
              }}
            >
              Espace Therapeute
            </Text>
          </View>

          {/* ============================================ */}
          {/* BOTTOM 55% — White card overlapping top section */}
          {/* ============================================ */}
          <View
            style={{
              backgroundColor: '#FFFFFF',
              marginTop: -30,
              borderTopLeftRadius: 28,
              borderTopRightRadius: 28,
              paddingHorizontal: 24,
              paddingTop: 32,
              paddingBottom: 40,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: -4 },
              shadowOpacity: 0.06,
              shadowRadius: 12,
              elevation: 8,
              flex: 1,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: '600',
                color: '#1A1A1A',
                marginBottom: 24,
              }}
            >
              Connexion
            </Text>

            {/* Email input */}
            <Input
              label="Email"
              placeholder="votre@email.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              icon={<Ionicons name="mail-outline" size={20} color="#E8A838" />}
            />

            {/* Password input */}
            <Input
              label="Mot de passe"
              placeholder="Votre mot de passe"
              value={password}
              onChangeText={setPassword}
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

            {/* Login button */}
            <TouchableOpacity
              onPress={handleLogin}
              disabled={loading}
              activeOpacity={0.8}
              style={{
                backgroundColor: '#E8A838',
                borderRadius: 16,
                paddingVertical: 16,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 8,
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
                    Connexion...
                  </Text>
                </View>
              ) : (
                <Text style={{ color: '#ffffff', fontWeight: '600', fontSize: 16 }}>
                  Se connecter
                </Text>
              )}
            </TouchableOpacity>

            {/* Register link */}
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 24 }}>
              <Text style={{ color: '#6B6B6B', fontSize: 14 }}>Pas encore de compte ? </Text>
              <TouchableOpacity onPress={() => router.push('/auth/therapist-register')}>
                <Text style={{ color: '#D4942A', fontWeight: '600', fontSize: 14 }}>
                  S'inscrire
                </Text>
              </TouchableOpacity>
            </View>

            {/* Back to home */}
            <View
              style={{
                paddingTop: 24,
                marginTop: 24,
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
          </View>
          {/* close desktop card wrapper */}
        </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default TherapistLoginScreen;
