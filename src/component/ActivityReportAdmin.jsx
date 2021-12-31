import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import MaterialTable, { MTableToolbar } from "material-table";
import tableIcons from "./tableIcons";
import { trackPromise } from "react-promise-tracker";
function ActivityReportAdmin(props) {
  const user = useSelector((state) => state.user);
  const [selectedRow, setSelectedRow] = useState(0);
  const tableRef = React.createRef();

  const column = [
    { title: "Date", field: "date", type: "date", editable: "never" },
    { title: "Executed Quantity", field: "executed_quantity" },
  ];
  const [data, setData] = useState([]);
  useEffect(() => {
    if(props.data)setData([...props.data]);
    
  }, [])
  useEffect(() => {if(props.data)setData([...props.data])}, [props.data]);


 

  const updateManpower = async (newData,oldData) => {
    await axios
      .post("https://www.nrwlpms.org/api/api/update_activity_report.php", {
        ...newData,
        jwt: user.token,
      })
      .then((response) => {console.log(response.data.message)
        const dataUpdate = [...data];
        const index = oldData.tableData.id;
        dataUpdate[index] = newData;
        setData([...dataUpdate]);
      
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <MaterialTable
      icons={tableIcons}
      title="ActivityReportAdmin"
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
     
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              
              updateManpower(newData,oldData);
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

export default ActivityReportAdmin;
