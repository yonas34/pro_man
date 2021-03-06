import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import MaterialTable, { MTableToolbar } from "material-table";
import tableIcons from "../../component/tableIcons";
import moment from "moment";
import {dateDifference} from './utils'
import {mat} from './ResourceMenu'
import {trackPromise} from 'react-promise-tracker'
function MaterialReport(props) {
  const user = useSelector((state) => state.user);
  const [selectedRow, setSelectedRow] = useState(0);
  const tableRef = React.createRef();
const [empObj,setEmpObje]=useState();
 
  const [data, setData] = useState([]);
const users=useSelector(state=>state.material);

  useEffect(() => {
    trackPromise(mat(props.project,user.token,users).then((response)=>{setEmpObje(response)}).catch((err)=>console.log(err.message)))


      const req={
        
        "date" : moment(props.dates).format('YYYY-MM-DD'),
        "activity_id" : props.activity,
        "project_id" : props.project,
        "jwt" : user.token,
    
  jwt: user.token,
  }
  console.log(req);
  trackPromise( axios
      .post("https://www.nrwlpms.org/api/api/get_material_report_by_date_by_activity_id_and_by_project_id.php", req)
      .then(async (response) => {
        console.log(response.data);
        await setData(response.data.data);
      }))
  }, [])

  useEffect(()=>{
    trackPromise(mat(props.project,user.token,users).then((response)=>{setEmpObje(response)}).catch((err)=>{console.log(err.message)})
)
    const req={
        
        "date" : moment(props.dates).format('YYYY-MM-DD'),
        "activity_id" : props.activity,
        "project_id" : props.project,
        "jwt" : user.token,
    
  jwt: user.token,
  }
  console.log(req);
  trackPromise (  axios
      .post("https://www.nrwlpms.org/api/api/get_material_report_by_date_by_activity_id_and_by_project_id.php", req)
      .then(async (response) => {
      console.log(response.data);
      await setData(response.data.data);
    }))


  },[props.activity,props.project,users,props.dates])

  const deleteActivityReport = async (mnpr_id) => {
    await axios
      .post("https://www.nrwlpms.org/api/api/delete_employee_report.php", {
        id: mnpr_id,
        jwt: user.token,
      })
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  
  const addActivityReport = async (newData) => {
    // const req={
    //     "activity_project_id" : props.ap,
    //     "executed_quantity" : props.exec,
    //     "date" :  moment(new Date()).format('YYYY-MM-DD'),
    //     "employee_project_id" : newData.employee_project_id,
    //     "work_hrs_from" :moment(newData.work_hrs_from, "H:mm:ss").format("H:mm:ss"),
    //     "work_hrs_to" :moment( newData.work_hrs_to, "H:mm:ss").format("H:mm:ss"),
    //     "work_total_hrs" : dateDifference(moment(newData.work_hrs_to, "H:mm:ss"),moment(newData.work_hrs_from, "H:mm:ss"))
    // }
console.log(empObj);
console.log(newData);
    const req=
    { data:{
          "activity_project_id" : props.ap,
          "executed_quantity" : props.exec,
          "date" : moment(props.dates).format('YYYY-MM-DD'),
          "material_project_id" :newData.material_project_id,
          "used_quantity" : newData.used_quantity,
      },
      jwt: user.token
}
     
      
    
    
    console.log(req);
    await axios
    .post("https://www.nrwlpms.org/api/api/create_quantity_surveyor_data.php",req )
    .then((response) => {console.log(response.data.message)
     
      const temp={...req.data,"id":response.data.material_report_id,
      "activity_report_id": response.data.activity_report_id}
      setData([...data, temp]);
      });
  };

  const updateActivityReport = async (newData) => {
    const req={
      "matrep_id": newData.id, 
      "material_project_id" : newData.material_project_id,
      "activity_report_id":newData.activity_report_id,
      "used_quantity" : newData.used_quantity,
    jwt: user.token,
  };
  console.log(req);
    await axios
      .post("https://www.nrwlpms.org/api/api/update_quantity_surveyor_data.php",req )
      .then((response) => console.log(response.data.message))
      .catch((err) => console.log(err.message));
  };

  const column = [
    { title: "Material", field: "material_project_id",lookup:empObj },
    { title: "Used Quantity", field: "used_quantity"}
  ];
  return (
    <MaterialTable
    
      icons={tableIcons}
      title="Material Report"
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
        onRowAdd: (newData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              addActivityReport(newData);
              resolve();
            }, 1000);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataUpdate = [...data];
              const index = oldData.tableData.id;
              updateActivityReport(newData);
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
              deleteActivityReport(oldData.id);
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

export default MaterialReport;
