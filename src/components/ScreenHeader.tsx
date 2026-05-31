import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, gradients } from '../theme/colors';
import { fontFamily, typography } from '../theme/typography';

interface GradientTextProps {
  children: string;
  style?: object;
  size?: number;
}

function GradientTextComponent({ children, style, size = 28 }: GradientTextProps) {
  return (
    <MaskedView
      maskElement={
        <Text style={[styles.text, { fontSize: size }, style]}>{children}</Text>
      }
    >
      <LinearGradient colors={[...gradients.accent]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
        <Text style={[styles.text, { fontSize: size, opacity: 0 }, style]}>{children}</Text>
      </LinearGradient>
    </MaskedView>
  );
}

export const GradientText = memo(GradientTextComponent);

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  gradient?: boolean;
}

function ScreenHeaderComponent({ title, subtitle, gradient = false }: ScreenHeaderProps) {
  return (
    <View style={styles.container}>
      {gradient ? (
        <GradientText size={typography.h1.fontSize}>{title}</GradientText>
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

export const ScreenHeader = memo(ScreenHeaderComponent);

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  text: {
    fontFamily: fontFamily.bold,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.h1.fontSize,
    fontFamily: fontFamily.bold,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: typography.body.fontSize,
    fontFamily: fontFamily.regular,
    marginTop: 4,
  },
});
