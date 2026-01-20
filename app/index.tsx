import { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

export default function IndexScreen() {
  const router = useRouter();

  useEffect(() => {
    // Simulation de vérification d'auth
    const checkAuth = async () => {
      const isAuthenticated = false;
      
      if (!isAuthenticated) {
        // Rediriger vers la connexion
        router.replace('/(auth)/magic-link');
      } else {
        // Rediriger selon le rôle
        router.replace('/(patient)/chat');
        // OU
        router.replace('/(psy)/dashboard');
      }
    };

    setTimeout(checkAuth, 1000);
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-[#FFFCF9]">
      <View className="w-20 h-20 rounded-3xl bg-[#F87142] items-center justify-center mb-6">
        <Text className="text-4xl">🧠</Text>
      </View>
      <Text className="text-2xl font-bold text-[#2C2318] mb-4">
        MindLink
      </Text>
      <ActivityIndicator size="large" color="#F87142" />
    </View>
  );
}