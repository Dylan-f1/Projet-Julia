// src/screens/patient/HomeScreen.jsx
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Platform, RefreshControl, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Loading from '../../components/common/Loading';
import { useAuth } from '../../contexts/AuthContext';

const HomeScreen = () => {
  const router = useRouter();
  const { user, logout } = useAuth();
  const isWeb = Platform.OS === 'web';

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [patientData, setPatientData] = useState(null);
  const [lastEvaluation, setLastEvaluation] = useState(null);

  useEffect(() => {
    loadPatientData();
  }, []);

  const loadPatientData = async () => {
    setLoading(true);
    
    // TODO: Appeler les APIs pour récupérer les données du patient
    // Simuler un chargement pour l'instant
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

  if (loading) {
    return <Loading message="Chargement de votre espace..." />;
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className={`flex-1 ${isWeb ? 'max-w-4xl mx-auto w-full' : ''}`}>
        
        {/* Header */}
        <View className="bg-gradient-to-r from-primary-600 to-secondary-600 px-4 py-6">
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-1">
              <Text className="text-white text-sm opacity-90">Bonjour,</Text>
              <Text className="text-white text-2xl font-bold">
                {patientData?.firstName} {patientData?.lastName}
              </Text>
            </View>
            
            <TouchableOpacity 
              onPress={handleLogout}
              className={`bg-white/20 p-2 rounded-lg ${isWeb ? 'hover:bg-white/30' : ''}`}
            >
              <Ionicons name="log-out-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>

          {/* Quick stats */}
          <View className={`bg-white/10 rounded-xl p-4 ${isWeb ? 'flex-row justify-around' : ''}`}>
            <View className={`items-center ${isWeb ? 'flex-1' : 'mb-3'}`}>
              <Text className="text-white text-3xl font-bold">7</Text>
              <Text className="text-white text-xs opacity-90">Jours de suivi</Text>
            </View>
            <View className={`items-center ${isWeb ? 'flex-1' : 'mb-3'}`}>
              <Text className="text-white text-3xl font-bold">3</Text>
              <Text className="text-white text-xs opacity-90">Évaluations</Text>
            </View>
            <View className={`items-center ${isWeb ? 'flex-1' : ''}`}>
              <Text className="text-white text-3xl font-bold">85%</Text>
              <Text className="text-white text-xs opacity-90">Objectif atteint</Text>
            </View>
          </View>
        </View>

        {/* Content */}
        <ScrollView 
          className="flex-1"
          showsVerticalScrollIndicator={!isWeb}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        >
          <View className="p-4">
            
            {/* Actions rapides */}
            <View className="mb-6">
              <Text className="text-lg font-bold text-gray-900 mb-3">
                Actions rapides
              </Text>
              
              <View className={isWeb ? 'flex-row flex-wrap gap-3' : 'space-y-3'}>
                <View className={isWeb ? 'flex-1 min-w-[280px]' : ''}>
                  <Card onPress={handleNewEvaluation}>
                    <View className="flex-row items-center">
                      <View className="w-12 h-12 bg-primary-100 rounded-full items-center justify-center mr-4">
                        <Ionicons name="clipboard-outline" size={24} color="#0284c7" />
                      </View>
                      <View className="flex-1">
                        <Text className="text-base font-semibold text-gray-900">
                          Nouvelle évaluation
                        </Text>
                        <Text className="text-sm text-gray-600">
                          Comment vous sentez-vous aujourd'hui ?
                        </Text>
                      </View>
                      <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                    </View>
                  </Card>
                </View>

                <View className={isWeb ? 'flex-1 min-w-[280px]' : ''}>
                  <Card onPress={handleChat}>
                    <View className="flex-row items-center">
                      <View className="w-12 h-12 bg-secondary-100 rounded-full items-center justify-center mr-4">
                        <Ionicons name="chatbubbles-outline" size={24} color="#c026d3" />
                      </View>
                      <View className="flex-1">
                        <Text className="text-base font-semibold text-gray-900">
                          Discuter avec Jul-IA
                        </Text>
                        <Text className="text-sm text-gray-600">
                          Votre assistante IA disponible 24/7
                        </Text>
                      </View>
                      <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                    </View>
                  </Card>
                </View>
              </View>
            </View>

            {/* Prochain rendez-vous */}
            {patientData?.nextAppointment && (
              <Card className="mb-6 bg-blue-50 border border-blue-200">
                <View className="flex-row items-start">
                  <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center mr-4">
                    <Ionicons name="calendar" size={24} color="#3b82f6" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-sm font-medium text-blue-900 mb-1">
                      Prochain rendez-vous
                    </Text>
                    <Text className="text-lg font-bold text-blue-900">
                      {patientData.nextAppointment.toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                      })}
                    </Text>
                    <Text className="text-sm text-blue-700 mt-1">
                      Avec {patientData.therapistName}
                    </Text>
                  </View>
                </View>
              </Card>
            )}

            {/* Objectif de la semaine */}
            {patientData?.weeklyGoal && (
              <Card className="mb-6">
                <View className="flex-row items-center justify-between mb-3">
                  <Text className="text-base font-semibold text-gray-900">
                    Objectif de la semaine
                  </Text>
                  <Ionicons name="flag-outline" size={20} color="#22c55e" />
                </View>
                <Text className="text-gray-700 mb-3">
                  {patientData.weeklyGoal}
                </Text>
                <View className="bg-gray-200 rounded-full h-2 mb-2">
                  <View className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }} />
                </View>
                <Text className="text-xs text-gray-600">85% complété</Text>
              </Card>
            )}

            {/* Mes outils */}
            <View className="mb-6">
              <Text className="text-lg font-bold text-gray-900 mb-3">
                Mes outils
              </Text>
              
              <View className={isWeb ? 'flex-row flex-wrap gap-3' : 'space-y-3'}>
                <View className={isWeb ? 'flex-1 min-w-[280px]' : ''}>
                  <Card onPress={handleViewJournal}>
                    <View className="flex-row items-center justify-between">
                      <View className="flex-row items-center flex-1">
                        <View className="w-10 h-10 bg-yellow-100 rounded-full items-center justify-center mr-3">
                          <Ionicons name="book-outline" size={20} color="#eab308" />
                        </View>
                        <Text className="text-base font-medium text-gray-900">
                          Mon journal
                        </Text>
                      </View>
                      <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                    </View>
                  </Card>
                </View>

                <View className={isWeb ? 'flex-1 min-w-[280px]' : ''}>
                  <Card onPress={handleViewExercises}>
                    <View className="flex-row items-center justify-between">
                      <View className="flex-row items-center flex-1">
                        <View className="w-10 h-10 bg-green-100 rounded-full items-center justify-center mr-3">
                          <Ionicons name="fitness-outline" size={20} color="#22c55e" />
                        </View>
                        <Text className="text-base font-medium text-gray-900">
                          Exercices
                        </Text>
                      </View>
                      <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                    </View>
                  </Card>
                </View>
              </View>
            </View>

            {/* Dernière évaluation */}
            <Card className="mb-6">
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-base font-semibold text-gray-900">
                  Dernière évaluation
                </Text>
                <Text className="text-sm text-gray-500">Il y a 2 jours</Text>
              </View>
              
              <View className="flex-row justify-between">
                <View className="items-center flex-1">
                  <Text className="text-xs text-gray-600 mb-1">Humeur</Text>
                  <View className="flex-row items-center">
                    <Text className="text-2xl font-bold text-gray-900">4</Text>
                    <Text className="text-gray-500">/5</Text>
                  </View>
                  <Ionicons name="happy" size={20} color="#22c55e" />
                </View>
                
                <View className="items-center flex-1">
                  <Text className="text-xs text-gray-600 mb-1">Anxiété</Text>
                  <View className="flex-row items-center">
                    <Text className="text-2xl font-bold text-gray-900">2</Text>
                    <Text className="text-gray-500">/5</Text>
                  </View>
                  <Ionicons name="pulse" size={20} color="#22c55e" />
                </View>
                
                <View className="items-center flex-1">
                  <Text className="text-xs text-gray-600 mb-1">Sommeil</Text>
                  <View className="flex-row items-center">
                    <Text className="text-2xl font-bold text-gray-900">3</Text>
                    <Text className="text-gray-500">/5</Text>
                  </View>
                  <Ionicons name="moon" size={20} color="#3b82f6" />
                </View>
              </View>
            </Card>

          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;