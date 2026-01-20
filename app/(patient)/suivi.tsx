import { View, Text, SafeAreaView } from 'react-native';

export default function SuiviScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#FFFCF9]">
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-6xl mb-4">📊</Text>
        <Text className="text-2xl font-bold text-[#2C2318] mb-2 text-center">
          Mon suivi
        </Text>
        <Text className="text-base text-[#8B8378] text-center">
          Historique de vos conversations et évolution de votre bien-être
        </Text>
      </View>
    </SafeAreaView>
  );
}