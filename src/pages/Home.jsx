import * as React from 'react';
import { styled } from '@mui/material/styles';
import{ Box,Grid, Card,CardHeader,CardContent}from '@mui/material';
import Charts from '../component/Charts'
import { Doughnut } from "react-chartjs-2";
import ChartDual from '../component/ChartDual';

import * as data from '../component/chartData'
const Item = styled(Card)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),

  color: theme.palette.text.secondary,
}));

export default function Home() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
      <Grid container spacing={2}>
        <Grid item xs={10} md={9} >
          <Item className="home_container">

<CardHeader style={{position:"absolute"}}>Project Control and Management System</CardHeader>
<CardContent>

<ul  style={{color:"white" ,  textAlign: 'left',fontSize:"20px",fontWeight:"bold", fontFamily:"cursive", marginLeft:"20%" }}>
    <li>Create Project</li>
    <li>Manage Project</li>
    <li>View Project Status</li>
    <li>Control Project Resource Allocation</li>
    <li>Control Employee</li>
    <li>Assign Employee To Projects</li>
</ul>

</CardContent>


          </Item>
        </Grid>
        </Grid>
       

        <Grid item xs={6} md={8}>
          <Item><ChartDual/></Item>
        </Grid>



        <Grid item xs={3} md={3}>
          <Item><Doughnut data={data.donught_todate}
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

</Item>
        </Grid>











        <Grid item xs={3} md={6}>
          <Item> <Doughnut data={data.donught_this_month}
        options={{
          plugins: {
            title: {
              display: true,
              text: "This Month"
            },
            legend: {
              display: true,
              position: "bottom"
           }
          }
        }}
      /></Item>
        </Grid>


       














        <Grid item xs={3} md={6}>
          <Item>
          <Doughnut data={data.donught_previous_month}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Previous Month"
            },
            legend: {
              display: true,
              position: "bottom"
           }
          }
        }}
      />
          </Item>
        </Grid>





      




      </Grid>
    </Box>
  );
}