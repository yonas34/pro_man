import React,{useEffect, useState} from 'react'
import axios from 'axios';
import {useSelector} from 'react-redux'


 async function  ResourceMenu(resource,user) {



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

export const emp=async(project,user,users)=>{
  
var resourceTypeReformatted=null;
var resourceObj=null




  resourceTypeReformatted=users.reduce((acc,cur,i)=>{
    acc[cur.emp_id]=cur.first_name +" "+cur.last_name;
    return acc;
    },{})



    // console.log(resourceTypeReformatted);
    await axios
.post("https://www.nrwlpms.com/api/api/get_all_employee_project_by_project_id.php", {
  project_id:project,
  jwt: user,
})
.then((response) => {resourceObj=response.data.data.reduce((acc,cur,i)=>{
acc[cur.id]=resourceTypeReformatted[cur.emp_id]
return acc},{})}).catch((err)=>alert(err));



return resourceObj;


}


export const emp_pic=async(project,user,users)=>{
  
  var resourceTypeReformatted=null;
  var resourceObj=null
  
  
  
  
    resourceTypeReformatted=users.reduce((acc,cur,i)=>{
      acc[cur.emp_id]=cur.emp_pic
      return acc;
      },{})
  
  
  
      // console.log(resourceTypeReformatted);
      await axios
  .post("https://www.nrwlpms.com/api/api/get_all_employee_project_by_project_id.php", {
    project_id:project,
    jwt: user,
  })
  .then((response) => {resourceObj=response.data.data.reduce((acc,cur,i)=>{
  acc[cur.id]=resourceTypeReformatted[cur.emp_id]
  return acc},{})}).catch((err)=>alert(err));
  
  
  
  return resourceObj;
  
  
  }
  



export const mat=async(project,user,users)=>{
 
var resourceTypeReformatted=null;
var resourceObj=null




  resourceTypeReformatted=users.reduce((acc,cur,i)=>{
    acc[cur.mat_id]=cur.type_of_material
    return acc;
    },{})



    // console.log(resourceTypeReformatted);
    await axios
.post("https://www.nrwlpms.com/api/api/get_material_project_by_project_id.php", {
  project_id:project,
  jwt: user,
})
.then((response) => {resourceObj=response.data.data.reduce((acc,cur,i)=>{
acc[cur.id]=resourceTypeReformatted[cur.mat_id]
return acc},{})}).catch((err)=>alert(err));

console.log(resourceObj)

return resourceObj;


}

