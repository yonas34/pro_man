import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import MaterialTable, { MTableToolbar } from "material-table";
import tableIcons from "../../component/tableIcons";
import { Card, MenuItem, Typography } from "@material-ui/core";
function Manpower() {
  const user = useSelector((state) => state.user);
  const [selectedRow, setSelectedRow] = useState(0);
  const tableRef = React.createRef();
  const [project,setProject]=useState([]);
const [resourceType,setResourceType]=useState([]);
const [resource,setResource]=useState([]);
const [data, setData] = useState([{resource_id: 1, 
  engine_hrs_beg : '', 
  engine_hrs_end : '', 
  operational_hrs_from : '', 
  operational_hrs_to : '', 
  operational_total_hrs : '', 
  idle_hrs_from : '', 
  idle_hrs_to : '', 
  idle_total_hrs : '', 
  idle_reason : "", 
  down_hrs_from : '', 
  down_hrs_to: '', 
  down_total_hrs : '', 
  down_reason : "", 
  fuel : ''

}]);

const [selectionResrouce,setSelectionResource]=useState({});
const resourceObj=resourceType.reduce((acc,cur,i)=>{
acc[cur.res_type_id]=cur.equipment;
return acc;
},{})
const date=new Date();
const resourceSetup=()=>{
  
const resources=resource.reduce((acc,cur,i)=>{
acc[cur.resource_id]=resourceObj[cur.res_type_id]+" "+cur.plate_no_comp_no
return acc;
},{});
setSelectionResource(resources);
const tempData=resource.map(res=>({resource_id: res.resource_id, 
  engine_hrs_beg :date.getHours() +":"+date.getMinutes()+":"+date.getSeconds(), 
  engine_hrs_end : '', 
  operational_hrs_from : '', 
  operational_hrs_to : '', 
  operational_total_hrs : '', 
  idle_hrs_from : '', 
  idle_hrs_to : '', 
  idle_total_hrs : '', 
  idle_reason : "", 
  down_hrs_from : '', 
  down_hrs_to: '', 
  down_total_hrs : '', 
  down_reason : "", 
  fuel : ''}));
  setData(tempData);


}
  useEffect(() => {
 
    user.resp.reduce(async(acc, cur, i) => {
      if (!project.find((pro) => pro.project_id == cur.project_id))
       {await axios
          .post("https://www.nrwlpms.com/api/api/get_single_project.php", {
            project_id: cur.project_id,
            jwt: user.token,
          })
          .then((response) => {
            console.log(response.data.data)
            setProject([...project,response.data.data]);
            selectProject({target:{value:project[0].project_id}})

          })
          .catch((err) => alert(err.message));
        
        }
  
      return acc;
    }, {});
  


    axios
    .post("https://www.nrwlpms.com/api/api/get_all_resourse_type.php", {
      jwt: user.token,
    })
    .then((response) => {
      setResourceType(response.data.data);

    })
    .catch((err) => alert(err.message));
    console.log(project);


  },[])



  const resTObj = resourceType.reduce((acc, cur, i) => {
    acc[cur.res_type_id] = cur.equipment;
    return acc;
  }, {});

  const column = [
    
      { title: "Resources", field: "resource_id" ,lookup:selectionResrouce,editable:"never" },
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

const selectProject = async (value) => {
  await axios
  .post("https://www.nrwlpms.com/api/api/get_resourse_by_project_id.php", {
    project_id: value.target.value,
    jwt: user.token,
  })
  .then((response) => {setResource(response.data.data)}).catch((err)=>alert(err));
resourceSetup();

}

  const deleteManpower = async (mnpr_id) => {
    await axios
      .post("https://www.nrwlpms.com/api/api/delete_manpower.php", {
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
  
  const addManpower = async (newData) => {
    await axios
    .post("https://www.nrwlpms.com/api/api/create_manpower.php", {
      ...newData,
      jwt: user.token,
    })
    .then((response) => {alert(response.data.message)
      const temp={...newData,mnpr_id:response.data.mnpr_id}
      setData([...data, newData]);
      
      
      });
  };

  const updateManpower = async (newData) => {
    await axios
      .post("https://www.nrwlpms.com/api/api/update_manpower.php", {
        ...newData,
        jwt: user.token,
      })
      .then((response) => alert(response.data.message))
      .catch((err) => alert(err.message));
  };

  return (
    <div><Card
    style={{
      width: "25%",
      marginTop: "10px",
      backgroundColor: "#1976d2",
      color: "white",
    }}
  >
    <Typography variant={"h6"}> Assigned Projects</Typography>
    <ul>
      {project.map((pro) => (
        <MenuItem
          divider
          key={pro.project_id}
          value={pro.project_id}
          onClick={(value) => selectProject(value)}
        >
          {pro.pro_name}
        </MenuItem>
      ))}
    </ul>
  </Card>
    <MaterialTable
      icons={tableIcons}
      title="Manpower"
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
              addManpower(newData);
              resolve();
            }, 1000);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataUpdate = [...data];
              const index = oldData.tableData.id;
              updateManpower(newData);
              dataUpdate[index] = newData;
              setData([...dataUpdate]);
              resolve();
            }, 1000);
          }),
        
          onBulkUpdate: changes => 
          new Promise((resolve, reject) => {
              setTimeout(() => {
                  /* setData([...data, newData]); */
console.log(changes);
                  resolve();
              }, 1000);
          }),
      }}
      onRowClick={(evt, selectedRow) =>
        setSelectedRow(selectedRow.tableData.id)
      }

      actions={[
        {
          icon: 'save',
          tooltip: 'Save User',
          onClick: (event, rowData) => {
            // Do save operation
          }
        }
      ]}
    />
    </div>

  );
}

export default Manpower;
