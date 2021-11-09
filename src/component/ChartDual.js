import React from 'react';
import { Bar } from 'react-chartjs-2';
import {dualData} from './chartData'

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const ChartDual = () => (
  
    <Bar data={dualData} options={options} />
 
);

export default ChartDual;