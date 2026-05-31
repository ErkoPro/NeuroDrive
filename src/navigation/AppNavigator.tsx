import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { HomeScreen } from '../screens/HomeScreen';
import { DriveModeScreen } from '../screens/DriveModeScreen';
import { AnalyticsScreen } from '../screens/AnalyticsScreen';
import { HistoryScreen } from '../screens/HistoryScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { TripReportScreen } from '../screens/TripReportScreen';
import { DevicesScreen } from '../screens/DevicesScreen';
import { CustomTabBar } from './CustomTabBar';
import { colors } from '../theme/colors';
import { fontFamily } from '../theme/typography';
import { MainTabParamList, RootStackParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();
const Stack = createStackNavigator<RootStackParamList>();

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
    <View style={styles.navRoot}>
      <NavigationContainer theme={navTheme}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.bgSecondary },
          headerTintColor: colors.textPrimary,
          headerTitleStyle: { fontFamily: fontFamily.bold, fontWeight: '700' },
          cardStyle: styles.stackContent,
        }}
      >
        <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen name="TripReport" component={TripReportScreen} options={{ title: 'Отчёт о поездке' }} />
        <Stack.Screen name="Devices" component={DevicesScreen} options={{ title: 'NeuroDrive Ecosystem' }} />
      </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  navRoot: {
    flex: 1,
    width: '100%',
    ...Platform.select({
      web: { minHeight: '100vh', display: 'flex', flexDirection: 'column' } as object,
    }),
  },
  scene: {
    flex: 1,
    backgroundColor: colors.bgPrimary,
    ...Platform.select({
      web: { minHeight: 0 } as object,
    }),
  },
  stackContent: {
    flex: 1,
    backgroundColor: colors.bgPrimary,
  },
});
