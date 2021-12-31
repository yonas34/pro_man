import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import MaterialTable, { MTableToolbar } from "material-table";
import tableIcons from "./tableIcons";
import CurrencyTextField from '@unicef/material-ui-currency-textfield'

function ProjectsTable() {
  const user = useSelector((state) => state.user);
  const [selectedRow, setSelectedRow] = useState(0);
  const tableRef = React.createRef();

  const column = [
    { title: "Title", field: "title_trade" },
    { title: "Salary", field: "salary", render: rowData=> <CurrencyTextField
style={{fontSize:"10%",width:"200px"}}
   variant="standard"
		currencySymbol="TSh"
		//minimumValue="0"
		outputFormat="string"
		decimalCharacter="."
		digitGroupSeparator=","
		value={rowData.salary}
    />},
  ];
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .post("https://www.nrwlpms.org/api/api/get_all_ProjectsTable.php", {
        jwt: user.token,
      })
      .then(async (response) => {
        console.log(response.data);
        await setData(response.data.data);
      });
  }, []);

  const deleteProjectsTable = async (mnpr_id) => {
    await axios
      .post("https://www.nrwlpms.org/api/api/delete_ProjectsTable.php", {
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

  const addProjectsTable = async (newData) => {
    await axios
      .post("https://www.nrwlpms.org/api/api/create_ProjectsTable.php", {
        ...newData,
        jwt: user.token,
      })
      .then((response) => console.log(response.data.message));
  };

  const updateProjectsTable = async (newData) => {
    await axios
      .post("https://www.nrwlpms.org/api/api/update_ProjectsTable.php", {
        ...newData,
        jwt: user.token,
      })
      .then((response) => console.log(response.data.message))
      .catch((err) => console.log(err.message));
  };

  return (
    <MaterialTable
      icons={tableIcons}
      title="ProjectsTable"
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
              addProjectsTable(newData);
              setData([...data, newData]);
              resolve();
            }, 1000);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataUpdate = [...data];
              const index = oldData.tableData.id;
              updateProjectsTable(newData);
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
              deleteProjectsTable(oldData.mnpr_id);
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

export default ProjectsTable;
