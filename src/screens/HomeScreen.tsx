import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Activity, Brain, Eye, Heart, CircleDot, Watch, Smartphone } from 'lucide-react-native';
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
import { fontFamily, typography } from '../theme/typography';

export function HomeScreen() {
  const { idleMetrics, deviceStatus, quickInsight, coachMessages } = useNeuroDrive();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topRow}>
          <ScreenHeader title="NeuroDrive" subtitle="Безопасность в реальном времени" gradient />
          <DemoBadge />
        </View>

        <FadeInView delay={0}><DemoModeBanner /></FadeInView>

        <FadeInView delay={80}>
          <View style={styles.scoreSection}>
            <SafetyScoreRing score={idleMetrics.neuroScore} label="SAFETY SCORE" />
          </View>
        </FadeInView>

        <FadeInView delay={160}>
          <View style={styles.metricsGrid}>
            <MetricCard icon={Heart} label="Пульс" value={idleMetrics.heartRate} unit="уд/мин" color={colors.red} />
            <MetricCard icon={Activity} label="Стресс" value={idleMetrics.stressIndex} unit="%" color={colors.yellow} />
            <MetricCard icon={Brain} label="Усталость" value={idleMetrics.fatigueIndex} unit="%" color={colors.accentCyan} />
            <MetricCard icon={Eye} label="Концентрация" value={idleMetrics.focusLevel} unit="%" color={colors.green} />
          </View>
        </FadeInView>

        <FadeInView delay={240}>
          <GlassCard gradient leftAccent={colors.accentCyan} style={styles.insightCard}>
            <View style={styles.insightHeader}>
              <Activity size={18} color={colors.accentCyan} strokeWidth={2.5} />
              <Text style={styles.insightTitle}>Быстрый анализ</Text>
            </View>
            <Text style={styles.insightText}>{quickInsight}</Text>
          </GlassCard>
        </FadeInView>

        <FadeInView delay={320}>
          <Text style={styles.sectionTitle}>Подключённые устройства</Text>
          <GlassCard>
            <DeviceStatusRow icon={CircleDot} label="Smart Wheel" connected={deviceStatus.smartWheel.connected} connectedLabel="Подключён" />
            <DeviceStatusRow icon={Watch} label="Smart Watch" connected={deviceStatus.smartWatch.connected} connectedLabel="Подключён" />
            <DeviceStatusRow icon={Smartphone} label="Датчики телефона" connected={deviceStatus.phoneSensors.active} connectedLabel="Активны" />
          </GlassCard>
        </FadeInView>

        <FadeInView delay={400}>
          <View style={styles.coachSection}><AICoachCard messages={coachMessages} /></View>
        </FadeInView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: 'transparent' },
  scroll: { flex: 1 },
  content: { padding: 20, paddingBottom: 32 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  scoreSection: { alignItems: 'center', marginVertical: 24 },
  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 20 },
  insightCard: { marginBottom: 24 },
  insightHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  insightTitle: { color: colors.textPrimary, fontSize: typography.h3.fontSize, fontFamily: fontFamily.semiBold },
  insightText: { color: colors.textSecondary, fontSize: typography.body.fontSize, fontFamily: fontFamily.regular, lineHeight: 22 },
  sectionTitle: { color: colors.textPrimary, fontSize: typography.h2.fontSize, fontFamily: fontFamily.bold, marginBottom: 12 },
  coachSection: { marginTop: 24 },
});
