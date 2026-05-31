import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useNeuroDrive } from '../context/NeuroDriveContext';
import { GlassCard } from '../components/GlassCard';
import { SafetyScoreRing } from '../components/SafetyScoreRing';
import { colors, getRiskLabel } from '../theme/colors';
import { formatDate, formatDuration } from '../simulation/engine';
import { RootStackParamList } from '../navigation/types';

type RouteProps = RouteProp<RootStackParamList, 'TripReport'>;

function ReportRow({ icon, label, value }: { icon: keyof typeof Ionicons.glyphMap; label: string; value: string }) {
  return (
    <View style={styles.row}>
      <View style={styles.rowLeft}>
        <Ionicons name={icon} size={18} color={colors.primary} />
        <Text style={styles.rowLabel}>{label}</Text>
      </View>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

export function TripReportScreen() {
  const route = useRoute<RouteProps>();
  const { getTripById } = useNeuroDrive();
  const trip = getTripById(route.params.tripId);

  if (!trip) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={styles.error}>Поездка не найдена</Text>
      </SafeAreaView>
    );
  }

  const riskColor =
    trip.riskLevel === 'low'
      ? colors.safe
      : trip.riskLevel === 'medium'
        ? colors.warning
        : colors.danger;

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.date}>{formatDate(trip.date)}</Text>

        <View style={styles.scoreSection}>
          <SafetyScoreRing score={trip.safetyScore} label="Safety Score" size={180} />
        </View>

        <View style={[styles.riskBadge, { backgroundColor: `${riskColor}20` }]}>
          <Text style={[styles.riskText, { color: riskColor }]}>
            Уровень риска: {getRiskLabel(trip.riskLevel)}
          </Text>
        </View>

        <GlassCard style={styles.detailsCard}>
          <ReportRow icon="time-outline" label="Длительность" value={formatDuration(trip.durationSeconds)} />
          <ReportRow icon="navigate-outline" label="Расстояние" value={`${trip.distanceKm} км`} />
          <ReportRow icon="heart-outline" label="Средний пульс" value={`${trip.avgHeartRate} уд/мин`} />
          <ReportRow icon="pulse-outline" label="Макс. пульс" value={`${trip.maxHeartRate} уд/мин`} />
          <ReportRow icon="flash-outline" label="Стресс" value={`${trip.stressScore}%`} />
          <ReportRow icon="moon-outline" label="Усталость" value={`${trip.fatigueScore}%`} />
        </GlassCard>

        <Text style={styles.sectionTitle}>AI Сводка</Text>
        <GlassCard accent={colors.primary}>
          <View style={styles.summaryHeader}>
            <Ionicons name="sparkles" size={20} color={colors.primary} />
            <Text style={styles.summaryTitle}>Анализ поездки</Text>
          </View>
          <Text style={styles.summaryText}>{trip.aiSummary}</Text>
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
  content: {
    padding: 20,
    paddingBottom: 32,
  },
  error: {
    color: colors.text,
    textAlign: 'center',
    marginTop: 40,
  },
  date: {
    color: colors.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 8,
  },
  scoreSection: {
    alignItems: 'center',
    marginVertical: 16,
  },
  riskBadge: {
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    marginBottom: 24,
  },
  riskText: {
    fontSize: 14,
    fontWeight: '600',
  },
  detailsCard: {
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceBorder,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  rowLabel: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  rowValue: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '600',
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  summaryTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  summaryText: {
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 22,
  },
});
