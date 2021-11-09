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
  const dispatch = useDispatch()
  const history=useHistory();
  console.log(localStorage.length);
  useEffect(async() => {
    const response=JSON.parse(localStorage.getItem("auth"));
    
    if(response && localStorage.length>0)
    {
     
        await axios.post('https://www.nrwlpms.com/api/api/login.php',{
            "user_name": response.user_name,
            "password": response.pass
        }).then((response_api)=>{
            const data={username:response_api.data.data.user_name,token:response_api.data.jwt,userId:response_api.data.data.emp_id,usertype:response_api.data.data.user_type_id}

            dispatch(setUser(data));
           history.push('/');
         
           
    })
   
}}, [])


  const isLoggedin = useSelector(state =>state.isLoggedin);
  return (
    <div>
     {isLoggedin? <Sidebar router={<Routes/>}/> :<Login/>}
    </div>
  );
}

export default App;
