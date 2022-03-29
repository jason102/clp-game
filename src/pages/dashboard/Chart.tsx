import React, { useEffect, useRef } from 'react';
import { use as echartsUse, init as echartsInit } from 'echarts/core';
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

echartsUse([
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

export interface GraphData {
  blackLineValues: number[];
  blueLineValues: number[];
  orangeLineValues: number[];
}

interface Props {
  graphData: GraphData;
}

const Chart: React.FC<Props> = ({ graphData }) => {
  const chartRef = useRef<any>(null);

  useEffect(() => {
    if (chartRef.current) {
      const lineChart = echartsInit(chartRef.current);

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
            data: graphData.blackLineValues,
            type: 'line',
            smooth: true,
            color: 'black',
          },
          {
            name: 'Orange',
            data: graphData.orangeLineValues,
            type: 'line',
            smooth: true,
            color: ORANGE,
          },
          {
            name: 'Blue',
            data: graphData.blueLineValues,
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
  }, [graphData]);

  return <ChartContainer ref={chartRef} />;
};

export default Chart;
