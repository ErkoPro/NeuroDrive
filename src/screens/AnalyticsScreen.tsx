import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Lightbulb } from 'lucide-react-native';
import { useNeuroDrive } from '../hooks/useNeuroDrive';
import { ScreenHeader } from '../components/ScreenHeader';
import { ScoreBadge } from '../components/ScoreBadge';
import { TrendChart } from '../components/charts/TrendChart';
import { GlassCard } from '../components/GlassCard';
import { DemoBadge } from '../components/DemoBadge';
import { FadeInView } from '../components/animations/FadeInView';
import { colors } from '../theme/colors';
import { fontFamily, typography } from '../theme/typography';

export function AnalyticsScreen() {
  const { analytics } = useNeuroDrive();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topRow}>
          <ScreenHeader title="Аналитика" subtitle="Ваши показатели безопасности" />
          <DemoBadge />
        </View>

        <FadeInView delay={0}>
          <View style={styles.scoreRow}>
            <ScoreBadge label="За день" score={analytics.dailyScore} />
            <ScoreBadge label="За неделю" score={analytics.weeklyScore} />
            <ScoreBadge label="За месяц" score={analytics.monthlyScore} />
          </View>
        </FadeInView>

        <Text style={styles.sectionTitle}>Тренды</Text>
        {[
          { title: 'Пульс', data: analytics.heartRateTrend, color: colors.red, delay: 80 },
          { title: 'Стресс', data: analytics.stressTrend, color: colors.yellow, delay: 130, unit: '%' },
          { title: 'Усталость', data: analytics.fatigueTrend, color: colors.accentCyan, delay: 180, unit: '%' },
          { title: 'Безопасность', data: analytics.safetyTrend, color: colors.green, delay: 230 },
        ].map((chart) => (
          <FadeInView key={chart.title} delay={chart.delay}>
            <GlassCard style={styles.chartCard}>
              <TrendChart title={chart.title} data={chart.data} color={chart.color} unit={chart.unit ?? ''} />
            </GlassCard>
          </FadeInView>
        ))}

        <FadeInView delay={300}>
          <Text style={styles.sectionTitle}>AI Инсайты</Text>
          {analytics.insights.map((insight, i) => (
            <GlassCard key={i} leftAccent={colors.accentCyan} style={styles.insightCard}>
              <View style={styles.insightRow}>
                <Lightbulb size={16} color={colors.accentCyan} strokeWidth={2} />
                <Text style={styles.insightText}>{insight}</Text>
              </View>
            </GlassCard>
          ))}
        </FadeInView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bgPrimary },
  scroll: { flex: 1 },
  content: { padding: 20, paddingBottom: 32 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  scoreRow: { flexDirection: 'row', gap: 10, marginBottom: 28 },
  sectionTitle: { color: colors.textPrimary, fontSize: typography.h2.fontSize, fontFamily: fontFamily.bold, marginBottom: 12, marginTop: 8 },
  chartCard: { marginBottom: 12 },
  insightCard: { marginBottom: 10 },
  insightRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  insightText: { flex: 1, color: colors.textSecondary, fontSize: typography.body.fontSize, fontFamily: fontFamily.regular, lineHeight: 20 },
});
