import React from 'react';
import { View, Text, TouchableOpacity, Platform, Linking, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EMERGENCY_NUMBER = '3114';

const OPTIONS = [
  {
    id: 'chat',
    icon: 'chatbubble-ellipses-outline',
    title: 'Ouvrir une discussion',
    description: 'Parlez librement avec Jul-IA',
    color: '#F0A8A0',    
    bgColor: '#FEF4F3',  
  },
  {
    id: 'appointment',
    icon: 'calendar-outline',
    title: 'Prise de rendez-vous',
    description: 'Planifier ou modifier votre prochain RDV',
    color: '#E8A838',    
    bgColor: '#FDF6EA',  
  },
  {
    id: 'actions',
    icon: 'bulb-outline',
    title: 'Actions recommandées',
    description: 'Exercices et conseils personnalisés',
    color: '#4CAF82',    
    bgColor: '#EDFAF2', 
  },
  {
    id: 'emergency',
    icon: 'call-outline',
    title: 'Appel d\'urgence',
    description: `Contacter le ${EMERGENCY_NUMBER} immédiatement`,
    color: '#E05B5B',   
    bgColor: '#FEF0F0',  
  },
];

const WelcomeOptions = ({ onSelectOption }) => {
  const isWeb = Platform.OS === 'web';

  const handlePress = (optionId) => {
    if (optionId === 'emergency') {
      handleEmergencyCall();
      return;
    }
    onSelectOption(optionId);
  };

  const handleEmergencyCall = () => {
    const confirmAndCall = () => {
      const phoneUrl = `tel:${EMERGENCY_NUMBER}`;
      Linking.canOpenURL(phoneUrl)
        .then((supported) => {
          if (supported) {
            Linking.openURL(phoneUrl);
          } else {
            Alert.alert(
              'Numéro d\'urgence',
              `Appelez le ${EMERGENCY_NUMBER} (numéro national de prévention du suicide).\n\nCe service est gratuit, confidentiel et disponible 24h/24.`,
              [{ text: 'Compris', style: 'default' }]
            );
          }
        })
        .catch(() => {
          Alert.alert(
            'Numéro d\'urgence',
            `Appelez le ${EMERGENCY_NUMBER} (numéro national de prévention du suicide).\n\nCe service est gratuit, confidentiel et disponible 24h/24.`,
            [{ text: 'Compris', style: 'default' }]
          );
        });
    };

    Alert.alert(
      '🚨 Appel d\'urgence',
      `Vous êtes sur le point d'appeler le ${EMERGENCY_NUMBER}.\n\nC'est le numéro national de prévention du suicide, disponible 24h/24, gratuit et confidentiel.`,
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Appeler', style: 'destructive', onPress: confirmAndCall },
      ]
    );
  };

  return (
    <View className="flex-1 justify-center items-center py-8 px-4">
      {/* Avatar Jul-IA */}
      <View
        className="items-center justify-center mb-5"
        style={{
          width: 72,
          height: 72,
          borderRadius: 36,
          backgroundColor: '#F0A8A0',
        }}
      >
        <Ionicons name="heart" size={36} color="#FFFFFF" />
      </View>

      <Text className="text-xl font-bold mb-1" style={{ color: '#1A1A1A' }}>
        Bonjour !
      </Text>
      <Text
        className="text-center px-6 leading-5 mb-8"
        style={{ color: '#6B6B6B' }}
      >
        Je suis Jul-IA, votre compagnon d'écoute.{'\n'}
        Comment puis-je vous aider ?
      </Text>

      {/* Options grid */}
      <View
        style={{
          width: '100%',
          maxWidth: 400,
        }}
      >
        {OPTIONS.map((option) => (
          <TouchableOpacity
            key={option.id}
            onPress={() => handlePress(option.id)}
            activeOpacity={0.7}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              borderRadius: 16,
              padding: 16,
              marginBottom: 10,
              borderWidth: 1,
              borderColor: '#EEECEB',
              ...(isWeb ? { cursor: 'pointer' } : {}),
            }}
          >
            {/* Icon circle */}
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                backgroundColor: option.bgColor,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 14,
              }}
            >
              <Ionicons name={option.icon} size={24} color={option.color} />
            </View>

            {/* Text */}
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '600',
                  color: '#1A1A1A',
                  marginBottom: 2,
                }}
              >
                {option.title}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: '#6B6B6B',
                }}
              >
                {option.description}
              </Text>
            </View>

            {/* Arrow */}
            <Ionicons
              name={option.id === 'emergency' ? 'call' : 'chevron-forward'}
              size={18}
              color={option.id === 'emergency' ? '#E05B5B' : '#C8C4C0'}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Hint text */}
      <Text
        className="text-xs text-center mt-4 px-8"
        style={{ color: '#A0A0A0' }}
      >
        Vous pouvez aussi écrire directement votre message ci-dessous
      </Text>
    </View>
  );
};

export default WelcomeOptions;
