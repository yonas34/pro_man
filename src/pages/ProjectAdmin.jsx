import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import MaterialTable, { MTableToolbar } from "material-table";
import tableIcons from "../component/tableIcons";
import { Details } from "@material-ui/icons";
import DialogueForProject from "../component/DialogueForProject";
import Toast from "../component/Toast";
import { dPP } from "../component/pp";
import { trackPromise } from "react-promise-tracker";

function ProjectAdmin() {
  const user = useSelector((state) => state.user);
  const [selectedRow, setSelectedRow] = useState(0);
  const tableRef = React.createRef();

  const [toastOpen, setToastOpen] = React.useState(false);

  const [data, setData] = useState();
  const [manPowerData, setManPowerData] = useState([]);

  useEffect(() => {
    trackPromise( axios
      .post("https://www.nrwlpms.org/api/api/get_all_manpower.php", {
        jwt: user.token,
      })
      .then(async (response) => {
        console.log(response.data);
        await setManPowerData(response.data.data);
      }))

    //  const datas= [{first_name:'Alem',last_name:'Gezaheng',email:"alem@gmai.com",phone_number:"0912568944",imageUrl:image,id:"12345"},{first_name:'Girma',last_name:'Mola',email:"grimamola@gmai.com",phone_number:"0922568944",imageUrl:image,id:"556677"}];

    trackPromise(axios
      .post("https://www.nrwlpms.org/api/api/get_all_projects.php", {
        jwt: user.token,
      })
      .then(async (response) => {
        console.log(response.data);
        await setData(response.data.data);
      }));
  }, []);

  var obj = manPowerData.reduce((acc, cur, i) => {
    acc[cur.mnpr_id] = cur.title_trade;
    return acc;
  }, {});

  const column = [
    { title: "Project Name", field: "pro_name" },
    { title: "Project Location", field: "pro_location" },
    { title: "Project Client", field: "pro_client" },
  ];

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState({});
  const handleDetailClose = () => {
    setSelected({});
    setOpen(false);
  };
  const handleDetailSave = () => {
    setOpen(false);
  };
  const openDetails = (data) => {
    console.log(data);
    setSelected({ ...data });
    setOpen(true);
  };
  const setDataFromDialogueForProject = async (datas) => {
    console.log(datas);

    trackPromise( await axios
      .post("https://www.nrwlpms.org/api/api/update_project.php", {
        ...datas,
        jwt: user.token,
      })
      .then(async (response) => {
        setOpen(false);

        const dataUpdate = [...data];
        const index = datas.tableData.id;
        dataUpdate[index] = datas;
        setData([...dataUpdate]);
        console.log(response.data.message);
        setToastOpen(true);
      })
      .catch((err) => console.log(err.message)));
  };
  const deleteProject = async (project_id) => {
    console.log(project_id);
    await axios
      .post("https://www.nrwlpms.org/api/api/delete_project.php", {
        project_id: project_id,
        jwt: user.token,
      })
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const addProject = async (newData) => {
    console.log(newData.mnpr_id);
    await axios
      .post("https://www.nrwlpms.org/api/api/create_project.php", {
        ...newData,

        jwt: user.token,
      })
      .then((response) => {
        console.log(response.data.message);
        const temp={...newData,project_id:response.data.project_id}
        setData([...data, temp]);
      })
      .catch((err) => console.log(err.message));
  };

  const updateProject = async (newData) => {
    await axios
      .post("https://www.nrwlpms.org/api/api/update_project.php", {
        ...newData,
        jwt: user.token,
      })
      .then((response) => console.log(response.data.message))
      .catch((err) => console.log(err.message));
  };

  return (
    <div>
      <MaterialTable
        icons={tableIcons}
        title="Project Adminstration"
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
        onRowClick={(evt, selectedRow) =>
          setSelectedRow(selectedRow.tableData.id)
        }
        actions={[
          {
            icon: () => <Details />,
            tooltip: "Details",
            onClick: (event, rowData) => {
              console.log(rowData);
              openDetails(rowData);
            },
          },
        ]}
      />
      <Toast
        message={"Data Saved!"}
        handleClose={(event, reason) => {
          if (reason === "clickaway") {
            return;
          }
          setToastOpen(false);
        }}
        open={toastOpen}
      />
      <DialogueForProject
        open={open}
        manData={manPowerData}
        setData={(data) => setDataFromDialogueForProject(data)}
        data={selected}
        onClose={handleDetailClose}
        onSave={handleDetailSave}
      />
    </div>
  );
}

export default ProjectAdmin;
