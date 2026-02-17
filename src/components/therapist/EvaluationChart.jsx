import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';

const EvaluationChart = ({ evaluations, type = 'mood' }) => {
  const screenWidth = Dimensions.get('window').width - 48;

  if (!evaluations || evaluations.length === 0) {
    return (
      <View className="items-center justify-center py-8">
        <View className="w-14 h-14 bg-patient-50 rounded-full items-center justify-center mb-3">
          <Ionicons name="analytics-outline" size={28} color="#5B9BD5" />
        </View>
        <Text className="text-text-300">Pas de donnees a afficher</Text>
      </View>
    );
  }

  const sortedEvaluations = [...evaluations]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(-14); 

  const labels = sortedEvaluations.map((ev) => {
    const date = new Date(ev.date);
    return `${date.getDate()}/${date.getMonth() + 1}`;
  });

  const dataPoints = sortedEvaluations.map((ev) => ev[type] || 0);

  const chartColors = {
    mood: {
      line: (opacity = 1) => `rgba(91, 155, 213, ${opacity})`,
      label: 'Humeur',
      icon: 'happy-outline',
      dotColor: '#5B9BD5',
    },
    anxiety: {
      line: (opacity = 1) => `rgba(232, 168, 56, ${opacity})`,
      label: 'Anxiete',
      icon: 'pulse-outline',
      dotColor: '#E8A838',
    },
    sleep: {
      line: (opacity = 1) => `rgba(240, 168, 160, ${opacity})`,
      label: 'Sommeil',
      icon: 'moon-outline',
      dotColor: '#F0A8A0',
    },
  };

  const currentColor = chartColors[type] || chartColors.mood;

  const chartConfig = {
    backgroundColor: '#FFFFFF',
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientTo: '#FFFFFF',
    decimalPlaces: 0,
    color: currentColor.line,
    labelColor: (opacity = 1) => `rgba(160, 160, 160, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '5',
      strokeWidth: '2',
      stroke: '#FFFFFF',
    },
    propsForBackgroundLines: {
      strokeDasharray: '4 4',
      stroke: '#EEECEB',
    },
  };

  const data = {
    labels,
    datasets: [
      {
        data: dataPoints,
        color: currentColor.line,
        strokeWidth: 2.5,
      },
    ],
  };

  const getTitle = () => {
    if (type === 'mood') return 'Evolution de l\'humeur';
    if (type === 'anxiety') return 'Evolution de l\'anxiete';
    if (type === 'sleep') return 'Qualite du sommeil';
    return 'Evaluation';
  };

  const getAverage = () => {
    const sum = dataPoints.reduce((acc, val) => acc + val, 0);
    return (sum / dataPoints.length).toFixed(1);
  };

  return (
    <View className="bg-white rounded-xl p-5 mb-4 border border-surface-200">
      <View className="flex-row justify-between items-center mb-4">
        <View className="flex-row items-center">
          <View className="w-9 h-9 bg-surface-100 rounded-full items-center justify-center mr-3">
            <Ionicons name={currentColor.icon} size={18} color={currentColor.dotColor} />
          </View>
          <Text className="text-base font-semibold text-text-900">{getTitle()}</Text>
        </View>
        <View className="bg-surface-50 border border-surface-200 px-3 py-1.5 rounded-xl">
          <Text className="text-sm text-text-500">
            Moyenne: <Text className="font-bold text-text-900">{getAverage()}/5</Text>
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

      {/* Legend */}
      <View className="flex-row justify-center mt-4 pt-3 border-t border-surface-200">
        {Object.entries(chartColors).map(([key, val]) => (
          <View key={key} className="flex-row items-center mx-3">
            <View
              className="w-3 h-3 rounded-full mr-1.5"
              style={{ backgroundColor: val.dotColor }}
            />
            <Text className={`text-xs ${key === type ? 'text-text-700 font-medium' : 'text-text-300'}`}>
              {val.label}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default EvaluationChart;
