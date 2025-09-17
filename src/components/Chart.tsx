import { useEffect, useState } from "react";
import { BarChartVariation } from "@digi/arbetsformedlingen";
import { DigiBarChart } from "@digi/arbetsformedlingen-react";
import { fetchChartJobs } from "../services/chartService"; 
import type { JobAd } from "../types/jobs";

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
  const [chartData, setChartData] = useState<ChartData>({
    data: {
      xValues: [],
      series: [{ yValues: [], title: "Jobb" }],
      xValueNames: [],
    },
    x: "Antal jobb",
    y: "Regioner",
    title: "",
  });

  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const loadJobs = async () => {
      setLoading(true);
      const jobs: JobAd[] = await fetchChartJobs(100);

      const regionCounts: Record<string, number> = {};
      jobs.forEach(job => {
        const region = job.workplace_address?.region || "Okänd region";
        regionCounts[region] = (regionCounts[region] || 0) + 1;
      });

      const xValueNames = Object.keys(regionCounts);
      const yValues = Object.values(regionCounts);

      setChartData({
        data: {
          xValues: yValues,
          series: [{ yValues, title: "Jobb" }],
          xValueNames,
        },
        x: "Antal jobb",
        y: "Regioner",
        title: "",
      });
      setLoading(false);
    };

    loadJobs();
  }, []);

  if (loading) {
    return <div>Laddar diagram...</div>; 
  }

  return (
    <div className="chart-container">
      <DigiBarChart
        afVariation={BarChartVariation.Horizontal}
        afChartData={chartData}
      />
    </div>
  );
};
