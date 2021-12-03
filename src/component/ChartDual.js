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

const ChartDual = (props) => (
  
    <Bar data={props.data} options={options} />
 
);

export default ChartDual;