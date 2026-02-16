import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, useWindowDimensions } from 'react-native';
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
  const isDesktop = width >= 768;
  const { patientId, patientName } = route.params;
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('month');

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

  // Period pill — active = therapist-400 bg white text, inactive = surface-100
  const PeriodPill = ({ value, label }) => (
    <TouchableOpacity
      onPress={() => setPeriod(value)}
      activeOpacity={0.7}
      style={{
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 8,
        borderRadius: 14,
        alignItems: 'center',
        backgroundColor: period === value ? '#E8A838' : '#F5F5F4',
        marginHorizontal: isDesktop ? 4 : 3,
        shadowColor: period === value ? '#E8A838' : 'transparent',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: period === value ? 0.2 : 0,
        shadowRadius: 4,
        elevation: period === value ? 3 : 0,
      }}
    >
      <Text
        style={{
          fontSize: isDesktop ? 14 : 13,
          fontWeight: '600',
          color: period === value ? '#FFFFFF' : '#404040',
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  const StatIndicator = ({ label, value, iconName, iconBg, iconColor, min, max }) => (
    <View
      style={{
        marginBottom: 16,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#EEECEB',
      }}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: iconBg,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 10,
            }}
          >
            <Ionicons name={iconName} size={16} color={iconColor} />
          </View>
          <Text
            style={{
              fontSize: isDesktop ? 16 : 14,
              fontWeight: '500',
              color: '#1A1A1A',
            }}
          >
            {label}
          </Text>
        </View>
        <Text
          style={{
            fontSize: isDesktop ? 24 : 20,
            fontWeight: '700',
            color: iconColor,
          }}
        >
          {value}/5
        </Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 42 }}>
        <Text style={{ fontSize: 12, color: '#A0A0A0' }}>Min: {min}</Text>
        <Text style={{ fontSize: 12, color: '#A0A0A0' }}>Max: {max}</Text>
      </View>
    </View>
  );

  // Critical alerts — danger-50 bg, danger-400 text
  const AlertBox = ({ icon, title, message, severity = 'warning' }) => {
    const isError = severity === 'error';
    const bgColor = isError ? '#FEF0F0' : '#FDF6EA';
    const borderColor = isError ? '#FCCECE' : '#FAE8C4';
    const iconColor = isError ? '#E05B5B' : '#E8A838';
    const titleColor = isError ? '#E05B5B' : '#B07820';
    const textColor = isError ? '#E05B5B' : '#B07820';

    return (
      <View
        style={{
          backgroundColor: bgColor,
          borderWidth: 1,
          borderColor: borderColor,
          borderRadius: 14,
          padding: 16,
          marginBottom: 16,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
          <Ionicons name={icon} size={20} color={iconColor} />
          <View style={{ marginLeft: 10, flex: 1 }}>
            <Text style={{ color: titleColor, fontWeight: '600', marginBottom: 4, fontSize: isDesktop ? 15 : 14 }}>
              {title}
            </Text>
            <Text style={{ color: textColor, fontSize: 14, opacity: 0.8, lineHeight: 20 }}>
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

  // Desktop render
  if (isDesktop) {
    return (
      <SafeAreaView className="flex-1" style={{ backgroundColor: '#FAFAFA' }}>
        {/* Header */}
        <View
          style={{
            backgroundColor: '#FDF6EA',
            paddingHorizontal: 32,
            paddingVertical: 24,
            borderBottomWidth: 1,
            borderBottomColor: '#FAE8C4',
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: '700', color: '#1A1A1A', marginBottom: 4 }}>
            Statistiques detaillees
          </Text>
          <Text style={{ fontSize: 15, color: '#6B6B6B' }}>{patientName}</Text>
        </View>

        <ScrollView className="flex-1">
          <View className="max-w-7xl mx-auto w-full p-8">
            {/* Period selector */}
            <View
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 16,
                padding: 24,
                marginBottom: 24,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.04,
                shadowRadius: 8,
                elevation: 2,
              }}
            >
              <Text style={{ fontSize: 17, fontWeight: '600', color: '#1A1A1A', marginBottom: 16 }}>
                Periode d'analyse
              </Text>
              <View className="flex-row max-w-md">
                <PeriodPill value="week" label="7 jours" />
                <PeriodPill value="month" label="30 jours" />
                <PeriodPill value="quarter" label="3 mois" />
                <PeriodPill value="year" label="1 an" />
              </View>
            </View>

            {!stats ? (
              <View
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 16,
                  padding: 48,
                  alignItems: 'center',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.04,
                  shadowRadius: 8,
                  elevation: 2,
                }}
              >
                <Ionicons name="analytics-outline" size={80} color="#C8C4C0" />
                <Text style={{ color: '#6B6B6B', marginTop: 16, textAlign: 'center', fontSize: 17 }}>
                  Aucune evaluation pour cette periode
                </Text>
              </View>
            ) : (
              <>
                {/* First row: Overview + Average indicators */}
                <View className="flex-row mb-6 gap-6">
                  {/* Overview */}
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: '#FFFFFF',
                      borderRadius: 16,
                      padding: 28,
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.04,
                      shadowRadius: 8,
                      elevation: 2,
                    }}
                  >
                    <Text style={{ fontSize: 19, fontWeight: '600', color: '#1A1A1A', marginBottom: 24 }}>
                      Vue d'ensemble
                    </Text>

                    <View className="flex-row mb-6">
                      <View className="flex-1">
                        <Text style={{ fontSize: 14, color: '#A0A0A0', marginBottom: 8 }}>
                          Evaluations
                        </Text>
                        <Text style={{ fontSize: 36, fontWeight: '700', color: '#1A1A1A' }}>
                          {stats.totalEvaluations}
                        </Text>
                      </View>
                      <View className="flex-1">
                        <Text style={{ fontSize: 14, color: '#A0A0A0', marginBottom: 8 }}>
                          Regularite
                        </Text>
                        <Text style={{ fontSize: 36, fontWeight: '700', color: '#1A1A1A' }}>
                          {stats.consistency}%
                        </Text>
                      </View>
                    </View>

                    {stats.consistency < 50 && (
                      <AlertBox
                        icon="alert-circle"
                        title="Taux de completion faible"
                        message="Encourager le patient a remplir ses evaluations quotidiennes"
                        severity="warning"
                      />
                    )}
                  </View>

                  {/* Average indicators */}
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: '#FFFFFF',
                      borderRadius: 16,
                      padding: 28,
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.04,
                      shadowRadius: 8,
                      elevation: 2,
                    }}
                  >
                    <Text style={{ fontSize: 19, fontWeight: '600', color: '#1A1A1A', marginBottom: 24 }}>
                      Indicateurs moyens
                    </Text>

                    <StatIndicator
                      label="Humeur"
                      value={stats.mood.avg}
                      iconName="happy-outline"
                      iconBg="#EDFAF2"
                      iconColor="#4CAF82"
                      min={stats.mood.min}
                      max={stats.mood.max}
                    />

                    <StatIndicator
                      label="Anxiete"
                      value={stats.anxiety.avg}
                      iconName="pulse-outline"
                      iconBg="#FEF0F0"
                      iconColor="#E05B5B"
                      min={stats.anxiety.min}
                      max={stats.anxiety.max}
                    />

                    <StatIndicator
                      label="Sommeil"
                      value={stats.sleep.avg}
                      iconName="moon-outline"
                      iconBg="#FDF6EA"
                      iconColor="#E8A838"
                      min={stats.sleep.min}
                      max={stats.sleep.max}
                    />
                  </View>
                </View>

                {/* Critical alerts */}
                {(stats.anxiety.avg > 3.5 || stats.mood.avg < 2.5) && (
                  <View className="mb-6">
                    {stats.anxiety.avg > 3.5 && (
                      <AlertBox
                        icon="warning"
                        title="Niveau d'anxiete eleve"
                        message="Le niveau d'anxiete moyen depasse 3.5/5. Envisager un ajustement du suivi."
                        severity="error"
                      />
                    )}

                    {stats.mood.avg < 2.5 && (
                      <AlertBox
                        icon="warning"
                        title="Humeur basse"
                        message="L'humeur moyenne est inferieure a 2.5/5. Surveillance recommandee."
                        severity="error"
                      />
                    )}
                  </View>
                )}

                {/* Charts — therapist-400 main color */}
                <View className="flex-row gap-6 mb-6">
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: '#FFFFFF',
                      borderRadius: 16,
                      padding: 24,
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.04,
                      shadowRadius: 8,
                      elevation: 2,
                    }}
                  >
                    <EvaluationChart evaluations={evaluations} type="mood" />
                  </View>

                  <View
                    style={{
                      flex: 1,
                      backgroundColor: '#FFFFFF',
                      borderRadius: 16,
                      padding: 24,
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.04,
                      shadowRadius: 8,
                      elevation: 2,
                    }}
                  >
                    <EvaluationChart evaluations={evaluations} type="anxiety" />
                  </View>
                </View>

                {/* Last chart full width */}
                <View
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 16,
                    padding: 24,
                    marginBottom: 24,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.04,
                    shadowRadius: 8,
                    elevation: 2,
                  }}
                >
                  <EvaluationChart evaluations={evaluations} type="sleep" />
                </View>
              </>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Mobile render
  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: '#FAFAFA' }}>
      {/* Header */}
      <View
        style={{
          backgroundColor: '#FDF6EA',
          paddingHorizontal: 16,
          paddingVertical: 16,
          borderBottomWidth: 1,
          borderBottomColor: '#FAE8C4',
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: '700', color: '#1A1A1A', marginBottom: 4 }}>
          Statistiques detaillees
        </Text>
        <Text style={{ fontSize: 14, color: '#6B6B6B' }}>{patientName}</Text>
      </View>

      <ScrollView className="flex-1 p-4">
        {/* Period selector */}
        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 14,
            padding: 16,
            marginBottom: 16,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.04,
            shadowRadius: 8,
            elevation: 2,
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: '600', color: '#1A1A1A', marginBottom: 12 }}>
            Periode d'analyse
          </Text>
          <View className="flex-row">
            <PeriodPill value="week" label="7j" />
            <PeriodPill value="month" label="30j" />
            <PeriodPill value="quarter" label="3m" />
            <PeriodPill value="year" label="1an" />
          </View>
        </View>

        {!stats ? (
          <View
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 14,
              padding: 32,
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.04,
              shadowRadius: 8,
              elevation: 2,
            }}
          >
            <Ionicons name="analytics-outline" size={60} color="#C8C4C0" />
            <Text style={{ color: '#6B6B6B', marginTop: 16, textAlign: 'center' }}>
              Aucune evaluation pour cette periode
            </Text>
          </View>
        ) : (
          <>
            {/* Overview */}
            <View
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 14,
                padding: 20,
                marginBottom: 16,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.04,
                shadowRadius: 8,
                elevation: 2,
              }}
            >
              <Text style={{ fontSize: 17, fontWeight: '600', color: '#1A1A1A', marginBottom: 16 }}>
                Vue d'ensemble
              </Text>

              <View className="flex-row mb-3">
                <View className="flex-1">
                  <Text style={{ fontSize: 13, color: '#A0A0A0' }}>Evaluations</Text>
                  <Text style={{ fontSize: 28, fontWeight: '700', color: '#1A1A1A' }}>
                    {stats.totalEvaluations}
                  </Text>
                </View>
                <View className="flex-1">
                  <Text style={{ fontSize: 13, color: '#A0A0A0' }}>Regularite</Text>
                  <Text style={{ fontSize: 28, fontWeight: '700', color: '#1A1A1A' }}>
                    {stats.consistency}%
                  </Text>
                </View>
              </View>

              {stats.consistency < 50 && (
                <AlertBox
                  icon="alert-circle"
                  title="Taux de completion faible"
                  message="Encourager le patient"
                  severity="warning"
                />
              )}
            </View>

            {/* Detailed stats */}
            <View
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 14,
                padding: 20,
                marginBottom: 16,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.04,
                shadowRadius: 8,
                elevation: 2,
              }}
            >
              <Text style={{ fontSize: 17, fontWeight: '600', color: '#1A1A1A', marginBottom: 16 }}>
                Indicateurs moyens
              </Text>

              <StatIndicator
                label="Humeur"
                value={stats.mood.avg}
                iconName="happy-outline"
                iconBg="#EDFAF2"
                iconColor="#4CAF82"
                min={stats.mood.min}
                max={stats.mood.max}
              />

              <StatIndicator
                label="Anxiete"
                value={stats.anxiety.avg}
                iconName="pulse-outline"
                iconBg="#FEF0F0"
                iconColor="#E05B5B"
                min={stats.anxiety.min}
                max={stats.anxiety.max}
              />

              <StatIndicator
                label="Sommeil"
                value={stats.sleep.avg}
                iconName="moon-outline"
                iconBg="#FDF6EA"
                iconColor="#E8A838"
                min={stats.sleep.min}
                max={stats.sleep.max}
              />
            </View>

            {/* Charts */}
            <View
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 14,
                padding: 16,
                marginBottom: 16,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.03,
                shadowRadius: 6,
                elevation: 1,
              }}
            >
              <EvaluationChart evaluations={evaluations} type="mood" />
            </View>

            <View
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 14,
                padding: 16,
                marginBottom: 16,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.03,
                shadowRadius: 6,
                elevation: 1,
              }}
            >
              <EvaluationChart evaluations={evaluations} type="anxiety" />
            </View>

            <View
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 14,
                padding: 16,
                marginBottom: 16,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.03,
                shadowRadius: 6,
                elevation: 1,
              }}
            >
              <EvaluationChart evaluations={evaluations} type="sleep" />
            </View>

            {/* Critical alerts */}
            {stats.anxiety.avg > 3.5 && (
              <AlertBox
                icon="warning"
                title="Niveau d'anxiete eleve"
                message="Le niveau d'anxiete moyen depasse 3.5/5. Envisager un ajustement du suivi."
                severity="error"
              />
            )}

            {stats.mood.avg < 2.5 && (
              <AlertBox
                icon="warning"
                title="Humeur basse"
                message="L'humeur moyenne est inferieure a 2.5/5. Surveillance recommandee."
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
