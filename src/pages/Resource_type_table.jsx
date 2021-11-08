import React, { useEffect,useState } from 'react'
import axios from 'axios';
import {useSelector} from 'react-redux';
import MaterialTable from 'material-table';
import {Delete,Edit,Add} from '@mui/icons-material'

function Resource_type_table() {
    const user = useSelector(state => state.user)

const tableRef=React.createRef();
    
    const column=[
        {title:"Equipment",field:"equipment"},
        {title:"Fule Consumption L/hr",field:"fule_cons_per_hr"},
        {title:"Rate $/hr",field:"rate_hr"}
]
    const [data,setData]=useState([]);
    useEffect( () => {
        
  axios.post("https://www.nrwlpms.com/api/api/get_all_resourse_type.php",{jwt:user.token}).then(async(response)=>{

console.log(response.data)
await setData(response.data.data)

  });
  console.log(data);
    }, [])
    return (
        <div>
          <MaterialTable
          title="Resourse Type Entry"
          tableRef={tableRef}
          columns={column}
          data={data}
          actions={[{icon:()=>(<Delete/>)
                    ,tooltip:'Delete Equipment',
                onClick:(event,rowData)=>alert(rowData.equipment)      },
            
            {icon:()=>(<Edit/>),
            tooltip:"Edit Equipment Details",
        onClick:(event,rowData)=>alert(rowData.equipment)}
          ,
        {icon:()=>(<Add/>),
        tooltip:"Add New Equipment Type",
        isFreeAction:true,
        onClick:(event)=>{
            const mTable=tableRef.current;
            mTable.setState({...mTable.dataManager.getRenderState(),showAddRow:true})
            alert("you want to add new row")}
        }
        
        ]}
        options={{actionsColumnIndex:-1}}
        editable={
          {  onRowAdd: newData=>
            new Promise((resolve,reject)=>{
                setTimeout(()=>{
                    setData([...data,newData]);
                    resolve();
                },1000)
            }),
        onRowDelete:oldData=>
                new Promise((resolve,reject)=>{
setTimeout(()=>{
const dataDelete=[...data];
const index=oldData.tableData.id;
dataDelete.splice(index,1);
setData([...dataDelete])

},1000)})


                
        
        
        
        
        }
        }
        
        
          />



          
        </div>
    )
}

export default Resource_type_table
