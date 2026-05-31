import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import {
  LiveMetrics,
  DeviceStatus,
  AIAlert,
  TripRecord,
  AnalyticsData,
  UserProfile,
  AICoachMessage,
  ChartDataPoint,
} from '../types';
import {
  SimulationEngine,
  generateTripHistory,
  formatDuration,
} from '../simulation/engine';

interface NeuroDriveState {
  demoMode: boolean;
  isTripActive: boolean;
  liveMetrics: LiveMetrics;
  idleMetrics: ReturnType<SimulationEngine['generateIdleMetrics']>;
  deviceStatus: DeviceStatus;
  currentAlert: AIAlert | null;
  aiAnalysis: string;
  quickInsight: string;
  tripHistory: TripRecord[];
  analytics: AnalyticsData;
  profile: UserProfile;
  coachMessages: AICoachMessage[];
  startTrip: () => void;
  stopTrip: () => void;
  getTripById: (id: string) => TripRecord | undefined;
}

const NeuroDriveContext = createContext<NeuroDriveState | null>(null);

function generateTrendData(days: number, base: number, variance: number): ChartDataPoint[] {
  const labels = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  return Array.from({ length: days }, (_, i) => ({
    label: labels[i % 7],
    value: Math.round(base + (Math.random() - 0.5) * variance * 2),
  }));
}

function generateAnalytics(): AnalyticsData {
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

const defaultProfile: UserProfile = {
  name: 'Алексей Петров',
  age: 34,
  driverType: 'Опытный водитель',
  drivingExperience: '12 лет',
  emergencyContact: {
    name: 'Мария Петрова',
    phone: '+7 (999) 123-45-67',
  },
};

const coachMessages: AICoachMessage[] = [
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

export function NeuroDriveProvider({ children }: { children: React.ReactNode }) {
  const engineRef = useRef(new SimulationEngine());
  const [isTripActive, setIsTripActive] = useState(false);
  const [liveMetrics, setLiveMetrics] = useState<LiveMetrics>({
    heartRate: 72,
    hrv: 55,
    stressIndex: 25,
    fatigueIndex: 15,
    focusLevel: 85,
    neuroScore: 88,
    drivingDurationSeconds: 0,
  });
  const [idleMetrics, setIdleMetrics] = useState(engineRef.current.generateIdleMetrics());
  const [currentAlert, setCurrentAlert] = useState<AIAlert | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState('Состояние стабильно.');
  const [quickInsight, setQuickInsight] = useState('');
  const [tripHistory] = useState(generateTripHistory);
  const [analytics] = useState(generateAnalytics);

  const deviceStatus: DeviceStatus = {
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

  useEffect(() => {
    const interval = setInterval(() => {
      if (engineRef.current.isTripActive()) {
        const metrics = engineRef.current.generateLiveMetrics();
        const { alert, analysis } = engineRef.current.analyzeRisk(metrics);
        setLiveMetrics(metrics);
        setCurrentAlert(alert);
        setAiAnalysis(analysis);
      } else {
        const metrics = engineRef.current.generateIdleMetrics();
        setIdleMetrics(metrics);
        setQuickInsight(engineRef.current.generateQuickInsight(metrics));
      }
    }, 2000);

    const idle = engineRef.current.generateIdleMetrics();
    setIdleMetrics(idle);
    setQuickInsight(engineRef.current.generateQuickInsight(idle));

    return () => clearInterval(interval);
  }, []);

  const startTrip = useCallback(() => {
    engineRef.current.startTrip();
    setIsTripActive(true);
    setCurrentAlert(null);
    setAiAnalysis('Поездка начата. Мониторинг активен.');
  }, []);

  const stopTrip = useCallback(() => {
    engineRef.current.stopTrip();
    setIsTripActive(false);
    setCurrentAlert(null);
    setAiAnalysis('Поездка завершена.');
  }, []);

  const getTripById = useCallback(
    (id: string) => tripHistory.find((t) => t.id === id),
    [tripHistory],
  );

  return (
    <NeuroDriveContext.Provider
      value={{
        demoMode: true,
        isTripActive,
        liveMetrics,
        idleMetrics,
        deviceStatus,
        currentAlert,
        aiAnalysis,
        quickInsight,
        tripHistory,
        analytics,
        profile: defaultProfile,
        coachMessages,
        startTrip,
        stopTrip,
        getTripById,
      }}
    >
      {children}
    </NeuroDriveContext.Provider>
  );
}

export function useNeuroDrive(): NeuroDriveState {
  const ctx = useContext(NeuroDriveContext);
  if (!ctx) throw new Error('useNeuroDrive must be used within NeuroDriveProvider');
  return ctx;
}

export { formatDuration };
