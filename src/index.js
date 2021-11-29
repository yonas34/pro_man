import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {createStore} from "redux";
import allReducers from "./reducers/";
import { Provider } from 'react-redux';
import { loginToggle,setUser } from './reducers/actions'
import axios from 'axios';
import Load from './Load'
const store=createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())


const isLoggedin = store.getState(state =>state.isLoggedin);

const response=JSON.parse(localStorage.getItem("auth"));
    

console.log(localStorage);
if(localStorage.length>0 && !isLoggedin.isLoggedin)
{console.log(response)

     axios.post('https://www.nrwlpms.com/api/api/login.php',{
        "user_name": response.user_name,
        "password": response.pass
    }).then((response_api)=>{
        const data={username:response_api.data.data.user_name,token:response_api.data.jwt,userId:response_api.data.data.emp_id,usertype:response_api.data.data.user_type_id,resp:response_api.data.data.total_data}

        store.dispatch(setUser(data));
         store.dispatch(loginToggle());

     
       
}).catch((err)=>{console.error(err.message)})}



ReactDOM.render(
  <Provider store={store}>
  <Router>
  
    <App />
    <Load/>
    </Router>
    
    </Provider>
    ,

  document.getElementById('root')
);

