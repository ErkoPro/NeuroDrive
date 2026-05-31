import React, { memo } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { colors } from '../theme/colors';

function AppShellComponent({ children }: { children: React.ReactNode }) {
  return <View style={styles.root}>{children}</View>;
}

export const AppShell = memo(AppShellComponent);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.bgPrimary,
    ...Platform.select({
      web: {
        minHeight: '100vh',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      } as object,
    }),
  },
});
