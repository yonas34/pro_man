import './App.css';
import Routes from './Routes';
import {useSelector} from "react-redux"
import Login from "./pages/Login"
import Sidebar from './component/Sidebar';
import React from 'react';
import ResetDialogue from './component/ResetDialogue'
import {trackPromise, usePromiseTracker} from 'react-promise-tracker'
function App() {
  const {promiseInProgress}=usePromiseTracker();

  const isLoggedin = useSelector(state =>state.isLoggedin);
  const user=useSelector(state=>state.user);
  console.log(isLoggedin);
  const st={ zIndex:"-1",pointerEvents: "none",
  filter:"blur(10px)"}
  console.log(user.resp);
  return (
 

    <div style={promiseInProgress  ?st:{
    filter:"blur(0px)"}}>
      
      
     {isLoggedin?user.reset?<ResetDialogue user={user}/>:<Sidebar router={<Routes/>}/> :<Login/>}

    </div>
 
  );
}

export default App;
