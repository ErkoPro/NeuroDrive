import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Car, Play, Square, Heart, Activity, Brain, Sparkles, Clock } from 'lucide-react-native';
import { useNeuroDrive, formatDuration } from '../hooks/useNeuroDrive';
import { ScreenHeader } from '../components/ScreenHeader';
import { SafetyScoreRing } from '../components/SafetyScoreRing';
import { MetricCard } from '../components/MetricCard';
import { GlassCard } from '../components/GlassCard';
import { AlertBanner } from '../components/AlertBanner';
import { DemoBadge } from '../components/DemoBadge';
import { ScalePressable, PulseView } from '../components/animations/AnimatedPressable';
import { FadeInView } from '../components/animations/FadeInView';
import { colors, getScoreColor } from '../theme/colors';
import { fontFamily, typography } from '../theme/typography';

export function DriveModeScreen() {
  const { isTripActive, liveMetrics, currentAlert, aiAnalysis, startTrip, stopTrip } = useNeuroDrive();

  if (!isTripActive) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.startContainer}>
          <View style={styles.topRow}>
            <ScreenHeader title="Поездка" subtitle="Режим мониторинга" />
            <DemoBadge />
          </View>
          <View style={styles.startContent}>
            <View style={styles.iconCircle}>
              <LinearGradient colors={['rgba(14,165,233,0.15)', 'rgba(6,182,212,0.05)']} style={styles.iconGradient}>
                <Car size={56} color={colors.accentBlue} strokeWidth={1.5} />
              </LinearGradient>
            </View>
            <Text style={styles.startTitle}>Готовы к поездке?</Text>
            <Text style={styles.startDesc}>
              NeuroDrive отслеживает ваше состояние в реальном времени через Smart Wheel, Smart Watch и датчики телефона.
            </Text>
            <ScalePressable onPress={startTrip} style={styles.startButtonWrap}>
              <LinearGradient colors={['#0EA5E9', '#06B6D4']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.startButton}>
                <Play size={24} color="#fff" fill="#fff" strokeWidth={0} />
                <Text style={styles.startButtonText}>НАЧАТЬ ПОЕЗДКУ</Text>
              </LinearGradient>
            </ScalePressable>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  const analysisColor = currentAlert
    ? currentAlert.level === 'yellow'
      ? colors.yellow
      : colors.red
    : colors.green;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.liveHeader}>
          <View style={styles.liveIndicator}>
            <PulseView><View style={styles.liveDot} /></PulseView>
            <Text style={styles.liveText}>LIVE</Text>
          </View>
          <TouchableOpacity onPress={stopTrip} style={styles.stopButton}>
            <Square size={16} color={colors.red} fill={colors.red} />
            <Text style={styles.stopText}>Завершить</Text>
          </TouchableOpacity>
        </View>

        <FadeInView delay={0}>
          <View style={styles.scoreSection}>
            <SafetyScoreRing score={liveMetrics.neuroScore} label="NEUROSCORE" size={200} />
          </View>
        </FadeInView>

        <View style={styles.timerRow}>
          <Clock size={18} color={colors.textSecondary} strokeWidth={2} />
          <Text style={styles.timerText}>{formatDuration(liveMetrics.drivingDurationSeconds)}</Text>
        </View>

        <View style={styles.metricsGrid}>
          <MetricCard icon={Heart} label="Пульс" value={liveMetrics.heartRate} unit="уд/мин" color={colors.red} pulse />
          <MetricCard icon={Activity} label="HRV" value={liveMetrics.hrv} unit="мс" color={colors.accentBlue} />
          <MetricCard icon={Brain} label="Стресс" value={liveMetrics.stressIndex} unit="%" color={colors.yellow} />
          <MetricCard icon={Activity} label="Усталость" value={liveMetrics.fatigueIndex} unit="%" color={colors.accentCyan} />
        </View>

        {currentAlert && (
          <View style={styles.alertSection}>
            <AlertBanner level={currentAlert.level} message={currentAlert.message} />
          </View>
        )}

        <GlassCard leftAccent={analysisColor} style={styles.analysisCard}>
          <View style={styles.analysisHeader}>
            <Sparkles size={18} color={colors.accentCyan} strokeWidth={2} />
            <Text style={styles.analysisTitle}>AI Анализ</Text>
          </View>
          <Text style={styles.analysisText}>{aiAnalysis}</Text>
        </GlassCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bgPrimary },
  scroll: { flex: 1 },
  content: { padding: 20, paddingBottom: 32 },
  startContainer: { flex: 1, padding: 20 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  startContent: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 60 },
  iconCircle: { marginBottom: 32 },
  iconGradient: {
    width: 140,
    height: 140,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.borderAccent,
  },
  startTitle: { color: colors.textPrimary, fontSize: 24, fontFamily: fontFamily.bold, marginBottom: 12 },
  startDesc: {
    color: colors.textSecondary,
    fontSize: typography.body.fontSize,
    fontFamily: fontFamily.regular,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  startButtonWrap: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    ...Platform.select({
      web: { boxShadow: '0 8px 32px rgba(14,165,233,0.4)' } as object,
    }),
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    height: 60,
    borderRadius: 16,
  },
  startButtonText: { color: '#fff', fontSize: 16, fontFamily: fontFamily.bold, letterSpacing: 1 },
  liveHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(239,68,68,0.12)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.red },
  liveText: { color: colors.red, fontSize: 11, fontFamily: fontFamily.bold, letterSpacing: 1 },
  stopButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(239,68,68,0.1)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(239,68,68,0.25)',
  },
  stopText: { color: colors.red, fontSize: 14, fontFamily: fontFamily.semiBold },
  scoreSection: { alignItems: 'center', marginVertical: 12 },
  timerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 20 },
  timerText: { color: colors.textPrimary, fontSize: typography.timer.fontSize, fontFamily: fontFamily.medium, letterSpacing: 1 },
  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 20 },
  alertSection: { marginBottom: 16 },
  analysisCard: { marginTop: 4 },
  analysisHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  analysisTitle: { color: colors.textPrimary, fontSize: typography.h3.fontSize, fontFamily: fontFamily.semiBold },
  analysisText: { color: colors.textSecondary, fontSize: typography.body.fontSize, fontFamily: fontFamily.regular, lineHeight: 22 },
});
