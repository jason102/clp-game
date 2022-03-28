import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import {
  TitleComponent,
  GridComponent,
  DatasetComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { ChartContainer } from './Dashboard.styles';
import { CHART_TIME_VALUES } from 'helpers';

echarts.use([
  TitleComponent,
  GridComponent,
  DatasetComponent,
  CanvasRenderer,
  TooltipComponent,
  LineChart,
  LegendComponent,
]);

const Chart: React.FC = () => {
  const chartRef = useRef<any>(null);

  useEffect(() => {
    if (chartRef.current) {
      const lineChart = echarts.init(chartRef.current);

      lineChart.setOption({
        grid: { top: 8, right: 8, bottom: 24, left: 36 },
        xAxis: {
          type: 'category',
          data: CHART_TIME_VALUES,
        },
        legend: { data: ['black', 'orange', 'blue'] },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320, 1000, 1000, 1000],
            type: 'line',
            smooth: true,
          },
        ],
        tooltip: {
          trigger: 'axis',
        },
      });
    }
  }, []);

  return <ChartContainer ref={chartRef} />;
};

export default Chart;
