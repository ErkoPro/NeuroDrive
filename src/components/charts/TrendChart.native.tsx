import React, { memo } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { ChartDataPoint } from '../../types';
import { colors } from '../../theme/colors';
import { fontFamily, typography } from '../../theme/typography';

interface TrendChartProps {
  title: string;
  data: ChartDataPoint[];
  color?: string;
  unit?: string;
}

function TrendChartComponent({ title, data, color = colors.accentBlue, unit = '' }: TrendChartProps) {
  const chartWidth = Dimensions.get('window').width - 80;
  const values = data.map((d) => d.value);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const padding = Math.max((maxVal - minVal) * 0.15, 5);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <LineChart
        data={data.map((d) => ({ value: d.value, label: d.label }))}
        width={chartWidth}
        height={160}
        curved
        isAnimated
        color={color}
        thickness={2.5}
        startFillColor={`${color}40`}
        endFillColor={`${color}05`}
        areaChart
        hideRules
        hideYAxisText
        yAxisColor="transparent"
        xAxisColor={colors.border}
        dataPointsColor={color}
        spacing={(chartWidth - 40) / Math.max(data.length - 1, 1)}
        maxValue={maxVal + padding}
        yAxisOffset={minVal - padding}
      />
    </View>
  );
}

export const TrendChart = memo(TrendChartComponent);

const styles = StyleSheet.create({
  container: { marginVertical: 4 },
  title: {
    color: colors.textPrimary,
    fontSize: typography.h3.fontSize,
    fontFamily: fontFamily.semiBold,
    marginBottom: 12,
  },
});
