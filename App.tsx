import 'react-native-reanimated';
import React from 'react';
import { View, ActivityIndicator, StyleSheet, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { NeuroDriveProvider } from './src/context/NeuroDriveContext';
import { AppNavigator } from './src/navigation/AppNavigator';
import { WebGlobalStyles } from './src/components/WebGlobalStyles';
import { colors } from './src/theme/colors';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.accentBlue} />
      </View>
    );
  }

  return (
    <SafeAreaProvider style={styles.root}>
      <NeuroDriveProvider>
        <WebGlobalStyles />
        <StatusBar style="light" />
        <View style={styles.root}>
          <AppNavigator />
        </View>
      </NeuroDriveProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: colors.bgPrimary,
    ...Platform.select({
      web: { minHeight: '100vh' } as object,
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
});
