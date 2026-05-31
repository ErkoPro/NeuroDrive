import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNeuroDrive } from '../context/NeuroDriveContext';
import { GlassCard } from '../components/GlassCard';
import { DemoBadge } from '../components/DemoBadge';
import { colors } from '../theme/colors';
import { formatTime } from '../simulation/engine';

function DeviceMetric({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <View style={styles.metric}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={[styles.metricValue, color ? { color } : undefined]}>{value}</Text>
    </View>
  );
}

function BatteryBar({ level }: { level: number }) {
  const color = level > 50 ? colors.safe : level > 20 ? colors.warning : colors.danger;
  return (
    <View style={styles.batteryContainer}>
      <View style={styles.batteryTrack}>
        <View style={[styles.batteryFill, { width: `${level}%`, backgroundColor: color }]} />
      </View>
      <Text style={[styles.batteryText, { color }]}>{level}%</Text>
    </View>
  );
}

export function DevicesScreen() {
  const { deviceStatus } = useNeuroDrive();
  const { smartWheel, smartWatch, phoneSensors } = deviceStatus;

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.demoRow}>
          <DemoBadge />
        </View>

        <Text style={styles.sectionTitle}>Smart Wheel</Text>
        <GlassCard accent={colors.primary}>
          <View style={styles.deviceHeader}>
            <Ionicons name="disc" size={28} color={colors.primary} />
            <View>
              <Text style={styles.deviceName}>NeuroDrive Smart Wheel</Text>
              <Text style={[styles.status, { color: colors.safe }]}>
                {smartWheel.connected ? 'Подключено' : 'Отключено'}
              </Text>
            </View>
          </View>
          <View style={styles.metricsGrid}>
            <DeviceMetric label="Батарея" value={`${smartWheel.battery}%`} />
            <DeviceMetric
              label="Здоровье датчиков"
              value={`${smartWheel.sensorHealth}%`}
              color={colors.safe}
            />
          </View>
          <BatteryBar level={smartWheel.battery} />
        </GlassCard>

        <Text style={styles.sectionTitle}>Smart Watch</Text>
        <GlassCard accent={colors.accent}>
          <View style={styles.deviceHeader}>
            <Ionicons name="watch" size={28} color={colors.accentLight} />
            <View>
              <Text style={styles.deviceName}>{smartWatch.name}</Text>
              <Text style={[styles.status, { color: colors.safe }]}>
                {smartWatch.connected ? 'Подключено' : 'Отключено'}
              </Text>
            </View>
          </View>
          <View style={styles.metricsGrid}>
            <DeviceMetric label="Батарея" value={`${smartWatch.battery}%`} />
            <DeviceMetric
              label="Последняя синхр."
              value={formatTime(smartWatch.lastSync)}
            />
          </View>
          <BatteryBar level={smartWatch.battery} />
        </GlassCard>

        <Text style={styles.sectionTitle}>Датчики телефона</Text>
        <GlassCard>
          <View style={styles.sensorRow}>
            <Ionicons
              name="location"
              size={20}
              color={phoneSensors.gps ? colors.safe : colors.danger}
            />
            <Text style={styles.sensorLabel}>GPS</Text>
            <Text style={[styles.sensorStatus, { color: phoneSensors.gps ? colors.safe : colors.danger }]}>
              {phoneSensors.gps ? 'Активен' : 'Неактивен'}
            </Text>
          </View>
          <View style={styles.sensorRow}>
            <Ionicons
              name="speedometer"
              size={20}
              color={phoneSensors.accelerometer ? colors.safe : colors.danger}
            />
            <Text style={styles.sensorLabel}>Аксelerометр</Text>
            <Text
              style={[
                styles.sensorStatus,
                { color: phoneSensors.accelerometer ? colors.safe : colors.danger },
              ]}
            >
              {phoneSensors.accelerometer ? 'Активен' : 'Неактивен'}
            </Text>
          </View>
          <View style={[styles.sensorRow, styles.lastRow]}>
            <Ionicons
              name="phone-portrait"
              size={20}
              color={phoneSensors.active ? colors.safe : colors.danger}
            />
            <Text style={styles.sensorLabel}>Общий статус</Text>
            <Text style={[styles.sensorStatus, { color: phoneSensors.active ? colors.safe : colors.danger }]}>
              {phoneSensors.active ? 'Активен' : 'Неактивен'}
            </Text>
          </View>
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
  demoRow: {
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    marginTop: 16,
  },
  deviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 16,
  },
  deviceName: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  status: {
    fontSize: 13,
    fontWeight: '500',
    marginTop: 2,
  },
  metricsGrid: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 12,
  },
  metric: {
    flex: 1,
  },
  metricLabel: {
    color: colors.textMuted,
    fontSize: 12,
    marginBottom: 4,
  },
  metricValue: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  batteryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 4,
  },
  batteryTrack: {
    flex: 1,
    height: 6,
    backgroundColor: colors.surface,
    borderRadius: 3,
    overflow: 'hidden',
  },
  batteryFill: {
    height: '100%',
    borderRadius: 3,
  },
  batteryText: {
    fontSize: 13,
    fontWeight: '600',
    width: 40,
    textAlign: 'right',
  },
  sensorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceBorder,
    gap: 12,
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  sensorLabel: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
  },
  sensorStatus: {
    fontSize: 13,
    fontWeight: '600',
  },
});
