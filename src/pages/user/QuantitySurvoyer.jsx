import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import MaterialTable, { MTableToolbar } from "material-table";
import tableIcons from "../../component/tableIcons";
import { Card, MenuItem, Typography } from "@material-ui/core";
import SubTable from "../../component/user/SubTable";
import { data } from "./data";
import ResourceMenu from "../../component/user/ResourceMenu";

function Manpower() {
  const user = useSelector((state) => state.user);
  const [project, setProject] = useState([]);
  const [resource, setResource] = useState({});
  useEffect(() => {
   
    user.resp.reduce(async (acc, cur, i) => {
      if (!project.find((pro) => pro.project_id == cur.project_id)) {
        await axios
          .post("https://www.nrwlpms.com/api/api/get_single_project.php", {
            project_id: cur.project_id,
            jwt: user.token,
          })
          .then((response) => {
            console.log(response.data.data);
            setProject([...project, response.data.data]);
            ResourceMenu(user.resp[0].project_id, user).then((data)=>setResource(data))
          })
          .catch((err) => alert(err.message));
      }

      return acc;
    }, {});
  });
  const selectProject = (value) => {
    ResourceMenu(value, user).then((data) => {
      console.log(data);
      setResource(data);
    });
  };

  return (
    <div>
      <Card
        style={{
          width: "25%",
          marginTop: "10px",
          backgroundColor: "#1976d2",
          color: "white",
        }}
      >
        <Typography variant={"h6"}> Assigned Projects</Typography>
        <ul>
          {project.map((pro) => (
            <MenuItem
              divider
              key={pro.project_id}
              value={pro.project_id}
              onClick={(value) => selectProject(value.target.value)}
            >
              {pro.pro_name}
            </MenuItem>
          ))}
        </ul>
      </Card>
      <MaterialTable
        columns={[
          { title: "Date", field: "date" },
          { title: "Executed Quantity", field: "executed_quantity" },
        ]}
        data={data}
        title="Quantity surveyor Table"
        detailPanel={(rowData) => {
          return (
            <SubTable res={resource} title={rowData.date} data={rowData.data} />
          );
        }}
        onRowClick={(event, rowData, togglePanel) => togglePanel()}
      />
    </div>
  );
}

export default Manpower;
