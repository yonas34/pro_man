import * as React from 'react';
import { styled } from '@mui/material/styles';
import{ Box,Grid, Card,CardHeader,CardContent}from '@mui/material';

// import Paper from '@mui/material/Paper';
// import Grid from '@mui/material/Grid';
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
          <Item>

<CardHeader>Project Control and Management System</CardHeader>
<CardContent>

<ul  style={{color:"white" ,  textAlign: 'left',fontSize:"20px",fontWeight:"bold", fontFamily:"cursive",backgroundColor:"#1976d2", marginLeft:"20%" }}>
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
        <Grid item xs={6} md={4}>
          <Item>xs=6 md=4</Item>
        </Grid>
        <Grid item xs={6} md={4}>
          <Item>xs=6 md=4</Item>
        </Grid>
        <Grid item xs={6} md={8}>
          <Item>xs=6 md=8</Item>
        </Grid>
      </Grid>
    </Box>
  );
}