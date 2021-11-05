import { Formik,ErrorMessage } from 'formik'
import React from 'react'
import {Form,Button} from 'react-bootstrap'
import bg_image from '../resources/bg_image.jpg'
import {object,string} from 'yup'
import { useSelector,useDispatch } from 'react-redux'
import { loginToggle } from '../reducers/actions'

export default function Login() {
const isLoggedin= useSelector(state => state.isLoggedin);
const dispatch = useDispatch();
    return (
<div style={{position:"absolute",width:'100%',height:'100%'}}>
        <div className="login_container"></div>
        <Formik initialValues={{
                    username:'',
                    password:''}}
                // validationSchema={object().shape({ username:string().required("Please insert user name"),
                //                                     password:string().required("Insert password").min(6)})}

                onSubmit={async(values)=>{
                    dispatch(loginToggle());
                        await new Promise((r)=>setTimeout(r,500));
                        
                        alert(JSON.stringify(values,null,2));
                        
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
            <Button variant="primary" type='submit'>
                Login
            </Button>
        </Form>)}
        </Formik>
        </div>
    )
}
