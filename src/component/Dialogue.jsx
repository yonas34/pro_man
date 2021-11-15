import React,{useState} from "react";

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
import { Box } from "@mui/material";
import Toast from './Toast';
import ProjectsTable from './ProjectsTable'
import SpecialUserTable from './SpecialUserTable'
import AdminTable from './AdminTable'
import {
  Button,
  TextField,
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import DetailEdit from "./DetailEdit";
import * as Yup from "yup";
import { Save } from "@material-ui/icons";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Item = styled(Card)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),

  color: theme.palette.text.secondary,
}));

export default function Dialogue(props) {

 
  console.log(props);
  const [toastOpen,setToastOpen]=React.useState(false)
  const data = props.data;
  const setData=props.setData;
  const [file,setFile]=useState(null);
  const _handleReaderLoaded=(readerEvt)=>{
    let binaryString=readerEvt.target;
    

    setFile({base64TextString:btoa(binaryString.result)})
  }
  const Form = (props) =>{ const data=props.data; return (
    <Formik
      initialValues={{
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone_number: data.phone_number,
       
        id:data.id
      }}
    
      validationSchema={Yup.object().shape({
        first_name: Yup.string()
          .max(255)
          .required("first name  must be provided!"),
        last_name: Yup.string()
          .max(255)
          .required("last name must be provided!"),
        email: Yup.string()
          .email("invalid email! please insert valid email")
          .required("fule consumption must be greaterthan or equal to zero!"),
        phone_number: Yup.number().required("Phone number must be provided!"),
      })}
      onSubmit={async (values) => {
       setToastOpen(true);
        setData({...values,imageUrl:file.base64TextString});
        
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
      }) => (
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
              <Typography variant={"h5"}>User Information</Typography>
            </CardContent>
            <CardContent>
              <Grid container direction={"column"} spacing={4}>
                <Grid item>
               
                </Grid>
                <Grid item>
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
                </Grid>

                <Grid item>
                  <TextField
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                    type={"email"}
                    label={"Email Address"}
                    name="email"
                    fullWidth
                    size={"small"}
                  />
                </Grid>

                <Grid item>
                  <TextField
                  disabled
                    value={values.id}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.id && errors.id)}
                    helperText={touched.id && errors.id}
                    type={"id"}
                    label={"User Identification"}
                    name="id"
                    fullWidth
                    size={"small"}
                  />
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
      )}
    </Formik>
  )};

  return (
    <div>
      <Dialog
        fullScreen
        open={props.open}
        onClose={props.onClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={props.onClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {data.first_name} {data.last_name} Profile Details
            </Typography>
           
          </Toolbar>
        </AppBar>

        <Grid container  spacing={2} style={{textAlignment:"center",justifyContent:"center"}}  >
          <Grid item xs={6} md={4}>
            <Item>
              <img
                src={"data:image/jpeg;base64,"+data.imageUrl}
                style={{ width: "100%", borderRadius: "2%" }}
              />
            </Item>
          </Grid>
     




          <Grid item xs={6} md={8}>
            <Form data={data}/>
          </Grid>
          <Grid item xs={6} md={8}>
          <form >

          <input id="file" accept={".jpeg, .png, .jpg"} name="file" type="file" onChange={(event) => {
                 event.preventDefault();
                 const file=event.target.files[0];
                  if(file){
                    const reader=new FileReader();
                    reader.onload=(event)=>_handleReaderLoaded(event);
                    reader.readAsBinaryString(file);
                  }
                  

}} />
          </form>
          </Grid>
          <Grid item xs={6} md={10}>
            <ProjectsTable id={data.id}/>
          </Grid>
          <Grid item xs={6} md={10} >
            <SpecialUserTable id={data.id}/>
          </Grid>
          <Grid item xs={6} md={10}>
            <AdminTable id={data.id}/>
          </Grid>
        </Grid>
      </Dialog>
      <Toast message={"Data Saved!"} handleClose={(event,reason)=>{if (reason === 'clickaway') {
      return;
}setToastOpen(false)}} open={toastOpen}/>
    </div>
  );
}
