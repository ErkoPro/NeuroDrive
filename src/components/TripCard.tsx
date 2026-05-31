import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GlassCard } from './GlassCard';
import { colors, getScoreColor, getRiskLabel } from '../theme/colors';
import { TripRecord } from '../types';
import { formatDate, formatDuration } from '../simulation/engine';

interface TripCardProps {
  trip: TripRecord;
  onPress: () => void;
}

export function TripCard({ trip, onPress }: TripCardProps) {
  const scoreColor = getScoreColor(trip.safetyScore);
  const riskColor =
    trip.riskLevel === 'low'
      ? colors.safe
      : trip.riskLevel === 'medium'
        ? colors.warning
        : colors.danger;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <GlassCard style={styles.card}>
        <View style={styles.header}>
          <View>
            <Text style={styles.date}>{formatDate(trip.date)}</Text>
            <Text style={styles.duration}>{formatDuration(trip.durationSeconds)}</Text>
          </View>
          <View style={[styles.scoreBadge, { backgroundColor: `${scoreColor}20` }]}>
            <Text style={[styles.scoreText, { color: scoreColor }]}>{trip.safetyScore}</Text>
          </View>
        </View>
        <View style={styles.metrics}>
          <View style={styles.metric}>
            <Ionicons name="heart" size={14} color={colors.danger} />
            <Text style={styles.metricText}>Ср. {trip.avgHeartRate} уд/мин</Text>
          </View>
          <View style={styles.metric}>
            <Ionicons name="pulse" size={14} color={colors.warning} />
            <Text style={styles.metricText}>Макс. {trip.maxHeartRate}</Text>
          </View>
          <View style={[styles.riskBadge, { backgroundColor: `${riskColor}20` }]}>
            <Text style={[styles.riskText, { color: riskColor }]}>
              {getRiskLabel(trip.riskLevel)}
            </Text>
          </View>
        </View>
      </GlassCard>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  date: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  duration: {
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: 2,
  },
  scoreBadge: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },
  scoreText: {
    fontSize: 20,
    fontWeight: '700',
  },
  metrics: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flexWrap: 'wrap',
  },
  metric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metricText: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  riskBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: 'auto',
  },
  riskText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
