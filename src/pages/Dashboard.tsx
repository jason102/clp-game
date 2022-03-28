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
import { Container } from './Dashboard.styles';

echarts.use([
  TitleComponent,
  GridComponent,
  DatasetComponent,
  CanvasRenderer,
  TooltipComponent,
  LineChart,
]);

const Dashboard: React.FC = () => {
  const lineChartRef = useRef<any>(null);

  useEffect(() => {
    if (lineChartRef.current) {
      const lineChart = echarts.init(lineChartRef.current);

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

  return (
    <Container>
      <div style={{ width: '60vw', height: '400px' }} ref={lineChartRef} />
    </Container>
  );
};

export default Dashboard;
