import React, { memo, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Svg, { Circle, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';
import { colors, getScoreColor, getScoreLabel, gradients } from '../theme/colors';
import { fontFamily, typography } from '../theme/typography';

interface SafetyScoreRingProps {
  score: number;
  size?: number;
  label?: string;
}

function SafetyScoreRingComponent({ score, size = 200, label = 'SAFETY SCORE' }: SafetyScoreRingProps) {
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const scoreColor = getScoreColor(score);
  const progress = (score / 100) * circumference;
  const [shownScore, setShownScore] = useState(0);

  useEffect(() => {
    let start = 0;
    const step = Math.max(score / 40, 1);
    const interval = setInterval(() => {
      start += step;
      if (start >= score) {
        setShownScore(score);
        clearInterval(interval);
      } else {
        setShownScore(Math.round(start));
      }
    }, 30);
    return () => clearInterval(interval);
  }, [score]);

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View style={[styles.glow, { shadowColor: scoreColor, width: size, height: size, borderRadius: size / 2 }]} />
      <Svg width={size} height={size}>
        <Defs>
          <SvgGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor={gradients.scoreRing[0]} />
            <Stop offset="1" stopColor={gradients.scoreRing[1]} />
          </SvgGradient>
        </Defs>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255,255,0.05)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#ringGrad)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${progress} ${circumference}`}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      <View style={[styles.inner, { width: size - 40, height: size - 40, borderRadius: (size - 40) / 2 }]}>
        <Text style={styles.label}>{label}</Text>
        <Text style={[styles.score, { color: scoreColor }]}>{shownScore}</Text>
        <Text style={[styles.status, { color: scoreColor }]}>{getScoreLabel(score)}</Text>
      </View>
    </View>
  );
}

export const SafetyScoreRing = memo(SafetyScoreRingComponent);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  glow: {
    position: 'absolute',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 8,
  },
  inner: {
    position: 'absolute',
    backgroundColor: colors.bgSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: colors.textSecondary,
    fontSize: 11,
    fontFamily: fontFamily.medium,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  score: {
    fontSize: typography.score.fontSize,
    fontFamily: fontFamily.bold,
    letterSpacing: -3,
  },
  status: {
    fontSize: typography.caption.fontSize,
    fontFamily: fontFamily.semiBold,
    marginTop: 2,
  },
});
