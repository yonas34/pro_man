import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { useSelector } from "react-redux";
import MaterialTable, { MTableToolbar } from "material-table";
import tableIcons from "./tableIcons";
import { FormatUnderlinedSharp } from '@material-ui/icons';
import { Grid } from '@material-ui/core';

function Expense(props) {
    const user = useSelector((state) => state.user);
    const [selectedRow, setSelectedRow] = useState(0);
    const tableRef = React.createRef();
    const [datas, setData] = useState();
    const [expenseSum,setExpenseSum]=useState();
    
    
     
      const Tables=(props)=> {

        const column = props.column;
        const urls=props.urls;
        const data=props.data;

        const deleteResource = async (res_type_id) => {
            await axios
              .post(urls, {
                res_type_id: res_type_id,
                jwt: user.token,
              })
              .then((response) => {
                console.log(response.data.message);
              })
              .catch((err) => {
                console.log(err.message);
              });
          };
        const addResource = async (newData) => {
      

          await axios
            .post(urls, {
              ...newData,
              jwt: user.token,
            })
            .then((response) => console.log(response.data.message));
        };
      
        const updateResource = async (newData) => {
          await axios
            .post(FormatUnderlinedSharp, {
         ...newData,
              jwt: user.token,
            })
            .then((response) => console.log(response.data.message))
            .catch((err) => console.log(err.message));
        };
      
        return (
          <MaterialTable
            icons={tableIcons}
            title={props.title}
            tableRef={tableRef}
            columns={column}
            data={data}
            options={{
              actionsColumnIndex: -1,
              rowStyle: (rowData) => ({
                backgroundColor:
                  selectedRow === rowData.tableData.id ? "#EEE" : "#FFF",
              }),
              headerStyle: {
                fontWeight: "bold",
                headerStyle: { position: "sticky", top: 0 },
                maxBodyHeight: 500,
              },
            }}
            components={{
              Toolbar: (props) => (
                <div style={{ color: "white", backgroundColor: "#1976d2" }}>
                  <MTableToolbar {...props} />
                </div>
              ),
            }}
            editable={{
              onRowAdd: (newData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    addResource({
                      equipment: newData.equipment,
                      fule_cons_per_hr: newData.fule_cons_per_hr,
                      rate_hr: newData.rate_hr,
                    });
                    setData([...data, newData]);
                    resolve();
                  }, 1000);
                }),
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    const dataUpdate = [...data];
                    const index = oldData.tableData.id;
                    updateResource({
                      res_type_id: newData.res_type_id,
                      rate_hr: newData.rate_hr,
                      equipment: newData.equipment,
                      fule_cons_per_hr: newData.fule_cons_per_hr,
                    });
                    dataUpdate[index] = newData;
                    setData([...dataUpdate]);
                    resolve();
                  }, 1000);
                }),
              onRowDelete: (oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    const dataDelete = [...data];
                    const index = oldData.tableData.id;
                    dataDelete.splice(index, 1);
                    deleteResource(oldData.res_type_id);
                    setData([...dataDelete]);
                    resolve();
                  }, 1000);
                }),
            }}
            onRowClick={(evt, selectedRow) =>
              setSelectedRow(selectedRow.tableData.id)
            }
          />
        );
      }
      
      






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
            data: Object.values(props.graphData.find(obj=>obj.types=='Equipment')).splice(1,3),
            borderColor:"#050ef5",
            backgroundColor:"rgba(3, 66, 255,0.5)",
            stack:0
          },
          {
            label: 'Manpower',
            data: Object.values(props.graphData.find(obj=>obj.types=='Manpower')).splice(1,3),
            borderColor: "rgb(178, 53, 3)",
            backgroundColor:"rgba(179, 74, 4,0.5)" ,
            stack:0
          },
          {
            label: 'Material',
            data: Object.values(props.graphData.find(obj=>obj.types=='Material')).splice(1,3),
            borderColor: "#302e2c",
            backgroundColor: "rgba(98, 94, 92,0.5)",
            stack:0
          },
          {
            label: 'Fuel',
            data: Object.values(props.graphData.find(obj=>obj.types=='Fuel')).splice(1,3),
            borderColor: "#9f9406",
            backgroundColor:"rgba(217, 208, 7,0.5)",
            stack:0
          },
          {
            label: 'Other',
            data: Object.values(props.graphData.find(obj=>obj.types=='Other')).splice(1,3),
            borderColor:"#047f7d",
            backgroundColor:"rgba(7, 215, 212,0.5)",
            stack:0
          }
        ]
      };
     
      const config = {
        type: 'bar',
        data: data,
        options: {
          indexAxis: 'y',
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

      const temp=props.table1Data.map(data=>Object.values(data).splice(1,3));

const dataTemp=[temp[0][0]+temp[1][0]+temp[2][0]+temp[3][0],temp[0][1]+temp[1][1]+temp[2][1]+temp[3][1],temp[0][2]+temp[1][2]+temp[2][2]+temp[3][2]];
const sum={description:"sum",todate:dataTemp[0],thisMonth:dataTemp[1],previousMonth:dataTemp[2]};
const incomeVsExpense=[{"description":"PreviousMonth",income:props.income[2],expense:dataTemp[2],profit:(props.income[2]-dataTemp[2])},{"description":"This Month",income:props.income[1],expense:dataTemp[1],profit:(props.income[1]-dataTemp[1])},{"description":"Todate",income:props.income[0],expense:dataTemp[0],profit:(props.income[0]-dataTemp[0])}];




const Table2Data=()=>{


  return <Tables title={"Expenses"} column={[{title:"Description",field:"description"},{title:"Previous Month",field:"previousMonth"},{title:"This Month",field:"thisMonth"},{title:"Todate",field:"todate"}]} data={[...props.table1Data,sum]}/>

}


const Table3Data=()=>{



  
  return <Tables title={""} column={[{title:"Description",field:"description"},{title:"Direct Expense",field:"directExpense"},{title:"Indirect Expense",field:"indirectExpense"},{title:"IDLE Amt & Profit",field:"idle"},{title:"Direct Expense %",field:"directExpenseP"},{title:"Indirect Expense %",field:"indirectExpenseP"},{title:"IDLE %",field:"idleP"}]} data={[{description:"PREVIOUS",directExpense:275479560,indirectExpense:48431618,idle:4495325,directExpenseP:83.9,indirectExpenseP:14.7,idleP:1.4},{description:"THIS MONTH",directExpense:169009600,indirectExpense:26558500,idle:3565500,directExpenseP:84.9,indirectExpenseP:13.3,idleP:1.8},{description:"TODATE",directExpense:444489160,indirectExpense:74990118,idle:8060825,directExpenseP:84.3,indirectExpenseP:14.2,idleP:1.5}]}/>
}


const Table1Data=()=>{
  
  return <Tables title={"Income vs Expenses"} column={[{title:"Description",field:"description"},{title:"Income",field:"income"},{title:"Expense",field:"expense"},{title:"OH & Profit",field:"profit"}]} data={incomeVsExpense}/>



}
    return (
        <div>
            <Grid container  spacing={2} style={{ textAlignment: "center", justifyContent: "center" }}>
            <Grid item xs={6} md={6} >
<Table2Data/>
    </Grid>

    <Grid item xs={6} md={6} >
<Table1Data/>
    </Grid>
    <Grid item xs={6} md={6} style={{marginLeft:"25%",marginRight:"25%"}} >
<Table3Data/>
    </Grid>
  
<Grid item xs={6} md={6} style={{marginLeft:"25%",marginRight:"25%"}}>
           <Bar  {...config}/>
     
               <Tables title={"Expenses %"} column={[{title:"Type",field:"types"},{title:"Previous Month",field:"previousMonth"},{title:"This Month",field:"thisMonth"},{title:"Todate",field:"todate"}]} data={props.graphData}/>
           </Grid>
           </Grid>
        </div>
    )
}

export default Expense





















