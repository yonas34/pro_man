import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import MaterialTable, { MTableToolbar } from "material-table";
import tableIcons from "../component/tableIcons";
import { Details } from "@material-ui/icons";
import Dialogue from "../component/Dialogue";

function EmployeePage() {
  const user = useSelector((state) => state.user);
  const [selectedRow, setSelectedRow] = useState(0);
  const tableRef = React.createRef();

  const column = [
    { title: 'Profile Picture', field: 'imageUrl', render: rowData => <img src={rowData.imageUrl} style={{width: 50, borderRadius: '50%'}}/> },
    { title: "First Name", field: "first_name" },
    { title: "Last Name", field: "last_name" },
    { title: "Email", field: "email" },
    { title: "Phone Number", field: "phone_number" },
    
  ];
  const [data, setData] = useState([{first_name:'Girma',last_name:'Mola',email:"grimamola@gmai.com",phone_number:"0922568944",imageUrl:'/1.jpg'}]);
const [open,setOpen]=useState(false);
const [selected,setSelected]=useState({});  
const handleDetailClose=()=>{
  setOpen(false);
}
const handleDetailSave=()=>{
  setOpen(false);
}
const openDetails=(data)=>{
  console.log(data);
setSelected(data);
setOpen(true);

}
  const deleteEmployeePage = async (mnpr_id) => {
    await axios
      .post("https://www.nrwlpms.com/api/api/delete_EmployeePage.php", {
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

  const addEmployeePage = async (newData) => {
    await axios
      .post("https://www.nrwlpms.com/api/api/create_EmployeePage.php", {
        ...newData,
        jwt: user.token,
      })
      .then((response) => alert(response.data.message));
  };

  const updateEmployeePage = async (newData) => {
    await axios
      .post("https://www.nrwlpms.com/api/api/update_EmployeePage.php", {
        ...newData,
        jwt: user.token,
      })
      .then((response) => alert(response.data.message))
      .catch((err) => alert(err.message));
  };

  return (
  <div>
    <MaterialTable
      icons={tableIcons}
      title="EmployeePage"
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
              addEmployeePage(newData);
              setData([...data, newData]);
              resolve();
            }, 1000);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataUpdate = [...data];
              const index = oldData.tableData.id;
              updateEmployeePage(newData);
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
              deleteEmployeePage(oldData.mnpr_id);
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
          icon: ()=><Details/>,
          tooltip: 'Details',
          onClick: (event, rowData) => {
            console.log(rowData);
         openDetails(rowData);
          }
        }
      ]}





    />
    <Dialogue open={open} data={selected} onClose={handleDetailClose} onSave={handleDetailSave}/>
    </div>
  );
}

export default EmployeePage;
