import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import MaterialTable, { MTableToolbar } from "material-table";
import tableIcons from "../component/tableIcons";
import { trackPromise } from "react-promise-tracker";
import CurrencyTextField from '@unicef/material-ui-currency-textfield'

function Manpower() {
  const user = useSelector((state) => state.user);
  const [selectedRow, setSelectedRow] = useState(0);
  const tableRef = React.createRef();

  const column = [
    { title: "Title", field: "title_trade" },
    { title: "Salary", field: "salary",render: rowData=> <CurrencyTextField
		label="salary"
		variant="standard"
		currencySymbol="TSh"
		//minimumValue="0"
		outputFormat="string"
		decimalCharacter="."
		digitGroupSeparator=","
		value={rowData.salary}
    /> },
  ];
  const [data, setData] = useState([]);

  useEffect(() => {
    trackPromise(axios
      .post("https://www.nrwlpms.com/api/api/get_all_manpower.php", {
        jwt: user.token,
      })
      .then(async (response) => {
        console.log(response.data);
        await setData(response.data.data);
      }));
  }, []);

  const deleteManpower = async (mnpr_id) => {
    await axios
      .post("https://www.nrwlpms.com/api/api/delete_manpower.php", {
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
  
  const addManpower = async (newData) => {
    await axios
    .post("https://www.nrwlpms.com/api/api/create_manpower.php", {
      ...newData,
      jwt: user.token,
    })
    .then((response) => {console.log(response.data.message)
      const temp={...newData,mnpr_id:response.data.mnpr_id}
      setData([...data, newData]);
      
      
      });
  };

  const updateManpower = async (newData) => {
    await axios
      .post("https://www.nrwlpms.com/api/api/update_manpower.php", {
        ...newData,
        jwt: user.token,
      })
      .then((response) => console.log(response.data.message))
      .catch((err) => console.log(err.message));
  };

  return (
    <MaterialTable
      icons={tableIcons}
      title="Manpower"
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
              addManpower(newData);
              resolve();
            }, 1000);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataUpdate = [...data];
              const index = oldData.tableData.id;
              updateManpower(newData);
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
              deleteManpower(oldData.mnpr_id);
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

export default Manpower;
