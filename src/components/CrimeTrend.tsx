"use client";

import * as React from "react";

import axios from "axios";
import ReactApexChart from "react-apexcharts";
import { message } from "antd";

const CrimeTrend = () => {
  const [crimeTrendData, setCrimeTrendData] = React.useState<
    { x: string; y: number }[]
  >([]);

  React.useEffect(() => {
    async function fetchCrimeTrendData() {
      try {
        const response = await axios.get("/api/trends");

        if (response.status === 200) {
          const data = response.data;
          setCrimeTrendData(data);
        } else {
          message.error("Error fetching crime trend data");
        }
      } catch (error) {
        console.log("Error fetching crime trend data", error);
      }
    }

    fetchCrimeTrendData();
  }, []);

  const chartOptions = {
    chart: {
      id: "crime-trend",
      animations: {
        enabled: true,
        easing: "linear",
        dynamicAnimation: {
          speed: 1000,
        },
      },
    },
    xaxis: {
      type: "datetime",
      title: {
        text: "Date",
      },
    },
    yaxis: {
      title: {
        text: "Number of Cases",
      },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
  };

  return (
    <div>
      <ReactApexChart
        options={chartOptions as ApexCharts.ApexOptions}
        series={[{ name: "Crime Trend", data: crimeTrendData }]}
        type="line"
        height={350}
      />
    </div>
  );
};

export default CrimeTrend;
