import { Stack } from 'expo-router';
import PatientDetailScreen from '../../../src/screens/therapist/PatientDetailScreen';

export default function Page() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <PatientDetailScreen />
    </>
  );
}