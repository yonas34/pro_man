import React,{useEffect,useState} from 'react'
import * as chData from './chartData'
import { Doughnut } from "react-chartjs-2";
import ChartDual from '../component/ChartDual';
import {
    
    Grid
  } from "@material-ui/core";
  import { useSelector } from 'react-redux';
function Dashboard(props) {
const user=useSelector(state=>state.user);
const [data,setData]=useState({});
useEffect(() => {
  let isMounted = true;
 chData.CharD(props.pro_id,user.token).then((data)=>{
   
   if(isMounted) setData(data)});
   return()=>{isMounted=false}

}, [props.pro_id])
useEffect(async() => {

 await chData.CharD(props.pro_id,user.token).then((data)=>{
   
  setData(data)});
   

}, [])
console.log(data);
    return (
        <div>
          { data.percent &&  <Grid
          container
          spacing={2}
          style={{ textAlignment: "center", justifyContent: "center" }}>


         
          <Grid item xs={6} md={4}>
          <Doughnut data={data.percent.todate}
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
          <Grid item xs={6} md={4}>
          <Doughnut
              data={data.percent.previous}
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
          <Grid item xs={6} md={4}>
          <Doughnut
              data={data.percent.this}
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: "This Month",
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
          <ChartDual data={data.total}/>
          </Grid>
          
        </Grid>}
        </div>
    )
}

export default Dashboard
