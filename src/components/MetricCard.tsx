import React, { memo } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { LucideIcon } from 'lucide-react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { useEffect } from 'react';
import { colors } from '../theme/colors';
import { fontFamily, typography } from '../theme/typography';

interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  unit?: string;
  color?: string;
  pulse?: boolean;
}

function MetricCardComponent({ icon: Icon, label, value, unit, color = colors.accentBlue, pulse = false }: MetricCardProps) {
  const scale = useSharedValue(1);

  useEffect(() => {
    if (pulse) {
      scale.value = withRepeat(
        withSequence(withTiming(1.04, { duration: 600 }), withTiming(1, { duration: 600 })),
        -1,
        false,
      );
    }
  }, [pulse, scale]);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View style={[styles.card, { borderLeftColor: color }]}>
      <View style={[styles.iconWrap, { backgroundColor: `${color}18` }]}>
        <Icon size={16} color={color} strokeWidth={2.5} />
      </View>
      <Text style={styles.label}>{label}</Text>
      <Animated.View style={[styles.valueRow, pulse && pulseStyle]}>
        <Text style={styles.value}>{value}</Text>
        {unit ? <Text style={styles.unit}>{unit}</Text> : null}
      </Animated.View>
    </View>
  );
}

export const MetricCard = memo(MetricCardComponent);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.bgCard,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    borderLeftWidth: 3,
    minWidth: '45%',
    ...Platform.select({
      web: { cursor: 'default' } as object,
    }),
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  label: {
    color: colors.textSecondary,
    fontSize: typography.caption.fontSize,
    fontFamily: fontFamily.regular,
    marginBottom: 4,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  value: {
    color: colors.textPrimary,
    fontSize: typography.metric.fontSize,
    fontFamily: fontFamily.bold,
  },
  unit: {
    color: colors.textMuted,
    fontSize: typography.caption.fontSize,
    fontFamily: fontFamily.regular,
    marginLeft: 4,
  },
});
