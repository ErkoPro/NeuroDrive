import React, { memo, useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Cpu } from 'lucide-react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { colors } from '../theme/colors';
import { fontFamily } from '../theme/typography';

function DemoBadgeComponent() {
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(withTiming(0.4, { duration: 900 }), withTiming(1, { duration: 900 })),
      -1,
      false,
    );
  }, [opacity]);

  const dotStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <View style={styles.badge}>
      <Animated.View style={[styles.dot, dotStyle]} />
      <Text style={styles.text}>Демо-режим</Text>
    </View>
  );
}

export const DemoBadge = memo(DemoBadgeComponent);

export function DemoModeBanner() {
  return (
    <View style={styles.banner}>
      <Cpu size={16} color={colors.accentCyan} strokeWidth={2} />
      <Text style={styles.bannerText}>
        Демонстрация без оборудования — данные симулируются в реальном времени
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.25)',
    ...Platform.select({
      web: { backdropFilter: 'blur(12px)' } as object,
    }),
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.green,
  },
  text: {
    color: colors.green,
    fontSize: 12,
    fontFamily: fontFamily.semiBold,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: colors.bgCard,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
  },
  bannerText: {
    flex: 1,
    color: colors.textSecondary,
    fontSize: 12,
    fontFamily: fontFamily.regular,
    lineHeight: 16,
  },
});
