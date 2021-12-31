import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import MaterialTable, { MTableToolbar } from "material-table";
import tableIcons from "./tableIcons";
function MaterialProjectTable(props) {
  const user = useSelector((state) => state.user);
  const [selectedRow, setSelectedRow] = useState(0);
  const tableRef = React.createRef();
  const projectId=props.pid;
  const [project,setProject]=useState([]);
  const [specialUser,setSpecialUser]=useState([]);
 const [material,setMaterial]=useState([]);
  var projectObj = project.reduce((acc, cur, i) => {
    acc[cur.project_id] = cur.pro_name;
    return acc;
  }, {});
  var matObj = material.reduce((acc, cur, i) => {
    acc[cur.mat_id] = cur.type_of_material;
    return acc;
  }, {});

 
  const column = [
    { title: "Material", field: "mat_id",lookup:matObj },
    {title:"Project Name",field:"project_id",lookup:projectObj,editable:"never"},
 
  ];
  const [data, setData] = useState([]);
  useEffect(() => {
    console.log(projectId);
    axios
      .post("https://www.nrwlpms.org/api/api/get_material_project_by_project_id.php", {
      project_id:projectId, 
      jwt: user.token,

      })
      .then(async (response) => {
        console.log(response.data);
        await setData(response.data.data);
      }).catch((err)=>console.log(err.message));
   axios
      .post("https://www.nrwlpms.org/api/api/get_all_projects.php", { 
      jwt: user.token,
    
      }).then((response)=>{
    
    setProject(response.data.data);
    
      }).catch((err)=>console.log(err.message))
   axios
      .post("https://www.nrwlpms.org/api/api/get_all_material.php", { 
      jwt: user.token,
    
      }).then((response)=>{
    console.log(response.data)
    setMaterial(response.data.data);
    
      }).catch((err)=>console.log(err.message))


  }, []);





  const deleteMaterialProjectTable = async (emp_id) => {
   console.log(emp_id);
   
    await axios
      .post("https://www.nrwlpms.org/api/api/delete_employee_project.php", {
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
  
  const addMaterialProjectTable = async (newData) => {
    await axios
    .post("https://www.nrwlpms.org/api/api/create_material_project.php", {
      mat_id:newData.mat_id,project_id:projectId,
      
      jwt: user.token,
    })
    .then((response) => {console.log(response.data.message) 
      
      const newTemp={...newData,id:response.data.id,project_id:projectId};
        setData([...data, newTemp]);}).catch((err)=>console.log(err.message));
  };

  const updateMaterialProjectTable = async (newData) => {
    await axios
      .post("https://www.nrwlpms.org/api/api/update_material_project.php", {
        ...newData,
        jwt: user.token,
      })
      .then((response) => console.log(response.data.message))
      .catch((err) => console.log(err.message));
  };

  return (
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
      editable={user.usertype==1 ? {
        onRowAdd: (newData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              
              addMaterialProjectTable(newData);
          
              resolve();
            }, 1000);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
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
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataDelete = [...data];
              const index = oldData.tableData.id;
              dataDelete.splice(index, 1);
              deleteMaterialProjectTable(oldData);
              setData([...dataDelete]);
              resolve();
            }, 1000);
          }),
      }:{}}
      onRowClick={(evt, selectedRow) =>
        setSelectedRow(selectedRow.tableData.id)
      }
    />
  );
}

export default MaterialProjectTable;
