// src/components/chat/TypingIndicator.jsx
import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TypingIndicator = () => {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = (dot, delay) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(dot, {
            toValue: -8,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    animate(dot1, 0);
    animate(dot2, 200);
    animate(dot3, 400);
  }, []);

  return (
    <View className="flex-row mb-3 justify-start">
      {/* Avatar Julia */}
      <View className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full items-center justify-center mr-2">
        <Ionicons name="sparkles" size={16} color="white" />
      </View>

      {/* Bulle typing */}
      <View className="bg-gray-200 rounded-2xl rounded-tl-sm px-4 py-3">
        <View className="flex-row items-center gap-1">
          <Animated.View
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: '#9CA3AF',
              transform: [{ translateY: dot1 }],
            }}
          />
          <Animated.View
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: '#9CA3AF',
              transform: [{ translateY: dot2 }],
            }}
          />
          <Animated.View
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: '#9CA3AF',
              transform: [{ translateY: dot3 }],
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default TypingIndicator;