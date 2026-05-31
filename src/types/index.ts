export type AlertLevel = 'none' | 'yellow' | 'red' | 'emergency';

export type RiskLevel = 'low' | 'medium' | 'high';

export interface LiveMetrics {
  heartRate: number;
  hrv: number;
  stressIndex: number;
  fatigueIndex: number;
  focusLevel: number;
  neuroScore: number;
  drivingDurationSeconds: number;
}

export interface DeviceStatus {
  smartWheel: {
    connected: boolean;
    battery: number;
    sensorHealth: number;
  };
  smartWatch: {
    connected: boolean;
    name: string;
    battery: number;
    lastSync: Date;
  };
  phoneSensors: {
    gps: boolean;
    accelerometer: boolean;
    active: boolean;
  };
}

export interface AIAlert {
  level: AlertLevel;
  message: string;
  timestamp: Date;
}

export interface TripRecord {
  id: string;
  date: Date;
  durationSeconds: number;
  distanceKm: number;
  avgHeartRate: number;
  maxHeartRate: number;
  safetyScore: number;
  riskLevel: RiskLevel;
  stressScore: number;
  fatigueScore: number;
  aiSummary: string;
  stressPeriods: number;
}

export interface ChartDataPoint {
  label: string;
  value: number;
}

export interface AnalyticsData {
  dailyScore: number;
  weeklyScore: number;
  monthlyScore: number;
  heartRateTrend: ChartDataPoint[];
  stressTrend: ChartDataPoint[];
  fatigueTrend: ChartDataPoint[];
  safetyTrend: ChartDataPoint[];
  insights: string[];
}

export interface UserProfile {
  name: string;
  age: number;
  driverType: string;
  drivingExperience: string;
  emergencyContact: {
    name: string;
    phone: string;
  };
}

export interface AICoachMessage {
  id: string;
  message: string;
  priority: 'info' | 'warning' | 'tip';
}
