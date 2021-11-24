import React from 'react'
import MaterialTable from 'material-table'
import tableIcons from '../tableIcons'
function SubTable(props) {
    console.log(props.res)
    const column = [
    
        { title: "Resources", field: "resource_id" ,editable:"never",lookup:props.res },
        {
          title: "Engine Beggining Hours",
          field: "engine_hrs_beg",
          initialEditValue: "initial edit value",
        },
        { title: "Engine Ending Hours", field: "engine_hrs-end", type: "numeric" },
        {
          title: "Operational Hours From",
          field: "operational_hrs_from",
        },
    
        {
          title: "Operational Hours To",
          field: "operational_hrs_to",
        },
        {
          title: "Idle Hours From",
          field: "idle_hrs_from",
        },
        {
          title: "Idle Hours To",
          field: "idle_hrs_to",
        },
        {
          title: "Idle Total Hours",
          field: "idle_total_hrs",
        },
        {
          title: "Idle Reason",
          field: "idle_reason",
        },
    
        {
          title: "Idle Total Hours",
          field: "operational_hrs_from",
        },
        {
          title: "Down Hours From",
          field: "down_hrs_from",
        },
        {
          title: "Down Hours To",
          field: "down_hrs_to",
        },
        {
          title: "Down Total Hours",
          field: "down_total_hrs",
        },
    
        {
          title: "Down Reason",
          field: "down_reason",
        },
        {
          title: "Fuel",
          field: "fuel",
        },
      
    ];
    return (
        <MaterialTable
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              console.log(newData);
              setTimeout(() => {
             
                resolve();
              }, 1000);
            }),
         
        }}
        onRowClick={(evt, selectedRow) =>{}        }
   
        
        icons={tableIcons} title={props.title} data={props.data} columns={column}/>
    )
}

export default SubTable
