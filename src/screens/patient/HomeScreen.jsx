import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, Platform, RefreshControl, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../../components/common/Loading';
import { useAuth } from '../../contexts/AuthContext';
import patientService from '../../services/patientService';
import evaluationService from '../../services/evaluationService';
import chatService from '../../services/chatService';

const HomeScreen = () => {
  const router = useRouter();
  const { user, logout } = useAuth();
  const isWeb = Platform.OS === 'web';

  const [loading, setLoading] = useState(true);
  const [checkingConsent, setCheckingConsent] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [patientProfile, setPatientProfile] = useState(null);
  const [stats, setStats] = useState({
    daysSinceCreation: 0,
    evaluationCount: 0,
    conversationCount: 0,
  });
  const [lastEvaluation, setLastEvaluation] = useState(null);

  useEffect(() => {
    checkConsent();
  }, []);

  const checkConsent = async () => {
    try {
      const consentAccepted = await AsyncStorage.getItem('dataConsentAccepted');

      if (!consentAccepted || consentAccepted !== 'true') {
        router.replace('/patient/first-time-consent');
        return;
      }

      setCheckingConsent(false);
      loadAllData();
    } catch (error) {
      console.error('Erreur vérification consentement:', error);
      setCheckingConsent(false);
      loadAllData();
    }
  };

  const loadAllData = useCallback(async () => {
    setLoading(true);

    try {
      const [profileResult, evaluationsResult, conversationsResult] = await Promise.all([
        patientService.getMyProfile(),
        evaluationService.getPatientEvaluations(),
        chatService.getConversationHistory(),
      ]);

      if (profileResult.success) {
        const profile = profileResult.data?.patient || profileResult.data;
        setPatientProfile(profile);

        if (profile?.createdAt) {
          const created = new Date(profile.createdAt);
          const now = new Date();
          const diffDays = Math.floor((now - created) / (1000 * 60 * 60 * 24));
          setStats(prev => ({ ...prev, daysSinceCreation: Math.max(1, diffDays) }));
        }
      }

      if (evaluationsResult.success) {
        const evaluations = evaluationsResult.data?.evaluations || [];
        setStats(prev => ({ ...prev, evaluationCount: evaluations.length }));

        if (evaluations.length > 0) {
          setLastEvaluation(evaluations[0]);
        }
      }

      if (conversationsResult.success) {
        const conversations = conversationsResult.data?.conversations || conversationsResult.data || [];
        const count = Array.isArray(conversations) ? conversations.length : 0;
        setStats(prev => ({ ...prev, conversationCount: count }));
      }
    } catch (error) {
      console.error('Erreur chargement données dashboard:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadAllData();
    setRefreshing(false);
  };

  const handleLogout = async () => {
    await logout();
    router.replace('/auth/therapist-login');
  };

  const handleNewEvaluation = () => {
    router.push('/patient/evaluation');
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

  const getTherapistName = () => {
    if (patientProfile?.professionalId?.firstName && patientProfile?.professionalId?.lastName) {
      return `${patientProfile.professionalId.firstName} ${patientProfile.professionalId.lastName}`;
    }
    return null;
  };

  const getNextAppointment = () => {
    if (patientProfile?.nextSessionDate) {
      return new Date(patientProfile.nextSessionDate);
    }
    return null;
  };

  const getTimeSinceEvaluation = () => {
    if (!lastEvaluation?.date && !lastEvaluation?.createdAt) return null;
    const evalDate = new Date(lastEvaluation.date || lastEvaluation.createdAt);
    const now = new Date();
    const diffHours = Math.floor((now - evalDate) / (1000 * 60 * 60));

    if (diffHours < 1) return "À l'instant";
    if (diffHours < 24) return `Il y a ${diffHours}h`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return 'Hier';
    return `Il y a ${diffDays} jours`;
  };

  const getMoodIcon = (mood) => {
    if (!mood) return { name: 'help-circle', color: '#A0A0A0', bg: '#F5F5F4' };
    if (mood >= 4) return { name: 'happy', color: '#4CAF82', bg: '#EDFAF2' };
    if (mood >= 3) return { name: 'remove-circle', color: '#E8A838', bg: '#FDF6EA' };
    return { name: 'sad', color: '#E05B5B', bg: '#FEF0F0' };
  };

  const getAnxietyIcon = (anxiety) => {
    if (!anxiety) return { name: 'help-circle', color: '#A0A0A0', bg: '#F5F5F4' };
    if (anxiety <= 2) return { name: 'pulse', color: '#4CAF82', bg: '#EDFAF2' };
    if (anxiety <= 3) return { name: 'pulse', color: '#E8A838', bg: '#FDF6EA' };
    return { name: 'pulse', color: '#E05B5B', bg: '#FEF0F0' };
  };

  const getSleepIcon = (sleep) => {
    if (!sleep) return { name: 'help-circle', color: '#A0A0A0', bg: '#F5F5F4' };
    if (sleep >= 4) return { name: 'moon', color: '#5B9BD5', bg: '#EEF4FB' };
    if (sleep >= 3) return { name: 'moon', color: '#E8A838', bg: '#FDF6EA' };
    return { name: 'moon', color: '#E05B5B', bg: '#FEF0F0' };
  };

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

  const firstName = patientProfile?.firstName || user?.firstName || 'Patient';
  const therapistName = getTherapistName();
  const nextAppointment = getNextAppointment();
  const moodIcon = getMoodIcon(lastEvaluation?.mood);
  const anxietyIcon = getAnxietyIcon(lastEvaluation?.anxiety);
  const sleepIcon = getSleepIcon(lastEvaluation?.sleep);

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
              Bonjour, {firstName} !
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

            {/* ========== STATS ROW — DYNAMIQUES ========== */}
            <View className="flex-row mb-6" style={{ gap: 12 }}>
              {/* Stat 1 — Jours de suivi */}
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
                <View className="w-8 h-8 rounded-xl items-center justify-center mb-2" style={{ backgroundColor: '#EEF4FB' }}>
                  <Ionicons name="calendar-outline" size={20} color="#5B9BD5" />
                </View>
                <Text className="text-3xl font-bold" style={{ color: '#1A1A1A' }}>
                  {stats.daysSinceCreation}
                </Text>
                <Text className="text-xs mt-1 text-center" style={{ color: '#6B6B6B' }}>
                  {stats.daysSinceCreation <= 1 ? 'jour de suivi' : 'jours de suivi'}
                </Text>
              </View>

              {/* Stat 2 — Nombre d'évaluations */}
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
                <Text className="text-2xl font-bold" style={{ color: '#1A1A1A' }}>
                  {stats.evaluationCount}
                </Text>
                <Text className="text-xs mt-1" style={{ color: '#6B6B6B' }}>éval.</Text>
              </View>

              {/* Stat 3 — Conversations */}
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
                <Text className="text-2xl font-bold" style={{ color: '#5B9BD5' }}>
                  {stats.conversationCount}
                </Text>
                <Text className="text-xs mt-1" style={{ color: '#6B6B6B' }}>discuss.</Text>
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
                {nextAppointment ? (
                  <>
                    <Text className="text-base font-bold mb-1" style={{ color: '#1A1A1A' }}>
                      {nextAppointment.toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                      })}
                    </Text>
                    {therapistName && (
                      <Text className="text-sm" style={{ color: '#6B6B6B' }}>
                        Avec {therapistName}
                      </Text>
                    )}
                  </>
                ) : (
                  <Text className="text-sm" style={{ color: '#6B6B6B' }}>
                    Aucun rendez-vous prévu
                  </Text>
                )}
              </View>

              {/* Séances — 40% */}
              <View
                className="rounded-2xl p-5"
                style={{
                  flex: 2,
                  backgroundColor: '#EEF4FB',
                }}
              >
                <View className="w-8 h-8 rounded-lg items-center justify-center mb-2" style={{ backgroundColor: '#D4E4F5' }}>
                  <Ionicons name="people" size={16} color="#5B9BD5" />
                </View>
                <Text className="text-sm font-semibold mb-1" style={{ color: '#1F4F7A' }}>
                  Séances
                </Text>
                <Text className="text-2xl font-bold" style={{ color: '#1A1A1A' }}>
                  {patientProfile?.sessionCount || 0}
                </Text>
                <Text className="text-xs" style={{ color: '#6B6B6B' }}>
                  avec votre psy
                </Text>
              </View>
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

            {/* ========== DERNIERE EVALUATION — DYNAMIQUE ========== */}
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
                <Text className="text-sm font-medium" style={{ color: '#A0A0A0' }}>
                  {lastEvaluation ? getTimeSinceEvaluation() : 'Aucune'}
                </Text>
              </View>

              {lastEvaluation ? (
                <View className="flex-row justify-between">
                  <View className="items-center flex-1">
                    <Text className="text-xs mb-2 font-medium" style={{ color: '#6B6B6B' }}>Humeur</Text>
                    <View className="flex-row items-center mb-1">
                      <Text className="text-2xl font-bold" style={{ color: '#1A1A1A' }}>
                        {lastEvaluation.mood}
                      </Text>
                      <Text style={{ color: '#A0A0A0' }}>/5</Text>
                    </View>
                    <View className="w-9 h-9 rounded-xl items-center justify-center" style={{ backgroundColor: moodIcon.bg }}>
                      <Ionicons name={moodIcon.name} size={18} color={moodIcon.color} />
                    </View>
                  </View>

                  <View className="items-center flex-1">
                    <Text className="text-xs mb-2 font-medium" style={{ color: '#6B6B6B' }}>Anxiété</Text>
                    <View className="flex-row items-center mb-1">
                      <Text className="text-2xl font-bold" style={{ color: '#1A1A1A' }}>
                        {lastEvaluation.anxiety || '-'}
                      </Text>
                      {lastEvaluation.anxiety && <Text style={{ color: '#A0A0A0' }}>/5</Text>}
                    </View>
                    <View className="w-9 h-9 rounded-xl items-center justify-center" style={{ backgroundColor: anxietyIcon.bg }}>
                      <Ionicons name={anxietyIcon.name} size={18} color={anxietyIcon.color} />
                    </View>
                  </View>

                  <View className="items-center flex-1">
                    <Text className="text-xs mb-2 font-medium" style={{ color: '#6B6B6B' }}>Sommeil</Text>
                    <View className="flex-row items-center mb-1">
                      <Text className="text-2xl font-bold" style={{ color: '#1A1A1A' }}>
                        {lastEvaluation.sleep || '-'}
                      </Text>
                      {lastEvaluation.sleep && <Text style={{ color: '#A0A0A0' }}>/5</Text>}
                    </View>
                    <View className="w-9 h-9 rounded-xl items-center justify-center" style={{ backgroundColor: sleepIcon.bg }}>
                      <Ionicons name={sleepIcon.name} size={18} color={sleepIcon.color} />
                    </View>
                  </View>
                </View>
              ) : (
                <View className="items-center py-4">
                  <View className="w-12 h-12 rounded-full items-center justify-center mb-3" style={{ backgroundColor: '#EEF4FB' }}>
                    <Ionicons name="analytics-outline" size={24} color="#5B9BD5" />
                  </View>
                  <Text className="text-sm text-center" style={{ color: '#6B6B6B' }}>
                    Pas encore d'évaluation.{'\n'}Faites votre première !
                  </Text>
                  <TouchableOpacity
                    onPress={handleNewEvaluation}
                    activeOpacity={0.8}
                    className="mt-3 py-2.5 px-5"
                    style={{ backgroundColor: '#5B9BD5', borderRadius: 12 }}
                  >
                    <Text className="text-white font-semibold text-sm">Commencer</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
