import {
  AIAlert,
  AlertLevel,
  LiveMetrics,
  TripRecord,
  RiskLevel,
} from '../types';
import { getRiskLevel } from '../theme/colors';

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function randomInRange(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function noise(amplitude: number): number {
  return (Math.random() - 0.5) * 2 * amplitude;
}

export class SimulationEngine {
  private tripStartTime: number | null = null;
  private baseHeartRate = 72;
  private fatigueAccumulator = 0;
  private stressAccumulator = 0;
  private tickCount = 0;

  startTrip(): void {
    this.tripStartTime = Date.now();
    this.fatigueAccumulator = 0;
    this.stressAccumulator = 0;
    this.tickCount = 0;
    this.baseHeartRate = randomInRange(68, 78);
  }

  stopTrip(): void {
    this.tripStartTime = null;
  }

  isTripActive(): boolean {
    return this.tripStartTime !== null;
  }

  getDrivingDurationSeconds(): number {
    if (!this.tripStartTime) return 0;
    return Math.floor((Date.now() - this.tripStartTime) / 1000);
  }

  generateLiveMetrics(): LiveMetrics {
    this.tickCount++;
    const duration = this.getDrivingDurationSeconds();
    const hours = duration / 3600;

    this.fatigueAccumulator = clamp(hours * 18 + noise(3), 0, 100);
    this.stressAccumulator = clamp(
      25 + Math.sin(this.tickCount / 30) * 15 + hours * 12 + noise(5),
      0,
      100,
    );

    const fatigueFactor = this.fatigueAccumulator / 100;
    const stressFactor = this.stressAccumulator / 100;

    const heartRate = clamp(
      this.baseHeartRate +
        stressFactor * 25 +
        fatigueFactor * 15 +
        noise(4),
      55,
      130,
    );

    const hrv = clamp(65 - stressFactor * 30 - fatigueFactor * 20 + noise(5), 15, 80);
    const focusLevel = clamp(95 - fatigueFactor * 50 - stressFactor * 25 + noise(4), 10, 100);

    const neuroScore = clamp(
      100 -
        fatigueFactor * 35 -
        stressFactor * 30 -
        (heartRate > 100 ? (heartRate - 100) * 0.5 : 0) -
        (focusLevel < 50 ? (50 - focusLevel) * 0.4 : 0),
      15,
      100,
    );

    return {
      heartRate: Math.round(heartRate),
      hrv: Math.round(hrv),
      stressIndex: Math.round(this.stressAccumulator),
      fatigueIndex: Math.round(this.fatigueAccumulator),
      focusLevel: Math.round(focusLevel),
      neuroScore: Math.round(neuroScore),
      drivingDurationSeconds: duration,
    };
  }

  generateIdleMetrics(): Omit<LiveMetrics, 'drivingDurationSeconds'> & { neuroScore: number } {
    const heartRate = clamp(this.baseHeartRate + noise(3), 60, 85);
    const stress = clamp(20 + noise(8), 5, 45);
    const fatigue = clamp(15 + noise(10), 5, 40);
    const focus = clamp(75 + noise(10), 55, 95);
    const hrv = clamp(55 + noise(8), 35, 75);

    const neuroScore = clamp(
      100 - (stress / 100) * 20 - (fatigue / 100) * 15,
      60,
      98,
    );

    return {
      heartRate: Math.round(heartRate),
      hrv: Math.round(hrv),
      stressIndex: Math.round(stress),
      fatigueIndex: Math.round(fatigue),
      focusLevel: Math.round(focus),
      neuroScore: Math.round(neuroScore),
    };
  }

  analyzeRisk(metrics: LiveMetrics): { alert: AIAlert | null; analysis: string } {
    const alerts: { level: AlertLevel; message: string; priority: number }[] = [];

    if (metrics.fatigueIndex >= 75) {
      alerts.push({
        level: 'emergency',
        message: 'Критическое состояние водителя.',
        priority: 4,
      });
    } else if (metrics.fatigueIndex >= 60) {
      alerts.push({
        level: 'red',
        message: 'Высокий риск. Рекомендуется остановиться.',
        priority: 3,
      });
    } else if (metrics.fatigueIndex >= 45) {
      alerts.push({
        level: 'yellow',
        message: 'Признаки усталости обнаружены.',
        priority: 2,
      });
    }

    if (metrics.stressIndex >= 70) {
      alerts.push({
        level: metrics.stressIndex >= 85 ? 'red' : 'yellow',
        message:
          metrics.stressIndex >= 85
            ? 'Высокий риск. Рекомендуется остановиться.'
            : 'Обнаружено повышение уровня стресса.',
        priority: metrics.stressIndex >= 85 ? 3 : 2,
      });
    }

    if (metrics.heartRate >= 110 || metrics.heartRate <= 55) {
      alerts.push({
        level: metrics.heartRate >= 120 ? 'red' : 'yellow',
        message: 'Аномальный пульс. Проверьте самочувствие.',
        priority: metrics.heartRate >= 120 ? 3 : 2,
      });
    }

    if (metrics.focusLevel < 40) {
      alerts.push({
        level: metrics.focusLevel < 25 ? 'red' : 'yellow',
        message:
          metrics.focusLevel < 25
            ? 'Критическое снижение концентрации.'
            : 'Снижена концентрация внимания.',
        priority: metrics.focusLevel < 25 ? 3 : 2,
      });
    }

    const durationHours = metrics.drivingDurationSeconds / 3600;
    if (durationHours >= 3) {
      alerts.push({
        level: durationHours >= 4 ? 'red' : 'yellow',
        message:
          durationHours >= 4
            ? 'Длительное вождение. Необходим отдых.'
            : 'Рекомендуется короткий отдых.',
        priority: durationHours >= 4 ? 3 : 2,
      });
    }

    if (metrics.fatigueIndex >= 55 && metrics.focusLevel < 50) {
      alerts.push({
        level: 'red',
        message: 'Возможен риск микросна. Остановитесь немедленно.',
        priority: 4,
      });
    }

    alerts.sort((a, b) => b.priority - a.priority);

    let analysis: string;
    if (metrics.neuroScore >= 80) {
      analysis = 'Состояние стабильно.';
    } else if (metrics.stressIndex >= 60) {
      analysis = 'Обнаружено повышение уровня стресса.';
    } else if (metrics.fatigueIndex >= 50) {
      analysis = 'Рекомендуется короткий отдых.';
    } else if (metrics.focusLevel < 60) {
      analysis = 'Концентрация снижается. Будьте внимательны.';
    } else {
      analysis = 'Показатели в норме. Продолжайте внимательно.';
    }

    if (alerts.length === 0) {
      return { alert: null, analysis };
    }

    const top = alerts[0];
    return {
      alert: {
        level: top.level,
        message: top.message,
        timestamp: new Date(),
      },
      analysis,
    };
  }

  generateQuickInsight(metrics: {
    neuroScore: number;
    focusLevel: number;
    stressIndex: number;
    fatigueIndex: number;
  }): string {
    if (metrics.neuroScore >= 85 && metrics.focusLevel >= 80) {
      return 'Ваш уровень концентрации высокий. Риск минимален.';
    }
    if (metrics.stressIndex >= 60) {
      return 'Уровень стресса повышен. Рекомендуется сделать паузу.';
    }
    if (metrics.fatigueIndex >= 50) {
      return 'Признаки усталости. Планируйте перерыв в ближайшее время.';
    }
    if (metrics.focusLevel >= 70) {
      return 'Концентрация на хорошем уровне. Безопасное вождение.';
    }
    return 'Следите за самочувствием. NeuroDrive мониторит ваше состояние.';
  }
}

export function generateTripHistory(): TripRecord[] {
  const trips: TripRecord[] = [];
  const now = new Date();

  for (let i = 0; i < 12; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - i * 2 - Math.floor(Math.random() * 2));

    const durationSeconds = Math.floor(randomInRange(1200, 7200));
    const avgHR = Math.round(randomInRange(68, 88));
    const maxHR = Math.round(avgHR + randomInRange(10, 35));
    const safetyScore = Math.round(randomInRange(55, 98));
    const stressScore = Math.round(randomInRange(20, 75));
    const fatigueScore = Math.round(randomInRange(15, 70));
    const stressPeriods = Math.floor(randomInRange(0, 4));
    const riskLevel = getRiskLevel(safetyScore) as RiskLevel;

    const summaries = [
      `Во время поездки было зафиксировано ${stressPeriods} периода повышенного стресса.`,
      'Поездка прошла в стабильном режиме. Показатели в норме.',
      `Зафиксировано ${stressPeriods} эпизода снижения концентрации.`,
      'Рекомендуется увеличить частоту перерывов при длительных поездках.',
      `Средний пульс ${avgHR} уд/мин. Общее состояние — ${riskLevel === 'low' ? 'хорошее' : riskLevel === 'medium' ? 'удовлетворительное' : 'требует внимания'}.`,
    ];

    trips.push({
      id: `trip-${i}`,
      date,
      durationSeconds,
      distanceKm: Math.round(randomInRange(8, 85) * 10) / 10,
      avgHeartRate: avgHR,
      maxHeartRate: maxHR,
      safetyScore,
      riskLevel,
      stressScore,
      fatigueScore,
      aiSummary: summaries[Math.floor(Math.random() * summaries.length)],
      stressPeriods,
    });
  }

  return trips.sort((a, b) => b.date.getTime() - a.date.getTime());
}

export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}ч ${m}мин`;
  if (m > 0) return `${m}мин ${s}с`;
  return `${s}с`;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });
}
