import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import MaterialTable, { MTableToolbar } from "material-table";
import tableIcons from "../../component/tableIcons";
import { Card, MenuItem, TextField, Typography } from "@material-ui/core";
import SubTable from "../../component/user/SubTable";
import { data as datas } from "./data";
import ResourceMenu from "../../component/user/ResourceMenu";
import moment from 'moment';
import {Grid} from '@material-ui/core';
import { useStateIfMounted } from "use-state-if-mounted";
function Manpower() {
  const user = useSelector((state) => state.user);
  const [project, setProject] = useState([]);
  const [resource, setResource] = useState({});
  const date=new Date();
  const [data,setData]=useState([ {
    "resource_id" : 29, 
    "engine_hrs_beg" : date.getHours()+":"+date.getMinutes()+":"+date.getSeconds(), 
    "engine_hrs_end" : 22, 
    "operational_hrs_from" : 2, 
    "operational_hrs_to" : 2, 
    "operational_total_hrs" : 4, 
    "idle_hrs_from" : 3, 
    "idle_hrs_to" : 2, 
    "idle_total_hrs" : 3, 
    "idle_reason" : "lunch", 
    "down_hrs_from" : 3, 
    "down_hrs_to" : 4, 
    "down_total_hrs" : 3, 
    "down_reason" : "brocken", 
    "fuel" : 4
},
{
    "resource_id" : 30, 
    "engine_hrs_beg" : date.getHours()+":"+date.getMinutes()+":"+date.getSeconds(), 
    "engine_hrs_end" : 22, 
    "operational_hrs_from" : 2, 
    "operational_hrs_to" : 2, 
    "operational_total_hrs" : 4, 
    "idle_hrs_from" : 3, 
    "idle_hrs_to" : 2, 
    "idle_total_hrs" : 3, 
    "idle_reason" : "lunch", 
    "down_hrs_from" : 3, 
    "down_hrs_to" : 4, 
    "down_total_hrs" : 3, 
    "down_reason" : "brocken", 
    "fuel" : 4
}]);
  const [dataOutLine,setDataOutLine]=useState([]);
  const [activity,setActivity]=useState([]);
  const [projectActivity,setProjectActivity]=useState([]);
  const [setup,setSetup]=useState(false);

  const [selectedRow, setSelectedRow] = useState(0);
  const tableRef = React.createRef();
  const [resourceObj,setResourceObj]=useState([]);
  const [material,setMaterial]=useState([]); 
  var resourceTypeReformatted=null;
 
 const [exec,setExec]=useState('')

const [selectedProject,setSelectedProject]=useStateIfMounted(user.resp[0].project_id);

const actRef=React.createRef();
const proRef=React.createRef();
const [selectedActivity,setSelectedActivity]=useStateIfMounted(0);

  useEffect(() => {
    var initial_activity;

    axios.post("https://www.nrwlpms.com/api/api/get_all_activity.php",{
      jwt:user.token
    }).then((response)=>{
      setActivity(response.data.data.reduce((acc,cur)=>{
        acc[cur.activity_id]=cur.activity_name;
        return acc;
      }))

    }).catch((err)=>alert(err.message))

    user.resp.reduce(async (acc, cur) => {
      if (!project.find((pro) => pro.project_id == cur.project_id)) {
        await axios
          .post("https://www.nrwlpms.com/api/api/get_single_project.php", {
            project_id: cur.project_id,
            jwt: user.token,
          })
          .then((response) => {
            console.log(response.data.data);
            setProject([...project, response.data.data]);
            ResourceMenu(user.resp[0].project_id, user).then((data)=>setResource(data))
          })
          .catch((err) => alert(err.message));

      }

      

      return acc;
    }, {});
    
    axios.post("https://www.nrwlpms.com/api/api/get_activity_project_by_project_id.php",{
      project_id:user.resp[0].project_id,
      jwt:user.token
    }).then((response)=>{
console.log(response.data.data);
setProjectActivity(response.data.data);
setSelectedActivity(response.data.data[0].activity_id);
axios.post("https://www.nrwlpms.com/api/api/get_quantity_surveyor_data_by_date_by_activity_id_and_by_project_id.php",{
  project_id:user.resp[0].project_id,
  activity_id:response.data.data[0].activity_id,
  date:moment(new Date()).format('YYYY-MM-DD'),
  jwt:user.token
  
  
  }).then((response)=>{setData(response.data.data)}).catch((err)=>alert(err));
  
  
  })
  },[]);
 
  const selectProject = async(value) => {
    console.log(value)
    ResourceMenu(value, user).then((data) => {
      
      setResource(data);
    });
    console.log(resource);
    
    await axios.post("https://www.nrwlpms.com/api/api/get_quantity_surveyor_data_by_date_by_activity_id_and_by_project_id.php",{
project_id:value,
activity_id:selectedActivity,
date:moment(new Date()).format('YYYY-MM-DD'),
jwt:user.token


}).then((response)=>{console.log(response.data.data)}).catch((err)=>alert(err));

  };
const selectActivityProject=async (values)=>{
setSelectedActivity(values)
  console.log(values);

await axios.post("https://www.nrwlpms.com/api/api/get_quantity_surveyor_data_by_date_by_activity_id_and_by_project_id.php",{
project_id:selectedProject,
activity_id:values,
date:moment(new Date()).format('YYYY-MM-DD'),
jwt:user.token


}).then((response)=>{console.log(response.data.data)}).catch((err)=>alert(err));




}




















const column = [
    
  { title: "Resources", field: "resource_id",lookup:resource },
  {
    title: "Engine Beggining Hours",
    field: "engine_hrs_beg",
    initialEditValue:moment(new Date()).format('hh-mm-ss') ,
  },
  { title: "Engine Ending Hours", field: "engine_hrs-end", initialEditValue:"", type: "numeric" },
  {
    title: "Operational Hours From",
    field: "operational_hrs_from",
    initialEditValue:""
  },

  {
    title: "Operational Hours To",
    field: "operational_hrs_to",
    initialEditValue:""
  },
  {
    title: "Idle Hours From",
    field: "idle_hrs_from",
    initialEditValue:""
  },
  {
    title: "Idle Hours To",
    field: "idle_hrs_to",
    initialEditValue:""
  },
  {
    title: "Idle Total Hours",
    field: "idle_total_hrs",
    initialEditValue:""
  },
  {
    title: "Idle Reason",
    field: "idle_reason",
    initialEditValue:""
  },

  {
    title: "Idle Total Hours",
    field: "operational_hrs_from",
    initialEditValue:""
  },
  {
    title: "Down Hours From",
    field: "down_hrs_from",
    initialEditValue:"",
  },
  {
    title: "Down Hours To",
    field: "down_hrs_to",
    initialEditValue:"",
  },
  {
    title: "Down Total Hours",
    field: "down_total_hrs",
  },

  {
    title: "Down Reason",
    field: "down_reason",
  },
  {
    title: "Fuel",
    field: "fuel",
  },

];















const deleteMaterialProjectTable = async (emp_id) => {
 console.log(emp_id);
 
  await axios
    .post("https://www.nrwlpms.com/api/api/delete_employee_project.php", {
      ...emp_id,
      jwt: user.token,
    })
    .then((response) => {
      alert(response.data.message);
    })
    .catch((err) => {
      alert(err.message);
    });
};

const addMaterialProjectTable = async (newData) => {
  console.log(newData)
const ds={
  
  "data" :
      {
        "activity_project_id" : 9,
          "executed_quantity" : exec,
          "date" :moment(new Date()).format('YYYY-MM-DD'),
          "resource_id" : newData.resource_id,
          "engine_hrs_beg" : newData.engine_hrs_beg,
          "engine_hrs_end" : newData.engine_hrs_end,
          "operational_hrs_from" : newData.operational_hrs_from,
          "operational_hrs_to" : newData.operational_hrs_to,
          "operational_total_hrs" : newData.operational_total_hrs,
          "idle_hrs_from" : newData.idle_hrs_from,
          "idle_hrs_to" : newData.idle_hrs_to,
          "idle_total_hrs" : newData.idle_total_hrs,
          "idle_reason" : newData.idle_reason,
          "down_hrs_from" : newData.down_hrs_from,
          "down_hrs_to" : newData.down_hrs_to,
          "down_total_hrs" : newData.down_total_hrs,
          "down_reason" : newData.down_reason,
          "fuel" : newData.fuel
      },


jwt: user.token,
}
 console.log(ds);

  await axios
  .post("https://www.nrwlpms.com/api/api/create_quantity_surveyor_data.php", ds)
  .then((response) => {alert(response.data.message) 
    console.log(response.data);
  //  const newTemp={...newData,id:response.data.id};
  setData([...data,ds.data]);
     ;}).catch((err)=>alert(err.message));
    

};

const updateMaterialProjectTable = async (newData) => {
  await axios
    .post("https://www.nrwlpms.com/api/api/update_material_project.php", {
      ...newData,
      jwt: user.token,
    })
    .then((response) => alert(response.data.message))
    .catch((err) => alert(err.message));
};
  return (
    <div>
                      <Grid container direction={"row"} spacing={7}>

<Grid item>
<Typography variant={"h6"}>Assigned Projects:</Typography>
        <TextField  select   value={selectedProject} onChange={(value)=>selectProject(value.target.value)}>
          {project.map((pro) => (
            <MenuItem
              divider
              key={pro.project_id}
              value={pro.project_id}
            >
              {pro.pro_name}
            </MenuItem>
          ))}
        </TextField>
     </Grid>
     <Grid item>
     <Typography variant={"h6"}>Executed Quantity:</Typography>
      <TextField
      type={'number'}
      onChange={(value)=>setExec(value.target.value)}
  
             name="exec"
           
             size={"small"}
             value={exec}
      />
      </Grid>
      <Grid item>
        <Typography variant={"h6"}>Activities:</Typography>
      <TextField value={selectedActivity} select  onChange={(value)=>selectActivityProject(value.target.value)}>
          {projectActivity.map((pro) => {console.log(pro)
            return(
            <MenuItem
              divider
              key={pro.activity_id}
              value={pro.activity_id}
            >
              {activity[pro.activity_id]}
            </MenuItem>
          )})}
    </TextField>
      </Grid>
      

    </Grid>
      <MaterialTable
      icons={tableIcons}
      title="Quantity Surveryor"
      tableRef={tableRef}
      columns={column}
      data={data}
      components={{
Toolbar:(props)=>(<div style={{display:"flex",justifyContent:"center"}}><MTableToolbar {...props}/></div>)

      }}
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
          width:'100%',
        },
      }}
      components={{
        Toolbar: (props) => (
          <div style={{ display:"flex",justifyContent:"center",color: "white", backgroundColor: "#1976d2" }}>
            <MTableToolbar {...props} />
          </div>
        ),
      }}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              
              addMaterialProjectTable(newData);
          
              resolve();
            }, 1000);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            console.log(newData);
            setTimeout(() => {
              const dataUpdate = [...data];
              const index = oldData.tableData.id;
              updateMaterialProjectTable(newData);
        
              dataUpdate[index] = newData;
              setData([...dataUpdate]);
              resolve();
            }, 1000);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              const dataDelete = [...data];
              const index = oldData.tableData.id;
              dataDelete.splice(index, 1);
              deleteMaterialProjectTable(oldData);
              setData([...dataDelete]);
              resolve();
            }, 1000);
          }),
      }}
      onRowClick={(evt, selectedRow) =>
        setSelectedRow(selectedRow.tableData.id)
      }

      options={{
        exportButton: true,
        exportCsv: (columns, data) => {
          console.log(data);
          const fData=
          {"activity_project_id" : 9,
              executed_quantity : exec,
              date : moment(new Date()).format('YYYY-MM-DD'),
              data:data,
               jwt:user.token
            }

              axios.post('https://www.nrwlpms.com/api/api/save_quantity_surveyor_data.php', JSON.stringify(fData)).then((response)=>console.log(response.data)).catch((err)=>alert(err.message))
           console.log(fData);
        }
      }}
    />



















    </div>
  );
}

export default Manpower;
