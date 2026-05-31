import React, { memo } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';

function AppShellComponent({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.root}>
      <LinearGradient
        colors={['rgba(14, 165, 233, 0.06)', 'transparent', colors.bgPrimary]}
        locations={[0, 0.35, 1]}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.content}>{children}</View>
    </View>
  );
}

export const AppShell = memo(AppShellComponent);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: colors.bgPrimary,
    ...Platform.select({
      web: {
        maxWidth: 480,
        alignSelf: 'center',
        minHeight: '100vh',
      } as object,
    }),
  },
  content: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
