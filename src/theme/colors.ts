export const colors = {
  bgPrimary: '#050810',
  bgSecondary: '#0A0F1E',
  bgCard: '#0D1526',
  bgCardHover: '#111D35',

  accentBlue: '#0EA5E9',
  accentCyan: '#06B6D4',
  accentGlow: 'rgba(14, 165, 233, 0.15)',

  green: '#10B981',
  yellow: '#F59E0B',
  red: '#EF4444',

  textPrimary: '#F0F4FF',
  textSecondary: '#8B9CC8',
  textMuted: '#6B7FA8',

  border: 'rgba(255,255,255,0.06)',
  borderAccent: 'rgba(14, 165, 233, 0.3)',

  // Legacy aliases
  background: '#050810',
  backgroundSecondary: '#0A0F1E',
  surface: '#0D1526',
  surfaceBorder: 'rgba(255,255,255,0.06)',
  glass: '#0D1526',
  glassBorder: 'rgba(255,255,255,0.06)',

  primary: '#0EA5E9',
  primaryDark: '#0284C7',
  accent: '#06B6D4',
  accentLight: '#22D3EE',

  safe: '#10B981',
  safeGlow: 'rgba(16, 185, 129, 0.3)',
  warning: '#F59E0B',
  warningGlow: 'rgba(245, 158, 11, 0.3)',
  danger: '#EF4444',
  dangerGlow: 'rgba(239, 68, 68, 0.3)',

  text: '#F0F4FF',
  tabBar: 'rgba(5, 8, 16, 0.95)',
  tabBarBorder: 'rgba(255,255,255,0.06)',
};

export const gradients = {
  accent: ['#0EA5E9', '#06B6D4'] as const,
  accentSoft: ['rgba(6,182,212,0.08)', 'rgba(14,165,233,0.04)'] as const,
  scoreRing: ['#0EA5E9', '#06B6D4'] as const,
};

export function getScoreColor(score: number): string {
  if (score >= 80) return colors.green;
  if (score >= 50) return colors.yellow;
  return colors.red;
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

export function getScoreGlow(score: number): string {
  const c = getScoreColor(score);
  return `${c}40`;
}
