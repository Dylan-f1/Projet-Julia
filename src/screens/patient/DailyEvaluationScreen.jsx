import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Alert,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import evaluationService from '../../services/evaluationService';

const DailyEvaluationScreen = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [alreadyCompleted, setAlreadyCompleted] = useState(false);
  const [mood, setMood] = useState(null);
  const [anxiety, setAnxiety] = useState(null);
  const [sleep, setSleep] = useState(null);

  useEffect(() => {
    checkTodayEvaluation();
  }, []);

  const checkTodayEvaluation = async () => {
    setLoading(true);
    const result = await evaluationService.checkTodayEvaluation();
    setLoading(false);

    if (result.success && result.data.completed) {
      setAlreadyCompleted(true);
    }
  };

  const moods = [
    { value: 1, emoji: '😢', label: 'Très mauvais' },
    { value: 2, emoji: '😕', label: 'Mauvais' },
    { value: 3, emoji: '😐', label: 'Neutre' },
    { value: 4, emoji: '🙂', label: 'Bon' },
    { value: 5, emoji: '😊', label: 'Très bon' },
  ];

  const anxietyLevels = [
    { value: 1, label: 'Très faible' },
    { value: 2, label: 'Faible' },
    { value: 3, label: 'Modéré' },
    { value: 4, label: 'Élevé' },
    { value: 5, label: 'Très élevé' },
  ];

  const sleepQualities = [
    { value: 1, label: 'Très mauvais' },
    { value: 2, label: 'Mauvais' },
    { value: 3, label: 'Correct' },
    { value: 4, label: 'Bon' },
    { value: 5, label: 'Excellent' },
  ];

  const handleSubmit = async () => {
    if (mood === null || anxiety === null || sleep === null) {
      Alert.alert('Attention', 'Veuillez répondre à toutes les questions');
      return;
    }

    setSubmitting(true);
    const result = await evaluationService.submitDailyEvaluation({
      mood,
      anxiety,
      sleep,
    });
    setSubmitting(false);

    if (result.success) {
      Alert.alert(
        'Merci !',
        'Votre évaluation quotidienne a été enregistrée.',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } else {
      Alert.alert('Erreur', result.error);
    }
  };

  // ---- Loading state ----
  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 justify-center items-center">
        <Text className="text-gray-500">Chargement...</Text>
      </SafeAreaView>
    );
  }

  // ---- Already completed state ----
  if (alreadyCompleted) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <View
          className="flex-1 justify-center items-center px-6"
          style={isDesktop ? { alignSelf: 'center', maxWidth: 480 } : undefined}
        >
          <View
            className={`items-center justify-center mb-4 ${
              isDesktop
                ? 'w-24 h-24 bg-green-100 rounded-full'
                : 'w-20 h-20 bg-green-100 rounded-full'
            }`}
          >
            <Ionicons
              name="checkmark-circle"
              size={isDesktop ? 60 : 50}
              color="#22c55e"
            />
          </View>
          <Text className="text-2xl font-bold text-gray-900 mb-3 text-center">
            C'est fait !
          </Text>
          <Text className="text-base text-gray-600 text-center mb-8">
            Vous avez déjà complété votre évaluation quotidienne aujourd'hui.
            Revenez demain !
          </Text>
          <Button
            title="Retour"
            onPress={() => navigation.goBack()}
            variant="outline"
          />
        </View>
      </SafeAreaView>
    );
  }

  // ---- Main evaluation form ----
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          padding: isDesktop ? 40 : 16,
          paddingVertical: isDesktop ? 40 : 24,
          alignItems: isDesktop ? 'center' : undefined,
        }}
      >
        {/* Container centré en desktop */}
        <View style={isDesktop ? { width: '100%', maxWidth: 600 } : undefined}>
          {/* ---- Header ---- */}
          <View className="mb-6">
            {isDesktop && (
              <View className="flex-row items-center mb-4">
                <Ionicons
                  name="arrow-back"
                  size={22}
                  color="#64748b"
                  onPress={() => navigation.goBack()}
                  style={{ marginRight: 12, cursor: 'pointer' }}
                />
                <Text className="text-sm text-gray-500">Retour</Text>
              </View>
            )}
            <Text className="text-2xl font-bold text-gray-900 mb-2">
              Évaluation quotidienne
            </Text>
            <Text className="text-base text-gray-600">
              Prenez quelques instants pour évaluer votre état aujourd'hui
            </Text>
          </View>

          {/* ---- Humeur ---- */}
          <Card
            className="mb-6"
            style={
              isDesktop
                ? {
                    backgroundColor: '#fff',
                    borderRadius: 16,
                    borderWidth: 1,
                    borderColor: '#e5e7eb',
                    padding: 32,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.05,
                    shadowRadius: 6,
                    elevation: 2,
                  }
                : undefined
            }
          >
            <Text className="text-lg font-semibold text-gray-900 mb-4">
              Comment vous sentez-vous aujourd'hui ?
            </Text>
            <View className="flex-row justify-between">
              {moods.map((item) => (
                <View key={item.value} className="items-center">
                  <Button
                    title={item.emoji}
                    onPress={() => setMood(item.value)}
                    variant={mood === item.value ? 'primary' : 'outline'}
                    size="large"
                    className="w-14 h-14 rounded-full mb-2"
                  />
                  <Text className="text-xs text-gray-600 text-center">
                    {item.label}
                  </Text>
                </View>
              ))}
            </View>
          </Card>

          {/* ---- Anxiété & Sommeil : côte à côte en desktop ---- */}
          <View
            style={
              isDesktop
                ? { flexDirection: 'row', gap: 16, marginBottom: 24 }
                : undefined
            }
          >
            {/* Anxiété */}
            <View style={isDesktop ? { flex: 1 } : undefined}>
              <Card
                className={isDesktop ? '' : 'mb-6'}
                style={
                  isDesktop
                    ? {
                        backgroundColor: '#fff',
                        borderRadius: 16,
                        borderWidth: 1,
                        borderColor: '#e5e7eb',
                        padding: 32,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.05,
                        shadowRadius: 6,
                        elevation: 2,
                        flex: 1,
                      }
                    : undefined
                }
              >
                <Text className="text-lg font-semibold text-gray-900 mb-4">
                  Niveau d'anxiété
                </Text>
                <View className="space-y-2">
                  {anxietyLevels.map((item) => (
                    <Button
                      key={item.value}
                      title={item.label}
                      onPress={() => setAnxiety(item.value)}
                      variant={anxiety === item.value ? 'primary' : 'outline'}
                      className="mb-2"
                    />
                  ))}
                </View>
              </Card>
            </View>

            {/* Sommeil */}
            <View style={isDesktop ? { flex: 1 } : undefined}>
              <Card
                className={isDesktop ? '' : 'mb-6'}
                style={
                  isDesktop
                    ? {
                        backgroundColor: '#fff',
                        borderRadius: 16,
                        borderWidth: 1,
                        borderColor: '#e5e7eb',
                        padding: 32,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.05,
                        shadowRadius: 6,
                        elevation: 2,
                        flex: 1,
                      }
                    : undefined
                }
              >
                <Text className="text-lg font-semibold text-gray-900 mb-4">
                  Qualité du sommeil
                </Text>
                <View className="space-y-2">
                  {sleepQualities.map((item) => (
                    <Button
                      key={item.value}
                      title={item.label}
                      onPress={() => setSleep(item.value)}
                      variant={sleep === item.value ? 'primary' : 'outline'}
                      className="mb-2"
                    />
                  ))}
                </View>
              </Card>
            </View>
          </View>

          {/* ---- Submit ---- */}
          <View
            style={
              isDesktop
                ? { flexDirection: 'row-reverse', gap: 12 }
                : undefined
            }
          >
            <View style={isDesktop ? { minWidth: 200 } : { marginBottom: 24 }}>
              <Button
                title="Enregistrer"
                onPress={handleSubmit}
                loading={submitting}
                size="large"
              />
            </View>
            {isDesktop && (
              <View style={{ minWidth: 120 }}>
                <Button
                  title="Annuler"
                  onPress={() => navigation.goBack()}
                  variant="outline"
                />
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DailyEvaluationScreen;