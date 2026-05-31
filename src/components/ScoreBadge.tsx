import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, getScoreColor } from '../theme/colors';
import { fontFamily, typography } from '../theme/typography';

interface ScoreBadgeProps {
  label: string;
  score: number;
}

function ScoreBadgeComponent({ label, score }: ScoreBadgeProps) {
  const color = getScoreColor(score);
  const barWidth = `${score}%` as `${number}%`;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.score, { color }]}>{score}</Text>
      <View style={styles.barTrack}>
        <View style={[styles.barFill, { width: barWidth, backgroundColor: color }]} />
      </View>
    </View>
  );
}

export const ScoreBadge = memo(ScoreBadgeComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgCard,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  label: {
    color: colors.textSecondary,
    fontSize: typography.caption.fontSize,
    fontFamily: fontFamily.regular,
    marginBottom: 6,
  },
  score: {
    fontSize: 32,
    fontFamily: fontFamily.bold,
    marginBottom: 10,
  },
  barTrack: {
    width: '100%',
    height: 3,
    backgroundColor: colors.border,
    borderRadius: 2,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 2,
  },
});
