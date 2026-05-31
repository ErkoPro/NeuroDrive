import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

interface DeviceStatusRowProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  connected: boolean;
  connectedLabel?: string;
}

export function DeviceStatusRow({ icon, label, connected, connectedLabel = 'Подключено' }: DeviceStatusRowProps) {
  return (
    <View style={styles.row}>
      <View style={styles.left}>
        <View style={[styles.iconWrap, connected && styles.iconConnected]}>
          <Ionicons name={icon} size={18} color={connected ? colors.safe : colors.textMuted} />
        </View>
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={styles.right}>
        <Ionicons
          name={connected ? 'checkmark-circle' : 'close-circle'}
          size={20}
          color={connected ? colors.safe : colors.danger}
        />
        <Text style={[styles.status, { color: connected ? colors.safe : colors.danger }]}>
          {connected ? connectedLabel : 'Отключено'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceBorder,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconConnected: {
    backgroundColor: `${colors.safe}20`,
  },
  label: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '500',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  status: {
    fontSize: 13,
    fontWeight: '600',
  },
});
