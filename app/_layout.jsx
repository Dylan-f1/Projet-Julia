import "../global.css";
import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { AuthProvider, useAuth } from '../src/contexts/AuthContext';

function RootLayoutNav() {
  const { isAuthenticated, userRole, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === 'auth';
    const inTherapistGroup = segments[0] === 'therapist';
    const inPatientGroup = segments[0] === 'patient';
    const inVerifyMagicLink = segments.includes('verify-magic-link');

    if (inVerifyMagicLink) {
      return;
    }

    if (!isAuthenticated && !inAuthGroup) {
      router.replace('/auth/therapist-login');
    } else if (isAuthenticated) {
      if (userRole === 'therapist' && !inTherapistGroup) {
        router.replace('/therapist/dashboard');
      } else if (userRole === 'patient' && !inPatientGroup) {
        router.replace('/patient/home');
      }
    }
  }, [isAuthenticated, userRole, loading, segments]);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#FAFAFA' },
          animation: 'fade',
        }}
      >
        <Stack.Screen name="auth" />
        <Stack.Screen name="therapist" />
        <Stack.Screen name="patient" />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
