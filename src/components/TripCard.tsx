import React, { memo } from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Heart, Activity } from 'lucide-react-native';
import { colors, getScoreColor, getRiskLabel } from '../theme/colors';
import { TripRecord } from '../types';
import { formatDate, formatDuration } from '../simulation/engine';
import { fontFamily, typography } from '../theme/typography';

interface TripCardProps {
  trip: TripRecord;
  onPress: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function TripCardComponent({ trip, onPress }: TripCardProps) {
  const scoreColor = getScoreColor(trip.safetyScore);
  const riskColor =
    trip.riskLevel === 'low' ? colors.green : trip.riskLevel === 'medium' ? colors.yellow : colors.red;
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateY: scale.value === 1 ? 0 : -2 }],
  }));

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={() => { scale.value = withSpring(0.98, { damping: 15 }); }}
      onPressOut={() => { scale.value = withSpring(1, { damping: 15 }); }}
      style={[styles.card, animStyle]}
    >
      <View style={styles.left}>
        <Text style={styles.date}>{formatDate(trip.date)}</Text>
        <Text style={styles.duration}>{formatDuration(trip.durationSeconds)}</Text>
        <View style={styles.metrics}>
          <View style={styles.metric}>
            <Heart size={13} color={colors.red} strokeWidth={2.5} />
            <Text style={styles.metricText}>Ср. {trip.avgHeartRate}</Text>
          </View>
          <View style={styles.metric}>
            <Activity size={13} color={colors.yellow} strokeWidth={2.5} />
            <Text style={styles.metricText}>Макс. {trip.maxHeartRate}</Text>
          </View>
        </View>
      </View>
      <View style={styles.right}>
        <Text style={[styles.score, { color: scoreColor }]}>{trip.safetyScore}</Text>
        <View style={[styles.riskBadge, { backgroundColor: `${riskColor}18` }]}>
          <Text style={[styles.riskText, { color: riskColor }]}>{getRiskLabel(trip.riskLevel)}</Text>
        </View>
      </View>
    </AnimatedPressable>
  );
}

export const TripCard = memo(TripCardComponent);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.bgCard,
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    ...Platform.select({
      web: { cursor: 'pointer' } as object,
    }),
  },
  left: { flex: 1 },
  date: {
    color: colors.textPrimary,
    fontSize: typography.h3.fontSize,
    fontFamily: fontFamily.semiBold,
  },
  duration: {
    color: colors.textSecondary,
    fontSize: typography.caption.fontSize,
    fontFamily: fontFamily.regular,
    marginTop: 2,
    marginBottom: 10,
  },
  metrics: { flexDirection: 'row', gap: 14 },
  metric: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  metricText: {
    color: colors.textSecondary,
    fontSize: typography.caption.fontSize,
    fontFamily: fontFamily.regular,
  },
  right: { alignItems: 'flex-end', gap: 8 },
  score: {
    fontSize: 32,
    fontFamily: fontFamily.bold,
  },
  riskBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  riskText: {
    fontSize: 11,
    fontFamily: fontFamily.semiBold,
  },
});
