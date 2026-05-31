import React, { memo } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { LucideIcon } from 'lucide-react-native';
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

function MetricCardComponent({ icon: Icon, label, value, unit, color = colors.accentBlue }: MetricCardProps) {
  return (
    <View style={[styles.card, { borderLeftColor: color }]}>
      <View style={[styles.iconWrap, { backgroundColor: `${color}18` }]}>
        <Icon size={16} color={color} strokeWidth={2.5} />
      </View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.valueRow}>
        <Text style={styles.value}>{value}</Text>
        {unit ? <Text style={styles.unit}>{unit}</Text> : null}
      </View>
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
