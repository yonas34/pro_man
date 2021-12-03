import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import MaterialTable, { MTableToolbar } from "material-table";
import tableIcons from "../component/tableIcons";
import { trackPromise } from "react-promise-tracker";
function ResourceTypeTable() {
  const user = useSelector((state) => state.user);
  const [selectedRow, setSelectedRow] = useState(0);
  const tableRef = React.createRef();

  const column = [
    { title: "Equipment", field: "equipment" },
    { title: "Fule Consumption L/hr", field: "fule_cons_per_hr" },
    { title: "Rate $/hr", field: "rate_hr" },
  ];
  const [data, setData] = useState([]);

  useEffect(() => {
    trackPromise(axios
      .post("https://www.nrwlpms.com/api/api/get_all_resourse_type.php", {
        jwt: user.token,
      })
      .then(async (response) => {
        console.log(response.data);
        await setData(response.data.data);
      }));
    console.log(data);
  }, []);

  const deleteResource = async (res_type_id) => {
    await axios
      .post("https://www.nrwlpms.com/api/api/delete_resourse_type.php", {
        res_type_id: res_type_id,
        jwt: user.token,
      })
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const addResource = async (newData) => {
    await axios
      .post("https://www.nrwlpms.com/api/api/create_resourse_type.php", {
        equipment: newData.equipment,
        fule_cons_per_hr: newData.fule_cons_per_hr,
        rate_hr: newData.rate_hr,
        jwt: user.token,
      })
      .then((response) => {console.log(response.data.message);
 
      const temp={...newData,res_type_id:response.data.res_type_id}
      setData([...data, temp]);
      });
  };

  const updateResource = async (newData) => {
    await axios
      .post("https://www.nrwlpms.com/api/api/update_resourse_type.php", {
        res_type_id: newData.res_type_id,
        rate_hr: newData.rate_hr,
        fule_cons_per_hr: newData.fule_cons_per_hr,
        equipment: newData.equipment,
        jwt: user.token,
      })
      .then((response) => console.log(response.data.message))
      .catch((err) => console.log(err.message));
  };

  return (
    <MaterialTable
      icons={tableIcons}
      title="Resourse Type Entry"
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
              addResource({
                equipment: newData.equipment,
                fule_cons_per_hr: newData.fule_cons_per_hr,
                rate_hr: newData.rate_hr,
              });
              resolve();
            }, 1000);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataUpdate = [...data];
              const index = oldData.tableData.id;
              updateResource({
                res_type_id: newData.res_type_id,
                rate_hr: newData.rate_hr,
                equipment: newData.equipment,
                fule_cons_per_hr: newData.fule_cons_per_hr,
              });
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
              deleteResource(oldData.res_type_id);
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

export default ResourceTypeTable;
