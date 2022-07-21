import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import ProgressBar from 'react-bootstrap/ProgressBar';
import axios from "axios"
function Home() {
  let user = JSON.parse(localStorage.getItem("user"))
  let userId = user.id;
  let userName = user.fname + " " + user.lname
  let token = user.token
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const [appStatus, setAppStatus] = useState(null)

  console.log("🚀 ~ file: Home.js ~ line 23 ~ Home ~ status", appStatus)
  const navigate = useNavigate()
  const getMyForm = async () => {
    try {
      
      await axios
        .get("http://localhost:3001/getmyform/" + userId)
        .then((res) => {
          
          console.log("🚀 ~ file: Home.js ~ line 20 ~ .then ~ es.data", res.data)
          setAppStatus(res.data)
          

        })
        .catch((err) => { });
    } catch (error) {
      console.log(error);
    }
  }
  getMyForm()
  useEffect(() => {
    getMyForm()
    console.log('testing')
  
  }, [appStatus])


  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card
          sx={{ maxWidth: 500, minWidth: 500, minWidth: 500, maxWidth: 500 }}
          className="mt-5 card  shadow m-5"
        >
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Hello {userName} Welcome to Incubation
            </Typography>
            <Typography variant="body2" color="text.secondary"></Typography>
          </CardContent>
          {/* <CardActions>
            <Button size="small" onClick={() => navigate("/apply")}>APPLY</Button>
          </CardActions> */}
          {appStatus !== null ? (
            <div>


              <div className="mb-2">Your Applications Status</div>
              {appStatus === 'new' ? (
                <ProgressBar>
                  <ProgressBar striped variant="primary" label={'in-progress'} now={33} key={1} />
                </ProgressBar>) : ('')}
              {appStatus === 'Pending' ? (
                <ProgressBar>
                  <ProgressBar striped variant="primary" label={'in-progress'} now={33} key={1} />
                  <ProgressBar variant="warning" label={'Pending'} now={33} key={2} />
                </ProgressBar>) : ('')}
              {appStatus === 'Approved' ? (
                <ProgressBar>
                  <ProgressBar striped variant="primary" label={'in-progress'} now={33} key={1} />
                  <ProgressBar variant="warning" label={'Pending'} now={33} key={2} />
                  <ProgressBar striped variant="success" label={'Approved'} now={34} key={3} />
                </ProgressBar>) : ('')}
              {appStatus === 'Rejected' ? (
                <ProgressBar>
                  <ProgressBar striped variant="danger" label={'Rejected'} now={100} key={1} />
                </ProgressBar>) : ('')}
                {appStatus === 'Booked' ? (
                <ProgressBar>
                  <ProgressBar striped variant="success" label={'Your Slote is Booked'} now={100} key={1} />
                </ProgressBar>) : ('')}
            </div>) : ('')}

        </Card>
      </div>
    </div>
  );
}

export default Home;


