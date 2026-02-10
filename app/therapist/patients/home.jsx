// app/patient/home.jsx
import { Stack } from 'expo-router';
import HomeScreen from '../../../src/screens/patient/HomeScreen';

export default function Page() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <HomeScreen />
    </>
  );
}