import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  FadeInDown,
} from 'react-native-reanimated';
import { AlertLevel } from '../types';
import { colors } from '../theme/colors';

interface AlertBannerProps {
  level: AlertLevel;
  message: string;
}

function getAlertStyle(level: AlertLevel) {
  switch (level) {
    case 'yellow':
      return { bg: `${colors.warning}20`, border: colors.warning, icon: 'warning' as const };
    case 'red':
      return { bg: `${colors.danger}20`, border: colors.danger, icon: 'alert-circle' as const };
    case 'emergency':
      return { bg: `${colors.danger}30`, border: colors.danger, icon: 'skull' as const };
    default:
      return { bg: colors.surface, border: colors.primary, icon: 'information-circle' as const };
  }
}

export function AlertBanner({ level, message }: AlertBannerProps) {
  const style = getAlertStyle(level);
  const shake = useSharedValue(0);

  useEffect(() => {
    if (level === 'emergency' || level === 'red') {
      shake.value = withRepeat(
        withSequence(
          withTiming(-4, { duration: 80 }),
          withTiming(4, { duration: 80 }),
          withTiming(0, { duration: 80 }),
        ),
        3,
        false,
      );
    }
  }, [level, message, shake]);

  const shakeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shake.value }],
  }));

  return (
    <Animated.View entering={FadeInDown.duration(400).springify()}>
      <Animated.View
        style={[
          styles.banner,
          { backgroundColor: style.bg, borderColor: style.border },
          shakeStyle,
        ]}
      >
        <Ionicons name={style.icon} size={22} color={style.border} />
        <Text style={[styles.text, { color: style.border }]}>{message}</Text>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
  },
  text: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },
});
