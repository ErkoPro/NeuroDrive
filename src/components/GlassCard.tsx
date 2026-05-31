import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  accent?: string;
}

export function GlassCard({ children, style, accent }: GlassCardProps) {
  return (
    <View style={[styles.wrapper, style]}>
      <LinearGradient
        colors={
          accent
            ? [`${accent}15`, 'rgba(255,255,255,0.04)']
            : ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.03)']
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.inner}>{children}</View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  gradient: {
    borderRadius: 20,
  },
  inner: {
    padding: 20,
  },
});
