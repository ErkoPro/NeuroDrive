import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useNeuroDrive } from '../context/NeuroDriveContext';
import { ScreenHeader } from '../components/ScreenHeader';
import { GlassCard } from '../components/GlassCard';
import { AICoachCard } from '../components/AICoachCard';
import { DemoBadge } from '../components/DemoBadge';
import { colors } from '../theme/colors';
import { RootStackParamList } from '../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

export function ProfileScreen() {
  const { profile, coachMessages } = useNeuroDrive();
  const navigation = useNavigation<NavigationProp>();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topRow}>
          <ScreenHeader title="Профиль" subtitle="Ваши данные" />
          <DemoBadge />
        </View>

        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={40} color={colors.primary} />
          </View>
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.age}>{profile.age} лет</Text>
        </View>

        <Text style={styles.sectionTitle}>Информация</Text>
        <GlassCard>
          <InfoRow label="Тип водителя" value={profile.driverType} />
          <InfoRow label="Стаж вождения" value={profile.drivingExperience} />
        </GlassCard>

        <Text style={styles.sectionTitle}>Экстренный контакт</Text>
        <GlassCard accent={colors.danger}>
          <View style={styles.emergencyRow}>
            <Ionicons name="call" size={20} color={colors.danger} />
            <View>
              <Text style={styles.emergencyName}>{profile.emergencyContact.name}</Text>
              <Text style={styles.emergencyPhone}>{profile.emergencyContact.phone}</Text>
            </View>
          </View>
        </GlassCard>

        <TouchableOpacity
          onPress={() => navigation.navigate('Devices')}
          activeOpacity={0.7}
        >
          <GlassCard style={styles.deviceLink}>
            <View style={styles.deviceLinkRow}>
              <View style={styles.deviceLinkLeft}>
                <Ionicons name="hardware-chip" size={22} color={colors.primary} />
                <View>
                  <Text style={styles.deviceLinkTitle}>NeuroDrive Ecosystem</Text>
                  <Text style={styles.deviceLinkSub}>Устройства и датчики</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
            </View>
          </GlassCard>
        </TouchableOpacity>

        <View style={styles.coachSection}>
          <AICoachCard messages={coachMessages} />
        </View>
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
  avatarSection: {
    alignItems: 'center',
    marginVertical: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: `${colors.primary}20`,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: `${colors.primary}40`,
    marginBottom: 12,
  },
  name: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '700',
  },
  age: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: 4,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    marginTop: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceBorder,
  },
  infoLabel: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  infoValue: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  emergencyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  emergencyName: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  emergencyPhone: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: 2,
  },
  deviceLink: {
    marginTop: 20,
  },
  deviceLinkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  deviceLinkLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  deviceLinkTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  deviceLinkSub: {
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: 2,
  },
  coachSection: {
    marginTop: 24,
  },
});
