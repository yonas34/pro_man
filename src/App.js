import './App.css';
import Routes from './Routes';
import {useSelector} from "react-redux"
import Login from "./pages/Login"
import Sidebar from './component/Sidebar';
import React from 'react'
import {usePromiseTracker} from 'react-promise-tracker'
function App() {
  const {promiseInProgress}=usePromiseTracker();

  const isLoggedin = useSelector(state =>state.isLoggedin);
  console.log(isLoggedin);
  const st={ zIndex:"-1",pointerEvents: "none",
  filter:"blur(5px)"}
  return (
 

    <div style={false  ?st:{
    filter:"blur(0px)"}}>
      
     {isLoggedin? <Sidebar router={<Routes/>}/> :<Login/>}

    </div>
 
  );
}

export default App;
