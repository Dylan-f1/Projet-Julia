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
    <SafeAreaView className="flex-1 bg-white">
      {/* Conteneur centré pour desktop */}
      <View className={`flex-1 ${isWeb ? 'max-w-md mx-auto w-full' : ''}`}>
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ 
            flexGrow: 1,
            padding: isWeb ? 32 : 24,
            justifyContent: 'center'
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={!isWeb}
        >
          {/* Logo et titre */}
          <View className="items-center mb-12">
            <View className="w-20 h-20 bg-secondary-100 rounded-full items-center justify-center mb-4">
              <Ionicons name="medical" size={40} color="#c026d3" />
            </View>
            <Text className="text-3xl font-bold text-gray-900 mb-2">
              Espace Thérapeute
            </Text>
            <Text className="text-base text-gray-600 text-center">
              Connectez-vous pour accéder à votre dashboard
            </Text>
          </View>

          <Text className="text-xl font-semibold text-gray-900 mb-6">
            Connexion
          </Text>

          <Input
            label="Email"
            placeholder="votre@email.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            icon={<Ionicons name="mail-outline" size={20} color="#6B7280" />}
          />

          <Input
            label="Mot de passe"
            placeholder="Votre mot de passe"
            value={password}
            onChangeText={setPassword}
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

          <Button
            title="Se connecter"
            onPress={handleLogin}
            loading={loading}
            size="large"
            className="mt-4"
          />

          <View className="mt-6 flex-row justify-center">
            <Text className="text-gray-600">Pas encore de compte ? </Text>
            <TouchableOpacity onPress={() => router.push('/auth/therapist-register')}>
              <Text className="text-primary-600 font-semibold">S'inscrire</Text>
            </TouchableOpacity>
          </View>

          <View className="mt-8 pt-8 border-t border-gray-200">
            <Button
              title="← Retour à l'accueil"
              onPress={() => router.push('/')}
              variant="ghost"
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default TherapistLoginScreen;