import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { NeuroDriveProvider } from './src/context/NeuroDriveContext';
import { AppNavigator } from './src/navigation/AppNavigator';
import { WebGlobalStyles } from './src/components/WebGlobalStyles';
import { ErrorBoundary } from './src/components/ErrorBoundary';
import { colors } from './src/theme/colors';

if (Platform.OS === 'web') {
  enableScreens(false);
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const ready = Platform.OS === 'web' || fontsLoaded;

  if (!ready) {
    return (
      <View style={styles.loading}>
        <View style={styles.spinner} />
      </View>
    );
  }

  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <NeuroDriveProvider>
          <WebGlobalStyles />
          <StatusBar style="light" />
          <View style={styles.root}>
            <AppNavigator />
          </View>
        </NeuroDriveProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.bgPrimary,
    ...Platform.select({
      web: {
        minHeight: '100vh',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      } as object,
    }),
  },
  loading: {
    flex: 1,
    backgroundColor: colors.bgPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: { minHeight: '100vh' } as object,
    }),
  },
  spinner: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: colors.accentBlue,
    ...Platform.select({
      web: {
        borderTopColor: 'transparent',
        animationKeyframes: {
          spin: { from: { transform: [{ rotate: '0deg' }] }, to: { transform: [{ rotate: '360deg' }] } },
        },
        animationDuration: '0.8s',
        animationIterationCount: 'infinite',
      } as object,
    }),
  },
});
