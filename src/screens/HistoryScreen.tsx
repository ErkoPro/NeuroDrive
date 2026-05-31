import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNeuroDrive } from '../hooks/useNeuroDrive';
import { ScreenHeader } from '../components/ScreenHeader';
import { TripCard } from '../components/TripCard';
import { DemoBadge } from '../components/DemoBadge';
import { FadeInView } from '../components/animations/FadeInView';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';

type NavigationProp = StackNavigationProp<RootStackParamList>;

export function HistoryScreen() {
  const { tripHistory } = useNeuroDrive();
  const navigation = useNavigation<NavigationProp>();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topRow}>
          <ScreenHeader title="История" subtitle={`${tripHistory.length} поездок`} />
          <DemoBadge />
        </View>
        {tripHistory.map((trip, i) => (
          <FadeInView key={trip.id} delay={i * 50}>
            <TripCard trip={trip} onPress={() => navigation.navigate('TripReport', { tripId: trip.id })} />
          </FadeInView>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bgPrimary },
  scroll: { flex: 1 },
  content: { padding: 20, paddingBottom: 32 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
});
