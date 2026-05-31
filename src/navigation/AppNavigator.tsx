import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { HomeScreen } from '../screens/HomeScreen';
import { DriveModeScreen } from '../screens/DriveModeScreen';
import { AnalyticsScreen } from '../screens/AnalyticsScreen';
import { HistoryScreen } from '../screens/HistoryScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { TripReportScreen } from '../screens/TripReportScreen';
import { DevicesScreen } from '../screens/DevicesScreen';
import { CustomTabBar } from './CustomTabBar';
import { AppShell } from '../components/AppShell';
import { colors } from '../theme/colors';
import { fontFamily } from '../theme/typography';
import { MainTabParamList, RootStackParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const navTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.accentBlue,
    background: colors.bgPrimary,
    card: colors.bgSecondary,
    text: colors.textPrimary,
    border: colors.border,
    notification: colors.red,
  },
};

function MainTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        sceneStyle: styles.scene,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Drive" component={DriveModeScreen} />
      <Tab.Screen name="Analytics" component={AnalyticsScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  return (
    <AppShell>
      <NavigationContainer theme={navTheme}>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: colors.bgSecondary },
            headerTintColor: colors.textPrimary,
            headerTitleStyle: { fontFamily: fontFamily.bold, fontWeight: '700' },
            contentStyle: styles.stackContent,
            animation: 'fade',
          }}
        >
          <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
          <Stack.Screen name="TripReport" component={TripReportScreen} options={{ title: 'Отчёт о поездке' }} />
          <Stack.Screen name="Devices" component={DevicesScreen} options={{ title: 'NeuroDrive Ecosystem' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    backgroundColor: colors.bgPrimary,
  },
  stackContent: {
    flex: 1,
    backgroundColor: colors.bgPrimary,
  },
  navRoot: {
    flex: 1,
    height: '100%',
    ...Platform.select({
      web: { minHeight: '100vh' } as object,
    }),
  },
});
