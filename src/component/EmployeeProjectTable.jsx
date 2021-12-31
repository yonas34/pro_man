import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import MaterialTable, { MTableToolbar } from "material-table";
import tableIcons from "./tableIcons";
function EmployeeProjectTable(props) {
  const user = useSelector((state) => state.user);
  const [selectedRow, setSelectedRow] = useState(0);
  const tableRef = React.createRef();
  const projectId=props.pid;
  const mnpr=props.mnpr;
  const [project,setProject]=useState([]);
  const [specialUser,setSpecialUser]=useState([]);
 const [employee,setEmployee]=useState([]);

 
  var projectObj = project.reduce((acc, cur, i) => {
    acc[cur.project_id] = cur.pro_name;
    return acc;
  }, {});
var mnprObj=mnpr.reduce((acc,cur,i)=>{
  acc[cur.mnpr_id] = cur.title_trade;
  return acc;
},{});
  var spcecial_userObj=specialUser.reduce((acc,cur,i)=>{
    acc[cur.special_user_id] = cur.name;
    return acc;

  },{})
  var empObj=employee.reduce((acc,cur,i)=>{
    acc[cur.emp_id] = cur.first_name +" "+cur.last_name;
    return acc;

  },{})
  var mempObj=employee.reduce((acc,cur,i)=>{
    acc[cur.emp_id] = mnprObj[cur.mnpr_id];
    return acc;

  },{})
  const column = [
    { title: "Employee ID", field: "emp_id",lookup:empObj },
    { title: "Special User Type", field: "special_user_id",lookup:spcecial_userObj},
    { title: "Manpower Name", field: "emp_id",lookup:mempObj,editable:"never" }
 
  ];
  const [data, setData] = useState([]);
  useEffect(() => {
    console.log(projectId);
  setSpecialUser([{special_user_id:7,name:'UNALLOCATED'},{special_user_id:1,name:"QUANTITY SURVEYOR"},{special_user_id:3,name:"SITE STORE"},{special_user_id:6,name:"SECRETARY"}])
    axios
      .post("https://www.nrwlpms.org/api/api/get_all_employee_project_by_project_id.php", {
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
      .post("https://www.nrwlpms.org/api/api/get_all_employee.php", { 
      jwt: user.token,
    
      }).then((response)=>{
    console.log(response.data)
    setEmployee(response.data.data);
    
      }).catch((err)=>console.log(err.message))

     



  }, []);





  const deleteEmployeeProjectTable = async (emp_id) => {
   
   
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
  console.log(mnprObj);
  const addEmployeeProjectTable = async (newData) => {
    await axios
    .post("https://www.nrwlpms.org/api/api/create_employee_project.php", {
      special_user_id:newData.special_user_id,project_id:projectId,emp_id:newData.emp_id,
      user_type_id : 3,
      
      jwt: user.token,
    })
    .then((response) => {console.log(response.data.message) 
      
      const newTemp={special_user_id:newData.special_user_id,project_id:projectId,emp_id:newData.emp_id};
        setData([...data, newTemp]);}).catch((err)=>console.log(err.message));
  };

  const updateEmployeeProjectTable = async (newData) => {
    console.log(newData)
    await axios
      .post("https://www.nrwlpms.org/api/api/update_employee_project.php", {
        ...newData,
        "user_type_id" : 3,
        jwt: user.token,
      })
      .then((response) => console.log(response.data.message))
      .catch((err) => console.log(err.message));
  };

  return (
    <MaterialTable
      icons={tableIcons}
      title="EmployeeProjectTable"
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
              
              addEmployeeProjectTable(newData);
          
              resolve();
            }, 1000);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            console.log(newData);
            setTimeout(() => {
              const dataUpdate = [...data];
              const index = oldData.tableData.id;
              updateEmployeeProjectTable(newData);
        
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
              deleteEmployeeProjectTable(oldData);
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

export default EmployeeProjectTable;
