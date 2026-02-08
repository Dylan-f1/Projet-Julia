// import { useEffect } from 'react';
// import { Redirect } from 'expo-router';
// import { useAuth } from '../src/contexts/AuthContext';
// import Loading from '../src/components/common/Loading';

// export default function Index() {
//   const { isAuthenticated, userRole, loading } = useAuth();

//   if (loading) {
//     return <Loading message="Chargement..." />;
//   }

//   if (!isAuthenticated) {
//     // Redirect vers login thérapeute
//     // Les patients arrivent directement via Magic Link
//     return <Redirect href="/auth/therapist-login" />;
//   }

//   if (userRole === 'patient') {
//     return <Redirect href="/patient/chat" />;
//   }

//   if (userRole === 'therapist') {
//     return <Redirect href="/therapist/dashboard" />;
//   }

//   return <Redirect href="/auth/therapist-login" />;
// }
import { View, Text } from 'react-native';

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-primary-500">
      <Text className="text-white text-4xl font-bold">
        ✨ Tailwind Test
      </Text>
      <Text className="text-primary-100 text-lg mt-4">
        Si tu vois du BLEU, ça marche !
      </Text>
    </View>
  );
}