import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import MaterialTable, { MTableToolbar } from "material-table";
import tableIcons from "../component/tableIcons";
import Select  from 'react-select'
function Resource() {
  const user = useSelector((state) => state.user);
  const [selectedRow, setSelectedRow] = useState(0);
  const tableRef = React.createRef();
  const [resourceType, setResourceType] = useState([new Map()]);
  const [selectResourceType,setSelectedResourceType]=useState([]);
  let options = resourceType.map(function (data) {
    return {value:data.value,label:data.label};
  })

  const handleSelect=(values)=>{
    console.log(values)
   var index=data.findIndex(obj=>obj.resource_id==values.datas.resource_id);
   var temp=data.find(obj=>obj.resource_id==values.datas.resource_id);
   var tempData=data;
   temp.type=values.event;
   tempData.splice(index,1,temp);
setData([...tempData]);
console.log(data.find(obj=>obj.resource_id==values.datas.resource_id))

  }
  const SelectOverride=(props)=>{
    const datas=props.data
console.log(data.find(obj=>obj.resource_id==datas.resource_id).type)

    return( 
<Select  onChange={(event)=>handleSelect({event,datas})} defaultValue={data.find(obj=>obj.resource_id==datas.resource_id).type} options={options} />



)
  }
  const column = [
    { title: "Plate Number", field: "plate_no_comp_no" },
    { title: "Project", field: "project_id" },
    { title: "Resource Type", field: "type",render:(rowData)=>{return(<SelectOverride data={rowData}/>)}},
  ];
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .post("https://www.nrwlpms.com/api/api/get_all_resourse.php", {
        jwt: user.token,
      })
      .then(async (response) => {
        await axios
          .post("https://www.nrwlpms.com/api/api/get_all_resourse_type.php", {
            jwt: user.token,
          })
          .then((response) => {
            const dataArray=[...response.data.data];
            var dataTemp=[];
            
            dataArray.map((data)=>{dataTemp.push({value:data.res_type_id,label:data.equipment})});
            setResourceType(dataTemp);
            //setResourceType(response.data.data)
          })
          .catch((err) => alert(err.message));
            const dataArray=[...response.data.data];
            var dataTemp=new Map();
            
            dataArray.map((data)=>{
              let obj = resourceType.find(obj => obj.value == data.res_type_id);
              const temp={...data,type:obj};
            
        
               dataTemp=[...dataTemp,temp];
            })
        await setData(dataTemp);
      });
  }, []);

  const deleteResource = async (res_type_id) => {
    await axios
      .post("https://www.nrwlpms.com/api/api/delete_resourse_type.php", {
        res_type_id: res_type_id,
        jwt: user.token,
      })
      .then((response) => {
        alert(response.data.message);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const addResource = async (newData) => {
    await axios
      .post("https://www.nrwlpms.com/api/api/create_resourse_type.php", {
        equipment: newData.equipment,
        fule_cons_per_hr: newData.fule_cons_per_hr,
        rate_hr: newData.rate_hr,
        jwt: user.token,
      })
      .then((response) => alert(response.data.message));
  };

  const updateResource = async (newData) => {
    await axios
      .post("https://www.nrwlpms.com/api/api/update_resourse_type.php", {
        res_type_id: newData.res_type_id,
        rate_hr: newData.rate_hr,
        fule_cons_per_hr: newData.fule_cons_per_hr,
        equipment: newData.equipment,
        jwt: user.token,
      })
      .then((response) => alert(response.data.message))
      .catch((err) => alert(err.message));
  };

  return (
    <MaterialTable
      icons={tableIcons}
      title="Resourses"
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
              addResource({
                equipment: newData.equipment,
                fule_cons_per_hr: newData.fule_cons_per_hr,
                rate_hr: newData.rate_hr,
              });
              setData([...data, newData]);
              resolve();
            }, 1000);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataUpdate = [...data];
              const index = oldData.tableData.id;
              updateResource({
                res_type_id: newData.res_type_id,
                rate_hr: newData.rate_hr,
                equipment: newData.equipment,
                fule_cons_per_hr: newData.fule_cons_per_hr,
              });
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
              deleteResource(oldData.res_type_id);
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
