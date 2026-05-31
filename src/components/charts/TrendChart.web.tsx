import React, { memo } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { ChartDataPoint } from '../../types';
import { colors } from '../../theme/colors';
import { fontFamily, typography } from '../../theme/typography';

interface TrendChartProps {
  title: string;
  data: ChartDataPoint[];
  color?: string;
  unit?: string;
}

function CustomTooltip({ active, payload, label, unit }: { active?: boolean; payload?: { value: number }[]; label?: string; unit?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <View style={styles.tooltip}>
      <Text style={styles.tooltipLabel}>{label}</Text>
      <Text style={styles.tooltipValue}>{payload[0].value}{unit}</Text>
    </View>
  );
}

function TrendChartComponent({ title, data, color = colors.accentBlue, unit = '' }: TrendChartProps) {
  const chartData = data.map((d) => ({ name: d.label, value: d.value }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.chartWrap}>
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={chartData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id={`grad-${title}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.35} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: colors.textMuted, fontSize: 11, fontFamily: 'Inter' }}
            />
            <YAxis hide domain={['auto', 'auto']} />
            <Tooltip content={<CustomTooltip unit={unit} />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2.5}
              fill={`url(#grad-${title})`}
              dot={{ fill: color, strokeWidth: 0, r: 4 }}
              activeDot={{ fill: color, strokeWidth: 2, stroke: '#fff', r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </View>
    </View>
  );
}

export const TrendChart = memo(TrendChartComponent);

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.h3.fontSize,
    fontFamily: fontFamily.semiBold,
    marginBottom: 12,
  },
  chartWrap: {
    backgroundColor: colors.bgCard,
    borderRadius: 12,
    overflow: 'hidden',
    height: 180,
  },
  tooltip: {
    backgroundColor: 'rgba(13, 21, 38, 0.95)',
    borderWidth: 1,
    borderColor: colors.borderAccent,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  tooltipLabel: {
    color: colors.textSecondary,
    fontSize: 11,
    fontFamily: fontFamily.regular,
  },
  tooltipValue: {
    color: colors.textPrimary,
    fontSize: 14,
    fontFamily: fontFamily.bold,
    marginTop: 2,
  },
});
