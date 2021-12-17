import React,{useState} from "react";
import EmployeeProjectTable from "./EmployeeProjectTable";
import Dialog from "@mui/material/Dialog";
import Expense from './Expense'
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import MaterialProjectTable from './MaterialProjectTable';
import ActivityProjectTable from "./ActivityProjectTable"
import { styled } from "@mui/material/styles";
import {useSelector} from 'react-redux'
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
import { Menu, Save } from "@material-ui/icons";
import { MenuItem } from "@material-ui/core";
import Dashboard from './Dashboard';
import UnitCostTable from './UnitCostTable'
import DetailedDialogue from "./DetailedDialogue";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Item = styled(Card)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),

  color: theme.palette.text.secondary,
}));

export default function DialogueForProject(props) {
  console.log(props);
  const manData = props.manData;
  const data = props.data;
  const setData = props.setData;
  const [dashboard,setDashboard]=useState(false);
  const [unitcost,setUnitCost]=useState(false);
  const [expense,setExpense]=useState(false);
const user=useSelector(state=>state.user);

  const Form = (props) => {
    const data = props.data;
    const initialValues = {
      project_id: data.project_id,
      pro_name: data.pro_name,
      pro_location: data.pro_location,
      pro_client: data.pro_client,
      pro_consultant: data.pro_consultant,
      pro_contract_value: data.pro_contract_value,
      pro_contract_number: data.pro_contract_number,
      pro_commencement_date: data.pro_commencement_date,
      pro_provisional_sum: data.pro_provisional_sum,
      pro_variations: data.pro_variations,
      pro_revised_contract_value: data.pro_revised_contract_value,
      pro_contract_duration_days: data.pro_contract_duration_days,
      pro_time_extension_granted: data.pro_time_extension_granted,
      pro_original_completion_date: data.pro_original_completion_date,
      pro_revised_completion_date: data.pro_revised_completion_date,
      pro_planned_value_of_work_this_month: data.pro_planned_value_of_work_this_month,
      pro_month: data.pro_month,
      pro_planned_value_of_work_todate: data.pro_planned_value_of_work_todate,
      pro_value_of_executed_work_todate: data.pro_value_of_executed_work_todate,
      pro_financial_progress_pct: data.pro_financial_progress_pct,
      pro_time_elapsed_pct: data.pro_time_elapsed_pct,
      pro_slippage_pct: data.pro_slippage_pct,
    };
    console.log(user);

    return (
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          pro_name: Yup.string()
            .max(255)
            .required("fiSrst name  must be provided!"),
          pro_location: Yup.string()
            .max(255)
            .required("last name must be provided!"),
          pro_client: Yup.string()
            .max(255)
            .required("Client information is needed!"),
          pro_consultant: Yup.string().required(
            "Phone number must be provided!"
          ),
        })}
        onSubmit={(values) => {
          setData({ ...values, tableData: data.tableData });
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
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Card
                style={{
                  width: "100%",
                  marginLeft: "auto",
                  marginRight: "auto",
                  height: "100%",
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
                  <Typography variant={"h5"}>Project Details</Typography>
                </CardContent>
                <CardContent>
                  <Grid container direction={"column"} spacing={4}>
                    <Grid item></Grid>
                    <Grid item>
                      <TextField
                      disabled={user.usertype!=1}
                        error={Boolean(touched.pro_name && errors.pro_name)}
                        variant={"outlined"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type={"text"}
                        label={"Project Name"}
                        name="pro_name"
                        fullWidth
                        size={"small"}
                        value={values.pro_name}
                        helperText={touched.pro_name && errors.pro_name}
                      /></Grid>
                       <Grid item>
                      <TextField
                      disabled
                        error={Boolean(touched.projecct_id && errors.project_id)}
                        variant={"outlined"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type={"number"}
                        label={"Project Identification Number"}
                        name="project_id"
                        fullWidth
                        size={"small"}
                        value={values.project_id}
                        helperText={touched.project_id && errors.project_id}
                      />
                    </Grid>

                    <Grid item>
                      <TextField
                      disabled={user.usertype!=1}
                      
                        value={values.pro_location}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(
                          touched.pro_location && errors.pro_location
                        )}
                        helperText={touched.pro_location && errors.pro_location}
                        type={"text"}
                        label={"Project Location"}
                        name="pro_location"
                        fullWidth
                        size={"small"}
                      />
                    </Grid>

                    <Grid item>
                      <TextField
                      disabled={user.usertype!=1}
                        value={values.pro_consultant}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(
                          touched.pro_consultant && errors.pro_consultant
                        )}
                        helperText={
                          touched.pro_consultant && errors.pro_consultant
                        }
                        type={"text"}
                        label={"Project Consultant"}
                        name="pro_consultant"
                        fullWidth
                        size={"small"}
                      />
                    </Grid>

                    <Grid item>
                      <TextField
                      disabled={user.usertype!=1}
                        value={values.pro_client}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(touched.pro_client && errors.pro_client)}
                        helperText={touched.pro_client && errors.pro_client}
                        type={"text"}
                        label={"Client"}
                        name="pro_client"
                        fullWidth
                        size={"small"}
                      />
                    </Grid>

                    <Grid item>
                      <TextField
                      disabled={user.usertype!=1}
                        value={values.pro_contract_value}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(touched.pro_contract_value && errors.pro_contract_value)}
                        helperText={touched.pro_contract_value && errors.pro_contract_value}
                        type={"number"}
                        label={"Contract Value"}
                        name="pro_contract_value"
                        fullWidth
                        size={"small"}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                      disabled={user.usertype!=1}
                        value={values.pro_contract_number}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(touched.pro_contract_number && errors.pro_contract_number)}
                        helperText={touched.pro_contract_number && errors.pro_contract_number}
                        type={"text"}
                        label={"Contract Number"}
                        name="pro_contract_number"
                        fullWidth
                        size={"small"}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                      disabled={user.usertype!=1}
                        value={values.pro_commencement_date}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(touched.pro_commencement_date && errors.pro_commencement_date)}
                        helperText={touched.pro_commencement_date && errors.pro_commencement_date}
                        type={"date"}
                        label={"Commencement Date"}
                        name="pro_commencement_date"
                        fullWidth
                        size={"small"}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                      disabled={user.usertype!=1}
                        value={values.pro_provisional_sum}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(touched.pro_provisional_sum && errors.pro_provisional_sum)}
                        helperText={touched.pro_provisional_sum && errors.pro_provisional_sum}
                        type={"number"}
                        label={"Project Provisional Sum"}
                        name="pro_provisional_sum"
                        fullWidth
                        size={"small"}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                      disabled={user.usertype!=1}
                        value={values.pro_variations}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(touched.pro_variations && errors.pro_variations)}
                        helperText={touched.pro_variations && errors.pro_variations}
                        type={"number"}
                        label={"Project variations"}
                        name="pro_variations"
                        fullWidth
                        size={"small"}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                      disabled={user.usertype!=1}
                        value={values.pro_revised_contract_value}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(touched.pro_revised_contract_value && errors.pro_revised_contract_value)}
                        helperText={touched.pro_client && errors.pro_client}
                        type={"number"}
                        label={"Revised Contract Value"}
                        name="pro_revised_contract_value"
                        fullWidth
                        size={"small"}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                      disabled={user.usertype!=1}
                        value={values.pro_contract_duration_days}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(touched.pro_contract_duration_days && errors.pro_contract_duration_days)}
                        helperText={touched.pro_contract_duration_days && errors.pro_contract_duration_days}
                        type={"number"}
                        label={"Project contract duration days"}
                        name="pro_contract_duration_days"
                        fullWidth
                        size={"small"}
                      />
                    </Grid>

                    

                    <Grid item>
                      <TextField
                      disabled={user.usertype!=1}
                        value={values.pro_time_extension_granted}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(touched.pro_time_extension_granted && errors.pro_time_extension_granted)}
                        helperText={touched.pro_time_extension_granted && errors.pro_time_extension_granted}
                        type={"number"}
                        label={"Project Time Extension Granted"}
                        name="pro_time_extension_granted"
                        fullWidth
                        size={"small"}
                      />
                    </Grid>

                    <Grid item>
                      <TextField
                      disabled={user.usertype!=1}
                        value={values.pro_original_completion_date}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(touched.pro_original_completion_date && errors.pro_original_completion_date)}
                        helperText={touched.pro_original_completion_date && errors.pro_original_completion_date}
                        type={"date"}
                        label={"Original Project Completion Date"}
                        name="pro_original_completion_date"
                        fullWidth
                        size={"small"}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                      disabled={user.usertype!=1}
                        value={values.pro_revised_completion_date}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(touched.pro_revised_completion_date && errors.pro_revised_completion_date)}
                        helperText={touched.pro_revised_completion_date && errors.pro_revised_completion_date}
                        type={"date"}
                        label={"Revised Project Completion Date"}
                        name="pro_revised_completion_date"
                        fullWidth
                        size={"small"}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                      disabled={user.usertype!=1}
                        value={values.pro_planned_value_of_work_this_month}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(touched.pro_planned_value_of_work_this_month && errors.pro_planned_value_of_work_this_month)}
                        helperText={touched.pro_planned_value_of_work_this_month && errors.pro_planned_value_of_work_this_month}
                        type={"number"}
                        label={"Number of Planned Work of This Month"}
                        name="pro_planned_value_of_work_this_month"
                        fullWidth
                        size={"small"}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                      disabled={user.usertype!=1}
                        value={values.pro_month}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(touched.pro_month && errors.pro_month)}
                        helperText={touched.pro_month && errors.pro_month}
                        type={"number"}
                        label={"Project Month"}
                        name="pro_month"
                        fullWidth
                        size={"small"}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                      disabled={user.usertype!=1}
                        value={values.pro_planned_value_of_work_todate}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(touched.pro_planned_value_of_work_todate && errors.pro_planned_value_of_work_todate)}
                        helperText={touched.pro_planned_value_of_work_todate && errors.pro_planned_value_of_work_todate}
                        type={"number"}
                        label={"Planned Work of Todate"}
                        name="pro_planned_value_of_work_todate"
                        fullWidth
                        size={"small"}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                      disabled={user.usertype!=1}
                        value={values.pro_value_of_executed_work_todate}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(touched.pro_value_of_executed_work_todate && errors.pro_value_of_executed_work_todate)}
                        helperText={touched.pro_value_of_executed_work_todate && errors.pro_value_of_executed_work_todate}
                        type={"number"}
                        label={"Executed Work Todate"}
                        name="pro_value_of_executed_work_todate"
                        fullWidth
                        size={"small"}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                      disabled={user.usertype!=1}
                        value={values.pro_financial_progress_pct}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(touched.pro_financial_progress_pct && errors.pro_financial_progress_pct)}
                        helperText={touched.pro_financial_progress_pct && errors.pro_financial_progress_pct}
                        type={"number"}
                        label={"Financial Progress %"}
                        name="pro_financial_progress_pct"
                        fullWidth
                        size={"small"}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                      disabled={user.usertype!=1}
                        value={values.pro_time_elapsed_pct}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(touched.pro_time_elapsed_pct && errors.pro_time_elapsed_pct)}
                        helperText={touched.pro_time_elapsed_pct && errors.pro_time_elapsed_pct}
                        type={"number"}
                        label={"Elapsed Time %"}
                        name="pro_time_elapsed_pct"
                        fullWidth
                        size={"small"}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                      disabled={user.usertype!=1}
                        value={values.pro_slippage_pct}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(touched.pro_slippage_pct && errors.pro_slippage_pct)}
                        helperText={touched.pro_slippage_pct && errors.pro_slippage_pct}
                        type={"number"}
                        label={"Slippage %"}
                        name="pro_slippage_pct"
                        fullWidth
                        size={"small"}
                      />
                    </Grid>
                    

                    <Grid item>
                      <Button
                        variant={"primary"}
                        type={"submit"}
                        style={{ marginLeft: "30%" }}
                      >
                        <Save /> Save
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </form>
          );
        }}
      </Formik>
    );
  };

  const SMenu=()=>{


return(
  <Card style={{marginTop:"10px",backgroundColor:"#1976d2",color:"white"}}>
<ul>

  <MenuItem divider key="dashboard" onClick={()=>setDashboard(true)}>Dashboard</MenuItem>
  <MenuItem divider key="unit_cost" onClick={()=>setUnitCost(true)}>Unit Cost</MenuItem> 
  {/* <MenuItem divider key="expense" onClick={()=>setExpense(true)}>Expense</MenuItem>  */}
</ul>
</Card>


)


  }
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
              {data.pro_name} Details
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid
          container
          spacing={2}
          style={{ textAlignment: "center", justifyContent: "center" }}
        >


