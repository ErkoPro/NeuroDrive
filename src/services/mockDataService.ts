import {
  AnalyticsData,
  AICoachMessage,
  ChartDataPoint,
  DeviceStatus,
  TripRecord,
  UserProfile,
} from '../types';
import { SimulationEngine, generateTripHistory } from '../simulation/engine';
import { getRiskLevel } from '../theme/colors';

export const DEMO_MODE = true;

const DAY_LABELS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

function generateTrendData(days: number, base: number, variance: number): ChartDataPoint[] {
  return Array.from({ length: days }, (_, i) => ({
    label: DAY_LABELS[i % 7],
    value: Math.round(base + (Math.random() - 0.5) * variance * 2),
  }));
}

export function getMockProfile(): UserProfile {
  return {
    name: 'Алексей Петров',
    age: 34,
    driverType: 'Опытный водитель',
    drivingExperience: '12 лет',
    emergencyContact: {
      name: 'Мария Петрова',
      phone: '+7 (999) 123-45-67',
    },
  };
}

export function getMockCoachMessages(): AICoachMessage[] {
  return [
    {
      id: '1',
      message: 'Сегодня рекомендуется сделать перерыв каждые 90 минут.',
      priority: 'tip',
    },
    {
      id: '2',
      message: 'Ваш уровень стресса выше обычного.',
      priority: 'warning',
    },
    {
      id: '3',
      message: 'Качество сна может влиять на безопасность вождения.',
      priority: 'info',
    },
  ];
}

export function getMockAnalytics(): AnalyticsData {
  return {
    dailyScore: Math.round(72 + Math.random() * 20),
    weeklyScore: Math.round(68 + Math.random() * 22),
    monthlyScore: Math.round(75 + Math.random() * 18),
    heartRateTrend: generateTrendData(7, 74, 8),
    stressTrend: generateTrendData(7, 35, 15),
    fatigueTrend: generateTrendData(7, 30, 12),
    safetyTrend: generateTrendData(7, 82, 10),
    insights: [
      'Ваш стресс повышается после 2 часов непрерывного вождения.',
      'Наиболее безопасное время вождения: 09:00–14:00.',
      'Средний уровень концентрации вырос на 12%.',
    ],
  };
}

export function getMockDeviceStatus(): DeviceStatus {
  return {
    smartWheel: {
      connected: true,
      battery: 87,
      sensorHealth: 96,
    },
    smartWatch: {
      connected: true,
      name: 'NeuroDrive Watch Pro',
      battery: 72,
      lastSync: new Date(),
    },
    phoneSensors: {
      gps: true,
      accelerometer: true,
      active: true,
    },
  };
}

export function getMockTripHistory(): TripRecord[] {
  return generateTripHistory();
}

export function createSimulationEngine(): SimulationEngine {
  return new SimulationEngine();
}

export { getRiskLevel };
