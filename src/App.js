import './App.css';
import Routes from './Routes';
import {useSelector} from "react-redux"
import Login from "./pages/Login"
import Sidebar from './component/Sidebar';
import {useDispatch} from 'react-redux';
import {loginToggle,setUser} from './reducers/actions'
import React,{useEffect}  from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
function App() {
  


  const isLoggedin = useSelector(state =>state.isLoggedin);
  console.log(isLoggedin);
  return (
    <div>
     {isLoggedin? <Sidebar router={<Routes/>}/> :<Login/>}
    </div>
  );
}

export default App;
