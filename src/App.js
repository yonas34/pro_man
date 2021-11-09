import './App.css';
import Routes from './Routes';
import {useSelector} from "react-redux"
import Login from "./pages/Login"
import Sidebar from './component/Sidebar';
import {useDispatch} from 'react-redux';
import {loginToggle,setUser} from './reducers/actions'
import React,{useEffect}  from 'react'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const response=JSON.parse(localStorage.getItem("user"));
    if(response)
    {
      dispatch(setUser(response));
      dispatch(loginToggle());
    }
   
  }, [dispatch])


  const isLoggedin = useSelector(state =>state.isLoggedin);
  return (
    <div>
     {isLoggedin? <Sidebar router={<Routes/>}/> :<Login/>}
    </div>
  );
}

export default App;
