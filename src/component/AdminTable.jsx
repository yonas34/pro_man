import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import MaterialTable, { MTableToolbar } from "material-table";
import tableIcons from "./tableIcons";
import { Restore, Save } from "@material-ui/icons";

import { dPP } from "./pp";
function AdminTable(props) {
  const user = useSelector((state) => state.user);
  const [selectedRow, setSelectedRow] = useState(0);
  const tableRef = React.createRef();
  const projectId=props.pid;
   const uid=props.uid;
 const [employee,setEmployee]=useState([]);

 

  var empObj=employee.reduce((acc,cur,i)=>{
    acc[cur.emp_id] = cur.first_name +" "+cur.last_name;
    return acc;

  },{})
  var mempObj=employee.reduce((acc,cur,i)=>{
    acc[cur.emp_id] = cur.emp_pic;
    return acc;

  },{})
  var phone=employee.reduce((acc,cur,i)=>{
    acc[cur.emp_id] = cur.phone_no;
    return acc;
  },{})
  var email=employee.reduce((acc,cur,i)=>{
    acc[cur.emp_id] = cur.email;
    return acc;
  },{})
 
 const resetPassword = async (emp_id) => {
    axios
      .post("https://www.nrwlpms.com/api/api/reset_user_password.php", {
        emp_id: emp_id,
        jwt: user.token,
      })
      .then((response) => {
        alert(response.data.message);
      })
      .catch((err) => console.log(err.message));
  };
  const column = [
    {title:"Profile Picture",field:"emp_id",lookup:mempObj, editable: "never",
    render: (rowData) => (
      <img
        src={
          mempObj[rowData.emp_id] == '' || mempObj[rowData.emp_id] == undefined
            ? "data:image/jpeg;base64," + dPP
            : "data:image/jpeg;base64," + mempObj[rowData.emp_id]
        }
        style={{ width: 50, borderRadius: "50%" }}
      />
    ),},
    { title: "Employee Name", field: "emp_id",lookup:empObj },
 {title:"Phone Number",field:"emp_id",lookup:phone, editable: "never"},
 {title:"Email",field:"emp_id",lookup:email, editable: "never"}
  ];
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .post("https://www.nrwlpms.com/api/api/get_all_admin.php", {
     
      jwt: user.token,

      })
      .then( (response) => {
        console.log(response.data);

         setData([...response.data.data]);

       
      }).catch((err)=>console.log(err.message));
    

   axios
      .post("https://www.nrwlpms.com/api/api/get_all_employee.php", { 
      jwt: user.token,
    
      }).then((response)=>{
    console.log(response.data)
    setEmployee(response.data.data);
    

      }).catch((err)=>console.log(err.message))

     
return console.log(data.find(em=>em.emp_id==props.uid));

  }, []);
useEffect(() => {


  axios
      .post("https://www.nrwlpms.com/api/api/get_all_admin.php", {
     
      jwt: user.token,

      })
      .then( (response) => {
        console.log(response.data);
      
         setData([...response.data.data]);

       
      }).catch((err)=>console.log(err.message));
    

   axios
      .post("https://www.nrwlpms.com/api/api/get_all_employee.php", { 
      jwt: user.token,
    
      }).then((response)=>{
    console.log(response.data)
    setEmployee(response.data.data);
    
      }).catch((err)=>console.log(err.message))

     

  
  

console.log("update");
console.log(data);
}, [])




  const deleteAdminTable = async (emp_id) => {
   
   
    await axios
      .post("https://www.nrwlpms.com/api/api/delete_admin_project.php", {
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
  const addAdminTable = async (newData) => {

    await axios
    .post("https://www.nrwlpms.com/api/api/create_admin_project.php", {
      ...newData,
      user_type_id :"2",
      
      jwt: user.token,
    })
    .then((response) => {console.log(response.data.message) 
      
      const newTemp={...newData,id:response.data.id};
        setData([...data, newTemp]);}).catch((err)=>console.log(err.message));
  };



  return (
    <MaterialTable
      icons={tableIcons}
      title="AdminTable"
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
              
              addAdminTable(newData);
          
              resolve();
            }, 1000);
          }),
      
        onRowDelete: (oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataDelete = [...data];
              const index = oldData.tableData.id;
              dataDelete.splice(index, 1);
              deleteAdminTable(oldData);
              setData([...dataDelete]);
              resolve();
            }, 1000);
          }),
      }}
      onRowClick={(evt, selectedRow) =>
        setSelectedRow(selectedRow.tableData.id)
      }

       actions={[
    {
      icon: ()=> <Restore />,
      tooltip: 'Reset Password',
      onClick: (event, rowData) => {
        resetPassword(rowData.emp_id)
        
      }
    }
  ]}
    />
  );
}

export default AdminTable;
