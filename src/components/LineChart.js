import React, { useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const LineChart = ({ data, labels }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        // Destroy the previous chart instance if it exists
        chartInstance.current.destroy();
      }
      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Data',
              data: data,
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
          ],
        },
        options: {
          scales: {
            x: {
              type: 'category',
              display: true,
              title: {
                display: true,
                text: 'X Axis',
              },
            },
            y: {
              display: true,
              title: {
                display: true,
                text: 'Y Axis',
              },
            },
          },
        },
      });
    }
  }, [data, labels]);

  return <canvas ref={chartRef} />;
};

export default LineChart;
