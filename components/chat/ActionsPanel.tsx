import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

interface Action {
  id: string;
  type: 'exercise' | 'appointment' | 'emergency' | 'continue';
  title: string;
  description: string;
  icon: string;
}

interface ActionsPanelProps {
  actions: Action[];
  onActionPress: (action: Action) => void;
}

export const ActionsPanel: React.FC<ActionsPanelProps> = ({
  actions,
  onActionPress,
}) => {
  const getActionColor = (type: Action['type']): string => {
    const colors = {
      exercise: '#8B7AB8', // Violet doux
      appointment: '#6B9E78', // Vert sauge
      emergency: '#C17B6F', // Terracotta rosé
      continue: '#6B8CAE', // Bleu gris
    };
    return colors[type];
  };

  const getActionBgColor = (type: Action['type']): string => {
    const colors = {
      exercise: '#E8E3F3', // Violet très pâle
      appointment: '#E8F3EA', // Vert très pâle
      emergency: '#F2E8E6', // Rose très pâle
      continue: '#E8EDF4', // Bleu très pâle
    };
    return colors[type];
  };

  if (actions.length === 0) return null;

  return (
    <View className="px-4 py-3 bg-white border-t border-[#E8E3DC]">
      <Text className="text-sm font-medium text-[#5C5347] mb-3">
        Actions suggérées
      </Text>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row gap-3">
          {actions.map((action) => (
            <TouchableOpacity
              key={action.id}
              onPress={() => onActionPress(action)}
              className="w-40 rounded-2xl p-4"
              style={{ backgroundColor: getActionBgColor(action.type) }}
              activeOpacity={0.7}
            >
              {/* Icône */}
              <View
                className="w-10 h-10 rounded-full items-center justify-center mb-2"
                style={{ backgroundColor: getActionColor(action.type) }}
              >
                <Text className="text-xl">{action.icon}</Text>
              </View>

              {/* Titre */}
              <Text
                className="text-sm font-semibold mb-1"
                style={{ color: getActionColor(action.type) }}
                numberOfLines={1}
              >
                {action.title}
              </Text>

              {/* Description */}
              <Text
                className="text-xs"
                style={{ color: getActionColor(action.type) }}
                numberOfLines={2}
              >
                {action.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default ActionsPanel;