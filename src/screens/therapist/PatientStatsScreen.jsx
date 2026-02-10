import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Card from '../../components/common/Card';
import Loading from '../../components/common/Loading';
import EvaluationChart from '../../components/therapist/EvaluationChart';
import evaluationService from '../../services/evaluationService';
import Button from '../../components/common/Button';

const PatientStatsScreen = ({ route }) => {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768; // Breakpoint pour desktop
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
      className={isDesktop ? 'flex-1 mx-2' : 'flex-1 mx-1'}
    />
  );

  const StatIndicator = ({ label, value, color, min, max }) => (
    <View className="mb-4 pb-4 border-b border-gray-200 last:border-0 last:mb-0 last:pb-0">
      <View className="flex-row justify-between items-center mb-2">
        <Text className={`${isDesktop ? 'text-base' : 'text-sm'} font-medium text-gray-700`}>
          {label}
        </Text>
        <Text className={`${isDesktop ? 'text-2xl' : 'text-lg'} font-bold ${color}`}>
          {value}/5
        </Text>
      </View>
      <View className="flex-row justify-between">
        <Text className="text-xs text-gray-500">Min: {min}</Text>
        <Text className="text-xs text-gray-500">Max: {max}</Text>
      </View>
    </View>
  );

  const AlertBox = ({ icon, title, message, severity = 'warning' }) => {
    const bgColor = severity === 'warning' ? 'bg-yellow-50' : 'bg-red-50';
    const borderColor = severity === 'warning' ? 'border-yellow-200' : 'border-red-200';
    const iconColor = severity === 'warning' ? '#f59e0b' : '#ef4444';
    const titleColor = severity === 'warning' ? 'text-yellow-700' : 'text-red-700';
    const textColor = severity === 'warning' ? 'text-yellow-600' : 'text-red-600';

    return (
      <View className={`${bgColor} border ${borderColor} rounded-lg p-4 mb-4`}>
        <View className="flex-row items-start">
          <Ionicons name={icon} size={20} color={iconColor} />
          <View className="ml-2 flex-1">
            <Text className={`${titleColor} font-semibold mb-1 ${isDesktop ? 'text-base' : 'text-sm'}`}>
              {title}
            </Text>
            <Text className={`${textColor} text-sm`}>
              {message}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  if (loading) {
    return <Loading message="Chargement des statistiques..." />;
  }

  const stats = calculateStats();

  // Rendu Desktop
  if (isDesktop) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        {/* Header */}
        <View className="bg-white px-8 py-6 border-b border-gray-200">
          <Text className="text-2xl font-bold text-gray-900 mb-1">
            Statistiques détaillées
          </Text>
          <Text className="text-base text-gray-600">{patientName}</Text>
        </View>

        <ScrollView className="flex-1">
          <View className="max-w-7xl mx-auto w-full p-8">
            {/* Sélecteur de période */}
            <Card className="mb-6">
              <Text className="text-lg font-semibold text-gray-900 mb-4">
                Période d'analyse
              </Text>
              <View className="flex-row max-w-md">
                <PeriodButton value="week" label="7 jours" />
                <PeriodButton value="month" label="30 jours" />
                <PeriodButton value="quarter" label="3 mois" />
                <PeriodButton value="year" label="1 an" />
              </View>
            </Card>

            {!stats ? (
              <Card>
                <View className="items-center py-12">
                  <Ionicons name="analytics-outline" size={80} color="#9CA3AF" />
                  <Text className="text-gray-600 mt-4 text-center text-lg">
                    Aucune évaluation pour cette période
                  </Text>
                </View>
              </Card>
            ) : (
              <>
                {/* Première ligne: Vue d'ensemble + Indicateurs moyens */}
                <View className="flex-row mb-6 gap-6">
                  {/* Vue d'ensemble */}
                  <Card className="flex-1">
                    <Text className="text-xl font-semibold text-gray-900 mb-6">
                      Vue d'ensemble
                    </Text>

                    <View className="flex-row mb-6">
                      <View className="flex-1">
                        <Text className="text-sm text-gray-600 mb-2">Évaluations</Text>
                        <Text className="text-4xl font-bold text-gray-900">
                          {stats.totalEvaluations}
                        </Text>
                      </View>
                      <View className="flex-1">
                        <Text className="text-sm text-gray-600 mb-2">Régularité</Text>
                        <Text className="text-4xl font-bold text-gray-900">
                          {stats.consistency}%
                        </Text>
                      </View>
                    </View>

                    {stats.consistency < 50 && (
                      <AlertBox
                        icon="alert-circle"
                        title="Taux de complétion faible"
                        message="Encourager le patient à remplir ses évaluations quotidiennes"
                        severity="warning"
                      />
                    )}
                  </Card>

                  {/* Indicateurs moyens */}
                  <Card className="flex-1">
                    <Text className="text-xl font-semibold text-gray-900 mb-6">
                      Indicateurs moyens
                    </Text>

                    <StatIndicator
                      label="Humeur"
                      value={stats.mood.avg}
                      color="text-green-600"
                      min={stats.mood.min}
                      max={stats.mood.max}
                    />

                    <StatIndicator
                      label="Anxiété"
                      value={stats.anxiety.avg}
                      color="text-red-600"
                      min={stats.anxiety.min}
                      max={stats.anxiety.max}
                    />

                    <StatIndicator
                      label="Sommeil"
                      value={stats.sleep.avg}
                      color="text-blue-600"
                      min={stats.sleep.min}
                      max={stats.sleep.max}
                    />
                  </Card>
                </View>

                {/* Alertes en pleine largeur */}
                {(stats.anxiety.avg > 3.5 || stats.mood.avg < 2.5) && (
                  <View className="mb-6">
                    {stats.anxiety.avg > 3.5 && (
                      <AlertBox
                        icon="warning"
                        title="Niveau d'anxiété élevé"
                        message="Le niveau d'anxiété moyen dépasse 3.5/5. Envisager un ajustement du suivi."
                        severity="error"
                      />
                    )}

                    {stats.mood.avg < 2.5 && (
                      <AlertBox
                        icon="warning"
                        title="Humeur basse"
                        message="L'humeur moyenne est inférieure à 2.5/5. Surveillance recommandée."
                        severity="error"
                      />
                    )}
                  </View>
                )}

                {/* Graphiques sur 2 colonnes */}
                <View className="flex-row gap-6 mb-6">
                  <Card className="flex-1">
                    <EvaluationChart evaluations={evaluations} type="mood" />
                  </Card>

                  <Card className="flex-1">
                    <EvaluationChart evaluations={evaluations} type="anxiety" />
                  </Card>
                </View>

                {/* Dernier graphique pleine largeur */}
                <Card className="mb-6">
                  <EvaluationChart evaluations={evaluations} type="sleep" />
                </Card>
              </>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Rendu Mobile (code original légèrement refactorisé)
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
                <AlertBox
                  icon="alert-circle"
                  title="Taux de complétion faible"
                  message="Encourager le patient"
                  severity="warning"
                />
              )}
            </Card>

            {/* Statistiques détaillées */}
            <Card className="mb-4">
              <Text className="text-lg font-semibold text-gray-900 mb-4">
                Indicateurs moyens
              </Text>

              <StatIndicator
                label="Humeur"
                value={stats.mood.avg}
                color="text-green-600"
                min={stats.mood.min}
                max={stats.mood.max}
              />

              <StatIndicator
                label="Anxiété"
                value={stats.anxiety.avg}
                color="text-red-600"
                min={stats.anxiety.min}
                max={stats.anxiety.max}
              />

              <StatIndicator
                label="Sommeil"
                value={stats.sleep.avg}
                color="text-blue-600"
                min={stats.sleep.min}
                max={stats.sleep.max}
              />
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
              <AlertBox
                icon="warning"
                title="Niveau d'anxiété élevé"
                message="Le niveau d'anxiété moyen dépasse 3.5/5. Envisager un ajustement du suivi."
                severity="error"
              />
            )}

            {stats.mood.avg < 2.5 && (
              <AlertBox
                icon="warning"
                title="Humeur basse"
                message="L'humeur moyenne est inférieure à 2.5/5. Surveillance recommandée."
                severity="error"
              />
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PatientStatsScreen;