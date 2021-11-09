import React,{useEffect,useState} from 'react'
import { Bar } from "react-chartjs-2";
function Charts() {
    const [chartData, setChartData] = useState({})
// useEffect(() => {
//     const fetchPrices = async () => {
//         const res = await fetch("https://api.coincap.io/v2/assets/?limit=5")
//         const data = await res.json()
//         setChartData({
//             labels: data.data.map((crypto) => crypto.name),
//             datasets: [
//               {
//                 label: "Price in USD",
//                 data: data.data.map((crypto) => crypto.priceUsd),
//                 backgroundColor: [
//                   "#ffbb11",
//                   "#ecf0f1",
//                   "#50AF95",
//                   "#f3ba2f",
//                   "#2a71d0"
//                 ]
//               }
//             ]
//           });
//       }
//       fetchPrices()
  
// }, [setChartData])

const data = {
    labels: ['Red', 'Orange', 'Blue'],
    // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
    datasets: [
        {
          label: 'Popularity of colours',
          data: [55, 23, 96],
          // you can set indiviual colors for each bar
          backgroundColor: [
            'red','orange' , 'blue'],
          borderWidth: 1,
        }
    ]
}
    return (
        <div>
      <Bar
        data={data}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Cryptocurrency prices"
            },
            legend: {
              display: true,
              position: "bottom"
           }
          }
        }}
      />
        </div>
    )
}

export default Charts;
