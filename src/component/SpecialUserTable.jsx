import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import MaterialTable, { MTableToolbar } from "material-table";
import tableIcons from "./tableIcons";
function SpecialUserTable(props) {
  const user = useSelector((state) => state.user);
  const [selectedRow, setSelectedRow] = useState(0);
  const tableRef = React.createRef();
  const uid=props.uid;
  const [project,setProject]=useState([]);
  const [specialUser,setSpecialUser]=useState([]);

  var projectObj = project.reduce((acc, cur, i) => {
    acc[cur.project_id] = cur.pro_name;
    return acc;
  }, {});

  var spcecial_userObj=specialUser.reduce((acc,cur,i)=>{
    acc[cur.special_user_id] = cur.name;
    return acc;

  },{})
  const column = [
    { title: "Employee ID", field: "emp_id",editable:'never' },
    { title: "Special User Type", field: "special_user_id",lookup:spcecial_userObj},
    {title:"Project Name",field:"project_id",lookup:projectObj},
 
  ];
  const [data, setData] = useState([]);
  useEffect(() => {
    console.log(uid);
  setSpecialUser([{special_user_id:1,name:"QUANTITY SURVEYOR"},{special_user_id:3,name:"SITE STORE"},{special_user_id:6,name:"SECRETARY"}])
    axios
      .post("https://www.nrwlpms.org/api/api/get_all_employee_project_by_emp_id.php", {
      emp_id:uid, 
      jwt: user.token,

      })
      .then(async (response) => {
      console.log(response.data.data.length>=1);
        props.sp(response.data.data.length>=1);
        console.log(response.data.data);
        await setData(response.data.data);
      }).catch((err)=>console.log(err.message));
   axios
      .post("https://www.nrwlpms.org/api/api/get_all_projects.php", { 
      jwt: user.token,
    
      }).then((response)=>{
    
    setProject(response.data.data);
    
      }).catch((err)=>console.log(err.message))



  }, []);





  const deleteSpecialUserTable = async (mnpr_id) => {
    await axios
      .post("https://www.nrwlpms.org/api/api/delete_employee_project.php", {
        ...mnpr_id,
        jwt: user.token,
      })
      .then((response) => {
        console.log(response.data.message);
      
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  
  const addSpecialUserTable = async (newData) => {
    await axios
    .post("https://www.nrwlpms.org/api/api/create_employee_project.php", {
      special_user_id:newData.special_user_id,project_id:newData.project_id,emp_id:uid,
      user_type_id : 3,
      
      jwt: user.token,
    })
    .then((response) => {console.log(response.data.message) 
      
      const newTemp={special_user_id:newData.special_user_id,project_id:newData.project_id,emp_id:uid};
        setData([...data, newTemp]);
      
        props.sp(true);
      }).catch((err)=>console.log(err.message));
        
  };

  const updateSpecialUserTable = async (newData) => {
    await axios
      .post("https://www.nrwlpms.org/api/api/update_employee_project.php", {
        ...newData,
        jwt: user.token,
      })
      .then((response) => console.log(response.data.message))
      .catch((err) => console.log(err.message));
  };

  return (
    <MaterialTable
      icons={tableIcons}
      title="SpecialUserTable"
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
              
              addSpecialUserTable(newData);
          
              resolve();
            }, 1000);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataUpdate = [...data];
              const index = oldData.tableData.id;
              updateSpecialUserTable(newData);
        
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
              props.sp(dataDelete.length>=1)
              setData([...dataDelete]);
              
              deleteSpecialUserTable(oldData);
      
              
              resolve();
            }, 1000);
            console.log(data);
          }),
      }}
      onRowClick={(evt, selectedRow) =>
        setSelectedRow(selectedRow.tableData.id)
      }
    />
  );
}

export default SpecialUserTable;
