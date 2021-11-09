import React,{useEffect,useState} from 'react'
import { Doughnut } from "react-chartjs-2";
function Charts(props) {

  
console.log(props.data)
 

    return (
        <div>
      <Doughnut
        data={props.data}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Previous Months"
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
