import React,{useState} from 'react'
import axios from 'axios';
import {useSelector} from 'react-redux'
 async function  ResourceMenu(resource,user) {


console.log(resource);
var resourceTypeReformatted=null;
var resourceObj=null



await axios
.post("https://www.nrwlpms.com/api/api/get_all_resourse_type.php", {
  jwt: user.token,
})
.then(async(response) => {

  resourceTypeReformatted=response.data.data.reduce((acc,cur,i)=>{
    acc[cur.res_type_id]=cur.equipment;
    return acc;
    },{})
    await axios
.post("https://www.nrwlpms.com/api/api/get_resourse_by_project_id.php", {
  project_id: resource,
  jwt: user.token,
})
.then((response) => {resourceObj=response.data.data.reduce((acc,cur,i)=>{
acc[cur.resource_id]=resourceTypeReformatted[cur.res_type_id]+" "+cur.plate_no_comp_no;
return acc},{})}).catch((err)=>alert(err));

})


return resourceObj;






}

export default ResourceMenu
