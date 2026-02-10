import React from 'react';
import { View, Text, Platform } from 'react-native';
import Card from '../../common/Card';

const EvaluationsTab = ({ evaluations = [] }) => {
  const isWeb = Platform.OS === 'web';
  const safeEvaluations = Array.isArray(evaluations) ? evaluations : [];

  if (safeEvaluations.length === 0) {
    return (
      <View className="p-4">
        <Card>
          <Text className="text-gray-600 text-center">
            Aucune évaluation pour le moment
          </Text>
        </Card>
      </View>
    );
  }

  return (
    <View className="p-4">
      <View className={isWeb ? 'flex-row flex-wrap gap-3' : ''}>
        {safeEvaluations.map((evaluation) => (
          <View 
            key={evaluation._id}
            className={isWeb ? 'flex-1 min-w-[300px] mb-3' : 'mb-3'}
          >
            <Card>
              <View className="flex-row justify-between items-center mb-3">
                <Text className="text-base font-semibold text-gray-900">
                  {new Date(evaluation.date).toLocaleDateString('fr-FR', { 
                    weekday: 'long', 
                    day: 'numeric', 
                    month: 'long' 
                  })}
                </Text>
              </View>
              
              <View className="flex-row justify-between">
                <View className="items-center flex-1">
                  <Text className="text-xs text-gray-600 mb-1">Humeur</Text>
                  <View className="flex-row items-center">
                    <Text className="text-2xl font-bold text-gray-900">
                      {evaluation.mood}
                    </Text>
                    <Text className="text-gray-500">/5</Text>
                  </View>
                </View>
                
                <View className="items-center flex-1">
                  <Text className="text-xs text-gray-600 mb-1">Anxiété</Text>
                  <View className="flex-row items-center">
                    <Text className="text-2xl font-bold text-gray-900">
                      {evaluation.anxiety}
                    </Text>
                    <Text className="text-gray-500">/5</Text>
                  </View>
                </View>
                
                <View className="items-center flex-1">
                  <Text className="text-xs text-gray-600 mb-1">Sommeil</Text>
                  <View className="flex-row items-center">
                    <Text className="text-2xl font-bold text-gray-900">
                      {evaluation.sleep}
                    </Text>
                    <Text className="text-gray-500">/5</Text>
                  </View>
                </View>
              </View>

              {evaluation.notes && (
                <View className="mt-3 pt-3 border-t border-gray-200">
                  <Text className="text-sm text-gray-700">
                    {evaluation.notes}
                  </Text>
                </View>
              )}
            </Card>
          </View>
        ))}
      </View>
    </View>
  );
};

export default EvaluationsTab;