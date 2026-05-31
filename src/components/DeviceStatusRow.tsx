import React, { memo } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { LucideIcon } from 'lucide-react-native';
import { Check } from 'lucide-react-native';
import { colors } from '../theme/colors';
import { fontFamily, typography } from '../theme/typography';

interface DeviceStatusRowProps {
  icon: LucideIcon;
  label: string;
  connected: boolean;
  connectedLabel?: string;
}

function DeviceStatusRowComponent({ icon: Icon, label, connected, connectedLabel = 'Подключено' }: DeviceStatusRowProps) {
  return (
    <View style={styles.row}>
      <View style={styles.left}>
        <View style={[styles.dot, connected && styles.dotConnected]} />
        <View style={[styles.iconWrap, connected && styles.iconConnected]}>
          <Icon size={18} color={connected ? colors.green : colors.textMuted} strokeWidth={2} />
        </View>
        <Text style={styles.label}>{label}</Text>
      </View>
      {connected ? (
        <View style={styles.badge}>
          <Check size={12} color={colors.green} strokeWidth={3} />
          <Text style={styles.badgeText}>{connectedLabel}</Text>
        </View>
      ) : (
        <Text style={styles.disconnected}>Отключено</Text>
      )}
    </View>
  );
}

export const DeviceStatusRow = memo(DeviceStatusRowComponent);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.textMuted,
  },
  dotConnected: {
    backgroundColor: colors.green,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.bgSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconConnected: {
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
  },
  label: {
    color: colors.textPrimary,
    fontSize: typography.body.fontSize,
    fontFamily: fontFamily.semiBold,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },
  badgeText: {
    color: colors.green,
    fontSize: 11,
    fontFamily: fontFamily.semiBold,
  },
  disconnected: {
    color: colors.red,
    fontSize: 12,
    fontFamily: fontFamily.medium,
  },
});
