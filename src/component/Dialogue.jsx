import * as React from "react";

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
  const [open, setOpen] = React.useState(false);
  console.log(props);
  const data = props.data;

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
            <Button autoFocus color="inherit" onClick={props.onSave}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <Formik
          initialValues={{
            first_name: "",
            last_name: "",
            email: "",
            phone_number: "",
            imageUrl: "",
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
              .required(
                "fule consumption must be greaterthan or equal to zero!"
              ),
            phone_number: Yup.number().required(
              "Phone number must be provided!"
            ),
          })}
          onSubmit={async (values) => {
            console.log(values);
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
                  width: "50%",
                  marginLeft: "auto",
                  marginRight: "auto",
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
                  <Typography variant={"h5"}>Add Resource Type</Typography>
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
                      error={Boolean(
                        touched.phone_number && errors.phone_number
                      )}
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
                      <Button type={"submit"} style={{ marginLeft: "30%" }}>
                        <Save /> Save
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </form>
          )}
        </Formik>

        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Item>
                <img
                  src={data.imageUrl}
                  style={{ width: "100%", borderRadius: "2%" }}
                />
              </Item>
            </Grid>

            <Grid item xs={7}></Grid>

            <Grid item xs={8}>
              <Item>xs=8</Item>
            </Grid>
          </Grid>
        </Box>
      </Dialog>
    </div>
  );
}
