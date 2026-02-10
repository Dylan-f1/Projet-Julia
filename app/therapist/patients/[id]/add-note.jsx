import { Stack } from 'expo-router';
import AddSessionNoteScreen from '../../../../src/screens/therapist/AddSessionNoteScreen';

export default function Page() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <AddSessionNoteScreen />
    </>
  );
}