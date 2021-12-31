import { Formik } from 'formik'
import React,{useEffect, useState} from 'react'
import {Form,Button} from 'react-bootstrap'
import {useDispatch } from 'react-redux'
import { loginToggle,setUser } from '../reducers/actions'
import axios from 'axios';
import * as Yup from "yup"
import { useHistory } from 'react-router'
import { IconButton, Input, InputAdornment, InputLabel, OutlinedInput, TextField } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import { trackPromise } from 'react-promise-tracker'
export default function Login() {
const dispatch = useDispatch();
const history=useHistory();
const [showPassword,setShowPassword]=useState(false);
useEffect(() => {

   
}, [showPassword])
    return (
<div style={{color:"white",position:"absolute",width:'100%',height:'100%'}}>
        <div className="login_container"></div>
        <Formik  initialValues={{
                    username:'',
                    password:'',
                    remember:false
                
                }}
                // validationSchema={object().shape({ username:string().required("Please insert user name"),
                //                                     password:string().required("Insert password").min(6)})}

                validationSchema={Yup.object().shape({
                    username:Yup.string().max(255).required("user name must be provided!"),
                    password:Yup.string().max(255).required("password must be provided!"),
                    
                        })}
                    
                onSubmit={async(values)=>{
                    trackPromise( axios.post('https://www.nrwlpms.org/api/api/login.php',{
                        "user_name": values.username,
                        "password": values.password
                    }).then((response)=>{
                        const data={username:response.data.data.user_name,token:response.data.jwt,reset:response.data.data.reset,userId:response.data.data.emp_id,usertype:response.data.data.user_type_id,resp:response.data.data.total_data}
                       console.log(response.data.data)
                        dispatch(setUser(data))
                        if(values.remember)
                        {  localStorage.setItem('auth',JSON.stringify({user_name:values.username,pass:values.password}));
console.log(localStorage);
                       
                          
                        }
                        dispatch(loginToggle());
       
         if(data.usertype==1)
         history.replace('/');
         if(data.usertype==2)
         history.replace('/');

      else{ 
          console.log(data.usertype)
          if(data.resp)
    data.resp.map(re=>{
        switch(Number(re.special_user_id))
        {

case 1:
    console.log(re.special_user_id);
  
    history.replace('/');
    break;
 case 3:
    history.replace('/store');
break;

case 6:
    history.replace('/secretary');
    break;
        
}})}


                    }).catch((err)=>{ alert(err.message=="Network Error" ? "Network Error":"Incorrect user name or password, please try again!")
                
                console.log(err.message)}))
                        
                       
                        
                        }}>

        {({values,errors,touched,handleChange,handleBlur,handleSubmit,isSubmitting})=>(    
        
        <Form onSubmit={handleSubmit} style={{width:"30%",marginTop:"200px",marginLeft:'auto',marginRight:'auto',display:"flex",justifyContent:"center",flexDirection:"column" }}>
            
            <InputLabel style={{color:"black",fontWeight:"bold"}} htmlFor="username">User Name</InputLabel>
<br/>
                
                <OutlinedInput
                id={"username"}
                style={{color:"black",fontWeight:"bold"}}
fullWidth
error={Boolean(touched.username && errors.username)}
             variant={"filled"}
                onChange={handleChange}
                onBlur={handleBlur}
                values={values.username}
                helperText={touched.username && errors.username}
                label={"User Name"}
                name='username' type='text' placeholder="Enter User Name" id='username'/>
                

          
            <br/>
              
            <InputLabel style={{color:"black",fontWeight:"bold"}} htmlFor="password">Password</InputLabel>
             <br/>
                <OutlinedInput
                id={"password"}
                variant={"filled"}
                fullWidth
                style={{color:"black",fontWeight:"bold"}}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.password && errors.password}
                label={"Password"}
                values={values.password}
                name='password' type={showPassword? "text":"password"} placeholder="Enter Password" id='password'
                error={Boolean(touched.password && errors.password)}
                endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={()=>setShowPassword(!showPassword)}
                        onMouseDown={(event)=>{event.preventDefault()}}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                
                
                />
            
            
            <Form.Label className={"login_label"} style={{marginRight:'100%',width:'90px'}}> Remember Me </Form.Label>
            <Form.Check
            className={"cursorPointer"}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.remember}
            name="remember"
            
            />
            <Button styel={{marginLeft:"50%",marginRight:"50%"}} variant="primary" type='submit'>
                Login
            </Button>
        </Form>)}
        </Formik>
        </div>
    )
}
