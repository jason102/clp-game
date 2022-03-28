import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import {
  TitleComponent,
  GridComponent,
  DatasetComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
} from 'echarts/components';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { ChartContainer } from './Dashboard.styles';
import { CHART_TIME_VALUES } from 'helpers';
import { BLUE, ORANGE } from 'Colors';

echarts.use([
  TitleComponent,
  GridComponent,
  DatasetComponent,
  CanvasRenderer,
  TooltipComponent,
  LineChart,
  LegendComponent,
  LabelLayout,
  ToolboxComponent,
]);

interface Props {
  blackLineValues: number[];
  orangeLineValues: number[];
  blueLineValues: number[];
}

const Chart: React.FC<Props> = ({
  blackLineValues,
  orangeLineValues,
  blueLineValues,
}) => {
  const chartRef = useRef<any>(null);

  useEffect(() => {
    if (chartRef.current) {
      const lineChart = echarts.init(chartRef.current);

      lineChart.setOption({
        grid: {
          left: '3%',
          right: '13%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: CHART_TIME_VALUES,
          name: 'Seconds',
          boundaryGap: true,
          axisLabel: { showMinLabel: true, showMaxLabel: true },
        },
        legend: {},
        yAxis: {
          name: 'Clicks',
          type: 'value',
        },
        series: [
          {
            name: 'Total Clicks',
            data: blackLineValues,
            type: 'line',
            smooth: true,
            color: 'black',
          },
          {
            name: 'Orange',
            data: orangeLineValues,
            type: 'line',
            smooth: true,
            color: ORANGE,
          },
          {
            name: 'Blue',
            data: blueLineValues,
            type: 'line',
            smooth: true,
            color: BLUE,
          },
        ],
        tooltip: {
          trigger: 'axis',
        },
      });
    }
  }, [blackLineValues, blueLineValues, orangeLineValues]);

  return <ChartContainer ref={chartRef} />;
};

export default Chart;
