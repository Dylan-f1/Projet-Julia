import { useEffect } from 'react';
import { Redirect } from 'expo-router';
import { useAuth } from '../src/contexts/AuthContext';
import Loading from '../src/components/common/Loading';

export default function Index() {
  const { isAuthenticated, userRole, loading } = useAuth();

  if (loading) {
    return <Loading message="Chargement..." />;
  }

  if (!isAuthenticated) {
    // Redirect vers login thérapeute
    // Les patients arrivent directement via Magic Link
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
