import React from 'react'
import {Switch,Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Project from './pages/Project';
import Users from './pages/Users';
import Add_Resource_Type from './pages/Add_Resource_Type';
import Resource_type_table from './pages/Resource_type_table';
export default function Routes() {
    return (
<Switch>
<Route exact path="/">
    <Home/>
</Route>
<Route path="/login">
    <Login/>
</Route>
<Route path="/projects">
    <Project/>
</Route>
<Route path="/add_resource_type">
    <Add_Resource_Type/>
    
    </Route>
<Route path="/users">

    <Users/>
</Route>
<Route path="/view_resource_type">

<Resource_type_table/>
</Route>

</Switch>

    )
}

