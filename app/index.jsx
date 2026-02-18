import { useEffect } from 'react';
import { View } from 'react-native';
import { Redirect } from 'expo-router';
import { useAuth } from '../src/contexts/AuthContext';
import Loading from '../src/components/common/Loading';

export default function Index() {
  const { isAuthenticated, userRole, loading } = useAuth();

  if (loading) {
    return (
      <View className="flex-1 bg-surface-50">
        <Loading message="Chargement..." />
      </View>
    );
  }

  if (!isAuthenticated) {
    return <Redirect href="/auth/therapist-login" />;
  }

  if (userRole === 'patient') {
    return <Redirect href="/patient/chat" />;
  }

  if (userRole === 'therapist') {
    return <Redirect href="/therapist/dashboard" />;
  }

  return <Redirect href="/auth/therapist-login" />;
}
