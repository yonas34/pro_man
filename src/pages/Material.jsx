import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import MaterialTable, { MTableToolbar } from "material-table";
import tableIcons from "../component/tableIcons";
import { trackPromise } from "react-promise-tracker";
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
function Material() {
  const user = useSelector((state) => state.user);
  const [selectedRow, setSelectedRow] = useState(0);
  const tableRef = React.createRef();

  const column = [
    { title: "Material Type", field: "type_of_material" },
    { title: "Amount of Material", field: "uom" },
    {title:"Price of Material",field:"price",render: rowData=> <CurrencyTextField
		label="price"
		variant="standard"
		currencySymbol="TSh"
		//minimumValue="0"
		outputFormat="string"
		decimalCharacter="."
		digitGroupSeparator=","
		value={rowData.price}
    />}
  ];
  const [data, setData] = useState([]);

  useEffect(() => {
    trackPromise(axios
      .post("https://www.nrwlpms.com/api/api/get_all_material.php", {
        jwt: user.token,
      })
      .then(async (response) => {
  
        await setData(response.data.data);
      }));
  }, []);

  const deleteMaterial = async (mnpr_id) => {
    await axios
      .post("https://www.nrwlpms.com/api/api/delete_material.php", {
        mnpr_id: mnpr_id,
        jwt: user.token,
      })
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  
  const addMaterial = async (newData) => {
    await axios
    .post("https://www.nrwlpms.com/api/api/create_material.php", {
      ...newData,
      jwt: user.token,
    })
    .then((response) => {console.log(response.data.message)
      const temp={...newData,mat_id:response.data.mat_id}
      setData([...data, newData]);
      console.log(response.data);
      
      });
  };

  const updateMaterial = async (newData) => {
    await axios
      .post("https://www.nrwlpms.com/api/api/update_material.php", {
        ...newData,
        jwt: user.token,
      })
      .then((response) => console.log(response.data.message))
      .catch((err) => console.log(err.message));
  };

  return (
    <MaterialTable
      icons={tableIcons}
      title="Material"
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
              addMaterial(newData);
              resolve();
            }, 1000);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataUpdate = [...data];
              const index = oldData.tableData.id;
              updateMaterial(newData);
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
              deleteMaterial(oldData.mnpr_id);
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

export default Material;
