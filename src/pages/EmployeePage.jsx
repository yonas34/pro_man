import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import MaterialTable, { MTableToolbar } from "material-table";
import tableIcons from "../component/tableIcons";
import { Details } from "@material-ui/icons";
import Dialogue from "../component/Dialogue";
import Toast from "../component/Toast";
import { dPP } from "../component/pp";
import { TenMp } from "@mui/icons-material";
import { trackPromise } from "react-promise-tracker";

function EmployeePage() {
  const user = useSelector((state) => state.user);
  const [selectedRow, setSelectedRow] = useState(0);
  const tableRef = React.createRef();

  const [toastOpen, setToastOpen] = React.useState(false);

  const [data, setData] = useState();
  const [manPowerData, setManPowerData] = useState([]);

  useEffect(() => {
    trackPromise(axios
      .post("https://www.nrwlpms.com/api/api/get_all_manpower.php", {
        jwt: user.token,
      })
      .then(async (response) => {
        console.log(response.data);
        await setManPowerData(response.data.data);
      }));

    //  const datas= [{first_name:'Alem',last_name:'Gezaheng',email:"alem@gmai.com",phone_number:"0912568944",imageUrl:image,id:"12345"},{first_name:'Girma',last_name:'Mola',email:"grimamola@gmai.com",phone_number:"0922568944",imageUrl:image,id:"556677"}];

    trackPromise(axios
      .post("https://www.nrwlpms.com/api/api/get_all_employee.php", {
        jwt: user.token,
      })
      .then(async (response) => {
        console.log(response.data);
        await setData(response.data.data);
      }));
  }, []);

  var obj = manPowerData.reduce((acc, cur, i) => {
    acc[cur.mnpr_id] = cur.title_trade;
    return acc;
  }, {});

  const column = [
    {
      title: "Profile Picture",
      field: "emp_pic",
      editable: "never",
      render: (rowData) => (
        <img
          src={
            rowData.emp_pic == "" || rowData.emp_pic == undefined
              ? "data:image/jpeg;base64," + dPP
              : "data:image/jpeg;base64," + rowData.emp_pic
          }
          style={{ width: 50, borderRadius: "50%" }}
        />
      ),
    },
    { title: "First Name", field: "first_name" },
    { title: "Last Name", field: "last_name" },
    { title: "Email", field: "email" },
    { title: "ManPower", field: "mnpr_id", lookup: obj },
    { title: "Phone Number", field: "phone_no", type: "numeric" },
    { title: "Employee Id", field: "emp_id", editable: "never" },
  ];

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState({});
  const handleDetailClose = () => {
    setSelected({});
    setOpen(false);
  };
  const handleDetailSave = () => {
    setOpen(false);
  };
  const openDetails = (data) => {
    console.log(data);
    setSelected({ ...data });
    setOpen(true);
  };
  const setDataFromDialogue = async (datas, img) => {
    console.log(datas);

    await axios
      .post("https://www.nrwlpms.com/api/api/update_employee.php", {
        ...datas,
        jwt: user.token,
      })
      .then(async (response) => {
        await axios
          .post("https://www.nrwlpms.com/api/api/update_emp_pic.php", {
            emp_id: datas.emp_id,
            emp_pic: img,
            jwt: user.token,
          })
          .then((response) => {
            setOpen(false);

            const temp = { ...datas, emp_pic: img };
            const dataUpdate = [...data];
            const index = datas.tableData.id;
            dataUpdate[index] = temp;
            setData([...dataUpdate]);
            console.log(response.data.message);
          })
          .catch((err) => console.log(err.message));

        setToastOpen(true);
      })
      .catch((err) => console.log(err.message));
  };
  const deleteEmployeePage = async (emp_id) => {
    await axios
      .post("https://www.nrwlpms.com/api/api/delete_employee.php", {
        ...emp_id,
        jwt: user.token,
      })
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const addEmployeePage = async (newData) => {
    console.log(newData.mnpr_id);
    await axios
      .post("https://www.nrwlpms.com/api/api/create_employee.php", {
        ...newData,

        jwt: user.token,
      })
      .then((response) => {
        console.log(response.data.message);
        console.log(response.data);
        const temp = { ...newData, emp_id: response.data.emp_id };
        setData([...data, temp]);
      })
      .catch((err) => console.log(err.message));
  };

  const updateEmployeePage = async (newData) => {
    await axios
      .post("https://www.nrwlpms.com/api/api/update_employee.php", {
        ...newData,
        jwt: user.token,
      })
      .then((response) => console.log(response.data.message))
      .catch((err) => console.log(err.message));
  };

  return (
    <div>
      <MaterialTable
        icons={tableIcons}
        title="EmployeePage"
        tableRef={tableRef}
        columns={column}
        data={data}
        options={{
          actionsColumnIndex: -1,
          rowStyle: (rowData) => ({
            backgroundColor:
              selectedRow === rowData.tableData.id ? "#EEE" : "#FFF",
          }),
          headerStyle: {
            fontWeight: "bold",
            headerStyle: { position: "sticky", top: 0 },
            maxBodyHeight: 500,
          },
        }}
        components={{
          Toolbar: (props) => (
            <div style={{ color: "white", backgroundColor: "#1976d2" }}>
              <MTableToolbar {...props} />
            </div>
          ),
        }}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                addEmployeePage(newData);

                resolve();
              }, 1000);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                updateEmployeePage(newData);
                dataUpdate[index] = newData;
                setData([...dataUpdate]);
                resolve();
              }, 1000);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                deleteEmployeePage(oldData);
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete]);
                resolve();
              }, 1000);
            }),
        }}
        onRowClick={(evt, selectedRow) =>
          setSelectedRow(selectedRow.tableData.id)
        }
        actions={[
          {
            icon: () => <Details />,
            tooltip: "Details",
            onClick: (event, rowData) => {
              console.log(rowData);
              openDetails(rowData);
            },
          },
        ]}
      />
      <Toast
        message={"Data Saved!"}
        handleClose={(event, reason) => {
          if (reason === "clickaway") {
            return;
          }
          setToastOpen(false);
        }}
        open={toastOpen}
      />
      <Dialogue
        open={open}
        manData={manPowerData}
        setData={(data, img) => setDataFromDialogue(data, img)}
        data={selected}
        onClose={handleDetailClose}
        onSave={handleDetailSave}
      />
    </div>
  );
}

export default EmployeePage;
