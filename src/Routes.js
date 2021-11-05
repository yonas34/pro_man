import React from 'react'
import {Switch,Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Project from './pages/Project';
import Users from './pages/Users';
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
<Route path="/users">

    <Users/>
</Route>

</Switch>

    )
}

