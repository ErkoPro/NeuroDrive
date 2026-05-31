import React, { memo, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  Easing,
} from 'react-native-reanimated';
import { colors, getScoreColor, getScoreLabel, gradients } from '../theme/colors';
import { fontFamily, typography } from '../theme/typography';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

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
  const progress = useSharedValue(0);
  const rotation = useSharedValue(0);
  const [shownScore, setShownScore] = useState(0);

  useEffect(() => {
    progress.value = withTiming(score / 100, { duration: 1400, easing: Easing.out(Easing.cubic) });
    rotation.value = withRepeat(withTiming(360, { duration: 20000, easing: Easing.linear }), -1, false);

    let start = 0;
    const step = score / 60;
    const interval = setInterval(() => {
      start += step;
      if (start >= score) {
        setShownScore(score);
        clearInterval(interval);
      } else {
        setShownScore(Math.round(start));
      }
    }, 23);
    return () => clearInterval(interval);
  }, [score, progress, rotation]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * (1 - progress.value),
  }));

  const ringStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View style={[styles.glow, { shadowColor: scoreColor, width: size, height: size, borderRadius: size / 2 }]} />
      <Animated.View style={[styles.ringWrap, { width: size, height: size }, ringStyle]}>
        <Svg width={size} height={size}>
          <Circle cx={size / 2} cy={size / 2} r={radius} stroke="rgba(14,165,233,0.15)" strokeWidth={2} fill="none" />
        </Svg>
      </Animated.View>
      <Svg width={size} height={size} style={StyleSheet.absoluteFill}>
        <Defs>
          <SvgGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor={gradients.scoreRing[0]} />
            <Stop offset="1" stopColor={gradients.scoreRing[1]} />
          </SvgGradient>
        </Defs>
        <Circle cx={size / 2} cy={size / 2} r={radius} stroke="rgba(255,255,255,0.05)" strokeWidth={strokeWidth} fill="none" />
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#ringGrad)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
          animatedProps={animatedProps}
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
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 8,
  },
  ringWrap: {
    position: 'absolute',
    opacity: 0.4,
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
