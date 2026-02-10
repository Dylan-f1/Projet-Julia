import { Stack } from 'expo-router';
import EditPatientScreen from '../../../../src/screens/therapist/EditPatientScreen';

export default function EditPatientRoute() {
  return (
    <>
      <Stack.Screen 
        options={{
          headerShown: false,
          title: '',
        }} 
      />
      <EditPatientScreen />
    </>
  );
}