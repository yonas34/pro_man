import React from 'react'
import * as chData from './chartData'
import { Doughnut } from "react-chartjs-2";
import ChartDual from '../component/ChartDual';
import {
    
    Grid
  } from "@material-ui/core";
function Dashboard() {
    return (
        <div>
             <Grid
          container
          spacing={2}
          style={{ textAlignment: "center", justifyContent: "center" }}
        >


         
          <Grid item xs={6} md={5}>
          <Doughnut data={chData.donught_todate}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Todate"
            },
            legend: {
              display: true,
              position: "bottom"
           }
          }
        }}
      />
          </Grid>
          <Grid item xs={6} md={5}>
          <Doughnut
              data={chData.donught_previous_month}
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: "Previous Month",
                  },
                  legend: {
                    display: true,
                    position: "bottom",
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={6} md={7}>
          <ChartDual/>
          </Grid>
          
        </Grid>
        </div>
    )
}

export default Dashboard
