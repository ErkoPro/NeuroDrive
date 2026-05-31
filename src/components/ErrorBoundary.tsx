import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import { colors } from '../theme/colors';

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('NeuroDrive crash:', error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>NeuroDrive — ошибка загрузки</Text>
          <ScrollView style={styles.scroll}>
            <Text style={styles.message}>{this.state.error.message}</Text>
            {Platform.OS === 'web' && this.state.error.stack && (
              <Text style={styles.stack}>{this.state.error.stack}</Text>
            )}
          </ScrollView>
        </View>
      );
    }
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgPrimary,
    padding: 24,
    ...Platform.select({ web: { minHeight: '100vh' } as object }),
  },
  title: {
    color: colors.red,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  scroll: { flex: 1 },
  message: {
    color: colors.textPrimary,
    fontSize: 14,
    marginBottom: 16,
  },
  stack: {
    color: colors.textSecondary,
    fontSize: 11,
    fontFamily: Platform.OS === 'web' ? 'monospace' : undefined,
  },
});
