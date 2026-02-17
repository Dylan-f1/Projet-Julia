import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TypingIndicator = () => {
  const dot1Opacity = useRef(new Animated.Value(0.3)).current;
  const dot2Opacity = useRef(new Animated.Value(0.3)).current;
  const dot3Opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const createPulse = (dotOpacity, delay) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(dotOpacity, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(dotOpacity, {
            toValue: 0.3,
            duration: 400,
            useNativeDriver: true,
          }),
        ])
      );
    };

    const anim1 = createPulse(dot1Opacity, 0);
    const anim2 = createPulse(dot2Opacity, 150);
    const anim3 = createPulse(dot3Opacity, 300);

    anim1.start();
    anim2.start();
    anim3.start();

    return () => {
      anim1.stop();
      anim2.stop();
      anim3.stop();
    };
  }, []);

  const dotStyle = {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F0A8A0', // ai-400
    marginHorizontal: 3,
  };

  return (
    <View className="flex-row mb-4 justify-start items-end">
      {/* Avatar Julia */}
      <View
        className="w-8 h-8 bg-ai-400 rounded-full items-center justify-center mr-2"
      >
        <Ionicons name="heart" size={16} color="white" />
      </View>

      {/* Typing bubble */}
      <View
        className="bg-ai-50 rounded-[20px] rounded-bl-[4px] border border-ai-200 px-5 py-3.5"
      >
        <View className="flex-row items-center">
          <Animated.View style={[dotStyle, { opacity: dot1Opacity }]} />
          <Animated.View style={[dotStyle, { opacity: dot2Opacity }]} />
          <Animated.View style={[dotStyle, { opacity: dot3Opacity }]} />
        </View>
      </View>
    </View>
  );
};

export default TypingIndicator;
