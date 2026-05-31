import React, { memo, useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { AlertTriangle, AlertCircle, Skull } from 'lucide-react-native';
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
      return { bg: 'rgba(239,68,68,0.08)', border: colors.red, Icon: AlertCircle };
    case 'emergency':
      return { bg: 'rgba(239,68,68,0.15)', border: colors.red, Icon: Skull };
    default:
      return { bg: colors.bgCard, border: colors.accentBlue, Icon: AlertCircle };
  }
}

function AlertBannerComponent({ level, message }: AlertBannerProps) {
  const style = getAlertStyle(level);
  const { Icon } = style;

  return (
    <View style={[styles.banner, { backgroundColor: style.bg, borderLeftColor: style.border }]}>
      <Icon size={20} color={style.border} strokeWidth={2.5} />
      <Text style={[styles.text, { color: style.border }]}>{message}</Text>
    </View>
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
  },
  text: {
    flex: 1,
    fontSize: typography.body.fontSize,
    fontFamily: fontFamily.semiBold,
    lineHeight: 20,
  },
});
