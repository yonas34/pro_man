import React,{useEffect,useState} from 'react'
import * as chData from './chartData'
import { Doughnut } from "react-chartjs-2";
import ChartDual from '../component/ChartDual';
import CurrencyTextField from '@unicef/material-ui-currency-textfield'

import {
    
    Grid
  } from "@material-ui/core";
  import { useSelector } from 'react-redux';
import MaterialTable from 'material-table';
import tableIcons from './tableIcons';
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
          <MaterialTable icons={tableIcons} title={"Income and Expense"} columns={[{title:"Label",field:"label"},{title:"Previous",field:'previous',render: rowData=> <CurrencyTextField
		
		variant="standard"
		currencySymbol="TSh"
		//minimumValue="0"
		outputFormat="string"
		decimalCharacter="."
		digitGroupSeparator=","
		value={rowData.previous}
    />},{title:"This Month",field:"this",render: rowData=> <CurrencyTextField
	
		variant="standard"
		currencySymbol="TSh"
		//minimumValue="0"
		outputFormat="string"
		decimalCharacter="."
		digitGroupSeparator=","
		value={rowData.this}
    />},{title:"Todate",field:"todate",render: rowData=> <CurrencyTextField
style={{fontSize:"10%",width:"200px"}}
   variant="standard"
		currencySymbol="TSh"
		//minimumValue="0"
		outputFormat="string"
		decimalCharacter="."
		digitGroupSeparator=","
		value={rowData.todate}
    />}]} data={data.unstructuredTotal}/>
          </Grid>
          
        </Grid>}
        </div>
    )
}

export default Dashboard
