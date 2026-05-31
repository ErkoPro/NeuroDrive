import { Platform } from 'react-native';

export const fontFamily = Platform.select({
  web: {
    regular: 'Inter',
    medium: 'Inter',
    semiBold: 'Inter',
    bold: 'Inter',
  },
  default: {
    regular: 'Inter_400Regular',
    medium: 'Inter_500Medium',
    semiBold: 'Inter_600SemiBold',
    bold: 'Inter_700Bold',
  },
})!;

export const fontWeight = {
  regular: Platform.OS === 'web' ? ('400' as const) : undefined,
  medium: Platform.OS === 'web' ? ('500' as const) : undefined,
  semiBold: Platform.OS === 'web' ? ('600' as const) : undefined,
  bold: Platform.OS === 'web' ? ('700' as const) : undefined,
};

export const typography = {
  display: { fontSize: 48, fontWeight: '700' as const, letterSpacing: -2 },
  h1: { fontSize: 28, fontWeight: '700' as const, letterSpacing: -0.5 },
  h2: { fontSize: 20, fontWeight: '600' as const },
  h3: { fontSize: 16, fontWeight: '600' as const },
  body: { fontSize: 14, fontWeight: '400' as const, lineHeight: 20 },
  caption: { fontSize: 12, fontWeight: '400' as const },
  mono: { fontSize: 14, fontWeight: '500' as const },
  score: { fontSize: 64, fontWeight: '700' as const, letterSpacing: -3 },
  metric: { fontSize: 28, fontWeight: '700' as const },
  timer: { fontSize: 32, fontWeight: '500' as const, letterSpacing: 1 },
};
