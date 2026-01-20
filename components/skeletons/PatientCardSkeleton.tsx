import React from 'react';
import { View } from 'react-native';

export const PatientCardSkeleton: React.FC = () => {
  return (
    <View className="bg-white rounded-2xl p-4 mb-3 border-2 border-[#E8E3DC]">
      <View className="flex-row items-center">
        {/* Avatar skeleton */}
        <View className="w-16 h-16 rounded-full bg-gray-200 animate-pulse" />

        {/* Infos skeleton */}
        <View className="flex-1 ml-4">
          {/* Nom */}
          <View className="h-5 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" />
          
          {/* Dernière conversation */}
          <View className="h-3 bg-gray-200 rounded w-1/2 mb-1 animate-pulse" />
          
          {/* Prochaine séance */}
          <View className="h-3 bg-gray-200 rounded w-2/3 animate-pulse" />
        </View>
      </View>

      {/* Niveau de gravité skeleton */}
      <View className="mt-3 pt-3 border-t border-[#E8E3DC] flex-row items-center">
        <View className="w-3 h-3 rounded-full bg-gray-200 mr-2 animate-pulse" />
        <View className="h-3 bg-gray-200 rounded w-32 animate-pulse" />
      </View>
    </View>
  );
};

export default PatientCardSkeleton;