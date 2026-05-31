import React, { memo } from 'react';
import { View, Text, StyleSheet, Platform, Pressable } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Home, Car, BarChart3, Clock, User } from 'lucide-react-native';
import { colors } from '../theme/colors';
import { fontFamily } from '../theme/typography';

const TAB_CONFIG: Record<string, { label: string; Icon: typeof Home }> = {
  Home: { label: 'Главная', Icon: Home },
  Drive: { label: 'Поездка', Icon: Car },
  Analytics: { label: 'Аналитика', Icon: BarChart3 },
  History: { label: 'История', Icon: Clock },
  Profile: { label: 'Профиль', Icon: User },
};

function CustomTabBarComponent({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, 12) }]}>
      <View style={styles.inner}>
        {state.routes.map((route, index) => {
          const focused = state.index === index;
          const config = TAB_CONFIG[route.name];
          if (!config) return null;
          const { Icon, label } = config;

          return (
            <Pressable
              key={route.key}
              onPress={() => navigation.navigate(route.name)}
              style={[styles.tab, focused && styles.tabActive]}
            >
              {focused && <View style={styles.glowDot} />}
              <Icon size={22} color={focused ? colors.accentCyan : colors.textSecondary} strokeWidth={focused ? 2.5 : 2} />
              <Text style={focused ? styles.labelActive : styles.labelInactive}>{label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export const CustomTabBar = memo(CustomTabBarComponent);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.tabBar,
    borderTopWidth: 1,
    borderTopColor: colors.tabBarBorder,
    ...Platform.select({ web: { backdropFilter: 'blur(30px)' } as object }),
  },
  inner: {
    flexDirection: 'row',
    height: 72,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 8,
    borderRadius: 999,
  },
  tabActive: { backgroundColor: colors.accentGlow },
  glowDot: {
    position: 'absolute',
    top: 4,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.accentCyan,
  },
  labelInactive: { color: colors.textSecondary, fontSize: 11, fontFamily: fontFamily.medium },
  labelActive: { color: colors.accentCyan, fontSize: 11, fontFamily: fontFamily.semiBold },
});
