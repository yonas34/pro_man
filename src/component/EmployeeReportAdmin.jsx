import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import MaterialTable, { MTableToolbar } from "material-table";
import tableIcons from "./tableIcons";
import moment from "moment";
import {dateDifference} from './user/utils'
import {trackPromise} from 'react-promise-tracker'
import { dPP } from "./pp";
function ActivityReport(props) {
  const user = useSelector((state) => state.user);
  const [selectedRow, setSelectedRow] = useState(0);
  const tableRef = React.createRef();

 
  const [data, setData] = useState([]);

  useEffect(() => {
    if(props.data)setData([...props.data]);
    
  }, [])


  useEffect(()=>{

    if(props.data)setData([...props.data])
  },[props.data])

 

  const updateActivityReport = async (newData,oldData) => {
    console.log(newData);
    const req={
      "id": newData.id, 
      "date":newData.date,
      "emp_pic":newData.emp_pic,
      "first_name":newData.first_name,
      "last_name":newData.last_name,
      "work_hrs_from" : moment(newData.work_hrs_from, "H:mm:ss").format("H:mm:ss"),
      "work_hrs_to":  moment( newData.work_hrs_to, "H:mm:ss").format("H:mm:ss"),
      "work_total_hrs": dateDifference(moment(newData.work_hrs_to, "H:mm:ss"),moment(newData.work_hrs_from, "H:mm:ss")),
    jwt: user.token,
  };
  console.log(req);
    await axios
      .post("https://www.nrwlpms.com/api/api/update_employee_report.php",req )
      .then((response) =>{ console.log(response.data.message)
        const dataUpdate = [...data];
        const index = oldData.tableData.id;
        dataUpdate[index] = req;
        setData([...dataUpdate]);
      
      
      })
      .catch((err) => console.log(err.message));
  };

  const column = [
    {title:"Date",field:"date",type:"date"},
    {
      title: "Profile Picture",
      field: "emp_pic",
      editable: "never",
      render: (rowData) => (
        <img
          src={
            rowData.emp_pic == undefined || rowData.emp_pic==""
              ? "data:image/jpeg;base64," + dPP
              : "data:image/jpeg;base64," + rowData.emp_pic
          }
          style={{ width: 50, borderRadius: "50%" }}
        />
      ),
    },
    {title:"First Name",field:"first_name",editable:"never"},
    
    {title:"Last Name",field:"last_name",editable:"never"},
    { title: "Started Working at", field: "work_hrs_from",type:"time" },
    { title: "Ended Working at", field: "work_hrs_to",type:"time" },
    { title: "Total Working Hours", field: "work_total_hrs" ,editable:"never"},
  ];
  return (
    <MaterialTable
    
      icons={tableIcons}
      title="Employe Activity Report"
      tableRef={tableRef}
      columns={column}
      data={data}
      options={{
        rowStyle: (rowData) => ({
          backgroundColor:
            selectedRow === rowData.tableData.id ? "#EEE" : "#FFF",
        }),
        headerStyle: {
          fontWeight: "bold",
          headerStyle: { position: "sticky", top: 0 },
          maxBodyHeight: 500,
          width: "100%",
        },
      }}
      components={{
        Toolbar:(props)=>(<div style={{display:"flex",justifyContent:"center",color: "white",
        backgroundColor: "#1976d2",}}><MTableToolbar {...props}/></div>)
        
              }}

      editable={{
      
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              
              updateActivityReport(newData,oldData);
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

export default ActivityReport;
