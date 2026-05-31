import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronRight, Phone, User, Cpu } from 'lucide-react-native';
import { useNeuroDrive } from '../hooks/useNeuroDrive';
import { ScreenHeader } from '../components/ScreenHeader';
import { GlassCard } from '../components/GlassCard';
import { AICoachCard } from '../components/AICoachCard';
import { DemoBadge } from '../components/DemoBadge';
import { FadeInView } from '../components/animations/FadeInView';
import { colors, gradients } from '../theme/colors';
import { fontFamily, typography } from '../theme/typography';
import { RootStackParamList } from '../navigation/types';

type NavigationProp = StackNavigationProp<RootStackParamList>;

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
  const initials = profile.name.split(' ').map((n) => n[0]).join('').slice(0, 2);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topRow}>
          <ScreenHeader title="Профиль" subtitle="Ваши данные" />
          <DemoBadge />
        </View>

        <FadeInView delay={0}>
          <View style={styles.avatarSection}>
            <LinearGradient colors={[...gradients.accent]} style={styles.avatarBorder}>
              <View style={styles.avatar}>
                <Text style={styles.initials}>{initials}</Text>
              </View>
            </LinearGradient>
            <Text style={styles.name}>{profile.name}</Text>
            <Text style={styles.age}>{profile.age} лет</Text>
          </View>
        </FadeInView>

        <FadeInView delay={80}>
          <Text style={styles.sectionTitle}>Информация</Text>
          <GlassCard>
            <InfoRow label="Тип водителя" value={profile.driverType} />
            <InfoRow label="Стаж вождения" value={profile.drivingExperience} />
          </GlassCard>
        </FadeInView>

        <FadeInView delay={160}>
          <Text style={styles.sectionTitle}>Экстренный контакт</Text>
          <GlassCard leftAccent={colors.red}>
            <View style={styles.emergencyRow}>
              <View style={styles.emergencyIcon}>
                <Phone size={18} color={colors.red} strokeWidth={2} />
              </View>
              <View>
                <Text style={styles.emergencyName}>{profile.emergencyContact.name}</Text>
                <Text style={styles.emergencyPhone}>{profile.emergencyContact.phone}</Text>
              </View>
            </View>
          </GlassCard>
        </FadeInView>

        <FadeInView delay={240}>
          <TouchableOpacity onPress={() => navigation.navigate('Devices')} activeOpacity={0.8}>
            <GlassCard style={styles.deviceLink}>
              <View style={styles.deviceLinkRow}>
                <LinearGradient colors={[...gradients.accent]} style={styles.deviceIconBg}>
                  <Cpu size={20} color="#fff" strokeWidth={2} />
                </LinearGradient>
                <View style={styles.deviceLinkText}>
                  <Text style={styles.deviceLinkTitle}>NeuroDrive Ecosystem</Text>
                  <Text style={styles.deviceLinkSub}>Устройства и датчики</Text>
                </View>
                <ChevronRight size={20} color={colors.textMuted} />
              </View>
            </GlassCard>
          </TouchableOpacity>
        </FadeInView>

        <FadeInView delay={320}>
          <View style={styles.coachSection}><AICoachCard messages={coachMessages} /></View>
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
  avatarSection: { alignItems: 'center', marginVertical: 28 },
  avatarBorder: { width: 88, height: 88, borderRadius: 44, padding: 3, marginBottom: 14 },
  avatar: {
    flex: 1,
    borderRadius: 41,
    backgroundColor: colors.bgSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: { color: colors.accentCyan, fontSize: 28, fontFamily: fontFamily.bold },
  name: { color: colors.textPrimary, fontSize: 22, fontFamily: fontFamily.bold },
  age: { color: colors.textSecondary, fontSize: typography.body.fontSize, fontFamily: fontFamily.regular, marginTop: 4 },
  sectionTitle: { color: colors.textPrimary, fontSize: typography.h2.fontSize, fontFamily: fontFamily.bold, marginBottom: 12, marginTop: 8 },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  infoLabel: { color: colors.textSecondary, fontSize: typography.body.fontSize, fontFamily: fontFamily.regular },
  infoValue: { color: colors.textPrimary, fontSize: typography.body.fontSize, fontFamily: fontFamily.semiBold },
  emergencyRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  emergencyIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(239,68,68,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emergencyName: { color: colors.textPrimary, fontSize: typography.h3.fontSize, fontFamily: fontFamily.semiBold },
  emergencyPhone: { color: colors.textSecondary, fontSize: typography.body.fontSize, fontFamily: fontFamily.regular, marginTop: 2 },
  deviceLink: { marginTop: 16 },
  deviceLinkRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  deviceIconBg: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  deviceLinkText: { flex: 1 },
  deviceLinkTitle: { color: colors.textPrimary, fontSize: typography.h3.fontSize, fontFamily: fontFamily.semiBold },
  deviceLinkSub: { color: colors.textSecondary, fontSize: typography.caption.fontSize, fontFamily: fontFamily.regular, marginTop: 2 },
  coachSection: { marginTop: 24 },
});
