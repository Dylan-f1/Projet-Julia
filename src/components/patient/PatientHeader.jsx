import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PatientHeader = ({ patient, onBack, onEdit }) => {
  const isWeb = Platform.OS === 'web';

  return (
    <View
      style={{
        backgroundColor: '#FDF6EA',
        paddingHorizontal: isWeb ? 32 : 16,
        paddingVertical: isWeb ? 24 : 18,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {/* Bouton retour */}
        <TouchableOpacity
          onPress={onBack}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: 'rgba(255,255,255,0.7)',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 16,
            flexShrink: 0,
          }}
        >
          <Ionicons name="arrow-back" size={20} color="#404040" />
        </TouchableOpacity>

        {/* Avatar + infos */}
        <View
          style={{
            width: isWeb ? 52 : 44,
            height: isWeb ? 52 : 44,
            borderRadius: isWeb ? 26 : 22,
            backgroundColor: '#FAE8C4',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 14,
            flexShrink: 0,
          }}
        >
          <Ionicons name="person" size={isWeb ? 24 : 20} color="#E8A838" />
        </View>

        <View style={{ flex: 1, minWidth: 0 }}>
          <Text
            numberOfLines={1}
            style={{
              fontSize: isWeb ? 22 : 18,
              fontWeight: '700',
              color: '#1A1A1A',
              marginBottom: 2,
            }}
          >
            {patient.firstName} {patient.lastName}
          </Text>
          <Text
            numberOfLines={1}
            style={{ fontSize: 13, color: '#6B6B6B' }}
          >
            {patient.email}
          </Text>
        </View>

        {/* Bouton éditer */}
        <TouchableOpacity
          onPress={onEdit}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#FAE8C4',
            paddingHorizontal: isWeb ? 16 : 10,
            paddingVertical: 8,
            borderRadius: 12,
            marginLeft: 12,
            flexShrink: 0,
          }}
        >
          <Ionicons name="create-outline" size={18} color="#B07820" />
          {isWeb && (
            <Text style={{ color: '#B07820', fontWeight: '600', fontSize: 13, marginLeft: 6 }}>
              Modifier
            </Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Bannière critique */}
      {patient.criticalStatus && (
        <View
          style={{
            backgroundColor: '#FEF0F0',
            borderRadius: 12,
            padding: 14,
            marginTop: 14,
            borderLeftWidth: 4,
            borderLeftColor: '#E05B5B',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: '#FCCECE',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 12,
              flexShrink: 0,
            }}
          >
            <Ionicons name="warning" size={16} color="#E05B5B" />
          </View>
          <Text style={{ color: '#B83A3A', fontWeight: '600', flex: 1, fontSize: 13 }}>
            Patient en situation critique — Surveillance renforcée
          </Text>
        </View>
      )}
    </View>
  );
};

export default PatientHeader;
