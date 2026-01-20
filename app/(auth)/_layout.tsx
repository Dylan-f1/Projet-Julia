import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#FFFCF9' },
      }}
    >
      <Stack.Screen name="magic-link" />
    </Stack>
  );
}