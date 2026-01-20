import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, Input } from '@/components/ui';

export default function MagicLinkScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSendMagicLink = async () => {
    if (!email.trim()) return;

    setLoading(true);
    
    // Simulation d'envoi
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1500);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FFFCF9]">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingVertical: 32, justifyContent: 'center' }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo et titre */}
          <View className="items-center mb-12">
            <View className="w-20 h-20 rounded-3xl bg-[#F87142] items-center justify-center mb-6">
              <Text className="text-4xl">🧠</Text>
            </View>
            
            <Text className="text-3xl font-bold text-[#2C2318] mb-2">
              MindLink
            </Text>
            <Text className="text-base text-[#8B8378] text-center">
              Votre espace de bien-être disponible 24/7
            </Text>
          </View>

          {!sent ? (
            <>
              {/* Description */}
              <View className="mb-8">
                <Text className="text-xl font-semibold text-[#2C2318] mb-3">
                  Connexion sécurisée
                </Text>
                <Text className="text-base text-[#5C5347] leading-6">
                  Entrez votre adresse email pour recevoir un lien de connexion sécurisé.
                </Text>
              </View>

              {/* Formulaire */}
              <View className="mb-6">
                <Input
                  label="Adresse email"
                  placeholder="votre@email.com"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <Button
                onPress={handleSendMagicLink}
                loading={loading}
                disabled={!email.trim()}
                fullWidth
                size="lg"
              >
                Recevoir le lien de connexion
              </Button>
            </>
          ) : (
            <>
              {/* Message de confirmation */}
              <View className="items-center py-8">
                <View className="w-24 h-24 rounded-full bg-[#E5F4E7] items-center justify-center mb-6">
                  <Text className="text-5xl">📧</Text>
                </View>

                <Text className="text-2xl font-bold text-[#2C2318] mb-3 text-center">
                  Email envoyé !
                </Text>

                <Text className="text-base text-[#5C5347] text-center leading-6 mb-8">
                  Nous venons d'envoyer un lien de connexion à{'\n'}
                  <Text className="font-semibold">{email}</Text>
                </Text>

                <View className="bg-[#FFF4ED] rounded-2xl p-4 mb-8">
                  <Text className="text-sm text-[#8B6835] text-center">
                    💡 Le lien est valable pendant 48 heures
                  </Text>
                </View>

                <Button
                  variant="outline"
                  onPress={() => setSent(false)}
                  fullWidth
                >
                  Renvoyer le lien
                </Button>
              </View>
            </>
          )}

          {/* Note de sécurité */}
          <View className="mt-12">
            <Text className="text-xs text-[#B8B1A6] text-center">
              Un lien de connexion sécurisé vous sera envoyé par votre thérapeute
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}