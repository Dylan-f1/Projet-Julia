import React from 'react';
import { View, Animated, Easing } from 'react-native';
import { useEffect, useRef } from 'react';

const Skeleton = ({ 
  width = '100%', 
  height = 20, 
  borderRadius = 4,
  className = '' 
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <Animated.View
      style={{
        width,
        height,
        borderRadius,
        backgroundColor: '#E5E7EB',
        opacity,
      }}
      className={className}
    />
  );
};

// Skeleton pré-configurés
export const SkeletonText = ({ lines = 3, className = '' }) => (
  <View className={className}>
    {Array.from({ length: lines }).map((_, index) => (
      <Skeleton
        key={index}
        height={16}
        width={index === lines - 1 ? '70%' : '100%'}
        className="mb-2"
      />
    ))}
  </View>
);

export const SkeletonCard = ({ className = '' }) => (
  <View className={`bg-white rounded-xl p-4 ${className}`}>
    <View className="flex-row items-center mb-4">
      <Skeleton width={48} height={48} borderRadius={24} className="mr-3" />
      <View className="flex-1">
        <Skeleton width="60%" height={16} className="mb-2" />
        <Skeleton width="40%" height={12} />
      </View>
    </View>
    <SkeletonText lines={3} />
  </View>
);

export const SkeletonList = ({ count = 3, className = '' }) => (
  <View className={className}>
    {Array.from({ length: count }).map((_, index) => (
      <SkeletonCard key={index} className="mb-3" />
    ))}
  </View>
);

export const SkeletonAvatar = ({ size = 'medium', className = '' }) => {
  const sizes = {
    small: 32,
    medium: 48,
    large: 64,
    xlarge: 96,
  };

  const dimension = sizes[size];

  return (
    <Skeleton
      width={dimension}
      height={dimension}
      borderRadius={dimension / 2}
      className={className}
    />
  );
};

export const SkeletonButton = ({ className = '' }) => (
  <Skeleton width="100%" height={48} borderRadius={8} className={className} />
);

export const SkeletonInput = ({ className = '' }) => (
  <View className={className}>
    <Skeleton width="30%" height={14} className="mb-2" />
    <Skeleton width="100%" height={48} borderRadius={8} />
  </View>
);

export const SkeletonChart = ({ className = '' }) => (
  <View className={`bg-white rounded-xl p-4 ${className}`}>
    <Skeleton width="50%" height={20} className="mb-4" />
    <View className="flex-row items-end justify-between" style={{ height: 200 }}>
      {Array.from({ length: 7 }).map((_, index) => (
        <Skeleton
          key={index}
          width={30}
          height={Math.random() * 150 + 50}
          borderRadius={4}
        />
      ))}
    </View>
  </View>
);

export const SkeletonPatientCard = ({ className = '' }) => (
  <View className={`bg-white rounded-xl p-4 ${className}`}>
    <View className="flex-row items-start mb-3">
      <SkeletonAvatar size="medium" className="mr-3" />
      <View className="flex-1">
        <Skeleton width="70%" height={18} className="mb-2" />
        <Skeleton width="50%" height={14} />
      </View>
      <Skeleton width={60} height={24} borderRadius={12} />
    </View>
    <View className="flex-row justify-between pt-3 border-t border-gray-100">
      <View className="flex-1 mr-2">
        <Skeleton width="60%" height={12} className="mb-1" />
        <Skeleton width="40%" height={16} />
      </View>
      <View className="flex-1 ml-2">
        <Skeleton width="60%" height={12} className="mb-1" />
        <Skeleton width="40%" height={16} />
      </View>
    </View>
  </View>
);

export const SkeletonMessageBubble = ({ isUser = false, className = '' }) => (
  <View className={`mb-3 ${isUser ? 'items-end' : 'items-start'} ${className}`}>
    <View className={`max-w-[80%] ${isUser ? 'bg-primary-100' : 'bg-gray-100'} rounded-2xl p-3`}>
      <SkeletonText lines={2} />
      <Skeleton width={60} height={10} className="mt-2" />
    </View>
  </View>
);

export const SkeletonChatScreen = ({ className = '' }) => (
  <View className={`flex-1 p-4 ${className}`}>
    <SkeletonMessageBubble isUser={false} />
    <SkeletonMessageBubble isUser={true} />
    <SkeletonMessageBubble isUser={false} />
    <SkeletonMessageBubble isUser={true} />
  </View>
);

export const SkeletonDashboard = ({ className = '' }) => (
  <View className={`p-4 ${className}`}>
    {/* Stats cards */}
    <View className="flex-row mb-4">
      <View className="flex-1 mr-2">
        <View className="bg-white rounded-xl p-4">
          <Skeleton width="60%" height={14} className="mb-2" />
          <Skeleton width="40%" height={32} />
        </View>
      </View>
      <View className="flex-1 ml-2">
        <View className="bg-white rounded-xl p-4">
          <Skeleton width="60%" height={14} className="mb-2" />
          <Skeleton width="40%" height={32} />
        </View>
      </View>
    </View>

    {/* List */}
    <SkeletonList count={3} />
  </View>
);

export default Skeleton;
