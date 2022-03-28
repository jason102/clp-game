import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import {
  TitleComponent,
  GridComponent,
  DatasetComponent,
  TooltipComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { ChartContainer } from './Dashboard.styles';

echarts.use([
  TitleComponent,
  GridComponent,
  DatasetComponent,
  CanvasRenderer,
  TooltipComponent,
  LineChart,
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
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
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
