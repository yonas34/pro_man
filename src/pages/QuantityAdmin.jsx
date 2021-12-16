import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import MaterialTable, { MTableToolbar } from "material-table";
import { setUsers, setMaterial } from "../reducers/actions";
import tableIcons from "../component/tableIcons";
import { trackPromise } from "react-promise-tracker";
import {
  Card,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@material-ui/core";
import ResourceMenu from "../component/user/ResourceMenu";
import moment from "moment";
import { Grid } from "@material-ui/core";
import { Save } from "@material-ui/icons";
import ActivityReport from "../component/user/ActivityReport";
import { dateDifference } from "../component/user/utils";
import { useDispatch } from "react-redux";
import MaterialReport from "../component/user/MaterialReport";
import { Divider } from "@mui/material";
import ActivityReportAdmin from "../component/ActivityReportAdmin";
import MaterialReportAdmin from "../component/MaterialReportAdmin";
import EmployeeReportAdmin from "../component/EmployeeReportAdmin";

function QuantityAdmin() {
  const user = useSelector((state) => state.user);
  const [project, setProject] = useState([]);
  const [resource, setResource] = useState({});
  const date = new Date();
  const [data, setData] = useState([]);

  const [activity, setActivity] = useState([]);
  const [projectActivity, setProjectActivity] = useState([]);

  const [selectedRow, setSelectedRow] = useState(0);
  const tableRef = React.createRef();

  const [resourceData,setResourceData]=useState([]);
  const [selectedProject, setSelectedProject] = useState();
  const column = [
    { title: "Equipments", field: "equipment", editable: "never" },
    { title: "Date", field: "date", type: "date", editable: "never" },
    {
      title: "Engine Beggining Hours",
      field: "engine_hrs_beg",
      initialEditValue: moment(date).format("hh-mm-ss"),
      type: "time",
    },
    {
      title: "Engine Ending Hours",
      field: "engine_hrs_end",
      initialEditValue: "",
      type: "time",
    },
    {
      title: "Operational Hours From",
      field: "operational_hrs_from",
      initialEditValue: moment(date).format("hh-mm-ss"),
      type: "time",
    },

    {
      title: "Operational Hours To",
      field: "operational_hrs_to",
      initialEditValue: moment(date).format("hh-mm-ss"),
      type: "time",
    },
    {
      title: "Total Operational Hours",
      field: "operational_total_hrs",
      initialEditValue: 0,
      type: "number",
      editable: "never",
    },
    {
      title: "Idle Hours From",
      field: "idle_hrs_from",
      initialEditValue: moment(date).format("hh-mm-ss"),
      type: "time",
    },
    {
      title: "Idle Hours To",
      field: "idle_hrs_to",
      initialEditValue: moment(date).format("hh-mm-ss"),
      type: "time",
    },
    {
      title: "Idle Total Hours",
      field: "idle_total_hrs",
      initialEditValue: 0,
      type: "number",
      editable: "never",
    },
    {
      title: "Idle Reason",
      field: "idle_reason",
      initialEditValue: "",
    },

    {
      title: "Down Hours From",
      field: "down_hrs_from",
      initialEditValue: moment(date).format("hh-mm-ss"),
      type: "time",
    },
    {
      title: "Down Hours To",
      field: "down_hrs_to",
      initialEditValue: moment(date).format("hh-mm-ss"),
      type: "time",
    },
    {
      title: "Down Total Hours",
      field: "down_total_hrs",
      type: "number",
      initialEditValue: 0,
      editable: "never",
    },

    {
      title: "Down Reason",
      field: "down_reason",
      initialEditValue: "",
    },
    {
      title: "Fuel",
      field: "fuel",
      type: "number",
      initialEditValue: 0,
    },
  ];

  const [selectedActivity, setSelectedActivity] = useState(0);
  const AP_id = () => {
    return projectActivity.reduce((acc, cur, i) => {
      acc[cur.activity_id] = cur.id;
      return acc;
    }, {});
  };

  const init = async () => {
    axios
      .post("https://www.nrwlpms.com/api/api/get_all_activity.php", {
        jwt: user.token,
      })
      .then((response) => {
        setActivity(
          response.data.data.reduce((acc, cur) => {
            acc[cur.activity_id] = cur.activity_name;
            return acc;
          }, {})
        );
      })
      .catch((err) => console.log(err.message));

    trackPromise(
      axios
        .post("https://www.nrwlpms.com/api/api/get_all_projects.php", {
          jwt: user.token,
        })
        .then((response) => {
          console.log(response.data.data[0]);
          setProject([...response.data.data]);
          setSelectedProject(response.data.data[0].project_id);
          const porject_id = response.data.data[0].project_id;

          axios
            .post(
              "https://www.nrwlpms.com/api/api/get_activity_project_by_project_id.php",
              {
                project_id: porject_id,
                jwt: user.token,
              }
            )
            .then((response) => {
              console.log(response.data.data);
              setProjectActivity(response.data.data);
              if (response.data.data.length > 0) {
                setSelectedActivity(response.data.data[0].activity_id);
                console.log(project);
                const req = JSON.stringify({
                  project_id: porject_id,
                  activity_id: response.data.data[0].activity_id,
                  jwt: user.token,
                });

                axios
                  .post(
                    "https://www.nrwlpms.com/api/api/get_all_superadmin_quantity_surveyor_data.php",
                    req
                  )
                  .then((response) => {
                   
                    setData(response.data);
                    setResourceData(response.data.resourse_report)
                  })
                  .catch((err) => console.error(err));
              }
            });
        })
    );
  };

  //use Effect Did mount
  useEffect(() => {
    trackPromise(init());
  }, []);

  //component did update

  useEffect(() => {
    console.log("update");
  }, [data]);

  //Component did unmount
  useEffect(() => {
    return () => {};
  }, [data]);

 
  const updateMaterialProjectTable = async (newData, oldData) => {
    console.log(newData);
   
    const dss = {
      ...newData,
      engine_hrs_beg: moment(newData.engine_hrs_beg, "H:mm:ss").format(
        "H:mm:ss"
      ),
      engine_hrs_end: moment(newData.engine_hrs_end, "H:mm:ss").format(
        "H:mm:ss"
      ),
      operational_hrs_from: moment(
        newData.operational_hrs_from,
        "H:mm:ss"
      ).format("H:mm:ss"),
      operational_hrs_to: moment(newData.operational_hrs_to, "H:mm:ss").format(
        "H:mm:ss"
      ),
      operational_total_hrs: dateDifference(
        moment(newData.operational_hrs_to, "H:mm:ss"),
        moment(newData.operational_hrs_from, "H:mm:ss")
      ),
      idle_hrs_from: moment(newData.idle_hrs_from, "H:mm:ss").format("H:mm:ss"),
      idle_hrs_to: moment(newData.idle_hrs_to, "H:mm:ss").format("H:mm:ss"),
      idle_total_hrs: dateDifference(
        moment(newData.idle_hrs_to, "H:mm:ss"),
        moment(newData.idle_hrs_from, "H:mm:ss")
      ),
      idle_reason: newData.idle_reason,
      down_hrs_from: moment(newData.down_hrs_from, "H:mm:ss").format("H:mm:ss"),
      down_hrs_to: moment(newData.down_hrs_to, "H:mm:ss").format("H:mm:ss"),
      down_total_hrs: dateDifference(
        moment(newData.down_hrs_to, "H:mm:ss"),
        moment(newData.down_hrs_from, "H:mm:ss")
      ),
      down_reason: newData.down_reason,
      fuel: newData.fuel,
      jwt:user.token
    };
   console.log(dss);
    await axios
      .post(
        "https://www.nrwlpms.com/api/api/update_resourse_report.php",
        dss
      )
      .then((response) => {
        const dataUpdate = [...resourceData];
        const index = oldData.tableData.id;

        dataUpdate[index] = dss;
        setResourceData([...dataUpdate]);
      })
      .catch((err) => console.log(err.message));
  };

  const selectProject =  (value) => {
    console.log(value);
    setSelectedProject(value);

    console.log(resource);
    trackPromise(
      axios
        .post(
          "https://www.nrwlpms.com/api/api/get_activity_project_by_project_id.php",
          {
            project_id: value,
            jwt: user.token,
          }
        )
        .then((response) => {
          setProjectActivity(response.data.data);
          console.log(activity);
          if (response.data.data.length > 0) {
            setSelectedActivity(response.data.data[0].activity_id);

            axios
              .post(
                "https://www.nrwlpms.com/api/api/get_all_superadmin_quantity_surveyor_data.php",
                {
                  project_id: value,
                  activity_id: response.data.data[0].activity_id,
                  jwt: user.token,
                }
              )
              .then((response) => {
                console.log(response.data);
                setData(response.data);
                setResourceData([...response.data.resourse_report])
              })
              .catch((err) => console.log(err));
          } else {setData([]);
          
            setResourceData([])

          };
        })
        .catch((err) => console.log(err.message))
    );
  };

  const selectActivityProject = (values) => {
    console.log(values);

    trackPromise(
      axios
        .post(
          "https://www.nrwlpms.com/api/api/get_all_superadmin_quantity_surveyor_data.php",
          {
            project_id: selectedProject,
            activity_id: values,
            jwt: user.token,
          }
        )
        .then((response) => {
          console.log(response.data)
          setSelectedActivity(values);
          setData(response.data);
          setResourceData([...response.data.resourse_report])
        })
        .catch((err) => console.log(err))
    );
  };

  const SelectionComponents = () => {
    return (
      <Grid container direction={"row"} spacing={7}>
        <Grid item>
          <Typography variant={"h6"}>Assigned Projects:</Typography>
          <TextField
            select
            value={selectedProject}
            onChange={(value) =>
              selectProject(value.target.value)
            }
          >
            {project.map((pro) => {
              if (!selectedProject) console.log(selectedProject);

              return (
                <MenuItem divider key={pro.project_id} value={pro.project_id}>
                  {pro.pro_name}
                </MenuItem>
              );
            })}
          </TextField>
        </Grid>

        <Grid item>
          <Typography variant={"h6"}>Activities:</Typography>
          <TextField
            value={selectedActivity}
            select
            onChange={(value) =>
              selectActivityProject(value.target.value)
            }
          >
            {projectActivity.map((pro) => {
              return (
                <MenuItem divider key={pro.activity_id} value={pro.activity_id}>
                  {activity[pro.activity_id]}
                </MenuItem>
              );
            })}
          </TextField>
        </Grid>
      </Grid>
    );
  };

  const Table = () => {
    return (
      <MaterialTable
        icons={tableIcons}
        title="Equipment Report For Admin"
        tableRef={tableRef}
        columns={column}
        data={resourceData}
        components={{
          Toolbar: (props) => (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <MTableToolbar {...props} />
            </div>
          ),
        }}
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
            width: "100%",
          },
        }}
        components={{
          Toolbar: (props) => (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                color: "white",
                backgroundColor: "#1976d2",
              }}
            >
              <MTableToolbar {...props} />
            </div>
          ),
        }}
        editable={{
       
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              console.log(newData, oldData);
              setTimeout(() => {
                updateMaterialProjectTable(newData, oldData);

                resolve();
              }, 1000);
            }),
        }}
        onRowClick={(evt, selectedRow) =>
          setSelectedRow(selectedRow.tableData.id)
        }
        options={{
          exportButton: true,
          exportCsv: (columns, data) => {
            console.log(data);
            const fData = {
            
            };

            axios
              .post(
                "https://www.nrwlpms.com/api/api/save_quantity_surveyor_data.php",
                JSON.stringify(fData)
              )
              .then((response) => console.log(response.data))
              .catch((err) => console.log(err.message));
            console.log(fData);
          },
        }}
      />
    );
  };

  return (
    <Grid wrap={"wrap"} container direction={"column"} spacing={2}>
      <Grid item style={{ width: "100%" }}>
        <SelectionComponents />
      </Grid>
      <Grid item style={{ width: "100%" }}>
        {" "}
        <Table />
      </Grid>
      <Divider />
      <Grid item style={{ width: "100%" }}>
        <ActivityReportAdmin data={data.activity_report} />
      </Grid> 
      <Grid item style={{ width: "100%" }}>
        <Divider />
        <MaterialReportAdmin data={data.material_report} />
      </Grid> 
      <Grid item style={{ width: "100%" }}>
        <Divider />
        <EmployeeReportAdmin data={data.employee_report} />
      </Grid>
    
    </Grid>
  );
}

export default QuantityAdmin;
