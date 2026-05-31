export const colors = {
  background: '#0A0E17',
  backgroundSecondary: '#111827',
  surface: 'rgba(255, 255, 255, 0.06)',
  surfaceBorder: 'rgba(255, 255, 255, 0.1)',
  glass: 'rgba(255, 255, 255, 0.08)',
  glassBorder: 'rgba(255, 255, 255, 0.12)',

  primary: '#00D4FF',
  primaryDark: '#0099CC',
  accent: '#3B82F6',
  accentLight: '#60A5FA',

  safe: '#22C55E',
  safeGlow: 'rgba(34, 197, 94, 0.3)',
  warning: '#EAB308',
  warningGlow: 'rgba(234, 179, 8, 0.3)',
  danger: '#EF4444',
  dangerGlow: 'rgba(239, 68, 68, 0.3)',

  text: '#F8FAFC',
  textSecondary: '#94A3B8',
  textMuted: '#64748B',

  tabBar: 'rgba(10, 14, 23, 0.95)',
  tabBarBorder: 'rgba(255, 255, 255, 0.08)',
};

export function getScoreColor(score: number): string {
  if (score >= 80) return colors.safe;
  if (score >= 50) return colors.warning;
  return colors.danger;
}

export function getScoreLabel(score: number): string {
  if (score >= 80) return 'Безопасно';
  if (score >= 50) return 'Внимание';
  return 'Опасно';
}

export function getRiskLevel(score: number): 'low' | 'medium' | 'high' {
  if (score >= 80) return 'low';
  if (score >= 50) return 'medium';
  return 'high';
}

export function getRiskLabel(level: 'low' | 'medium' | 'high'): string {
  switch (level) {
    case 'low':
      return 'Низкий';
    case 'medium':
      return 'Средний';
    case 'high':
      return 'Высокий';
  }
}
