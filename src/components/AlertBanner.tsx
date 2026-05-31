import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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

  return (
    <View style={[styles.banner, { backgroundColor: style.bg, borderColor: style.border }]}>
      <Ionicons name={style.icon} size={22} color={style.border} />
      <Text style={[styles.text, { color: style.border }]}>{message}</Text>
    </View>
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
