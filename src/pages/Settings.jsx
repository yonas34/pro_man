import React,{useEffect, useState} from "react";

import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { styled } from "@mui/material/styles";
import {
  Button,
  TextField,
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import {  Save } from "@material-ui/icons";
import zxcvbn from 'zxcvbn'
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { loginToggle,setUser } from "../reducers/actions";
import { LinearProgress, Slider } from "@material-ui/core";

export default function Settings(props) {
  
const dispatch=useDispatch();
  const user = useSelector((state) => state.user);
  

  const createPasswordLabel = (result) => {
    switch (result) {
      case 0:
        return {text:'Weak',color:"red"};
      case 1:
        return {text:'Weak',color:"red"};
      case 2:
        return {text:'Fair',color:'brown'};
      case 3:
        return {text:'Good',color:"bown"};
      case 4:
        return {text:'Strong',color:"green"};
      default:
        return {text:'Weak',color:"red"};
    }}




  return (
    <Formik
      initialValues={{
          username:user.username,
        password: "",
        password2: "",
        
      }}
    
      validationSchema={Yup.object().shape({
          username:Yup.string().max(255).min(4).required("user name can not be empty!"),
        password: Yup.string()
          .max(255)
          .required("password must be provided!"),
        password2: Yup.string()
          .max(255).oneOf([Yup.ref('password'),null],"Password does not match"),
        })}
      onSubmit={(values) => {
        const datasx={
          "emp_id" : user.userId,
          "user_name" : values.username,
          "password": values.password,
          "jwt": user.token
        
        };
        console.log(datasx);

 axios.post("https://www.nrwlpms.org/api/api/update_own_username_and_password.php",datasx).then((response)=>{alert(response.data.message+", please login with your new password")
localStorage.clear();
dispatch(loginToggle())
dispatch(setUser(''))

}).catch((err)=>console.log(err.message));
        
      }}
    >
      {({
        errors,
        handleChange,
        handleBlur,
        handleReset,
        handleSubmit,
        values,
        touched,
      }) =>{ 
        const strength=zxcvbn(values.password).score;
       const label=createPasswordLabel(strength);
        return(
        <form onSubmit={handleSubmit}>
          <Card
            style={{
              width: "100%",
              marginLeft: "auto",
              marginRight: "auto",
              height:"100%"
            }}
          >
            <CardContent
              style={{
                backgroundColor: "#1976d2",
                color: "white",
                fontWeight: "bold",
                fontFamily: "arial",
              }}
            >
              <Typography variant={"h5"}>Set User Information</Typography>
            </CardContent>
            <CardContent>
              <Grid container direction={"column"} spacing={4}>
                <Grid item>
                <TextField
                    error={Boolean(touched.username && errors.username)}
                    variant={"outlined"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type={"text"}
                    label={"User Name"}
                    name="username"
                    fullWidth
                    size={"small"}
                    value={values.username}
                    helperText={touched.username && errors.username}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    error={Boolean(touched.password && errors.password)}
                    variant={"outlined"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type={"password"}
                    label={"Password"}
                    name="password"
                    fullWidth
                    size={"small"}
                    value={values.password}
                    helperText={touched.password && errors.password}
                  />
                </Grid>
             <Grid item>
               <Slider  max={4} min={0} style={{width:"100%",color:label.color}}value={strength} />
               <Typography color={label.color} variant={"h5"}>{label.text}</Typography>
               </Grid>

              <Grid item>
                <TextField
                  value={values.password2}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.password2 && errors.password2)}
                  helperText={touched.password2 && errors.password2}
                  type={"password"}
                  label={"Re-enter password"}
                  name="password2"
                  fullWidth
                  size={"small"}
                />
              </Grid>

             
             

                <Grid item>
                


                </Grid>




                <Grid item>
                  <Button variant={"primary"} type={"submit"} style={{ marginLeft: "30%" }}>
                    <Save /> Save
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </form>
      ) }}
    </Formik>
  )


  
}
