import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNeuroDrive } from '../hooks/useNeuroDrive';
import { ScreenHeader } from '../components/ScreenHeader';
import { SafetyScoreRing } from '../components/SafetyScoreRing';
import { MetricCard } from '../components/MetricCard';
import { GlassCard } from '../components/GlassCard';
import { DeviceStatusRow } from '../components/DeviceStatusRow';
import { AICoachCard } from '../components/AICoachCard';
import { DemoBadge, DemoModeBanner } from '../components/DemoBadge';
import { FadeInView } from '../components/animations/FadeInView';
import { colors } from '../theme/colors';

export function HomeScreen() {
  const { idleMetrics, deviceStatus, quickInsight, coachMessages } = useNeuroDrive();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topRow}>
          <ScreenHeader title="NeuroDrive" subtitle="Безопасность в реальном времени" />
          <DemoBadge />
        </View>

        <FadeInView delay={0}>
          <DemoModeBanner />
        </FadeInView>

        <FadeInView delay={100}>
          <View style={styles.scoreSection}>
            <SafetyScoreRing score={idleMetrics.neuroScore} label="Safety Score" />
          </View>
        </FadeInView>

        <FadeInView delay={200}>
          <View style={styles.metricsGrid}>
            <MetricCard
              icon="heart"
              label="Пульс"
              value={idleMetrics.heartRate}
              unit="уд/мин"
              color={colors.danger}
            />
            <MetricCard
              icon="flash"
              label="Стресс"
              value={idleMetrics.stressIndex}
              unit="%"
              color={colors.warning}
            />
            <MetricCard
              icon="moon"
              label="Усталость"
              value={idleMetrics.fatigueIndex}
              unit="%"
              color={colors.accentLight}
            />
            <MetricCard
              icon="eye"
              label="Концентрация"
              value={idleMetrics.focusLevel}
              unit="%"
              color={colors.safe}
            />
          </View>
        </FadeInView>

        <FadeInView delay={300}>
          <GlassCard style={styles.insightCard} accent={colors.primary}>
            <View style={styles.insightHeader}>
              <Ionicons name="analytics" size={20} color={colors.primary} />
              <Text style={styles.insightTitle}>Быстрый анализ</Text>
            </View>
            <Text style={styles.insightText}>{quickInsight}</Text>
          </GlassCard>
        </FadeInView>

        <FadeInView delay={400}>
          <Text style={styles.sectionTitle}>Подключённые устройства</Text>
          <GlassCard>
            <DeviceStatusRow
              icon="disc"
              label="Smart Wheel"
              connected={deviceStatus.smartWheel.connected}
              connectedLabel="Подключён"
            />
            <DeviceStatusRow
              icon="watch"
              label="Smart Watch"
              connected={deviceStatus.smartWatch.connected}
              connectedLabel="Подключён"
            />
            <DeviceStatusRow
              icon="phone-portrait"
              label="Датчики телефона"
              connected={deviceStatus.phoneSensors.active}
              connectedLabel="Активны"
            />
          </GlassCard>
        </FadeInView>

        <FadeInView delay={500}>
          <View style={styles.coachSection}>
            <AICoachCard messages={coachMessages} />
          </View>
        </FadeInView>
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
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  scoreSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  insightCard: {
    marginBottom: 24,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  insightTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  insightText: {
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 22,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  coachSection: {
    marginTop: 24,
  },
});
