import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import MaterialTable, { MTableToolbar } from "material-table";
import tableIcons from "./tableIcons";
function ActivityProjectTable(props) {
  const user = useSelector((state) => state.user);
  const [selectedRow, setSelectedRow] = useState(0);
  const tableRef = React.createRef();
  const projectId=props.pid;
  const [project,setProject]=useState([]);
  const [specialUser,setSpecialUser]=useState([]);
 const [activity,setActivity]=useState([]);
  var projectObj = project.reduce((acc, cur, i) => {
    acc[cur.project_id] = cur.pro_name;
    return acc;
  }, {});
  var actObj = activity.reduce((acc, cur, i) => {
    acc[cur.activity_id] = cur.activity_name;
    return acc;
  }, {});

 
  const column = [
    { title: "Activity", field: "activity_id",lookup:actObj },
    {title:"Price",field:"price",type:'currency'},
 
  ];
  const [data, setData] = useState([]);
  useEffect(() => {
    console.log(projectId);
    axios
      .post("https://www.nrwlpms.com/api/api/get_activity_project_by_project_id.php", {
      project_id:projectId, 
      jwt: user.token,

      })
      .then(async (response) => {
        console.log(response.data);
        await setData(response.data.data);
      }).catch((err)=>console.log(err.message));
   axios
      .post("https://www.nrwlpms.com/api/api/get_all_projects.php", { 
      jwt: user.token,
    
      }).then((response)=>{
    
    setProject(response.data.data);
    
      }).catch((err)=>console.log(err.message))
   axios
      .post("https://www.nrwlpms.com/api/api/get_all_activity.php", { 
      jwt: user.token,
    
      }).then((response)=>{
    console.log(response.data)
    setActivity(response.data.data);
    
      }).catch((err)=>console.log(err.message))


  }, []);





  const deleteActivityProjectTable = async (emp_id) => {
   console.log(emp_id);
   
    await axios
      .post("https://www.nrwlpms.com/api/api/delete_activity_project.php", {
        ...emp_id,
        jwt: user.token,
      })
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  
  const addActivityProjectTable = async (newData) => {
    await axios
    .post("https://www.nrwlpms.com/api/api/create_activity_project.php", {
      ...newData,project_id:projectId,
      
      jwt: user.token,
    })
    .then((response) => {console.log(response.data.message) 
      
      const newTemp={...newData,id:response.data.id,project_id:projectId};
        setData([...data, newTemp]);}).catch((err)=>console.log(err.message));
  };

  const updateActivityProjectTable = async (newData) => {
    await axios
      .post("https://www.nrwlpms.com/api/api/update_activity_project.php", {
        ...newData,
        jwt: user.token,
      })
      .then((response) => console.log(response.data.message))
      .catch((err) => console.log(err.message));
  };

  return (
    <MaterialTable
      icons={tableIcons}
      title="ActivityProjectTable"
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
              
              addActivityProjectTable(newData);
          
              resolve();
            }, 1000);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            console.log(newData);
            setTimeout(() => {
              const dataUpdate = [...data];
              const index = oldData.tableData.id;
              updateActivityProjectTable(newData);
        
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
              deleteActivityProjectTable(oldData);
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

export default ActivityProjectTable;
