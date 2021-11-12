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
  const [resourceType, setResourceType] = useState([]);
  var dataTmp=null;
  var [projects,setProjects]=useState([]);
  let options = resourceType.map(function (data) {
    return {value:data.value,label:data.label};
  })
  let options2= projects.map(function (data) {
    return {value:data.value,label:data.label};
  })
  const handleSelect=(values)=>{
   var index=data.findIndex(obj=>obj.resource_id==values.datas.resource_id);
   var temp=data.find(obj=>obj.resource_id==values.datas.resource_id);
   var tempData=data;
   temp.type=values.event;
   tempData.splice(index,1,temp);
setData([...tempData]);

  }

  const handleSelect2=(values)=>{
    var index=data.findIndex(obj=>obj.resource_id==values.datas.resource_id);
    var temp=data.find(obj=>obj.resource_id==values.datas.resource_id);
    var tempData=data;
    temp.project=values.event;
    tempData.splice(index,1,temp);
 setData([...tempData]);
 
   }
  const SelectOverride=(props)=>{
    const datas=props.data
    return( 
<Select  onChange={(event)=>handleSelect({event,datas})} defaultValue={data.find(obj=>obj.resource_id==datas.resource_id).type} options={options} />



)
  }


  const SelectOverrideProject=(props)=>{
    const datas=props.data
console.log(data);
    return( 
<Select  onChange={(event)=>handleSelect2({event,datas})} defaultValue={data.find(obj=>obj.resource_id==datas.resource_id).project}    options={options2} />



)
  }









  const column = [
    { title: "Plate Number", field: "plate_no_comp_no" },
    { title: "Project", field: "project_id",render:(rowData)=>{return(<SelectOverrideProject data={rowData}/>)} },
    { title: "Resource Type", field: "type",render:(rowData)=>{return(<SelectOverride data={rowData}/>)}},
  ];
  const [data, setData] = useState([]);
  useEffect(() => {

    axios
      .post("https://www.nrwlpms.com/api/api/get_all_resourse_type.php", {
        jwt: user.token,
      })
      .then((response) => {
        const dataArray=[...response.data.data];
        var dataTemp=[];
        
         dataArray.map((data)=>{dataTemp.push({value:data.res_type_id,label:data.equipment})});
         dataTmp=dataTemp;
         setProjects([{value:4,label:"Roadaddis"},{value:5,label:"Jima"},{value:222,label:"Adama"},{value:555,label:"Dire Dewa"},{value:0,label:"Arba Minch"},{value:43,label:"Gonder"},{value:99,label:"Wello"}]);

         setResourceType(dataTemp);
         
        
        //setResourceType(response.data.data      
      });

       axios
      .post("https://www.nrwlpms.com/api/api/get_all_resourse.php", {
        jwt: user.token,
      })
      .then( (response) => {
          const dataArray=[...response.data.data];
          var dataTemp=new Map();
          
          dataArray.map((data)=>{
            let obj = dataTmp.find(obj => obj.value == data.res_type_id);
            let obj2 = projects.find(obj => obj.value == data.project_id);
            
            const temp={...data,type:obj,project:obj2};
            dataTemp=[...dataTemp,temp];
         
          })
      setData(dataTemp);

        })
        .catch((err) => alert(err.message));



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