<Grid item xs={2} md={2} >
            <SMenu/>
          </Grid>
          
          <Grid item xs={6} md={9} style={{marginRight:'10px'}}>
           <Form data={props.data} />
         
          </Grid>
          <Grid item xs={6} md={9}>
            <EmployeeProjectTable mnpr={props.manData} pid={props.data.project_id}/>
           
          </Grid>
          

          <Grid item xs={6} md={9}>
            <MaterialProjectTable pid={props.data.project_id}/>
           
          </Grid>
          
          <Grid item xs={6} md={9}>
            <ActivityProjectTable pid={props.data.project_id}/>
           
          </Grid>

          </Grid>

       
      </Dialog>
      <DetailedDialogue open={dashboard} myComp={()=><Dashboard pro_id={props.data.project_id}/>} type={"Dashboard"} onClose={()=>setDashboard(false)}/>
      <DetailedDialogue open={unitcost} myComp={()=><UnitCostTable pro_id={props.data.project_id} />} type={"Unit Cost"} onClose={()=>setUnitCost(false)}/>
      <DetailedDialogue open={expense}  myComp={()=><Expense pro_id={props.data.project_id} income={[537681337.23,210568250,327113087.23]}   table1Data={[{description:"Equipment",todate:136214550,thisMonth:26105000,previousMonth:110109550},{description:"Manpower",todate:51144500,thisMonth:15764000,previousMonth:35380500},{description:"Material",todate:262690600,thisMonth:145879600,previousMonth:116811000},{description:"Fuel",todate:75545978.0,thisMonth:11385000,previousMonth:64160978},{description:"Other",todate:0.0,thisMonth:0.0,previousMonth:0.0}]}    graphData={[{types:"Equipment",todate:25.9,thisMonth:13.1,previousMonth:33.7},{types:"Manpower",todate:9.7,thisMonth:7.9,previousMonth:10.8},{types:"Material",todate:50.0,thisMonth:73.3,previousMonth:35.8},{types:"Fuel",todate:14.4,thisMonth:5.7,previousMonth:19.7},{types:"Other",todate:0.0,thisMonth:0.0,previousMonth:0.0}]}/>} type={"Expense"} onClose={()=>setExpense(false)}/>
    </div>
  );
}
