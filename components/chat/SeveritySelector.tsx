import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import type { SeverityLevel } from '@/types/conversation';
import { getSeverityColor } from '@/lib/constants/colors';
import { SEVERITY_EVALUATION_MESSAGES } from '@/lib/constants/severity-levels';

interface SeveritySelectorProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (level: SeverityLevel) => void;
}

export const SeveritySelector: React.FC<SeveritySelectorProps> = ({
  visible,
  onClose,
  onSelect,
}) => {
  const handleSelect = (level: SeverityLevel) => {
    onSelect(level);
    onClose();
  };

  const levels: Array<{ level: SeverityLevel; icon: string }> = [
    { level: 1, icon: '😊' },
    { level: 2, icon: '😟' },
    { level: 3, icon: '😔' },
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 items-center justify-center px-6">
        <View className="bg-white rounded-3xl p-6 w-full max-w-md">
          <Text className="text-xl font-semibold text-[#2C2318] mb-2 text-center">
            Comment vous sentez-vous ?
          </Text>
          <Text className="text-sm text-[#8B8378] mb-6 text-center">
            Votre réponse permet à votre thérapeute de mieux vous suivre
          </Text>

          <View className="gap-3">
            {levels.map(({ level, icon }) => {
              const colors = getSeverityColor(level);
              return (
                <TouchableOpacity
                  key={level}
                  onPress={() => handleSelect(level)}
                  className="rounded-2xl p-4 flex-row items-center"
                  style={{ backgroundColor: colors.lighter }}
                  activeOpacity={0.7}
                >
                  <View
                    className="w-12 h-12 rounded-full items-center justify-center mr-4"
                    style={{ backgroundColor: colors.main }}
                  >
                    <Text className="text-2xl">{icon}</Text>
                  </View>

                  <View className="flex-1">
                    <Text
                      className="text-base font-semibold mb-1"
                      style={{ color: colors.text }}
                    >
                      {colors.label}
                    </Text>
                    <Text className="text-sm" style={{ color: colors.text }}>
                      {SEVERITY_EVALUATION_MESSAGES[level]}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity
            onPress={onClose}
            className="mt-4 py-3 rounded-xl bg-gray-100"
            activeOpacity={0.7}
          >
            <Text className="text-center text-base font-medium text-[#5C5347]">
              Annuler
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SeveritySelector;