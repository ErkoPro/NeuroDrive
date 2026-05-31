import React from 'react';
import { View, ViewStyle } from 'react-native';

interface FadeInViewProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  style?: ViewStyle;
  slideUp?: number;
}

export function FadeInView({ children, style }: FadeInViewProps) {
  return <View style={style}>{children}</View>;
}
