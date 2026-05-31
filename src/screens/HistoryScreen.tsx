import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNeuroDrive } from '../context/NeuroDriveContext';
import { ScreenHeader } from '../components/ScreenHeader';
import { TripCard } from '../components/TripCard';
import { DemoBadge } from '../components/DemoBadge';
import { colors } from '../theme/colors';
import { RootStackParamList } from '../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function HistoryScreen() {
  const { tripHistory } = useNeuroDrive();
  const navigation = useNavigation<NavigationProp>();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topRow}>
          <ScreenHeader title="История" subtitle={`${tripHistory.length} поездок`} />
          <DemoBadge />
        </View>

        {tripHistory.map((trip) => (
          <TripCard
            key={trip.id}
            trip={trip}
            onPress={() => navigation.navigate('TripReport', { tripId: trip.id })}
          />
        ))}
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
});
