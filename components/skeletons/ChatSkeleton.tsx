import React from 'react';
import { View, Animated, Easing } from 'react-native';

export const ChatSkeleton: React.FC = () => {
  const shimmerAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const shimmer = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    );
    shimmer.start();
    return () => shimmer.stop();
  }, []);

  const opacity = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  const SkeletonBox = ({ width, height }: { width?: string; height?: number }) => (
    <Animated.View
      className={`bg-gray-200 rounded ${width || 'w-full'}`}
      style={{ opacity, height: height || 16 }}
    />
  );

  return (
    <View className="flex-1 px-4 py-4">
      {/* Messages skeleton */}
      {[1, 2, 3, 4, 5].map((index) => {
        const isRight = index % 2 === 0;
        const widths = ['w-3/4', 'w-2/3', 'w-4/5'];
        const width = widths[index % 3];
        
        return (
          <View
            key={index}
            className={`mb-4 ${isRight ? 'items-end' : 'items-start'}`}
          >
            {/* Nom */}
            <View className="mb-1">
              <SkeletonBox width="w-20" height={12} />
            </View>
            
            {/* Bulle */}
            <View
              className={`${width} rounded-2xl ${
                isRight ? 'rounded-tr-sm' : 'rounded-tl-sm'
              } p-4 bg-gray-100`}
            >
              <SkeletonBox height={14} />
              <View className="h-2" />
              <SkeletonBox width="w-3/4" height={14} />
              <View className="h-2" />
              <SkeletonBox width="w-1/2" height={14} />
            </View>
            
            {/* Heure */}
            <View className="mt-1">
              <SkeletonBox width="w-12" height={10} />
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default ChatSkeleton;