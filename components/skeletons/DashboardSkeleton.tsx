import React from 'react';
import { View } from 'react-native';

export const DashboardSkeleton: React.FC = () => {
  return (
    <View className="flex-1">
      {/* Header skeleton */}
      <View className="px-6 py-4 bg-white border-b border-[#E8E3DC]">
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-1">
            <View className="h-7 bg-gray-200 rounded w-1/2 mb-2 animate-pulse" />
            <View className="h-3 bg-gray-200 rounded w-1/3 animate-pulse" />
          </View>
          <View className="w-12 h-12 rounded-full bg-gray-200 animate-pulse" />
        </View>

        {/* Stats skeleton */}
        <View className="flex-row gap-3">
          {[1, 2, 3].map((i) => (
            <View key={i} className="bg-gray-100 rounded-2xl px-4 py-3 animate-pulse">
              <View className="h-6 bg-gray-200 rounded w-8 mb-2" />
              <View className="h-2 bg-gray-200 rounded w-24" />
            </View>
          ))}
        </View>
      </View>

      {/* Liste patients skeleton */}
      <View className="flex-1 px-6 py-4">
        {[1, 2, 3, 4].map((i) => (
          <View key={i} className="bg-white rounded-2xl p-4 mb-3 border-2 border-[#E8E3DC]">
            <View className="flex-row items-center">
              <View className="w-16 h-16 rounded-full bg-gray-200 animate-pulse" />
              <View className="flex-1 ml-4">
                <View className="h-5 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" />
                <View className="h-3 bg-gray-200 rounded w-1/2 mb-1 animate-pulse" />
                <View className="h-3 bg-gray-200 rounded w-2/3 animate-pulse" />
              </View>
            </View>
            <View className="mt-3 pt-3 border-t border-[#E8E3DC] flex-row items-center">
              <View className="w-3 h-3 rounded-full bg-gray-200 mr-2 animate-pulse" />
              <View className="h-3 bg-gray-200 rounded w-32 animate-pulse" />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default DashboardSkeleton;