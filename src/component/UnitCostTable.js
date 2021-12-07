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
  const [project,setProject]=useState([]);
  const [specialUser,setSpecialUser]=useState([]);
 const [activity,setActivity]=useState([]);
 const [activityPro,setActivityPro]=useState([])
  var projectObj = project.reduce((acc, cur, i) => {
    acc[cur.project_id] = cur.pro_name;
    return acc;
  }, {});
  


  var actObj = activity.reduce((acc, cur, i) => {
    acc[cur.activity_id] = cur.activity_name;
    return acc;
  }, {});
var modAct=activityPro.reduce((acc,cur,i)=>{
acc[cur.id]=actObj[cur.activity_id]
return acc;
},{})
 
 


  const column = [
    { title: "Activity", field: "activity project id",lookup:modAct },
   {title:"Previous Month Income",field:"previous months income",type:"currency"},
   {title:"This Month Income",field:"this month income",type:"currency"},
   {title:"Todate Income",field:"todate income",type:"currency"},
   {title:"Previous Month Equipment Expense",field:"previous months equipment expence",type:"currency"},
   {title:"This Month Equipment Expense",field:"this months equipment expence",type:"currency"},
   {title:"Todate Equipment Expense",field:"todate equipment expence",type:"currency"},
   {title:"Previous Month Fuel Expense",field:"previous month fuel expence",type:"currency"},
   {title:"This Month Fuel Expense",field:"this month fuel expence",type:"currency"},
   {title:"Todate Fuel Expense",field:"todate fuel expence",type:"currency"},
   {title:"This Month Material Expense",field:"this month material expence",type:"currency"},
   {title:"Previous Month Material Expense",field:"previous month material expence",type:"currency"},
   {title:"Todate Material Expense",field:"todate material expence",type:"currency"},
   {title:"Previous Month Employee Expense",field:"previous month employee expence",type:"currency"},
   {title:"This Month Employee Expense",field:"this month employee expence",type:"currency"},
   {title:"Todate Employee Expense",field:"todate employee expence",type:"currency"}
  ];


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
        await setData(response.data["report by activity"]);
      }).catch((err)=>console.log(err.message));

      axios
      .post("https://www.nrwlpms.com/api/api/get_activity_project_by_project_id.php", {
      project_id:projectId, 
      jwt: user.token,

      })
      .then(async (response) => {
        console.log(response.data);
        await setActivityPro(response.data.data);
      }).catch((err)=>console.log(err.message));
   axios
      .post("https://www.nrwlpms.com/api/api/get_all_activity.php", { 
      jwt: user.token,
    
      }).then((response)=>{
    console.log(response.data)
    setActivity(response.data.data);
    
      }).catch((err)=>console.log(err.message))


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








