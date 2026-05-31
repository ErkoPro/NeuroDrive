import React, { useEffect } from 'react';
import { Platform, View, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';

interface FadeInViewProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  style?: ViewStyle;
  slideUp?: number;
}

export function FadeInView({
  children,
  delay = 0,
  duration = 500,
  style,
  slideUp = 16,
}: FadeInViewProps) {
  // Reanimated opacity animations often fail silently on web production builds
  if (Platform.OS === 'web') {
    return <View style={style}>{children}</View>;
  }

  const opacity = useSharedValue(0);
  const translateY = useSharedValue(slideUp);

  useEffect(() => {
    opacity.value = withDelay(
      delay,
      withTiming(1, { duration, easing: Easing.out(Easing.cubic) }),
    );
    translateY.value = withDelay(
      delay,
      withTiming(0, { duration, easing: Easing.out(Easing.cubic) }),
    );
  }, [delay, duration, opacity, slideUp, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return <Animated.View style={[animatedStyle, style]}>{children}</Animated.View>;
}
