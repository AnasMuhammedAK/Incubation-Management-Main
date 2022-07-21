import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Button, Tooltip } from "@mui/material";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import { Modal } from "react-bootstrap";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from "react-router-dom";
const token = localStorage.getItem("adminToken")
const config = {
  headers: {
      Authorization: `Bearer ${token}`,
  },
}
function SlotBooking() {
  const [slot, setSlot] = useState([]);
  const [show, setShow] = useState(false);
  const [view, setView] = useState(false);
  const [approvedList, setApprovedList] = useState([]);
  const [Id, setId] = useState("");
  const [slotData, setSlotData] = useState([]);
  const navigate = useNavigate()
  const handleClose = () => setShow(false);
  const hideModal = () => setView(false);
  // const handleShow = () =>
  const notify = (error) => toast(error)
  async function getSlot() {
    await axios.get("http://localhost:3001/admin/getSlot",config).then((response) => {
      console.log(response.data);
      let obj = response.data;
      setSlot(obj)
    });
  }

  const addSlot = async () => {
    await axios.post("http://localhost:3001/admin/addSlot",config).then((res) => {
      // console.log("res.data");
      getSlot()
    });
  };
  const deleteSlot = async () => {
    await axios.delete("http://localhost:3001/admin/deleteSlot",config).then((res) => {
      // console.log("res.data");
      getSlot();
    });
  };
  const getApprovedList = async () => {
    try {
      await axios
        .get("http://localhost:3001/admin/getApprovedList",config)
        .then((res) => {
          setApprovedList(res.data);
        })
        .catch((err) => {});
    } catch (error) {}
  };
  const handleShow = async (id) => {
    setShow(true);
    setId(id);
    getApprovedList()
    // let obj={
    //   Id:id
    // }
    // await axios.post("http://localhost:3001/admin/bookSlot",obj).then((res) => {
    //   console.log("res.data");
    //   // getSlot();
    // });
  };
  const bookSlot = async (cId,cName) => {
    // setShow(true);
    getApprovedList()
    console.log(Id);
    let id = Id;
    let obj = {
      Id: id,
      cId,
      cName
    };
    await axios
      .post("http://localhost:3001/admin/bookSlot", obj,config)
      .then((res) => {
 
  setApprovedList(approvedList.filter((row)=>{
    return  row._id !== res.data
  }))
  notify('Slote Successfully Booked')
        handleClose();

       // getApprovedList()
         //getSlot();
      });
  };

  const viewDetails = async (sId) => {
    setView(true);
    // getApprovedList()
    
    let obj = {
      sId,
    };
    await axios
      .post("http://localhost:3001/admin/viewDetails", obj,config)
      .then((res) => {
        setSlotData([res.data]);
        // console.log(res.data);
      });
  };

  var rows = [];
  const numslots = slot.length;

  // useEffect(() => {
  //
  // }, []);

  useEffect(() => {
    console.log(slot);
    getSlot();
    //getApprovedList()
    let admin = localStorage.getItem("admin");
    if (admin) {
      navigate("/admin/BookSlot");
    } else {
      navigate("/admin/login");
    }
  }, [show, navigate]);
  return (
    <div className="mt-5 mb-5">
     <ToastContainer />
      <div className="container">
        <Typography variant="h4" gutterBottom component="div">
          Total Slots : {numslots}
        </Typography>
        <div className="d-flex">
          <Button
            onClick={() => {
              addSlot();
            }}
          >
            Add
          </Button>
          <Button
            onClick={() => {
              deleteSlot();
              // getSlot();
            }}
          >
            Delete
          </Button> 
        </div>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1,
              width: 128,
              height: 128,
            },
          }}
        >
          {slot.map((obj, index) => {
            return obj.Booked ? (
              <Paper
                style={{ backgroundColor: "Black", color: "white" }}
                elevation={3}
                onClick={() => {
                  viewDetails(obj.Company);
                }}
              >
                {index + 1}
              </Paper>
            ) : (
              <Paper
                elevation={3}
                onClick={() => {
                  handleShow(obj._id);
                }}
              >
                {index + 1}
              </Paper>
            );
          })}
        </Box>
      </div>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Company Names</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <table>
              {approvedList.map((list) => (
                <tr>
                  <th>{list.CompanyName}</th>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => bookSlot(list._id,list.CompanyName)}
                    >
                      Book
                    </button>
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={view} onHide={hideModal} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Booked Company</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <table>
              {slotData.map((list) => (
                <tbody>
                  <tr>
                    <th>Company</th>
                    <td>{list.CompanyName}</td>
                  </tr>
                  <tr>
                    <th>Address</th>
                    <td>{list.Address}</td>
                  </tr>
                  <tr>
                    <th>City</th>
                    <td>{list.City}</td>
                  </tr>
                  <tr>
                    <th>State</th>
                    <td>{list.State}</td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default SlotBooking;
