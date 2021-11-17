import React from 'react'
import { Bar } from "react-chartjs-2";

function Expense() {

    // const actions = [
    //     {
    //       name: 'Randomize',
    //       handler(chart) {
    //         chart.data.datasets.forEach(dataset => {
    //           dataset.data = Utils.numbers({count: chart.data.labels.length, min: -100, max: 100});
    //         });
    //         chart.update();
    //       }
    //     },
    //     {
    //       name: 'Add Dataset',
    //       handler(chart) {
    //         const data = chart.data;
    //         const dsColor = Utils.namedColor(chart.data.datasets.length);
    //         const newDataset = {
    //           label: 'Dataset ' + (data.datasets.length + 1),
    //           backgroundColor: Utils.transparentize(dsColor, 0.5),
    //           borderColor: dsColor,
    //           borderWidth: 1,
    //           data: Utils.numbers({count: data.labels.length, min: -100, max: 100}),
    //         };
    //         chart.data.datasets.push(newDataset);
    //         chart.update();
    //       }
    //     },
    //     {
    //       name: 'Add Data',
    //       handler(chart) {
    //         const data = chart.data;
    //         if (data.datasets.length > 0) {
    //           data.labels = Utils.months({count: data.labels.length + 1});
      
    //           for (let index = 0; index < data.datasets.length; ++index) {
    //             data.datasets[index].data.push(Utils.rand(-100, 100));
    //           }
      
    //           chart.update();
    //         }
    //       }
    //     },
    //     {
    //       name: 'Remove Dataset',
    //       handler(chart) {
    //         chart.data.datasets.pop();
    //         chart.update();
    //       }
    //     },
    //     {
    //       name: 'Remove Data',
    //       handler(chart) {
    //         chart.data.labels.splice(-1, 1); // remove the label first
      
    //         chart.data.datasets.forEach(dataset => {
    //           dataset.data.pop();
    //         });
      
    //         chart.update();
    //       }
    //     }
    //   ];
      // </block:actions>
      
      // <block:setup:1>
     
      const axes = React.useMemo(
        () => [
          { primary: true, type: 'ordinal', position: 'left' },
          { position: 'bottom', type: 'linear', stacked: true }
        ],
        []
      )
      const labels = ['Todate','This Month','Previous Month'];
      const data = {
        labels: labels,
        datasets: [
          {
            label: 'Equipment',
            data: [25.9,13.1,33.7],
            borderColor:"#050ef5",
            backgroundColor:"rgba(3, 66, 255,0.5)",
            stack:0
          },
          {
            label: 'Manpower',
            data: [9.7,7.9,10.8],
            borderColor: "rgb(178, 53, 3)",
            backgroundColor:"rgba(179, 74, 4,0.5)" ,
            stack:0
          },
          {
            label: 'Material',
            data: [50.0,73.3,35.8],
            borderColor: "#302e2c",
            backgroundColor: "rgba(98, 94, 92,0.5)",
            stack:0
          },
          {
            label: 'Fuel',
            data: [14.4,5.7,19.7],
            borderColor: "#9f9406",
            backgroundColor:"rgba(217, 208, 7,0.5)",
            stack:0
          },
          {
            label: 'Other',
            data: [0.0,0.0,0.0],
            borderColor:"#047f7d",
            backgroundColor:"rgba(7, 215, 212,0.5)",
            stack:0
          }
        ]
      };
      // </block:setup>
      
      // <block:config:0>
      const config = {
        type: 'bar',
        data: data,
        options: {
          indexAxis: 'y',
          // Elements options apply to all of the options unless overridden in a dataset
          // In this case, we are setting the border of each horizontal bar to be 2px wide
          elements: {
            bar: {
              borderWidth: 2,
            }
          },
          responsive: true,
          plugins: {
            legend: {
              position: 'right',
            },
            title: {
              display: true,
              text: 'Expense'
            }
          }
        },
       
      };



    return (
        <div>
           <Bar  {...config}/>
        </div>
    )
}

export default Expense
