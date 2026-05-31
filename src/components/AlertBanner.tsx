import React, { memo, useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { AlertTriangle, AlertCircle, Skull } from 'lucide-react-native';
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
import { fontFamily, typography } from '../theme/typography';

interface AlertBannerProps {
  level: AlertLevel;
  message: string;
}

function getAlertStyle(level: AlertLevel) {
  switch (level) {
    case 'yellow':
      return { bg: 'rgba(245,158,11,0.08)', border: colors.yellow, Icon: AlertTriangle };
    case 'red':
      return { bg: 'rgba(239,68,68,0.08)', border: colors.red, Icon: AlertCircle, pulse: true };
    case 'emergency':
      return { bg: 'rgba(239,68,68,0.15)', border: colors.red, Icon: Skull, pulse: true };
    default:
      return { bg: colors.bgCard, border: colors.accentBlue, Icon: AlertCircle };
  }
}

function AlertBannerComponent({ level, message }: AlertBannerProps) {
  const style = getAlertStyle(level);
  const glow = useSharedValue(0);

  useEffect(() => {
    if (style.pulse) {
      glow.value = withRepeat(
        withSequence(withTiming(1, { duration: 800 }), withTiming(0.3, { duration: 800 })),
        -1,
        false,
      );
    }
  }, [level, glow, style.pulse]);

  const glowStyle = useAnimatedStyle(() => ({
    shadowOpacity: style.pulse ? glow.value * 0.8 : 0,
  }));

  const { Icon } = style;

  return (
    <Animated.View entering={FadeInDown.duration(400).springify()}>
      <Animated.View
        style={[
          styles.banner,
          { backgroundColor: style.bg, borderLeftColor: style.border, shadowColor: style.border },
          glowStyle,
        ]}
      >
        <Icon size={20} color={style.border} strokeWidth={2.5} />
        <Text style={[styles.text, { color: style.border }]}>{message}</Text>
      </Animated.View>
    </Animated.View>
  );
}

export const AlertBanner = memo(AlertBannerComponent);

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 14,
    borderLeftWidth: 3,
    borderWidth: 1,
    borderColor: colors.border,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 12,
    elevation: 4,
  },
  text: {
    flex: 1,
    fontSize: typography.body.fontSize,
    fontFamily: fontFamily.semiBold,
    lineHeight: 20,
  },
});
