import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart } from "chart.js";
import {  registerables } from 'chart.js';
Chart.register(...registerables);


const BarChart = (props) => {
  const labels = props.labels;
  const backgroundColors = props.data.map(() => {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue})`;
  });
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Candidature per posizioni",
        backgroundColor: backgroundColors,
        borderColor: "rgb(255, 99, 132)",
        data: props.data,
      },
    ],
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero:true,
          fontFamily: "'Arial', sans-serif",
          fontSize: 40
        }
      }],
      xAxes: [{
        ticks: {
          beginAtZero:true,
          fontFamily: "'Arial', sans-serif",
          fontSize: 40
        }
      }]
    }
  };

  

  return (
    <div style={{ width: "500px", height: "300px" , margin:"20px" }}>
      <Bar data={data} />
    </div>
  );
};

export default BarChart;