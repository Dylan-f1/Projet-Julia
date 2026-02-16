import React from 'react';
import { View, Animated, Easing, useWindowDimensions } from 'react-native';
import { useEffect, useRef } from 'react';

const Skeleton = ({
  width = '100%',
  height = 20,
  borderRadius = 4,
  className = '',
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
        backgroundColor: '#EEECEB',
        opacity,
      }}
      className={className}
    />
  );
};

// Skeleton pre-configured variants
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
  <View className={`bg-surface-50 rounded-2xl p-4 border border-surface-200 ${className}`}>
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

export const SkeletonList = ({ count = 3, className = '' }) => {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  // Desktop: 2-column grid
  if (isDesktop) {
    return (
      <View
        className={className}
        style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}
      >
        {Array.from({ length: count }).map((_, index) => (
          <View key={index} style={{ width: '48.5%' }}>
            <SkeletonCard className="mb-0" />
          </View>
        ))}
      </View>
    );
  }

  return (
    <View className={className}>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} className="mb-3" />
      ))}
    </View>
  );
};

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
  <Skeleton width="100%" height={48} borderRadius={16} className={className} />
);

export const SkeletonInput = ({ className = '' }) => (
  <View className={className}>
    <Skeleton width="30%" height={14} className="mb-2" />
    <Skeleton width="100%" height={48} borderRadius={12} />
  </View>
);

export const SkeletonChart = ({ className = '' }) => {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;
  const barCount = isDesktop ? 12 : 7;
  const barWidth = isDesktop ? 40 : 30;

  return (
    <View className={`bg-surface-50 rounded-2xl p-4 border border-surface-200 ${className}`}>
      <Skeleton width="50%" height={20} className="mb-4" />
      <View
        className="flex-row items-end justify-between"
        style={{ height: isDesktop ? 260 : 200 }}
      >
        {Array.from({ length: barCount }).map((_, index) => (
          <Skeleton
            key={index}
            width={barWidth}
            height={Math.random() * 150 + 50}
            borderRadius={4}
          />
        ))}
      </View>
    </View>
  );
};

export const SkeletonPatientCard = ({ className = '' }) => (
  <View className={`bg-surface-50 rounded-2xl p-4 border border-surface-200 ${className}`}>
    <View className="flex-row items-start mb-3">
      <SkeletonAvatar size="medium" className="mr-3" />
      <View className="flex-1">
        <Skeleton width="70%" height={18} className="mb-2" />
        <Skeleton width="50%" height={14} />
      </View>
      <Skeleton width={60} height={24} borderRadius={12} />
    </View>
    <View className="flex-row justify-between pt-3 border-t border-surface-200">
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
  <View
    className={`mb-3 ${isUser ? 'items-end' : 'items-start'} ${className}`}
  >
    <View
      className={`max-w-[80%] ${
        isUser ? 'bg-patient-100' : 'bg-surface-100'
      } rounded-2xl p-3`}
    >
      <SkeletonText lines={2} />
      <Skeleton width={60} height={10} className="mt-2" />
    </View>
  </View>
);

export const SkeletonChatScreen = ({ className = '' }) => {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  return (
    <View
      className={`flex-1 p-4 ${className}`}
      style={
        isDesktop
          ? { alignSelf: 'center', width: '100%', maxWidth: 760 }
          : undefined
      }
    >
      <SkeletonMessageBubble isUser={false} />
      <SkeletonMessageBubble isUser={true} />
      <SkeletonMessageBubble isUser={false} />
      <SkeletonMessageBubble isUser={true} />
    </View>
  );
};

export const SkeletonDashboard = ({ className = '' }) => {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  return (
    <View
      className={`p-4 ${className}`}
      style={
        isDesktop
          ? { alignSelf: 'center', width: '100%', maxWidth: 900 }
          : undefined
      }
    >
      {/* Stats cards */}
      <View
        style={
          isDesktop
            ? { flexDirection: 'row', gap: 12, marginBottom: 16 }
            : { flexDirection: 'row', marginBottom: 16 }
        }
      >
        <View style={{ flex: 1, marginRight: isDesktop ? 0 : 8 }}>
          <View className="bg-surface-50 rounded-2xl p-4 border border-surface-200">
            <Skeleton width="60%" height={14} className="mb-2" />
            <Skeleton width="40%" height={32} />
          </View>
        </View>
        <View style={{ flex: 1, marginLeft: isDesktop ? 0 : 8 }}>
          <View className="bg-surface-50 rounded-2xl p-4 border border-surface-200">
            <Skeleton width="60%" height={14} className="mb-2" />
            <Skeleton width="40%" height={32} />
          </View>
        </View>
        {isDesktop && (
          <>
            <View style={{ flex: 1 }}>
              <View className="bg-surface-50 rounded-2xl p-4 border border-surface-200">
                <Skeleton width="60%" height={14} className="mb-2" />
                <Skeleton width="40%" height={32} />
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <View className="bg-surface-50 rounded-2xl p-4 border border-surface-200">
                <Skeleton width="60%" height={14} className="mb-2" />
                <Skeleton width="40%" height={32} />
              </View>
            </View>
          </>
        )}
      </View>

      {/* List */}
      <SkeletonList count={isDesktop ? 4 : 3} />
    </View>
  );
};

export default Skeleton;
