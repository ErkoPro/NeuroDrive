import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { ChartDataPoint } from '../../types';
import { colors } from '../../theme/colors';

interface TrendChartProps {
  title: string;
  data: ChartDataPoint[];
  color?: string;
  unit?: string;
}

export function TrendChart({ title, data, color = colors.primary, unit = '' }: TrendChartProps) {
  const chartWidth = Dimensions.get('window').width - 80;
  const values = data.map((d) => d.value);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const padding = Math.max((maxVal - minVal) * 0.15, 5);

  const chartData = data.map((d) => ({
    value: d.value,
    label: d.label,
    dataPointText: `${d.value}${unit}`,
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <LineChart
        data={chartData}
        width={chartWidth}
        height={160}
        curved
        isAnimated
        animationDuration={1200}
        color={color}
        thickness={2.5}
        startFillColor={`${color}40`}
        endFillColor={`${color}05`}
        startOpacity={0.4}
        endOpacity={0.05}
        areaChart
        hideRules
        hideYAxisText
        yAxisColor="transparent"
        xAxisColor={colors.surfaceBorder}
        xAxisLabelTextStyle={styles.axisLabel}
        dataPointsColor={color}
        dataPointsRadius={4}
        spacing={(chartWidth - 40) / Math.max(data.length - 1, 1)}
        initialSpacing={16}
        endSpacing={16}
        maxValue={maxVal + padding}
        yAxisOffset={minVal - padding}
        pointerConfig={{
          pointerColor: color,
          radius: 6,
          pointerLabelWidth: 80,
          pointerLabelHeight: 36,
          activatePointersOnLongPress: false,
          autoAdjustPointerLabelPosition: true,
          pointerLabelComponent: (items: { value: number }[]) => (
            <View style={[styles.tooltip, { borderColor: color }]}>
              <Text style={[styles.tooltipText, { color }]}>
                {items[0]?.value}{unit}
              </Text>
            </View>
          ),
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
  },
  title: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 12,
  },
  axisLabel: {
    color: colors.textMuted,
    fontSize: 11,
  },
  tooltip: {
    backgroundColor: colors.backgroundSecondary,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tooltipText: {
    fontSize: 12,
    fontWeight: '700',
  },
});
