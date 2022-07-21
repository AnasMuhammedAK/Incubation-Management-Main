import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import {
  Table,
  DropdownButton,
  Dropdown,
  Modal,
  Button,
} from "react-bootstrap";
// import ProgressBar from "@ramonak/react-progress-bar";
import ProgressBar from "react-bootstrap/ProgressBar";
const token = localStorage.getItem("adminToken")
const config = {
  headers: {
      Authorization: `Bearer ${token}`,
  },
}
function Track() {
  const [allList, setallList] = useState([]);
  const getAllList = async () => {
    try {
      await axios
        .get("http://localhost:3001/admin/getAllList",config)
        .then((res) => {
          console.log(res.data);
          setallList(res.data);
        })
        .catch((err) => {});
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllList();
  }, []);
  return (
    <div className="container">
      <div class="col-md-12 bg-dark mt-5 " id="Pending">
        <h2 class="text-center text-white rounded pt-1">All Applications</h2>
      </div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>No</th>
            <th>Company Name</th>
            <th>Company Details</th>
            {/* <th>View</th> */}
            <th>New</th>
            <th>Pending</th>
            <th>Approved</th>
          </tr>
        </thead>
        <tbody>
          {allList.map((list, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{list.CompanyName}</td>
              <td>{list.Address}</td>
              <td colSpan={3}>
                {/* <ProgressBar
                  completed={
                    list.Status === "Approved"
                      ? "100"
                      : list.Status === "Pending"
                      ? "50"
                      : "1"
                  }
                /> */}
                <ProgressBar style={{dispaly:list.Status=='Rejected'?'none':'block'}}
                  animated
                  now={
                    list.Status === "Approved"
                      ? "100"
                      : list.Status === "Pending"
                      ? "50"
                      : "1"
                  }
                />
                <p
                  style={{
                    display: list.Status === "Rejected" ? "block" : "none",
                  }}
                  className="text-danger"
                >
                  Rejected
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Track;
