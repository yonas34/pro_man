import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import MaterialTable, { MTableToolbar } from "material-table";
import tableIcons from "../component/tableIcons";
import { trackPromise } from "react-promise-tracker";
function Resource() {
  const user = useSelector((state) => state.user);
  const [selectedRow, setSelectedRow] = useState(0);
  const tableRef = React.createRef();
  const [resourceType, setResourceType] = useState([]);

  const [projects,setProjects] = useState([])

  var resourceObj = resourceType.reduce((acc, cur, i) => {
    acc[cur.value] = cur.label;
    return acc;
  }, {});
  var obj = projects.reduce((acc, cur, i) => {
    acc[cur.project_id] = cur.pro_name;
    return acc;
  }, {});

 

  const column = [
    { title: "Plate Number", field: "plate_no_comp_no" },
    {
      title: "Project",
      field: "project_id",

      lookup: obj,
    },
    {
      title: "Equipment Type",
      field: "res_type_id",

      lookup: resourceObj,
    },
  ];
  const [data, setData] = useState([]);
  useEffect(() => {


    trackPromise( axios
    .post("https://www.nrwlpms.com/api/api/get_all_projects.php", {
      jwt: user.token,
    })
    .then(async (response) => {
      console.log(response.data);
      await setProjects(response.data.data);
    }))


    trackPromise( axios
      .post("https://www.nrwlpms.com/api/api/get_all_resourse_type.php", {
        jwt: user.token,
      })
      .then((response) => {
        const dataArray = [...response.data.data];
        var dataTemp = [];

        dataArray.map((data) => {
          dataTemp.push({ value: data.res_type_id, label: data.equipment });
        });

        setResourceType(dataTemp);
      }));

      trackPromise(axios
      .post("https://www.nrwlpms.com/api/api/get_all_resourse.php", {
        jwt: user.token,
      })
      .then((response) => {
        setData(response.data.data);
      })
      .catch((err) => console.log(err.message)));
  }, []);

  const deleteResource = async (resource_id) => {
    await axios
      .post("https://www.nrwlpms.com/api/api/delete_resourse.php", {
        resource_id: resource_id,
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
    console.log({ ...newData, jwt: user.token });
    await axios
      .post("https://www.nrwlpms.com/api/api/create_resourse.php", {
        ...newData,
        jwt: user.token,
      })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };

  const updateResource = async (newData) => {
    console.log(newData);
    await axios
      .post("https://www.nrwlpms.com/api/api/update_resourse.php", {
        ...newData,

        jwt: user.token,
      })
      .then((response) => console.log(response.data.message))
      .catch((err) => console.log(err.message));
  };

  return (
    <MaterialTable
      icons={tableIcons}
      title="Equipments"
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
              addResource(newData);
              setData([...data, newData]);
              resolve();
            }, 1000);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataUpdate = [...data];
              const index = oldData.tableData.id;
              updateResource(newData);
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
              deleteResource(oldData.resource_id);
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

export default Resource;
