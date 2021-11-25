import React from 'react'
import {Switch,Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Project from './pages/Project';
//import AddResourceType from './pages/AddResourceType';
import ResourceTypeTable from './pages/ResourceTypeTable';
import UserMan from './pages/UserMan';
import Resource from './pages/Resource';
import Manpower from './pages/Manpower';
import EmployeePage from './pages/EmployeePage';
import Material from './pages/Material';
import Activity from './pages/Activity'
import {useSelector} from 'react-redux'; 
import QuantitySurvoyer from './pages/user/QuantitySurvoyer';
import Store from './pages/user/Store';
export default function Routes() {
const user =useSelector(state=>state.user);

switch(user.usertype)
{case "1":
return (
<Switch>
<Route exact path="/">
    <Project/>
</Route>
<Route path="/login">
    <Login/>
</Route>
<Route path="/projects">
    <Project/>
</Route>
<Route path="/resource">
    <Resource/>
    
    </Route>
<Route path="/user">

    <UserMan/>
</Route>
<Route path="/view_resource_type">

<ResourceTypeTable/>
</Route>
<Route path="/manpower">

<Manpower/>
</Route>
<Route path="/employee">
<EmployeePage/>
</Route>

<Route path="/material">
<Material/>
</Route>
<Route path="/activities">
<Activity/>
</Route>
</Switch>

    )


case "3":
    return (


<Switch>
<Route exact path="/">
    <QuantitySurvoyer/>
</Route>
<Route exact path="/store">
    <Store/>
</Route>
</Switch>

    )

    }




}

