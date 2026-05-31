import React, { memo } from 'react';
import { View, StyleSheet, ViewStyle, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  accent?: string;
  gradient?: boolean;
  leftAccent?: string;
  variant?: 'default' | 'gradient-border';
}

function GlassCardComponent({
  children,
  style,
  accent,
  gradient = false,
  leftAccent,
  variant = 'default',
}: GlassCardProps) {
  const content = (
    <View style={[styles.inner, leftAccent ? { borderLeftWidth: 3, borderLeftColor: leftAccent } : undefined]}>
      {children}
    </View>
  );

  if (gradient || accent) {
    return (
      <View style={[styles.wrapper, variant === 'gradient-border' && styles.gradientBorder, style]}>
        <LinearGradient
          colors={
            gradient
              ? (['rgba(6,182,212,0.08)', 'rgba(14,165,233,0.04)'] as const)
              : ([`${accent ?? colors.accentBlue}12`, colors.bgCard] as const)
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          {content}
        </LinearGradient>
      </View>
    );
  }

  return <View style={[styles.wrapper, style]}>{content}</View>;
}

export const GlassCard = memo(GlassCardComponent);

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.bgCard,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    ...Platform.select({
      web: {
        backdropFilter: 'blur(20px)',
      } as object,
    }),
  },
  gradientBorder: {
    borderColor: colors.borderAccent,
  },
  gradient: {
    borderRadius: 20,
  },
  inner: {
    padding: 20,
  },
});
