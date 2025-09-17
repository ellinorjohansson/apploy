// Chart.tsx

import { useEffect, useState } from 'react';
import { BarChartVariation } from '@digi/arbetsformedlingen';
import { DigiBarChart } from '@digi/arbetsformedlingen-react';
import { fetchChartJobs } from '../services/chartService';
import type { JobAd } from '../types/jobs';

interface ChartSeries {
  yValues: number[];
  title: string;
}

interface ChartData {
  data: {
    xValues: number[];
    series: ChartSeries[];
    xValueNames: string[];
  };
  x: string;
  y: string;
  title: string;
}

export const Chart = () => {
  // State to hold chart data
  const [chartData, setChartData] = useState<ChartData>({
    data: {
      xValues: [],
      series: [{ yValues: [], title: 'Jobb' }],
      xValueNames: [],
    },
    x: 'Antal jobb',
    y: 'Regioner',
    title: 'Dagens jobb per region',
  });

  // State to track loading status
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadJobs = async () => {
      setLoading(true);

      // Fetch job ads (limit 100 in this case)
      const jobs: JobAd[] = await fetchChartJobs(100);

      // Count how many jobs per region
      const regionCounts: Record<string, number> = {};
      jobs.forEach((job) => {
        const region = job.workplace_address?.region || 'Okänd region'; // fallback if region is missing
        regionCounts[region] = (regionCounts[region] || 0) + 1;
      });

      // Prepare data for the chart
      const xValueNames = Object.keys(regionCounts); // Region names
      const yValues = Object.values(regionCounts); // Number of jobs per region

      // Update chart state with processed data
      setChartData({
        data: {
          xValues: yValues,
          series: [{ yValues, title: 'Jobb' }],
          xValueNames,
        },
        x: 'Antal jobb',
        y: 'Regioner',
        title: 'Dagens jobb per region',
      });
      setLoading(false);
    };

    // Load jobs on component mount
    loadJobs();
  }, []);

  // Show loading message while fetching data
  if (loading) {
    return <div>Laddar diagram...</div>;
  }

  return (
    <div style={{ height: '400px', width: '600px' }}>
      <DigiBarChart
        afVariation={BarChartVariation.Horizontal}
        afChartData={chartData}
      />
    </div>
  );
};
