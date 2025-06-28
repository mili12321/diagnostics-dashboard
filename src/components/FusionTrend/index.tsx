import { useEffect, useRef, useState } from 'react';

import { AiOutlineCalendar, AiOutlineLineChart } from 'react-icons/ai';
import { IoIosArrowDown } from 'react-icons/io';

import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Filler,
  CategoryScale,
  TimeScale,
} from 'chart.js';

import 'chartjs-adapter-date-fns';
import { drawRoundedRect, formatDateInputValue } from './helpers';
import type { Diagnostic } from '../../types';
import { Card, Text } from '../common';
import { useFusionTrendData } from './useFusionTrendData';
import { formatTooltipLabel } from './tooltipFormatter';

type FusionPoint = {
  x: Date;
  y: number | null;
  severity: string;
  type: string;
};

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Filler,
  CategoryScale,
  TimeScale
);
interface DiagnosticsTableProps {
  diagnostics: Diagnostic[];
}

const getCSSVar = (name: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();

const severityColors: Record<string, string> = {
  critical: getCSSVar('--color-critical'),
  alarm: getCSSVar('--color-alarm'),
  healthy: getCSSVar('--color-healthy'),
};

export const FusionTrend = ({ diagnostics }: DiagnosticsTableProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const { points: dailyPoints, startDate } = useFusionTrendData(diagnostics, selectedDate);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart<'line', FusionPoint[], unknown> | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Fusion Trend',
            data: dailyPoints,
            borderColor: getCSSVar('--color-border'),
            backgroundColor: '#fff',
            pointBackgroundColor: dailyPoints.map((p) => severityColors[p.severity]),
            pointBorderColor: '#fff',
            pointBorderWidth: 4,
            pointRadius: 7,
            tension: 0,
            borderWidth: 1,
            fill: false,
            spanGaps: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            mode: 'index',
            intersect: false,
            displayColors: false,
            caretSize: 0,
            backgroundColor: '#ffffff',
            borderColor: getCSSVar('--color-border'),
            borderWidth: 1,
            padding: 8,
            bodyColor: getCSSVar('--color-text-primary'),
            callbacks: {
              title: () => '', // remove title
              label: (context) => {
                const point = dailyPoints[context.dataIndex];
                return formatTooltipLabel(point);
              },
            },
          },
          legend: {
            display: false,
          },
        },
        interaction: {
          mode: 'index',
          intersect: false,
        },
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day',
              displayFormats: { day: 'MMM d' },
              tooltipFormat: 'MMM d',
            },
            ticks: {
              color: getCSSVar('--color-text-secondary'),
              align: 'start',
              font: {
                size: 12,
              },
              padding: 8,
            },
            grid: {
              display: false,
            },
            border: {
              display: false,
            },
          },
          y: {
            display: false,
            beginAtZero: true,
            reverse: true,
            grid: {
              display: false,
            },
            border: {
              display: false,
            },
          },
        },
      },
      plugins: [
        {
          id: 'VerticalLines',
          beforeDatasetsDraw(chart) {
            const ctx = chart.ctx;
            const meta = chart.getDatasetMeta(0);
            const topY = chart.scales.y.top;
            const bottomY = chart.scales.y.bottom;

            ctx.save();
            ctx.setLineDash([7, 7]);
            ctx.lineWidth = 1;
            ctx.strokeStyle = getCSSVar('--color-border');

            meta.data.forEach((point) => {
              const x = point.x;
              ctx.beginPath();
              ctx.moveTo(x, topY);
              ctx.lineTo(x, bottomY);
              ctx.stroke();
            });

            ctx.restore();
          },
        },
        {
          id: 'tooltipShadow',
          beforeDraw(chart) {
            const tooltip = chart.tooltip;
            if (!tooltip || tooltip.opacity === 0) return;

            const ctx = chart.ctx;
            const { x, y, width, height } = tooltip;
            const radius = 8;

            ctx.save();

            ctx.shadowColor = 'rgba(2, 29, 61, 0.12)';
            ctx.shadowBlur = 8;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 2;

            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            drawRoundedRect(ctx, x, y, width, height, radius);
            ctx.fill();
            ctx.restore();
          },
        },
      ],
    });

    return () => {
      chartRef.current?.destroy();
    };
  }, [dailyPoints]);

  return (
    <Card>
      <Card.Header>
        <div className="flex-center">
          <AiOutlineLineChart className="mr-2" />
          <Text weight="semibold">Fusion trend</Text>
        </div>
        <label
          onClick={() => inputRef.current?.showPicker?.()}
          htmlFor="fusion-trend-date"
          className="flex-center relative inline-flex cursor-pointer gap-2"
        >
          <AiOutlineCalendar />
          <Text>From {startDate ? formatDateInputValue(startDate) : 'Select Date'}</Text>
          <IoIosArrowDown />
          <input
            ref={inputRef}
            id="fusion-trend-date"
            type="date"
            className="absolute top-0 left-0 h-full w-0 cursor-pointer opacity-0"
            onChange={(e) => setSelectedDate(e.target.value ? new Date(e.target.value) : null)}
          />
        </label>
      </Card.Header>
      <Card.Body>
        <div className="relative aspect-[2/1] h-[200px] w-full px-4 py-1">
          <canvas ref={canvasRef} className="absolute top-1 left-4 h-full w-full" />
        </div>
      </Card.Body>
    </Card>
  );
};
