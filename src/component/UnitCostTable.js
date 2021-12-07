import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import MaterialTable, { MTableToolbar } from "material-table";
import tableIcons from "./tableIcons";
function UnitCostTable(props) {
  const user = useSelector((state) => state.user);
  const [selectedRow, setSelectedRow] = useState(0);
  const tableRef = React.createRef();
  const projectId=props.pro_id;
 
 







  const column = [
    { title: "Activity", field: "activity name",},
   {title:"Unit",field:"unit"},
   {title:"Executed Quantity",field:"executed quantity"},
   {title:"Equipment Cost",field:"equipment cost",type:"currency"},
   {title:"Manpower Cost",field:"manpower cost",type:"currency"},
   {title:"Fuel Cost",field:"fuel cost",type:"currency"},
   {title:"Material Cost",field:"material cost",type:"currency"},
   {title:"Actual Unit Cost",field:"actual unit cost",type:"currency"},
   {title:"Activity Contract Rate",field:"activity contract rate",type:"currency"},
   {title:"OH and Profit",field:"OH and profit"}];


  const [data, setData] = useState([]);
  useEffect(() => {
    console.log(projectId);
    axios
      .post("https://www.nrwlpms.com/api/api/report/dashbord_report_quantity_surveyor.php", {
      project_id:projectId, 
      jwt: user.token,

      })
      .then(async (response) => {
        console.log(response.data);
        await setData(response.data["unit cost report"]);
      }).catch((err)=>console.log(err.message));

    
  


  }, []);





  const deleteActivityProjectTable = async (emp_id) => {
   console.log(emp_id);
   
    await axios
      .post("https://www.nrwlpms.com/api/api/delete_activity_project.php", {
        ...emp_id,
        jwt: user.token,
      })
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  
  const addActivityProjectTable = async (newData) => {
    await axios
    .post("https://www.nrwlpms.com/api/api/create_activity_project.php", {
      ...newData,project_id:projectId,
      
      jwt: user.token,
    })
    .then((response) => {console.log(response.data.message) 
      
      const newTemp={...newData,id:response.data.id,project_id:projectId};
        setData([...data, newTemp]);}).catch((err)=>console.log(err.message));
  };

  const updateActivityProjectTable = async (newData) => {
    await axios
      .post("https://www.nrwlpms.com/api/api/update_activity_project.php", {
        ...newData,
        jwt: user.token,
      })
      .then((response) => console.log(response.data.message))
      .catch((err) => console.log(err.message));
  };

  return (
    <MaterialTable
      icons={tableIcons}
      title="Unit Cost Table"
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
    />
  );
}

export default UnitCostTable;








