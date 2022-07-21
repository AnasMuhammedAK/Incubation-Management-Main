import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import "./Application.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Alert, Container } from "react-bootstrap";
import swal from "sweetalert";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
function Application() {
  
    const notify = (error) => toast(error);

    // return (
    //   <div>
    //     <button onClick={notify}>Notify!</button>
    //     <ToastContainer />
    //   </div>
    // );
  
  const [error, setError] = useState(false);
  let user = JSON.parse(localStorage.getItem("user"))
  console.log(user)
  let userId = user.id;
  let userName = user.fname + user.lname
  let token = user.token

  const initialValues = {
    User: userId,
    Name: userName,
    Address: "",
    City: "",
    State: "",
    Email: "",
    Phone: "",
    CompanyName: "",
    AboutTeam: "",
    AboutProduct: "",
    AboutProblem: "",
    AboutSolution: "",
    AboutValue: "",
    AboutRevenue: "",
    AboutMarket: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});23
  

  const [isSubmit, setSubmit] = useState(false);
  const [application, setApplication] = useState(false)
  const navigation = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
  };
  async function addForm() {
    if (Object.keys(formErrors).length === 0 && isSubmit) {

      try {

        setFormErrors({})

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        console.log('form is submitted')
        axios.post("http://localhost:3001/addApplication", formValues).then(() => {
          setApplication(true)
          swal({
            title: "Good job!",
            text: "You Successfully Submitted",
            icon: "success",
          }).then(() => {
            navigation("/")
          })

        })


        // swal({
        //   title: "Good job!",
        //   text: "You clicked the button!",
        //   icon: "success",
        //   button: "Aww yiss!",
        // }).then(()=>{
        //   navigation("/")
        // })
        //
      } catch (error) {
        console.log(error);
      }
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setFormErrors(validate(formValues))
    setSubmit(true)
    addForm()
  }
  useEffect(() => {

    addForm()
    console.log("🚀 ~ file: Application.js ~ line 53 ~ addForm ~ formErrors", formErrors)
    //console.log("🚀 ~ file: Application.js ~ line 103 ~ useEffect ~ formValues", formValues)
  }, [isSubmit]);


  const validate = (values) => {
   
    const errors = {}
    //const regex = "\b[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}\b";
//notify()

    if (!values.Address) {
      errors.Address = "address is required"
      notify(errors.Address)
    }else{
      let error = /^[A-Za-z]+$/.test(values.Address)
      if (!error) {
        errors.Address = "Only alphebets are allowed For Address"
        notify(errors.City)
      }
    }
    if (!values.City) {
      errors.City = "City is required";
      notify(errors.City)
    } else {
      let error = /^[A-Za-z]+$/.test(values.City)
      if (!error) {
        errors.City = "Only alphebets are allowed For City"
        notify(errors.City)
      }
    }
    if (!values.Email) {
      errors.Email = "email is required";
      notify(errors.Email)
    } else {
      let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      if (values.Email.match(regexEmail)) {
       
      } else {
        notify('Please provide a valid email address (eg:- test@gmail.com)')
       
      }
    }

    if (!values.State) {
      errors.State = "state is required";
    }
    if (!values.Phone) {
      errors.Phone = "mobile number is required";
      notify(errors.Phone)
    } else if (values.Phone.length < 10) {
      errors.phone = "10 numbers required for phone";
      notify(errors.Phone)
    } else if (values.Phone.length > 10) {
      errors.Phone = "Enter less than 10 numbers for phone";
      notify(errors.Phone)
    }
    if (!values.CompanyName) {
      errors.CompanyName = "This field is required";
      notify(errors.CompanyName)
    }else{
      let error = /^[A-Za-z]+$/.test(values.CompanyName)
      if (!error) {
        errors.CompanyName = "Only alphebets are allowed For CompanyName"
        notify(errors.CompanyName)
      }
    }

    if (!values.AboutTeam) {
      errors.AboutTeam = "This field is required";
      notify('form has unfilled required fields')
    }
    if (!values.AboutProduct) {
      errors.AboutProduct = "This field is required";
      notify('form has unfilled required fields')
    }
    if (!values.AboutProblem) {
      errors.AboutProblem = "This field is required";
      notify('form has unfilled required fields')
    }
    if (!values.AboutValue) {
      errors.AboutValue = "This field is required";
      notify('form has unfilled required fields')
    }
    if (!values.AboutRevenue) {
      errors.AboutRevenue = "This field is required";
      notify('form has unfilled required fields')
    }

    if (!values.AboutMarket) {
      errors.AboutMarket = "This field is required";
      notify('form has unfilled required fields')
    }

    return errors
  };

  // //My part
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.currentTarget);

  //   const Data = {
  //     Name: formData.get("Name"),
  //     Address: formData.get("Address"),
  //     City: formData.get("City"),
  //     State: formData.get("State"),
  //     Email: formData.get("Email"),
  //     Phone: formData.get("Phone"),
  //     CompanyName: formData.get("CompanyName"),
  //     AboutTeam: formData.get("AboutTeam"),
  //     AboutProduct: formData.get("AboutProduct"),
  //     AboutProblem: formData.get("AboutProblem"),
  //     AboutSolution: formData.get("AboutSolution"),
  //     AboutValue: formData.get("AboutValue"),
  //     AboutCompetition: formData.get("AboutCompetition"),
  //     AboutRevenue: formData.get("AboutRevenue"),
  //     AboutMarket: formData.get("AboutMarket"),
  //   };
  //   await axios
  //     .post("http://localhost:3001/apply", Data)
  //     .then((res) => {
  //       console.log(res.data.errorCode);
  //       if (res.data.success) {
  //         alert(res.data.message);
  //         navigate("/");
  //       } else if (res.data.errorCode === 401) {
  //         alert("email exist");
  //         setError(true);
  //       } else {
  //       }
  //     })
  //     .catch(async (err) => {
  //       console.log(err);
  //       await setError(true);
  //       console.log("error", error);
  //     });
  // };
  // useEffect(() => {
  //   let user = localStorage.getItem("user");
  //   if (user) {
  //     navigate("/apply");
  //   } else {
  //     navigate("/login");
  //   }
  // }, [navigate]);
  return (
    <div className="container">
      
      <h3 style={{ marginTop: "2rem" }}>Registration Form</h3>
      <cssBaseline />
      <div className="container card shadow mt-3 mb-5">
        <Box
          className="form"
          component="form"
          sx={{
            mt: 4,
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Container>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                {/* <TextField
                  id="outlined-basic"
                  fullWidth
                  label="Name*"
                  type={"text"}
                  variant="outlined"
                  name="Name"
                /> */}
                <TextField
                  id="outlined-basic"
                  fullWidth
                  label="Company Name*"
                  variant="outlined"
                  type={"text"}
                  onChange={handleChange}
                  name="CompanyName"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-basic"
                  onChange={handleChange}
                  autoComplete="on"
                  fullWidth
                  type={"text"}
                  label=" Company Address*"
                  variant="outlined"
                  name="Address"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-basic"
                  fullWidth
                  type={"text"}
                  label="City*"
                  variant="outlined"
                  name="City"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-basic"
                  fullWidth
                  type={"text"}
                  label="State*"
                  variant="outlined"
                  name="State"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-basic"
                  fullWidth
                  label="Email*"
                  type={"email"}
                  variant="outlined"
                  name="Email"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-basic"
                  fullWidth
                  label="Phone number*"
                  variant="outlined"
                  type={"number"}
                  name="Phone"
                  onChange={handleChange}
                />
              </Grid>
              {/* <Grid item xs={12} sm={6}>
                             </Grid>

              <Grid item xs={12} sm={6}>
                <TextField id="outlined-basic" fullWidth label="Company Name*" variant="outlined" />
              </Grid> */}
              <Grid item xs={12} sm={12}>
                <TextField
                  id="outlined"
                  fullWidth
                  label="Describe about your team and background*"
                  variant="outlined"
                  name="AboutTeam"
                  type={"text"}
                  multiline
                  rows={3}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  id="outlined-basic"
                  fullWidth
                  autoComplete="on"
                  label="Describe your comapny and products*"
                  variant="outlined"
                  multiline
                  type={"text"}
                  name="AboutProduct"
                  rows={3}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  id="outlined-basic"
                  fullWidth
                  label="Describe the problem you are trying to solve*"
                  variant="outlined"
                  multiline
                  rows={3}
                  type={"text"}
                  name="AboutProblem"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  id="outlined-basic"
                  fullWidth
                  label="What is unique about your solution?*"
                  variant="outlined"
                  multiline
                  name="AboutSolution"
                  rows={3}
                  type={"text"}
                  onChange={handleChange}
                />
              </Grid>
             
              <Grid item xs={12} sm={12}>
                <TextField
                  id="outlined-multiline-static"
                  label="What is your value proposition to the customers?*"
                  multiline
                  rows={3}
                  name="AboutValue"
                  fullWidth
                  type={"text"}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  id="outlined-multiline-static"
                  label="What are your competators and what is your competative advantage?*"
                  multiline
                  name="AboutCompetition"
                  rows={3}
                  fullWidth
                  type={"text"}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  id="outlined-multiline-static"
                  label="Explain your revenue model*"
                  multiline
                  rows={3}
                  name="AboutRevenue"
                  fullWidth
                  type={"text"}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  id="outlined-multiline-static"
                  label="What is the potential market size of the product?*"
                  multiline
                  name="AboutPotential"
                  rows={3}
                  type={"text"}
                  fullWidth
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  id="outlined-multiline-static"
                  label="How do you market or plan to market your products and services?*"
                  multiline
                  rows={3}
                  name="AboutMarket"
                  type={"text"}
                  fullWidth
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Button
                  fullWidth
                  style={{ marginTop: "2rem", marginBottom: "3rem" }}
                  variant="contained"
                  type="submit"
                >
                  APPLY
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Box>
        
      </div>
      <ToastContainer />
    </div>
  );
}

export default Application;
