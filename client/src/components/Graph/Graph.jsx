import React from "react";
import "./Graph.css";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const Graph = ({ totalContribution, graphData, days }) => {
  const data = {
    labels: days,
    datasets: [
      {
        label: "Contribution",
        data: graphData,
        backgroundColor: "aqua",
        borderColor: "black",
        pointBorderColor: "aqua",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    plugins: {
      legend: true,
    },
    scales: {
      y: {},
    },
  };

  return (
    <div>
      <h2 className="graph-h2">Total Contribution : {totalContribution}</h2>
      <hr></hr>
      <h2 className="contribution-graph-h2">Contribution Graph</h2>
      <div
        style={{
          width: "50rem",
          height: "30rem",
        }}
      >
        <Line data={data} options={options}></Line>
      </div>
    </div>
  );
};

export default Graph;
