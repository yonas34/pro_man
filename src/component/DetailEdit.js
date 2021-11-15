import { Add } from '@mui/icons-material'
import {Button, TextField,Grid, Card, CardContent, Typography } from '@mui/material'
import { Formik } from 'formik'
import React from 'react'
import * as Yup from "yup"
import axios from 'axios';

import { Save } from '@material-ui/icons'
function DetailEdit() {
const data={ first_name:"data.first_name",
    last_name:"data.last_name",
    email:"data.email",
    phone_number:"data.phone_number",
    imageUrl:"data.imageUrl"};
  
  
    return (
<Formik
    initialValues={{
        first_name:data.first_name,
        last_name:data.last_name,
        email:data.email,
        phone_number:data.phone_number,
        imageUrl:data.imageUrl
    }}

    validationSchema={Yup.object().shape({
first_name:Yup.string().max(255).required("first name  must be provided!"),
last_name:Yup.string().max(255).required("last name must be provided!"),
email:Yup.string().email("invalid email! please insert valid email").required("fule consumption must be greaterthan or equal to zero!"),
phone_number:Yup.number().required("Phone number must be provided!")

    })}

    onSubmit={async(values)=>{
        // console.log(user.token);
        // const data= {
        //     "first_name" : values.first_name,
        //     "last_name" : values.last_name,
        //     "email" : values.email,
        //     "jwt" :user.token
        // }
        // console.log(data);
// await axios.post("https://www.nrwlpms.com/api/api/create_resourse_type.php", {
//     first_name : values.first_name,
//     last_name : values.last_name,
//     email : values.email,
//     jwt :user.token
// }).then((response)=>{

// alert(JSON.stringify(response.data));
// history.push('/');

// })

console.log(values);

    }}
>


{({errors,handleChange,handleBlur,handleReset,handleSubmit,values,touched})=>( 
<form onSubmit={handleSubmit}>
            <Card style={{width:"50%",marginLeft:"auto",marginRight:"auto"}}>
                <CardContent style={{backgroundColor:"#1976d2",color:"white",fontWeight:"bold",fontFamily:"arial"}}>
                    <Typography variant={"h5"}>
                        Add Resource Type
                    </Typography>
                    </CardContent>
                <CardContent>
        <Grid container direction={"column"} spacing={5}>
            <Grid item>
            <TextField
             error={Boolean(touched.imageUrl && errors.imageUrl)}
             variant={"outlined"}
             onChange={handleChange}
             onBlur={handleBlur}
             type={"file"}
             label={"Profile Picture"}
             name="imageUrl"
             fullWidth
             size={"small"}
             value={values.imageUrl}
             helperText={touched.imageUrl && errors.imageUrl}
             />
             <TextField
             error={Boolean(touched.first_name && errors.first_name)}
             variant={"outlined"}
             onChange={handleChange}
             onBlur={handleBlur}
             type={"text"}
             label={"First Name"}
             name="first_name"
             fullWidth
             size={"small"}
             value={values.first_name}
             helperText={touched.first_name && errors.first_name}
             />

            </Grid>
        
            </Grid>

            <Grid item>
             <TextField
             value={values.last_name}
             onChange={handleChange}
             onBlur={handleBlur}
             error={Boolean(touched.last_name && errors.last_name)}
             helperText={touched.last_name && errors.last_name}
             type={"text"}
             label={"Last Name"}
             name="last_name"
             fullWidth
             size={"small"}
             />

            </Grid>
 
            <Grid item>
             <TextField
             value={values.phone_number}
             onChange={handleChange}
             onBlur={handleBlur}
             error={Boolean(touched.phone_number && errors.phone_number)}
             helperText={touched.phone_number && errors.phone_number}
             type={"tel"}
             label={"Phone number"}
             name="phone_number"
             fullWidth
             size={"small"}
             />












            <Grid item>
             <TextField
             value={values.email}
             onChange={handleChange}
             onBlur={handleBlur}
             error={Boolean(touched.email && errors.email)}
             helperText={touched.email && errors.email}
             type={"email"}
             label={"Rate of Money $/Hour"}
             name="email"
             fullWidth
             size={"small"}
             />

            </Grid>
            
            <Grid item>
                <Button type={"submit"} style={{marginLeft:"30%"}}>
               <Save/> Save 
               </Button>

            </Grid>

        </Grid>
        </CardContent>
</Card>
</form>)
}</Formik>
    )
}

export default DetailEdit;
