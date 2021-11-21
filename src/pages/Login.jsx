import { Formik } from 'formik'
import React from 'react'
import {Form,Button} from 'react-bootstrap'
import {useDispatch } from 'react-redux'
import { loginToggle,setUser } from '../reducers/actions'
import axios from 'axios';
export default function Login() {
const dispatch = useDispatch();
    return (
<div style={{position:"absolute",width:'100%',height:'100%'}}>
        <div className="login_container"></div>
        <Formik initialValues={{
                    username:'',
                    password:'',
                    remember:false
                
                }}
                // validationSchema={object().shape({ username:string().required("Please insert user name"),
                //                                     password:string().required("Insert password").min(6)})}

                onSubmit={async(values)=>{
                    await axios.post('https://www.nrwlpms.com/api/api/login.php',{
                        "user_name": values.username,
                        "password": values.password
                    }).then((response)=>{
                        const data={username:response.data.data.user_name,token:response.data.jwt,userId:response.data.data.emp_id,usertype:response.data.data.user_type_id}

                        dispatch(setUser(data))
                        if(values.remember)
                        {  localStorage.setItem('auth',JSON.stringify({user_name:values.username,pass:values.password}));

                       
                          
                        }
                        dispatch(loginToggle());

                    }).catch((err)=>alert("Incorrect user name or password, please try again!"))
                        
                       
                        
                        }}>

        {({values,errors,touched,handleChange,handleBlur,handleSubmit,isSubmitting})=>(    
        
        <Form onSubmit={handleSubmit} style={{width:"30%",marginTop:"200px",marginLeft:'auto',marginRight:'auto' }}>
            <Form.Group  className='mb-3'  >
          
                <Form.Label className="login_label" style={{marginRight:'100%',width:'90px'}}>User Name</Form.Label>
                <Form.Control

                onChange={handleChange}
                onBlur={handleBlur}
                values={values.username}
                name='username' type='text' placeholder="Enter User Name" id='username'/>
                

          
            <br/>
              
               <Form.Label className="login_label" style={{marginRight:'100%',width:'90px'}}>Password</Form.Label>
                <Form.Control
                onChange={handleChange}
                onBlur={handleBlur}
                values={values.password}
                name='password' type='password' placeholder="Enter Password" id='password'/>
            
            </Form.Group>
            <Form.Label className={"login_label"} style={{marginRight:'100%',width:'90px'}}> Remember Me </Form.Label>
            <Form.Check
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.remember}
            name="remember"
            
            />
            <Button variant="primary" type='submit'>
                Login
            </Button>
        </Form>)}
        </Formik>
        </div>
    )
}
