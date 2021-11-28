import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import MaterialTable, { MTableToolbar } from "material-table";
import tableIcons from "../../component/tableIcons";
import moment from "moment";
import {dateDifference} from './utils'
import {emp} from './ResourceMenu'
function ActivityReport(props) {
  const user = useSelector((state) => state.user);
  const [selectedRow, setSelectedRow] = useState(0);
  const tableRef = React.createRef();
const [empObj,setEmpObje]=useState();
 
  const [data, setData] = useState([]);

  useEffect(() => {
emp(props.project,user.token,props.emp).then((response)=>{setEmpObje(response)}).catch((err)=>alert(err.message));


      const req={
        
        "date" : moment(new Date()).format('YYYY-MM-DD'),
        "activity_id" : props.activity,
        "project_id" : props.project,
        "jwt" : user.token,
    
  jwt: user.token,
  }
  console.log(req);
    axios
      .post("https://www.nrwlpms.com/api/api/get_employee_report_by_date_by_activity_id_and_by_project_id.php", req)
      .then(async (response) => {
        console.log(response.data);
        await setData(response.data.data);
      });
  }, []);

  useEffect(()=>{
    emp(props.project,user.token,props.emp).then((response)=>{setEmpObje(response)}).catch((err)=>{alert(err.message)});

    const req={
        
        "date" : moment(new Date()).format('YYYY-MM-DD'),
        "activity_id" : props.activity,
        "project_id" : props.project,
        "jwt" : user.token,
    
  jwt: user.token,
  }
  console.log(req);
    axios
      .post("https://www.nrwlpms.com/api/api/get_employee_report_by_date_by_activity_id_and_by_project_id.php", req)
      .then(async (response) => {
      console.log(response.data);
      await setData(response.data.data);
    });


  },[props.activity,props.project])

  const deleteActivityReport = async (mnpr_id) => {
    await axios
      .post("https://www.nrwlpms.com/api/api/delete_ActivityReport.php", {
        mnpr_id: mnpr_id,
        jwt: user.token,
      })
      .then((response) => {
        alert(response.data.message);
      })
      .catch((err) => {
        alert(err.message);
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

    const req=
      {
          "activity_project_id" : props.ap,
          "executed_quantity" : props.exec,
          "date" : moment(new Date()).format('YYYY-MM-DD'),
          "employee_project_id" :newData.employee_project_id,
          "work_hrs_from" : moment(newData.work_hrs_from, "H:mm:ss").format("H:mm:ss"),
          "work_hrs_to" : moment( newData.work_hrs_to, "H:mm:ss").format("H:mm:ss"),
          "work_total_hrs" : dateDifference(moment(newData.work_hrs_to, "H:mm:ss"),moment(newData.work_hrs_from, "H:mm:ss"))
      }


    
    
    console.log(req);
    await axios
    .post("https://www.nrwlpms.com/api/api/create_quantity_surveyor_data.php", {

      "data" :req
            ,
      jwt: user.token,
    })
    .then((response) => {alert(response.data.message)
      const temp={...req,"material_report_id":response.data.material_report_id,
      "activity_report_id": response.data.activity_report_id}
      setData([...data, temp]);
      });
  };

  const updateActivityReport = async (newData) => {
    await axios
      .post("https://www.nrwlpms.com/api/api/update_ActivityReport.php", {
        ...newData,
        jwt: user.token,
      })
      .then((response) => alert(response.data.message))
      .catch((err) => alert(err.message));
  };

  const column = [
    { title: "Employee", field: "employee_project_id",lookup:empObj },
    { title: "Started Working at", field: "work_hrs_from",type:"time" },
    { title: "Ended Working at", field: "work_hrs_to",type:"time" },
    { title: "Total Working Hours", field: "work_total_hrs" },
  ];
  return (
    <MaterialTable
      icons={tableIcons}
      title="ActivityReport"
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
        Toolbar:(props)=>(<div style={{display:"flex",justifyContent:"center"}}><MTableToolbar {...props}/></div>)
        
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
              deleteActivityReport(oldData.mnpr_id);
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

export default ActivityReport;
