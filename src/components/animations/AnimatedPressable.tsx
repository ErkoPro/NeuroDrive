import React from 'react';
import { View, StyleSheet, Platform, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, gradients } from '../theme/colors';

interface ScalePressableProps {
  children: React.ReactNode;
  onPress: () => void;
  style?: object;
}

export function ScalePressable({ children, onPress, style }: ScalePressableProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [style, pressed && { opacity: 0.92, transform: [{ scale: 0.97 }] }]}
    >
      {children}
    </Pressable>
  );
}

interface PulseViewProps {
  children: React.ReactNode;
  style?: object;
}

export function PulseView({ children, style }: PulseViewProps) {
  return <View style={style}>{children}</View>;
}
