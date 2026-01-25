import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const EvaluationChart = ({ evaluations, type = 'mood' }) => {
  const screenWidth = Dimensions.get('window').width - 48; // padding

  if (!evaluations || evaluations.length === 0) {
    return (
      <View className="items-center justify-center py-8">
        <Text className="text-gray-500">Pas de données à afficher</Text>
      </View>
    );
  }

  // Préparer les données pour le graphique
  const sortedEvaluations = [...evaluations]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(-14); // Garder les 14 derniers jours

  const labels = sortedEvaluations.map((eval) => {
    const date = new Date(eval.date);
    return `${date.getDate()}/${date.getMonth() + 1}`;
  });

  const dataPoints = sortedEvaluations.map((eval) => eval[type] || 0);

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => {
      if (type === 'mood') return `rgba(34, 197, 94, ${opacity})`; // Vert
      if (type === 'anxiety') return `rgba(239, 68, 68, ${opacity})`; // Rouge
      if (type === 'sleep') return `rgba(59, 130, 246, ${opacity})`; // Bleu
      return `rgba(2, 132, 199, ${opacity})`;
    },
    labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: '#fff',
    },
    propsForBackgroundLines: {
      strokeDasharray: '', // solid background lines
      stroke: '#e5e7eb',
    },
  };

  const data = {
    labels,
    datasets: [
      {
        data: dataPoints,
        color: (opacity = 1) => chartConfig.color(opacity),
        strokeWidth: 2,
      },
    ],
  };

  const getTitle = () => {
    if (type === 'mood') return 'Évolution de l\'humeur';
    if (type === 'anxiety') return 'Évolution de l\'anxiété';
    if (type === 'sleep') return 'Qualité du sommeil';
    return 'Évaluation';
  };

  const getAverage = () => {
    const sum = dataPoints.reduce((acc, val) => acc + val, 0);
    return (sum / dataPoints.length).toFixed(1);
  };

  return (
    <View className="mb-4">
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-base font-semibold text-gray-900">{getTitle()}</Text>
        <View className="bg-gray-100 px-3 py-1 rounded-full">
          <Text className="text-sm text-gray-700">
            Moyenne: <Text className="font-bold">{getAverage()}/5</Text>
          </Text>
        </View>
      </View>

      <LineChart
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={{
          borderRadius: 16,
        }}
        withVerticalLines={false}
        withHorizontalLines={true}
        withDots={true}
        withShadow={false}
        segments={4}
        fromZero={true}
        yAxisInterval={1}
      />
    </View>
  );
};

export default EvaluationChart;
