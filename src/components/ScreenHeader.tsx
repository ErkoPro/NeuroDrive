import React, { memo } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { colors, gradients } from '../theme/colors';
import { fontFamily, typography } from '../theme/typography';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  gradient?: boolean;
}

function ScreenHeaderComponent({ title, subtitle, gradient = false }: ScreenHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, gradient && styles.gradientTitle]}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

export const ScreenHeader = memo(ScreenHeaderComponent);

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  title: {
    color: colors.textPrimary,
    fontSize: typography.h1.fontSize,
    fontFamily: fontFamily.bold,
    letterSpacing: -0.5,
  },
  gradientTitle: {
    color: colors.accentCyan,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: typography.body.fontSize,
    fontFamily: fontFamily.regular,
    marginTop: 4,
  },
});
