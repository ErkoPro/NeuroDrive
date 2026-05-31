import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNeuroDrive } from '../hooks/useNeuroDrive';
import { ScreenHeader } from '../components/ScreenHeader';
import { ScoreBadge } from '../components/ScoreBadge';
import { TrendChart } from '../components/charts/TrendChart';
import { GlassCard } from '../components/GlassCard';
import { DemoBadge } from '../components/DemoBadge';
import { FadeInView } from '../components/animations/FadeInView';
import { colors } from '../theme/colors';

export function AnalyticsScreen() {
  const { analytics } = useNeuroDrive();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
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
        <FadeInView delay={100}>
          <GlassCard style={styles.chartCard}>
            <TrendChart title="Пульс" data={analytics.heartRateTrend} color={colors.danger} unit="" />
          </GlassCard>
        </FadeInView>
        <FadeInView delay={150}>
          <GlassCard style={styles.chartCard}>
            <TrendChart title="Стресс" data={analytics.stressTrend} color={colors.warning} unit="%" />
          </GlassCard>
        </FadeInView>
        <FadeInView delay={200}>
          <GlassCard style={styles.chartCard}>
            <TrendChart title="Усталость" data={analytics.fatigueTrend} color={colors.accentLight} unit="%" />
          </GlassCard>
        </FadeInView>
        <FadeInView delay={250}>
          <GlassCard style={styles.chartCard}>
            <TrendChart title="Безопасность" data={analytics.safetyTrend} color={colors.safe} unit="" />
          </GlassCard>
        </FadeInView>

        <FadeInView delay={300}>
          <Text style={styles.sectionTitle}>AI Инсайты</Text>
          <GlassCard accent={colors.primary}>
            {analytics.insights.map((insight, i) => (
              <View key={i} style={[styles.insightRow, i > 0 && styles.insightBorder]}>
                <Ionicons name="bulb-outline" size={18} color={colors.primary} />
                <Text style={styles.insightText}>{insight}</Text>
              </View>
            ))}
          </GlassCard>
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
  scoreRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 28,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    marginTop: 8,
  },
  chartCard: {
    marginBottom: 12,
  },
  insightRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    paddingVertical: 10,
  },
  insightBorder: {
    borderTopWidth: 1,
    borderTopColor: colors.surfaceBorder,
  },
  insightText: {
    flex: 1,
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
});
