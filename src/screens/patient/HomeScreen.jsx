import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Platform, RefreshControl, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Loading from '../../components/common/Loading';
import { useAuth } from '../../contexts/AuthContext';

const HomeScreen = () => {
  const router = useRouter();
  const { user, logout } = useAuth();
  const isWeb = Platform.OS === 'web';

  const [loading, setLoading] = useState(true);
  const [checkingConsent, setCheckingConsent] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [patientData, setPatientData] = useState(null);
  const [lastEvaluation, setLastEvaluation] = useState(null);

  // VERIFICATION DU CONSENTEMENT EN PREMIER
  useEffect(() => {
    checkConsent();
  }, []);

  const checkConsent = async () => {
    try {
      const consentAccepted = await AsyncStorage.getItem('dataConsentAccepted');

      console.log('🏠 Vérification consentement depuis HomeScreen:', consentAccepted);

      if (!consentAccepted || consentAccepted !== 'true') {
        console.log('❌ Pas de consentement, redirection vers first-time-consent');
        router.replace('/patient/first-time-consent');
        return;
      }

      console.log('✅ Consentement OK, chargement des données');
      setCheckingConsent(false);
      loadPatientData();

    } catch (error) {
      console.error('Erreur vérification consentement:', error);
      setCheckingConsent(false);
      loadPatientData();
    }
  };

  const loadPatientData = async () => {
    setLoading(true);

    setTimeout(() => {
      setPatientData({
        firstName: user?.firstName || 'Patient',
        lastName: user?.lastName || '',
        therapistName: 'Dr. Martin',
        nextAppointment: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        weeklyGoal: 'Pratiquer la méditation 10 minutes par jour',
      });
      setLoading(false);
    }, 1000);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadPatientData();
    setRefreshing(false);
  };

  const handleLogout = async () => {
    await logout();
    router.replace('/auth/therapist-login');
  };

  const handleNewEvaluation = () => {
    router.push('/patient/evaluation/new');
  };

  const handleViewJournal = () => {
    router.push('/patient/journal');
  };

  const handleViewExercises = () => {
    router.push('/patient/exercises');
  };

  const handleChat = () => {
    router.push('/patient/chat');
  };

  // Afficher un loader pendant la verification du consentement
  if (checkingConsent) {
    return (
      <SafeAreaView className="flex-1 bg-surface-50">
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#5B9BD5" />
          <Text className="mt-4 text-text-500 text-base font-medium">Vérification...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (loading) {
    return <Loading message="Chargement de votre espace..." />;
  }

  return (
    <SafeAreaView className="flex-1 bg-surface-50">
      <View className={`flex-1 ${isWeb ? 'max-w-4xl mx-auto w-full' : ''}`}>
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={!isWeb}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} colors={['#5B9BD5']} tintColor="#5B9BD5" />
          }
        >

          {/* ========== HERO BANNER ========== */}
          <View
            className="px-6 pt-8 pb-10"
            style={{
              backgroundColor: '#EEF4FB',
              borderBottomLeftRadius: 28,
              borderBottomRightRadius: 28,
              overflow: 'hidden',
            }}
          >
            {/* Decorative circle */}
            <View
              style={{
                position: 'absolute',
                top: -30,
                right: -30,
                width: 150,
                height: 150,
                borderRadius: 9999,
                backgroundColor: '#A9C9EB',
                opacity: 0.2,
              }}
            />

            {/* Logout icon top-right */}
            <View className="flex-row justify-end mb-4">
              <TouchableOpacity
                onPress={handleLogout}
                className="p-2 rounded-xl"
                style={{ backgroundColor: 'rgba(255,255,255,0.5)' }}
              >
                <Ionicons name="log-out-outline" size={22} color="#1F4F7A" />
              </TouchableOpacity>
            </View>

            <Text className="text-2xl font-bold mb-1" style={{ color: '#1A1A1A' }}>
              Bonjour, {patientData?.firstName} !
            </Text>
            <Text className="text-base mb-5" style={{ color: '#6B6B6B' }}>
              Comment allez-vous ?
            </Text>

            {/* Evaluation rapide button */}
            <TouchableOpacity
              onPress={handleNewEvaluation}
              activeOpacity={0.8}
              className="py-3.5 px-6 self-start"
              style={{
                backgroundColor: '#5B9BD5',
                borderRadius: 14,
              }}
            >
              <Text className="text-white font-bold text-base">
                Évaluation rapide
              </Text>
            </TouchableOpacity>
          </View>

          <View className="px-5 pt-5 pb-6">

            {/* ========== STATS ROW — ASYMMETRIC ========== */}
            <View className="flex-row mb-6" style={{ gap: 12 }}>
              {/* Stat 1 — Tall */}
              <View
                className="items-center justify-center rounded-2xl p-4"
                style={{
                  flex: 1.5,
                  backgroundColor: '#FFFFFF',
                  minHeight: 120,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.06,
                  shadowRadius: 8,
                  elevation: 3,
                }}
              >
                <View className="w-10 h-10 rounded-xl items-center justify-center mb-2" style={{ backgroundColor: '#EEF4FB' }}>
                  <Ionicons name="calendar-outline" size={20} color="#5B9BD5" />
                </View>
                <Text className="text-3xl font-bold" style={{ color: '#1A1A1A' }}>7</Text>
                <Text className="text-xs mt-1 text-center" style={{ color: '#6B6B6B' }}>jours{'\n'}de suivi</Text>
              </View>

              {/* Stat 2 */}
              <View
                className="items-center justify-center rounded-2xl p-4"
                style={{
                  flex: 1,
                  backgroundColor: '#FFFFFF',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.06,
                  shadowRadius: 8,
                  elevation: 3,
                }}
              >
                <Text className="text-2xl font-bold" style={{ color: '#1A1A1A' }}>3</Text>
                <Text className="text-xs mt-1" style={{ color: '#6B6B6B' }}>éval.</Text>
              </View>

              {/* Stat 3 */}
              <View
                className="items-center justify-center rounded-2xl p-4"
                style={{
                  flex: 1,
                  backgroundColor: '#FFFFFF',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.06,
                  shadowRadius: 8,
                  elevation: 3,
                }}
              >
                <Text className="text-2xl font-bold" style={{ color: '#4CAF82' }}>85%</Text>
                <Text className="text-xs mt-1" style={{ color: '#6B6B6B' }}>objectif</Text>
              </View>
            </View>

            {/* ========== CTA CHAT — FLOATING CARD WITH LEFT BORDER ========== */}
            <TouchableOpacity
              onPress={handleChat}
              activeOpacity={0.8}
              className="mb-6"
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 14,
                borderLeftWidth: 4,
                borderLeftColor: '#F0A8A0',
                paddingVertical: 18,
                paddingHorizontal: 18,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 12,
                elevation: 6,
              }}
            >
              <View className="flex-row items-center">
                <View
                  className="w-11 h-11 rounded-full items-center justify-center mr-4"
                  style={{ backgroundColor: '#FEF4F3' }}
                >
                  <Ionicons name="heart" size={22} color="#F0A8A0" />
                </View>
                <View className="flex-1">
                  <Text className="text-lg font-bold" style={{ color: '#1A1A1A' }}>
                    Jul-IA
                  </Text>
                  <Text className="text-sm" style={{ color: '#6B6B6B' }}>
                    Votre assistante disponible 24/7
                  </Text>
                </View>
                <View
                  className="w-9 h-9 rounded-full items-center justify-center"
                  style={{ backgroundColor: '#EEF4FB' }}
                >
                  <Ionicons name="arrow-forward" size={18} color="#5B9BD5" />
                </View>
              </View>
            </TouchableOpacity>

            {/* ========== TWO COLUMNS ASYMMETRIC (60% / 40%) ========== */}
            <View className="flex-row mb-6" style={{ gap: 12 }}>
              {/* Rendez-vous — 60% */}
              {patientData?.nextAppointment && (
                <View
                  className="rounded-2xl p-5"
                  style={{
                    flex: 3,
                    backgroundColor: '#FDF6EA',
                  }}
                >
                  <View className="flex-row items-center mb-3">
                    <View className="w-9 h-9 rounded-xl items-center justify-center mr-2" style={{ backgroundColor: '#FAE8C4' }}>
                      <Ionicons name="calendar" size={18} color="#E8A838" />
                    </View>
                    <Text className="text-sm font-semibold" style={{ color: '#8C5C18' }}>
                      Rendez-vous
                    </Text>
                  </View>
                  <Text className="text-base font-bold mb-1" style={{ color: '#1A1A1A' }}>
                    {patientData.nextAppointment.toLocaleDateString('fr-FR', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                    })}
                  </Text>
                  <Text className="text-sm" style={{ color: '#6B6B6B' }}>
                    Avec {patientData.therapistName}
                  </Text>
                </View>
              )}

              {/* Objectif semaine — 40% */}
              {patientData?.weeklyGoal && (
                <View
                  className="rounded-2xl p-5"
                  style={{
                    flex: 2,
                    backgroundColor: '#EEF4FB',
                  }}
                >
                  <View className="w-8 h-8 rounded-lg items-center justify-center mb-2" style={{ backgroundColor: '#D4E4F5' }}>
                    <Ionicons name="flag" size={16} color="#5B9BD5" />
                  </View>
                  <Text className="text-sm font-semibold mb-1" style={{ color: '#1F4F7A' }}>
                    Objectif
                  </Text>
                  <Text className="text-xs leading-4" style={{ color: '#404040' }} numberOfLines={3}>
                    {patientData.weeklyGoal}
                  </Text>
                  {/* Small progress bar */}
                  <View className="mt-3 rounded-full h-2" style={{ backgroundColor: '#D4E4F5' }}>
                    <View className="h-2 rounded-full" style={{ width: '85%', backgroundColor: '#5B9BD5' }} />
                  </View>
                </View>
              )}
            </View>

            {/* ========== TOOLS — HORIZONTAL ScrollView ========== */}
            <Text className="text-lg font-bold mb-3" style={{ color: '#1A1A1A' }}>
              Mes outils
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-6"
              contentContainerStyle={{ gap: 12 }}
            >
              {/* Journal */}
              <TouchableOpacity
                onPress={handleViewJournal}
                activeOpacity={0.7}
                className="items-center justify-center"
                style={{
                  width: 120,
                  height: 120,
                  backgroundColor: '#FAFAFA',
                  borderRadius: 20,
                }}
              >
                <View className="w-12 h-12 rounded-xl items-center justify-center mb-2" style={{ backgroundColor: '#FDF6EA' }}>
                  <Ionicons name="book-outline" size={24} color="#E8A838" />
                </View>
                <Text className="text-sm font-medium" style={{ color: '#1A1A1A' }}>Journal</Text>
              </TouchableOpacity>

              {/* Exercices */}
              <TouchableOpacity
                onPress={handleViewExercises}
                activeOpacity={0.7}
                className="items-center justify-center"
                style={{
                  width: 120,
                  height: 120,
                  backgroundColor: '#FAFAFA',
                  borderRadius: 20,
                }}
              >
                <View className="w-12 h-12 rounded-xl items-center justify-center mb-2" style={{ backgroundColor: '#EDFAF2' }}>
                  <Ionicons name="fitness-outline" size={24} color="#4CAF82" />
                </View>
                <Text className="text-sm font-medium" style={{ color: '#1A1A1A' }}>Exercices</Text>
              </TouchableOpacity>

              {/* Historique */}
              <TouchableOpacity
                onPress={() => router.push('/patient/history')}
                activeOpacity={0.7}
                className="items-center justify-center"
                style={{
                  width: 120,
                  height: 120,
                  backgroundColor: '#FAFAFA',
                  borderRadius: 20,
                }}
              >
                <View className="w-12 h-12 rounded-xl items-center justify-center mb-2" style={{ backgroundColor: '#EEF4FB' }}>
                  <Ionicons name="bar-chart-outline" size={24} color="#5B9BD5" />
                </View>
                <Text className="text-sm font-medium" style={{ color: '#1A1A1A' }}>Historique</Text>
              </TouchableOpacity>
            </ScrollView>

            {/* ========== DERNIERE EVALUATION ========== */}
            <View
              className="rounded-2xl p-5 mb-4"
              style={{
                backgroundColor: '#FFFFFF',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
                elevation: 2,
              }}
            >
              <View className="flex-row items-center justify-between mb-5">
                <Text className="text-base font-semibold" style={{ color: '#1A1A1A' }}>
                  Dernière évaluation
                </Text>
                <Text className="text-sm font-medium" style={{ color: '#A0A0A0' }}>Il y a 2 jours</Text>
              </View>

              <View className="flex-row justify-between">
                <View className="items-center flex-1">
                  <Text className="text-xs mb-2 font-medium" style={{ color: '#6B6B6B' }}>Humeur</Text>
                  <View className="flex-row items-center mb-1">
                    <Text className="text-2xl font-bold" style={{ color: '#1A1A1A' }}>4</Text>
                    <Text style={{ color: '#A0A0A0' }}>/5</Text>
                  </View>
                  <View className="w-9 h-9 rounded-xl items-center justify-center" style={{ backgroundColor: '#EDFAF2' }}>
                    <Ionicons name="happy" size={18} color="#4CAF82" />
                  </View>
                </View>

                <View className="items-center flex-1">
                  <Text className="text-xs mb-2 font-medium" style={{ color: '#6B6B6B' }}>Anxiété</Text>
                  <View className="flex-row items-center mb-1">
                    <Text className="text-2xl font-bold" style={{ color: '#1A1A1A' }}>2</Text>
                    <Text style={{ color: '#A0A0A0' }}>/5</Text>
                  </View>
                  <View className="w-9 h-9 rounded-xl items-center justify-center" style={{ backgroundColor: '#EEF4FB' }}>
                    <Ionicons name="pulse" size={18} color="#5B9BD5" />
                  </View>
                </View>

                <View className="items-center flex-1">
                  <Text className="text-xs mb-2 font-medium" style={{ color: '#6B6B6B' }}>Sommeil</Text>
                  <View className="flex-row items-center mb-1">
                    <Text className="text-2xl font-bold" style={{ color: '#1A1A1A' }}>3</Text>
                    <Text style={{ color: '#A0A0A0' }}>/5</Text>
                  </View>
                  <View className="w-9 h-9 rounded-xl items-center justify-center" style={{ backgroundColor: '#FEF4F3' }}>
                    <Ionicons name="moon" size={18} color="#F0A8A0" />
                  </View>
                </View>
              </View>
            </View>

          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
