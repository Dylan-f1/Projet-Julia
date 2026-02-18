import { Stack } from 'expo-router';

export default function PatientsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#FAFAFA',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTintColor: '#D4942A',
        headerTitleStyle: {
          fontWeight: '700',
          fontSize: 17,
          color: '#1A1A1A',
        },
        contentStyle: {
          backgroundColor: '#FAFAFA',
        },
      }}
    >
      <Stack.Screen
        name="[id]"
        options={{
          title: 'Detail patient',
        }}
      />
      <Stack.Screen
        name="add"
        options={{
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}
