import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Alert,
  useWindowDimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import evaluationService from '../../services/evaluationService';

const DailyEvaluationScreen = () => {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [alreadyCompleted, setAlreadyCompleted] = useState(false);
  const [mood, setMood] = useState(null);
  const [anxiety, setAnxiety] = useState(null);
  const [sleep, setSleep] = useState(null);

  // Step wizard state: 0=mood, 1=anxiety, 2=sleep, 3=success
  const [currentStep, setCurrentStep] = useState(0);

  // Animation refs for emoji/pill selection bounce
  const scaleAnims = useRef([1, 2, 3, 4, 5].map(() => new Animated.Value(1))).current;

  // Animation ref for success checkmark
  const successScale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    checkTodayEvaluation();
  }, []);

  // Animate success checkmark when reaching step 3
  useEffect(() => {
    if (currentStep === 3) {
      Animated.spring(successScale, {
        toValue: 1,
        friction: 4,
        tension: 60,
        useNativeDriver: true,
      }).start();
    }
  }, [currentStep]);

  const checkTodayEvaluation = async () => {
    setLoading(true);
    const result = await evaluationService.checkTodayEvaluation();
    setLoading(false);

    if (result.success && result.data?.evaluation) {
      setAlreadyCompleted(true);
    }
  };

  const moods = [
    { value: 1, emoji: '\u{1F622}', label: 'Très mauvais' },
    { value: 2, emoji: '\u{1F615}', label: 'Mauvais' },
    { value: 3, emoji: '\u{1F610}', label: 'Neutre' },
    { value: 4, emoji: '\u{1F642}', label: 'Bon' },
    { value: 5, emoji: '\u{1F60A}', label: 'Très bon' },
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

  const animateSelection = (index) => {
    const anim = scaleAnims[index];
    anim.setValue(1);
    Animated.spring(anim, {
      toValue: 1.15,
      friction: 3,
      tension: 120,
      useNativeDriver: true,
    }).start(() => {
      Animated.spring(anim, {
        toValue: 1,
        friction: 5,
        tension: 80,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleMoodSelect = (value, index) => {
    setMood(value);
    animateSelection(index);
  };

  const handleAnxietySelect = (value, index) => {
    setAnxiety(value);
    animateSelection(index);
  };

  const handleSleepSelect = (value, index) => {
    setSleep(value);
    animateSelection(index);
  };

  const handleNext = () => {
    if (currentStep === 0 && mood === null) {
      Alert.alert('Attention', 'Veuillez sélectionner votre humeur');
      return;
    }
    if (currentStep === 1 && anxiety === null) {
      Alert.alert('Attention', 'Veuillez sélectionner votre niveau d\'anxiété');
      return;
    }
    // Reset scale anims for the next step
    scaleAnims.forEach(a => a.setValue(1));
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    scaleAnims.forEach(a => a.setValue(1));
    setCurrentStep(prev => prev - 1);
  };

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
      // Move to success screen
      setCurrentStep(3);
    } else {
      Alert.alert('Erreur', result.error);
    }
  };

  // Step indicator component
  const StepIndicator = ({ step, total }) => (
    <View className="flex-row items-center justify-center mb-3">
      <Text className="text-sm font-medium mr-3" style={{ color: '#6B6B6B' }}>
        Étape {step + 1} sur {total}
      </Text>
      <View className="flex-row" style={{ gap: 8 }}>
        {Array.from({ length: total }).map((_, i) => (
          <View
            key={i}
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: i === step ? '#5B9BD5' : '#EEECEB',
            }}
          />
        ))}
      </View>
    </View>
  );

  // ---- Loading state ----
  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center" style={{ backgroundColor: '#FAFAFA' }}>
        <View
          className="items-center justify-center mb-3"
          style={{
            width: 56,
            height: 56,
            borderRadius: 16,
            backgroundColor: '#EEF4FB',
          }}
        >
          <Ionicons name="clipboard-outline" size={28} color="#5B9BD5" />
        </View>
        <Text className="font-medium text-base" style={{ color: '#6B6B6B' }}>Chargement...</Text>
      </SafeAreaView>
    );
  }

  // ---- Already completed state ----
  if (alreadyCompleted) {
    return (
      <SafeAreaView className="flex-1" style={{ backgroundColor: '#FAFAFA' }}>
        <View
          className="flex-1 justify-center items-center px-6"
          style={isDesktop ? { alignSelf: 'center', maxWidth: 480 } : undefined}
        >
          <View
            className="items-center justify-center mb-5"
            style={{
              width: isDesktop ? 96 : 80,
              height: isDesktop ? 96 : 80,
              borderRadius: 24,
              backgroundColor: '#C8F0D6',
            }}
          >
            <Ionicons
              name="checkmark-circle"
              size={isDesktop ? 56 : 46}
              color="#4CAF82"
            />
          </View>
          <Text className="text-2xl font-bold mb-3 text-center" style={{ color: '#1A1A1A' }}>
            C'est fait !
          </Text>
          <Text className="text-base text-center mb-8 leading-5" style={{ color: '#6B6B6B' }}>
            Vous avez déjà complété votre évaluation quotidienne aujourd'hui.
            Revenez demain !
          </Text>
          <Button
            title="Retour"
            onPress={() => router.back()}
            variant="outline"
          />
        </View>
      </SafeAreaView>
    );
  }

  // ========== STEP 3: SUCCESS ==========
  if (currentStep === 3) {
    return (
      <SafeAreaView className="flex-1" style={{ backgroundColor: '#EDFAF2' }}>
        <View
          className="flex-1 justify-center items-center px-6"
          style={isDesktop ? { alignSelf: 'center', maxWidth: 480 } : undefined}
        >
          <Animated.View
            style={{
              transform: [{ scale: successScale }],
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: '#C8F0D6',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 24,
            }}
          >
            <Ionicons name="checkmark-circle" size={64} color="#4CAF82" />
          </Animated.View>

          <Text className="text-3xl font-bold mb-3 text-center" style={{ color: '#1A1A1A' }}>
            Merci !
          </Text>
          <Text className="text-base text-center mb-8 leading-5" style={{ color: '#6B6B6B' }}>
            Votre évaluation quotidienne a été enregistrée avec succès.
          </Text>

          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.8}
            className="py-4 px-8"
            style={{
              backgroundColor: '#4CAF82',
              borderRadius: 14,
            }}
          >
            <Text className="text-white font-bold text-base">Retour</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // ========== STEP 0: MOOD ==========
  if (currentStep === 0) {
    return (
      <SafeAreaView className="flex-1" style={{ backgroundColor: '#FAFAFA' }}>
        <View
          className="flex-1 px-6"
          style={isDesktop ? { alignSelf: 'center', maxWidth: 540, width: '100%' } : undefined}
        >
          {/* Top bar with back + step indicator */}
          <View className="pt-6 pb-4">
            {isDesktop && (
              <TouchableOpacity
                onPress={() => router.back()}
                className="flex-row items-center mb-4"
              >
                <Ionicons name="arrow-back" size={20} color="#5B9BD5" style={{ marginRight: 8 }} />
                <Text className="text-sm font-medium" style={{ color: '#6B6B6B' }}>Retour</Text>
              </TouchableOpacity>
            )}
            <StepIndicator step={0} total={3} />
          </View>

          {/* Content */}
          <View className="flex-1 justify-center items-center">
            <Text className="text-2xl font-bold text-center mb-10" style={{ color: '#1A1A1A' }}>
              Comment vous sentez-vous aujourd'hui ?
            </Text>

            <View className="flex-row justify-center" style={{ gap: 16 }}>
              {moods.map((item, index) => {
                const isSelected = mood === item.value;
                return (
                  <TouchableOpacity
                    key={item.value}
                    onPress={() => handleMoodSelect(item.value, index)}
                    activeOpacity={0.7}
                    className="items-center"
                  >
                    <Animated.View
                      style={{
                        transform: [{ scale: scaleAnims[index] }],
                        width: 64,
                        height: 64,
                        borderRadius: 32,
                        backgroundColor: isSelected ? '#D4E4F5' : '#F5F5F4',
                        borderWidth: isSelected ? 2 : 0,
                        borderColor: isSelected ? '#5B9BD5' : 'transparent',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Text style={{ fontSize: 28 }}>{item.emoji}</Text>
                    </Animated.View>
                    <Text
                      className="text-xs mt-2 text-center"
                      style={{
                        color: isSelected ? '#3D85C6' : '#6B6B6B',
                        fontWeight: isSelected ? '600' : '400',
                        maxWidth: 64,
                      }}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Bottom button */}
          <View className="pb-8 pt-4">
            <TouchableOpacity
              onPress={handleNext}
              activeOpacity={0.8}
              className="py-4 items-center justify-center"
              style={{
                backgroundColor: '#5B9BD5',
                borderRadius: 14,
                opacity: mood === null ? 0.5 : 1,
              }}
            >
              <Text className="text-white font-bold text-lg">Suivant</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // ========== STEP 1: ANXIETY ==========
  if (currentStep === 1) {
    return (
      <SafeAreaView className="flex-1" style={{ backgroundColor: '#FAFAFA' }}>
        <View
          className="flex-1 px-6"
          style={isDesktop ? { alignSelf: 'center', maxWidth: 540, width: '100%' } : undefined}
        >
          {/* Top bar */}
          <View className="pt-6 pb-4">
            <StepIndicator step={1} total={3} />
          </View>

          {/* Content */}
          <View className="flex-1 justify-center">
            <Text className="text-2xl font-bold text-center mb-10" style={{ color: '#1A1A1A' }}>
              Quel est votre niveau d'anxiété ?
            </Text>

            <View style={{ gap: 12 }}>
              {anxietyLevels.map((item, index) => {
                const isSelected = anxiety === item.value;
                return (
                  <TouchableOpacity
                    key={item.value}
                    onPress={() => handleAnxietySelect(item.value, index)}
                    activeOpacity={0.7}
                  >
                    <Animated.View
                      style={{
                        transform: [{ scale: scaleAnims[index] }],
                        paddingVertical: 16,
                        paddingHorizontal: 20,
                        borderRadius: 14,
                        backgroundColor: isSelected ? '#D4E4F5' : '#FFFFFF',
                        borderWidth: isSelected ? 2 : 1,
                        borderColor: isSelected ? '#5B9BD5' : '#EEECEB',
                      }}
                    >
                      <Text
                        className="text-center text-base"
                        style={{
                          color: isSelected ? '#3D85C6' : '#404040',
                          fontWeight: isSelected ? '600' : '400',
                        }}
                      >
                        {item.label}
                      </Text>
                    </Animated.View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Bottom buttons */}
          <View className="pb-8 pt-4 flex-row" style={{ gap: 12 }}>
            <TouchableOpacity
              onPress={handleBack}
              activeOpacity={0.7}
              className="py-4 items-center justify-center flex-1"
              style={{
                backgroundColor: 'transparent',
                borderRadius: 14,
                borderWidth: 1.5,
                borderColor: '#EEECEB',
              }}
            >
              <Text className="font-semibold text-base" style={{ color: '#6B6B6B' }}>Précédent</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleNext}
              activeOpacity={0.8}
              className="py-4 items-center justify-center flex-1"
              style={{
                backgroundColor: '#5B9BD5',
                borderRadius: 14,
                opacity: anxiety === null ? 0.5 : 1,
              }}
            >
              <Text className="text-white font-bold text-base">Suivant</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // ========== STEP 2: SLEEP ==========
  if (currentStep === 2) {
    return (
      <SafeAreaView className="flex-1" style={{ backgroundColor: '#FAFAFA' }}>
        <View
          className="flex-1 px-6"
          style={isDesktop ? { alignSelf: 'center', maxWidth: 540, width: '100%' } : undefined}
        >
          {/* Top bar */}
          <View className="pt-6 pb-4">
            <StepIndicator step={2} total={3} />
          </View>

          {/* Content */}
          <View className="flex-1 justify-center">
            <Text className="text-2xl font-bold text-center mb-10" style={{ color: '#1A1A1A' }}>
              Comment avez-vous dormi ?
            </Text>

            <View style={{ gap: 12 }}>
              {sleepQualities.map((item, index) => {
                const isSelected = sleep === item.value;
                return (
                  <TouchableOpacity
                    key={item.value}
                    onPress={() => handleSleepSelect(item.value, index)}
                    activeOpacity={0.7}
                  >
                    <Animated.View
                      style={{
                        transform: [{ scale: scaleAnims[index] }],
                        paddingVertical: 16,
                        paddingHorizontal: 20,
                        borderRadius: 14,
                        backgroundColor: isSelected ? '#D4E4F5' : '#FFFFFF',
                        borderWidth: isSelected ? 2 : 1,
                        borderColor: isSelected ? '#5B9BD5' : '#EEECEB',
                      }}
                    >
                      <Text
                        className="text-center text-base"
                        style={{
                          color: isSelected ? '#3D85C6' : '#404040',
                          fontWeight: isSelected ? '600' : '400',
                        }}
                      >
                        {item.label}
                      </Text>
                    </Animated.View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Bottom buttons */}
          <View className="pb-8 pt-4 flex-row" style={{ gap: 12 }}>
            <TouchableOpacity
              onPress={handleBack}
              activeOpacity={0.7}
              className="py-4 items-center justify-center flex-1"
              style={{
                backgroundColor: 'transparent',
                borderRadius: 14,
                borderWidth: 1.5,
                borderColor: '#EEECEB',
              }}
            >
              <Text className="font-semibold text-base" style={{ color: '#6B6B6B' }}>Précédent</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSubmit}
              activeOpacity={0.8}
              disabled={submitting}
              className="py-4 items-center justify-center flex-1"
              style={{
                backgroundColor: '#5B9BD5',
                borderRadius: 14,
                opacity: submitting || sleep === null ? 0.5 : 1,
              }}
            >
              <Text className="text-white font-bold text-base">
                {submitting ? 'Enregistrement...' : 'Enregistrer'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return null;
};

export default DailyEvaluationScreen;
