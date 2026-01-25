import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Card from '../../components/common/Card';
import Loading from '../../components/common/Loading';
import EvaluationChart from '../../components/therapist/EvaluationChart';
import evaluationService from '../../services/evaluationService';
import Button from '../../components/common/Button';

const PatientStatsScreen = ({ route, navigation }) => {
  const { patientId, patientName } = route.params;
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('month'); // week, month, quarter, year

  useEffect(() => {
    loadEvaluations();
  }, [period]);

  const loadEvaluations = async () => {
    setLoading(true);
    
    const endDate = new Date();
    let startDate = new Date();
    
    switch (period) {
      case 'week':
        startDate.setDate(endDate.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(endDate.getMonth() - 1);
        break;
      case 'quarter':
        startDate.setMonth(endDate.getMonth() - 3);
        break;
      case 'year':
        startDate.setFullYear(endDate.getFullYear() - 1);
        break;
    }

    const result = await evaluationService.getPatientEvaluationsByTherapist(
      patientId,
      startDate.toISOString(),
      endDate.toISOString()
    );

    setLoading(false);

    if (result.success) {
      setEvaluations(result.data);
    }
  };

  const calculateStats = () => {
    if (evaluations.length === 0) return null;

    const moodValues = evaluations.map(e => e.mood).filter(v => v);
    const anxietyValues = evaluations.map(e => e.anxiety).filter(v => v);
    const sleepValues = evaluations.map(e => e.sleep).filter(v => v);

    const avg = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;
    const max = (arr) => Math.max(...arr);
    const min = (arr) => Math.min(...arr);

    return {
      mood: {
        avg: avg(moodValues).toFixed(1),
        max: max(moodValues),
        min: min(moodValues),
      },
      anxiety: {
        avg: avg(anxietyValues).toFixed(1),
        max: max(anxietyValues),
        min: min(anxietyValues),
      },
      sleep: {
        avg: avg(sleepValues).toFixed(1),
        max: max(sleepValues),
        min: min(sleepValues),
      },
      totalEvaluations: evaluations.length,
      consistency: ((evaluations.length / getDaysInPeriod()) * 100).toFixed(0),
    };
  };

  const getDaysInPeriod = () => {
    switch (period) {
      case 'week': return 7;
      case 'month': return 30;
      case 'quarter': return 90;
      case 'year': return 365;
      default: return 30;
    }
  };

  const PeriodButton = ({ value, label }) => (
    <Button
      title={label}
      onPress={() => setPeriod(value)}
      variant={period === value ? 'primary' : 'outline'}
      size="small"
      className="flex-1 mx-1"
    />
  );

  if (loading) {
    return <Loading message="Chargement des statistiques..." />;
  }

  const stats = calculateStats();

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-4 py-4 border-b border-gray-200">
        <Text className="text-xl font-bold text-gray-900 mb-1">
          Statistiques détaillées
        </Text>
        <Text className="text-sm text-gray-600">{patientName}</Text>
      </View>

      <ScrollView className="flex-1 p-4">
        {/* Sélecteur de période */}
        <Card className="mb-4">
          <Text className="text-base font-semibold text-gray-900 mb-3">
            Période d'analyse
          </Text>
          <View className="flex-row">
            <PeriodButton value="week" label="7j" />
            <PeriodButton value="month" label="30j" />
            <PeriodButton value="quarter" label="3m" />
            <PeriodButton value="year" label="1an" />
          </View>
        </Card>

        {!stats ? (
          <Card>
            <View className="items-center py-8">
              <Ionicons name="analytics-outline" size={60} color="#9CA3AF" />
              <Text className="text-gray-600 mt-4 text-center">
                Aucune évaluation pour cette période
              </Text>
            </View>
          </Card>
        ) : (
          <>
            {/* Vue d'ensemble */}
            <Card className="mb-4">
              <Text className="text-lg font-semibold text-gray-900 mb-4">
                Vue d'ensemble
              </Text>

              <View className="flex-row mb-3">
                <View className="flex-1">
                  <Text className="text-sm text-gray-600">Évaluations</Text>
                  <Text className="text-2xl font-bold text-gray-900">
                    {stats.totalEvaluations}
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className="text-sm text-gray-600">Régularité</Text>
                  <Text className="text-2xl font-bold text-gray-900">
                    {stats.consistency}%
                  </Text>
                </View>
              </View>

              {stats.consistency < 50 && (
                <View className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <View className="flex-row items-center">
                    <Ionicons name="alert-circle" size={16} color="#f59e0b" />
                    <Text className="text-yellow-700 text-sm ml-2">
                      Taux de complétion faible - Encourager le patient
                    </Text>
                  </View>
                </View>
              )}
            </Card>

            {/* Statistiques détaillées */}
            <Card className="mb-4">
              <Text className="text-lg font-semibold text-gray-900 mb-4">
                Indicateurs moyens
              </Text>

              {/* Humeur */}
              <View className="mb-4 pb-4 border-b border-gray-200">
                <View className="flex-row justify-between items-center mb-2">
                  <Text className="text-sm font-medium text-gray-700">Humeur</Text>
                  <Text className="text-lg font-bold text-green-600">
                    {stats.mood.avg}/5
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-xs text-gray-500">Min: {stats.mood.min}</Text>
                  <Text className="text-xs text-gray-500">Max: {stats.mood.max}</Text>
                </View>
              </View>

              {/* Anxiété */}
              <View className="mb-4 pb-4 border-b border-gray-200">
                <View className="flex-row justify-between items-center mb-2">
                  <Text className="text-sm font-medium text-gray-700">Anxiété</Text>
                  <Text className="text-lg font-bold text-red-600">
                    {stats.anxiety.avg}/5
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-xs text-gray-500">Min: {stats.anxiety.min}</Text>
                  <Text className="text-xs text-gray-500">Max: {stats.anxiety.max}</Text>
                </View>
              </View>

              {/* Sommeil */}
              <View>
                <View className="flex-row justify-between items-center mb-2">
                  <Text className="text-sm font-medium text-gray-700">Sommeil</Text>
                  <Text className="text-lg font-bold text-blue-600">
                    {stats.sleep.avg}/5
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-xs text-gray-500">Min: {stats.sleep.min}</Text>
                  <Text className="text-xs text-gray-500">Max: {stats.sleep.max}</Text>
                </View>
              </View>
            </Card>

            {/* Graphiques */}
            <Card className="mb-4">
              <EvaluationChart evaluations={evaluations} type="mood" />
            </Card>

            <Card className="mb-4">
              <EvaluationChart evaluations={evaluations} type="anxiety" />
            </Card>

            <Card className="mb-4">
              <EvaluationChart evaluations={evaluations} type="sleep" />
            </Card>

            {/* Alertes */}
            {stats.anxiety.avg > 3.5 && (
              <View className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <View className="flex-row items-start">
                  <Ionicons name="warning" size={20} color="#ef4444" />
                  <View className="ml-2 flex-1">
                    <Text className="text-red-700 font-semibold mb-1">
                      Niveau d'anxiété élevé
                    </Text>
                    <Text className="text-red-600 text-sm">
                      Le niveau d'anxiété moyen dépasse 3.5/5. Envisager un ajustement du suivi.
                    </Text>
                  </View>
                </View>
              </View>
            )}

            {stats.mood.avg < 2.5 && (
              <View className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <View className="flex-row items-start">
                  <Ionicons name="warning" size={20} color="#ef4444" />
                  <View className="ml-2 flex-1">
                    <Text className="text-red-700 font-semibold mb-1">
                      Humeur basse
                    </Text>
                    <Text className="text-red-600 text-sm">
                      L'humeur moyenne est inférieure à 2.5/5. Surveillance recommandée.
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PatientStatsScreen;
