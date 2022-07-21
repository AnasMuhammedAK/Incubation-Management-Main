import axios from "axios";
import React, { useState, useEffect } from "react";
import "./DashBoard.css";
import swal from "sweetalert";
import {
  Table,
  DropdownButton,
  Dropdown,
  Modal,
  Button,
} from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function DashBoard() {
  const [newList, setNewList] = useState([]);
  const [pendingList, setPendingList] = useState([]);
  const [approvedList, setApprovedList] = useState([]);
  const [status, setStatus] = useState("");
  const [show, setShow] = useState(false);
  const [appDetails, setAppDetails] = useState([]);
  const [swalShow, setSwalShow] = useState(false);
  const [tempStatus, setTempStatus] = useState('');
const token = localStorage.getItem("adminToken")
const config = {
  headers: {
      Authorization: `Bearer ${token}`,
  },
}
const notify = (error) => toast(error);
  const handleClose = (id) => {
    setShow(false)
  };
  const handleShow = async (id) => {

    console.log(id)
    try {
      
      await axios
        .get("http://localhost:3001/admin/getDetails/" + id,config)
        .then((res) => {

          console.log("🚀 ~ file: DashBoard.js ~ line 34 ~ .then ~ res.data", res.data)
          setAppDetails(res.data)

        });
    } catch (error) {
      console.log(error);
    }
      
    setShow(true);
  };

  //get New application
  const getNewList = async () => {
    try {
      await axios
        .get("http://localhost:3001/admin/getNewList",config)
        .then((res) => {
          console.log("🚀 ~ file: DashBoard.js ~ line 48 ~ .then ~ res.data.response", res.data)
          setNewList(res.data)

        })
        .catch((err) => { });
    } catch (error) {
      console.log(error);
    }
  };
  //get pending application
  const getPendingList = async () => {
    try {
      await axios
        .get("http://localhost:3001/admin/getPendingList",config)
        .then((res) => {
          setPendingList(res.data)
        })
        .catch((err) => { });
    } catch (error) { }
  };
  //get approved list
  const getApprovedList = async () => {
    try {
      await axios
        .get("http://localhost:3001/admin/getApprovedList",config)
        .then((res) => {
          setApprovedList(res.data)
        })
        .catch((err) => { });
    } catch (error) { }
  };

  //Change application status
  async function changeStatus(status, id) {
    let obj = { status, id };
if(status !== 'Rejected' ){
  try {

    await axios
      .post("http://localhost:3001/admin/changeStatus", obj,config)
      .then((res) => {
        if (status === 'Approved') {
          notify(status)
          setStatus(status)
          setPendingList(res.data)
        }
        if (status === 'Pending') {
          notify(status)
          setStatus(status)
          setNewList(newList.filter((row => {
            return (row._id !== id)
          })))
          setPendingList(res.data)
        }

        console.log("🚀 ~ file: DashBoard.js ~ line 91 ~ .then ~ res.data", res.data)
      });
  } catch (error) { }
}else if(status === 'Rejected' ){
  swal({
    title: "Are you sure?",
    text: "Once Rejected, you will not be able to recover this Application!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      swal("Poof! This Applicatiion  has been Rejected!", {
        icon: "success",
      }).then(async()=>{
        try {

          await axios
            .post("http://localhost:3001/admin/changeStatus", obj,config)
            .then((res) => {
              if (status === 'Rejected') { 
                setStatus(status)
                setPendingList(res.data)
              }
              
      
              console.log("🚀 ~ file: DashBoard.js ~ line 91 ~ .then ~ res.data", res.data)
            });
        } catch (error) { }
      })
    } else {
      swal("Your imaginary file is safe!");
    }
  });
 
}
    
   
  }
  //get application details
  async function getApplicationDetails(id) { }
  //Call functions when mount
  useEffect(() => {
    getNewList();
    getPendingList();
    getApprovedList();

  }, [status])

  return (
    <div className="container mt-5 p-2">
      <ToastContainer />
      <div class="col-md-12 bg-dark" id="New">
        <h2 class="text-center text-white rounded pt-1">New Applications</h2>
      </div>
      <Table striped bordered hover size="sm" id="app-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Company Name</th>
            <th>Company Details</th>
            <th>View</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {newList.map((list, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{list.CompanyName}</td>
              <td>{list.Address}</td>
              <td>
                <Button
                  variant="outline-info "
                  onClick={() => {
                    handleShow(list._id);
                  }}
                >
                  Open
                </Button>
              </td>
              <td>
                <Button
                  variant="outline-warning"
                  onClick={() => {
                    setStatus("");
                    changeStatus("Pending", list._id)
                  }}
                >
                  Pending
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div class="col-md-12 bg-dark mt-5 " id="Pending">
        <h2 class="text-center text-white rounded pt-1">
          Pending Applications
        </h2>
      </div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>No</th>
            <th>Company Name</th>
            <th>Company Details</th>
            <th>View</th>
            <th colSpan={2}>Change Status</th>
          </tr>
        </thead>
        <tbody>
          {pendingList.map((list, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{list.CompanyName}</td>
              <td>{list.Address}</td>
              <td>
                <Button
                  variant="outline-info "
                  onClick={() => {
                    handleShow(list._id);
                  }}
                >
                  Open
                </Button>
              </td>
              <td>
                <Button
                  variant="outline-danger"
                  onClick={() => {
                    changeStatus("Rejected", list._id);
                  }}
                >
                  Decline
                </Button>
              </td>
              <td>
                <Button
                  variant="outline-success"
                  onClick={() => {
                    changeStatus("Approved", list._id)
                  }}
                >
                  Approve
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* <div class="col-md-12 bg-dark mt-5" id="Approved">
        <h2 class="text-center text-white rounded pt-1">
          Approved Applications
        </h2>
      </div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>No</th>
            <th>Company Name</th>
            <th>Company Details</th>
            <th>View</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {approvedList.map((list, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{list.CompanyName}</td>
              <td>{list.Address}</td>
              <td>
                <button className="btn-danger btn">Open</button>
              </td>
              <td>
                
                <button className="btn-success btn">{list.Status}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table> */}

      {appDetails.map((obj, index) => (
        <Modal
          key={index}
          show={show}
          onHide={handleClose}
          fullscreen={true}
          animation={true}
        >
          <Modal.Header closeButton>
            <Modal.Title>Company Name : {obj.CompanyName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <table>
              <tr>
                <th>
                  <span className="fw-bold">Name : </span>
                </th>
                <td>{obj.Name}</td>
              </tr>
              {/* <br></br> */}
              <tr>
                <th>
                  {" "}
                  <span className="fw-bold">Company Name : </span>
                </th>
                <td>{obj.CompanyName}</td>
              </tr>

              <tr>
                <th>
                  <span className="fw-bold">Address : </span>
                </th>
                <td>{obj.Address}</td>
              </tr>
              <tr>
                <th>
                  <span className="fw-bold">City : </span>
                </th>
                <td>{obj.City}</td>
              </tr>
              <tr>
                <th>
                  <span className="fw-bold">State : </span>
                </th>
                <td>{obj.State}</td>
              </tr>
              <tr>
                <th>
                  <span className="fw-bold"> Email: </span>
                </th>
                <td>{obj.Email}</td>
              </tr>
              <tr>
                <th>
                  {" "}
                  <span className="fw-bold"> Phone: </span>
                </th>
                <td>{obj.Phone}</td>
              </tr>
              <tr>
                <th>
                  {" "}
                  <span className="fw-bold">Company Name : </span>
                </th>
                <td>{obj.CompanyName}</td>
              </tr>
              <hr></hr>
              <tr>
                <th>
                  <span className="fw-bold">About Team and Background: </span>
                </th>
                <td>{obj.AboutTeam}</td>
              </tr>
              <tr>
                <th>
                  <span className="fw-bold">About company and Product : </span>
                </th>
                <td> {obj.AboutProduct}</td>
              </tr>
              <tr>
                <th>
                  <span className="fw-bold">
                    About Problem trying to solve :{" "}
                  </span>
                </th>
                <td> {obj.AboutProblem}</td>
              </tr>
              <tr>
                <th>
                  <span className="fw-bold">About unique Solution : </span>
                </th>
                <td>{obj.AboutSolution}</td>
              </tr>
              <tr>
                <th>
                  <span className="fw-bold">
                    About the value to customers :{" "}
                  </span>
                </th>
                <td>{obj.AboutValue}</td>
              </tr>
              <tr>
                <th>
                  {" "}
                  <span className="fw-bold">About competators : </span>
                </th>
                <td> {obj.AboutCompetition}</td>
              </tr>
              <tr>
                <th>
                  {" "}
                  <span className="fw-bold">About Revenue model: </span>
                </th>
                <td>{obj.AboutRevenue}</td>
              </tr>
              <tr>
                <th>
                  <span className="fw-bold">
                    About market size of product :
                  </span>
                </th>
                <td>{obj.AboutMarket}</td>
              </tr>
              <tr>
                <th>
                  <span className="fw-bold">About Marketing plans : </span>
                </th>
                <td> {obj.AboutMarket}</td>
              </tr>
              <tr>
                <th>
                  <span className="fw-bold">Status : </span>
                </th>
                {/* {obj.AboutTeam} */}
                <td>
                  {/* <DropdownButton
                    id="dropdown-basic-button"
                    title={`${obj.Status}`}
                  >
                    <Dropdown.Item
                      onClick={() => {
                        setStatus("");
                        changeStatus("Approve", obj._id);
                      }}
                    >
                      Approve
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        setStatus("");
                        changeStatus("Decline", obj._id);
                      }}
                    >
                      Decline
                    </Dropdown.Item>
                  </DropdownButton> */}
                  {obj.Status}
                </td>
              </tr>
              <br></br>
            </table>
          </Modal.Body>
        </Modal>
      ))}

      {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      {/* <SweetAlert
        show={swalShow}
        // show={false}
        warning
        showCancel
        confirmBtnText="Yes, Change it!"
        confirmBtnBsStyle="danger"
        title="Are you sure?"
        onConfirm={()=>changeStatus("Rejected", list._id);}
        onCancel={()=>setSwalShow(false)}
        focusCancelBtn
      >
        You will not be able to recover this imaginary file!
      </SweetAlert> */}
    </div>
  );
}

export default DashBoard;
