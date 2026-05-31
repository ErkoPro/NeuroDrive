import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';

export function DemoBadge() {
  return (
    <LinearGradient
      colors={[`${colors.primary}30`, `${colors.accent}15`]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.badge}
    >
      <Ionicons name="flask" size={12} color={colors.primary} />
      <View style={styles.dot} />
      <Text style={styles.text}>Демо-режим</Text>
    </LinearGradient>
  );
}

export function DemoModeBanner() {
  return (
    <LinearGradient
      colors={[`${colors.primary}25`, `${colors.accent}10`]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.banner}
    >
      <Ionicons name="hardware-chip-outline" size={16} color={colors.primary} />
      <Text style={styles.bannerText}>
        Демонстрация без оборудования — данные симулируются в реальном времени
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: `${colors.primary}40`,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
  },
  text: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: `${colors.primary}25`,
    marginBottom: 16,
  },
  bannerText: {
    flex: 1,
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 16,
  },
});
