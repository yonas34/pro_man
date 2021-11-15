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
    { title: 'Profile Picture', field: 'imageUrl', render: rowData => <img src={"data:image/jpeg;base64,"+rowData.imageUrl} style={{width: 50, borderRadius: '50%'}}/>,editable:'never' },
    { title: "First Name", field: "first_name",editable:'onUpdate' },
    { title: "Last Name", field: "last_name",editable:'onUpdate' },
    { title: "Email", field: "email",editable:'onUpdate' },
    { title: "Phone Number", field: "phone_number",editable:'onUpdate' },
    {title:"Employee Id",field:"id",editable:'never'}
    
  ];const [data, setData] = useState();
  useEffect(() => {
  
 const image='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';
 const datas= [{first_name:'Alem',last_name:'Gezaheng',email:"alem@gmai.com",phone_number:"0912568944",imageUrl:image,id:"12345"},{first_name:'Girma',last_name:'Mola',email:"grimamola@gmai.com",phone_number:"0922568944",imageUrl:image,id:"556677"}];
 setData(datas);


}, [])
  
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
const setDataFromDialogue=(datas)=>{
  console.log(datas);
  setOpen(false);
  const dataUpdate = [...data];
              const index = data.findIndex(obj=>obj.id==datas.id);
              dataUpdate[index] = datas;
              setData([...dataUpdate]);

  
  console.log(data);

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
    <Dialogue open={open} setData={(data)=>setDataFromDialogue(data)} data={selected} onClose={handleDetailClose} onSave={handleDetailSave}/>
    </div>
  );
}

export default EmployeePage;
