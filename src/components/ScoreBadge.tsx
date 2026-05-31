import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, getScoreColor } from '../theme/colors';

interface ScoreBadgeProps {
  label: string;
  score: number;
}

export function ScoreBadge({ label, score }: ScoreBadgeProps) {
  const color = getScoreColor(score);
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.score, { color }]}>{score}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
  },
  label: {
    color: colors.textSecondary,
    fontSize: 12,
    marginBottom: 6,
  },
  score: {
    fontSize: 32,
    fontWeight: '700',
  },
});
