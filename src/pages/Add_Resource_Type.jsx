import { Add } from '@mui/icons-material'
import {Button, TextField,Grid, ButtonBase, IconButton, Card, CardContent, Typography } from '@mui/material'
import { Formik } from 'formik'
import React from 'react'
import * as Yup from "yup"
import axios from 'axios';
import {useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
function Add_Resource_Type() {
    const user=useSelector(state=>state.user);
    const history=useHistory();
    return (
<Formik
    initialValues={{
        equipment:"",
        fule_cons_per_hr:"0",
        rate_hr:"0"
    }}

    validationSchema={Yup.object().shape({
equipment:Yup.string().max(255).required("equipment type name must be provided!"),
fule_cons_per_hr:Yup.number().required("fule consumption must be greaterthan or equal to zero!"),
rate_hr:Yup.number().required("rater per hour must ber greaterthan or equal to zero!")

    })}

    onSubmit={async(values)=>{
        // console.log(user.token);
        // const data= {
        //     "equipment" : values.equipment,
        //     "fule_cons_per_hr" : values.fule_cons_per_hr,
        //     "rate_hr" : values.rate_hr,
        //     "jwt" :user.token
        // }
        // console.log(data);
await axios.post("https://www.nrwlpms.com/api/api/create_resourse_type.php", {
    equipment : values.equipment,
    fule_cons_per_hr : values.fule_cons_per_hr,
    rate_hr : values.rate_hr,
    jwt :user.token
}).then((response)=>{

alert(JSON.stringify(response.data));
history.push('/');

})

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
             error={Boolean(touched.equipment && errors.equipment)}
             variant={"outlined"}
             onChange={handleChange}
             onBlur={handleBlur}
             type={"text"}
             label={"Equipment"}
             name="equipment"
             fullWidth
             size={"small"}
             value={values.equipment}
             helperText={touched.equipment && errors.equipment}
             />

            </Grid>
         
            <Grid item>
             <TextField
             value={values.fule_cons_per_hr}
             onChange={handleChange}
             onBlur={handleBlur}
             error={Boolean(touched.rate_hr && errors.rate_hr)}
             helperText={touched.rate_hr && errors.rate_hr}
             type={"number"}
             label={"Fule Consumption  Liter/Hour"}
             name="fule_cons_per_hr"
             fullWidth
             size={"small"}
             />

            </Grid>













            <Grid item>
             <TextField
             value={values.rate_hr}
             onChange={handleChange}
             onBlur={handleBlur}
             error={Boolean(touched.rate_hr && errors.rate_hr)}
             helperText={touched.rate_hr && errors.rate_hr}
             type={"number"}
             label={"Rate of Money $/Hour"}
             name="rate_hr"
             fullWidth
             size={"small"}
             />

            </Grid>
            
            <Grid item>
                <Button type={"submit"} style={{marginLeft:"30%"}}>
               <Add/> Add
               </Button>

            </Grid>

        </Grid>
        </CardContent>
</Card>
</form>)
}</Formik>
    )
}

export default Add_Resource_Type
