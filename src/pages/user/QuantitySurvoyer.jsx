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

const [selectedProject,setSelectedProject]=useState();
const [selectedActivity,setSelectedActivity]=useState();



  useEffect(() => {

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

    })
    


console.log(projectActivity);














  },[]);

  const selectProject = (value) => {
    console.log(value)
    ResourceMenu(value, user).then((data) => {
      
      setResource(data);
    });
    console.log(resource);
    setSelectedProject(value)

  };
const selectActivityProject=(values)=>{
setSelectedActivity(values)
  console.log(values);
}




















const column = [
    
  { title: "Resources", field: "resource_id",lookup:resource },
  {
    title: "Engine Beggining Hours",
    field: "engine_hrs_beg",
    initialEditValue: "initial edit value",
  },
  { title: "Engine Ending Hours", field: "engine_hrs-end", type: "numeric" },
  {
    title: "Operational Hours From",
    field: "operational_hrs_from",
  },

  {
    title: "Operational Hours To",
    field: "operational_hrs_to",
  },
  {
    title: "Idle Hours From",
    field: "idle_hrs_from",
  },
  {
    title: "Idle Hours To",
    field: "idle_hrs_to",
  },
  {
    title: "Idle Total Hours",
    field: "idle_total_hrs",
  },
  {
    title: "Idle Reason",
    field: "idle_reason",
  },

  {
    title: "Idle Total Hours",
    field: "operational_hrs_from",
  },
  {
    title: "Down Hours From",
    field: "down_hrs_from",
  },
  {
    title: "Down Hours To",
    field: "down_hrs_to",
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
console.log(newData.resource_id);
var tempR=resource;
delete tempR[newData.resource_id];
  setData([...data, newData])
  // await axios
  // .post("https://www.nrwlpms.com/api/api/create_material_project.php", {
  //   mat_id:newData.mat_id,
    
  //   jwt: user.token,
  // })
  // .then((response) => {alert(response.data.message) 
    
  //   const newTemp={...newData,id:response.data.id};
  //    ;}).catch((err)=>alert(err.message));
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
    
        <TextField select label="Assigned Projects" onChange={(value)=>selectProject(value.target.value)}>
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
     
      <TextField
      type={'number'}
      onChange={(value)=>setExec(value.target.value)}
  
             label={"Executed Quantity"}
             name="exec"
           
             size={"small"}
             value={exec}
      />
     <br/>
     <br/>
      <TextField select label="Activities" onChange={(value)=>selectActivityProject(value.target.value)}>
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
      
      

    <br/>
     <br/>
      <MaterialTable
      icons={tableIcons}
      title="MaterialProjectTable"
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
