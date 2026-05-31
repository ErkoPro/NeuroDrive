import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import {
  LiveMetrics,
  DeviceStatus,
  AIAlert,
  TripRecord,
  AnalyticsData,
  UserProfile,
  AICoachMessage,
} from '../types';
import { SimulationEngine, formatDuration } from '../simulation/engine';
import {
  DEMO_MODE,
  createSimulationEngine,
  getMockAnalytics,
  getMockCoachMessages,
  getMockDeviceStatus,
  getMockProfile,
  getMockTripHistory,
} from '../services/mockDataService';

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

export function NeuroDriveProvider({ children }: { children: React.ReactNode }) {
  const engineRef = useRef(createSimulationEngine());
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
  const [tripHistory] = useState(getMockTripHistory);
  const [analytics] = useState(getMockAnalytics);
  const [deviceStatus] = useState(getMockDeviceStatus);
  const [profile] = useState(getMockProfile);
  const [coachMessages] = useState(getMockCoachMessages);

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
        demoMode: DEMO_MODE,
        isTripActive,
        liveMetrics,
        idleMetrics,
        deviceStatus,
        currentAlert,
        aiAnalysis,
        quickInsight,
        tripHistory,
        analytics,
        profile,
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
