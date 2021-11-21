import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import MaterialTable, { MTableToolbar } from "material-table";
import tableIcons from "../component/tableIcons";
function Activity() {
  const user = useSelector((state) => state.user);
  const [selectedRow, setSelectedRow] = useState(0);
  const tableRef = React.createRef();

  const column = [
    { title: "Activity Name", field: "activity_name" },
    { title: "UOM", field: "uom" },
  ];
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .post("https://www.nrwlpms.com/api/api/get_all_activity.php", {
        jwt: user.token,
      })
      .then(async (response) => {
        console.log(response.data);
        await setData(response.data.data);
      });
  }, []);

  const deleteActivity = async (mnpr_id) => {
    await axios
      .post("https://www.nrwlpms.com/api/api/delete_activity.php", {
       ...mnpr_id,
        jwt: user.token,
      })
      .then((response) => {
        alert(response.data.message);
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  
  const addActivity = async (newData) => {
    await axios
    .post("https://www.nrwlpms.com/api/api/create_activity.php", {
      ...newData,
      jwt: user.token,
    })
    .then((response) => {alert(response.data.message)
     console.log(response.data)
      const temp={...newData,activity_id:response.activity_id}
      setData([...data, newData]);
      
      
      });
  };

  const updateActivity = async (newData) => {
    console.log(newData);
    await axios
      .post("https://www.nrwlpms.com/api/api/update_activity.php", {
        ...newData,
        jwt: user.token,
      })
      .then((response) => alert(response.data.message))
      .catch((err) => alert(err.message));
  };

  return (
    <MaterialTable
      icons={tableIcons}
      title="Activity"
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
              addActivity(newData);
              resolve();
            }, 1000);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataUpdate = [...data];
              const index = oldData.tableData.id;
              updateActivity(newData);
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
              deleteActivity(oldData);
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

export default Activity;
