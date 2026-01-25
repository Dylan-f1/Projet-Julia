import { Stack } from 'expo-router';

export default function PatientsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen 
        name="[id]" 
        options={{
          title: 'Détail patient',
        }}
      />
      <Stack.Screen 
        name="add" 
        options={{
          title: 'Ajouter un patient',
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}
