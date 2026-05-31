import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNeuroDrive, formatDuration } from '../hooks/useNeuroDrive';
import { ScreenHeader } from '../components/ScreenHeader';
import { SafetyScoreRing } from '../components/SafetyScoreRing';
import { MetricCard } from '../components/MetricCard';
import { GlassCard } from '../components/GlassCard';
import { AlertBanner } from '../components/AlertBanner';
import { DemoBadge } from '../components/DemoBadge';
import { ScalePressable } from '../components/animations/AnimatedPressable';
import { PulseView } from '../components/animations/PulseView';
import { FadeInView } from '../components/animations/FadeInView';
import { colors } from '../theme/colors';

export function DriveModeScreen() {
  const {
    isTripActive,
    liveMetrics,
    currentAlert,
    aiAnalysis,
    startTrip,
    stopTrip,
  } = useNeuroDrive();

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
              <LinearGradient
                colors={[`${colors.primary}40`, `${colors.accent}20`]}
                style={styles.iconGradient}
              >
                <Ionicons name="car-sport" size={64} color={colors.primary} />
              </LinearGradient>
            </View>
            <Text style={styles.startTitle}>Готовы к поездке?</Text>
            <Text style={styles.startDesc}>
              NeuroDrive будет отслеживать ваше состояние в реальном времени с помощью Smart Wheel,
              Smart Watch и датчиков телефона.
            </Text>

            <ScalePressable onPress={startTrip} style={styles.startButtonWrap}>
              <LinearGradient
                colors={[colors.primary, colors.accent]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.startButton}
              >
                <Ionicons name="play" size={28} color="#fff" />
                <Text style={styles.startButtonText}>НАЧАТЬ ПОЕЗДКУ</Text>
              </LinearGradient>
            </ScalePressable>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.liveHeader}>
          <View style={styles.liveIndicator}>
            <PulseView>
              <View style={styles.liveDot} />
            </PulseView>
            <Text style={styles.liveText}>LIVE</Text>
          </View>
          <TouchableOpacity onPress={stopTrip} style={styles.stopButton}>
            <Ionicons name="stop-circle" size={20} color={colors.danger} />
            <Text style={styles.stopText}>Завершить</Text>
          </TouchableOpacity>
        </View>

        <FadeInView delay={0}>
          <View style={styles.scoreSection}>
            <SafetyScoreRing score={liveMetrics.neuroScore} label="NeuroScore" size={200} />
          </View>
        </FadeInView>

        <View style={styles.durationRow}>
          <Ionicons name="time-outline" size={18} color={colors.textSecondary} />
          <Text style={styles.durationText}>
            {formatDuration(liveMetrics.drivingDurationSeconds)}
          </Text>
        </View>

        <View style={styles.metricsGrid}>
          <MetricCard
            icon="heart"
            label="Пульс"
            value={liveMetrics.heartRate}
            unit="уд/мин"
            color={colors.danger}
          />
          <MetricCard
            icon="pulse"
            label="HRV"
            value={liveMetrics.hrv}
            unit="мс"
            color={colors.primary}
          />
          <MetricCard
            icon="flash"
            label="Стресс"
            value={liveMetrics.stressIndex}
            unit="%"
            color={colors.warning}
          />
          <MetricCard
            icon="moon"
            label="Усталость"
            value={liveMetrics.fatigueIndex}
            unit="%"
            color={colors.accentLight}
          />
        </View>

        {currentAlert && (
          <View style={styles.alertSection}>
            <AlertBanner level={currentAlert.level} message={currentAlert.message} />
          </View>
        )}

        <GlassCard accent={colors.primary} style={styles.analysisCard}>
          <View style={styles.analysisHeader}>
            <Ionicons name="sparkles" size={20} color={colors.primary} />
            <Text style={styles.analysisTitle}>AI Анализ</Text>
          </View>
          <Text style={styles.analysisText}>{aiAnalysis}</Text>
        </GlassCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 32,
  },
  startContainer: {
    flex: 1,
    padding: 20,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  startContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 60,
  },
  iconCircle: {
    marginBottom: 32,
  },
  iconGradient: {
    width: 140,
    height: 140,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: `${colors.primary}30`,
  },
  startTitle: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
  },
  startDesc: {
    color: colors.textSecondary,
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  startButtonWrap: {
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 20,
    borderRadius: 20,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 1,
  },
  liveHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: `${colors.danger}20`,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.danger,
  },
  liveText: {
    color: colors.danger,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
  },
  stopButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: `${colors.danger}15`,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: `${colors.danger}30`,
  },
  stopText: {
    color: colors.danger,
    fontSize: 14,
    fontWeight: '600',
  },
  scoreSection: {
    alignItems: 'center',
    marginVertical: 12,
  },
  durationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 20,
  },
  durationText: {
    color: colors.textSecondary,
    fontSize: 16,
    fontWeight: '500',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  alertSection: {
    marginBottom: 16,
  },
  analysisCard: {
    marginTop: 4,
  },
  analysisHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  analysisTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  analysisText: {
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 22,
  },
});
