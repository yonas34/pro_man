import './App.css';
import Routes from './Routes';
import {useSelector} from "react-redux"
import Login from "./pages/Login"
import Sidebar from './component/Sidebar';
import React from 'react'

function App() {
  

  const isLoggedin = useSelector(state =>state.isLoggedin);
  console.log(isLoggedin);
  return (
    <React.StrictMode>

    <div>
     {isLoggedin? <Sidebar router={<Routes/>}/> :<Login/>}
    </div>
    </React.StrictMode>
  );
}

export default App;
