import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="verify-magic-link" />
      <Stack.Screen name="therapist-login" />
      <Stack.Screen name="therapist-register" />
    </Stack>
  );
}
