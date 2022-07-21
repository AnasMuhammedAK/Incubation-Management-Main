import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ToastContainer, toast } from "react-toastify";
// import axios from 'axios'

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
function notify(alert){
  toast(alert)
}
  async function doLogin(e) {
    e.preventDefault();
    const loginData = {
      email,
      password,
    };
   
    // eslint-disable-next-line no-lone-blocks
    {
      !props.Admin
        ? await axios
            .post("http://localhost:3001/login", loginData)
            .then((res) => {
            
              localStorage.setItem("user", JSON.stringify(res.data))
              localStorage.setItem("userToken", res.data.token);
              navigate("/");
            })
            .catch((err) => {
              setError(true);
              console.log(err);
            })
        : console.log("in admin login");
      await axios
        .post("http://localhost:3001/admin/login", loginData)
        .then((res) => {
         if(!res.data.error){
          let admin = res.data;
          let adminToken = res.data.token
          localStorage.setItem("admin", JSON.stringify(admin));
          localStorage.setItem("adminToken", adminToken);

          navigate("/admin");
         }else{
          notify(res.data.error)
         }
        })
        .catch((err) => {
          setError(true);
          notify(err)
          console.log(err);
        });
    }
  }

  useEffect(() => {
    let user = localStorage.getItem("user");
    let admin=localStorage.getItem("admin")
    console.log(admin);
    if(props.Admin&&admin){
      navigate('/admin')
    }else if(props.Admin&&!admin){
      navigate('/admin/login')
    }else if(user){
      navigate('/')
    }else{
      navigate('/login')
    }
  }, [navigate, props.Admin]);
  const theme = createTheme();

  //JSX
  return (
    <div className="login">
      <ToastContainer />
      <ThemeProvider theme={theme}>
        {props.Admin ? (
          //Admin login
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Stack
                sx={{ width: "100%" }}
                style={{
                  margin: "1.5rem 0",
                  display: error ? "block" : "none",
                }}
                spacing={2}
              >
                <Alert severity="error">Invalid Email or password</Alert>
              </Stack>
              <Avatar sx={{ m: 1, bgcolor: "info.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Admin Login
              </Typography>
              <Box
                component="form"
                onSubmit={doLogin}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  id="password"
                 
                  autoComplete="current-password"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                {/* <Grid container>
                  <Grid item xs>
                    <Link to={"/login"} variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link to={"/signup"} variant="body2">
                      Create an Account
                    </Link>
                  </Grid>
                </Grid> */}
              </Box>
            </Box>
          </Container>
        ) : (
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Stack
                sx={{ width: "100%" }}
                style={{
                  margin: "1.5rem 0",
                  display: error ? "block" : "none",
                }}
                spacing={2}
              >
                <Alert severity="error">Invalid Email or password</Alert>
              </Stack>
              <Avatar sx={{ m: 1, bgcolor: "info.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box
                component="form"
                onSubmit={doLogin}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                 
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  id="password"
                
                  autoComplete="current-password"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    {/* <Link to={"/login"} variant="body2">
                      Forgot password?
                    </Link> */}
                  </Grid>
                  <Grid item>
                    <Link to={"/signup"} variant="body2">
                      Create an Account
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        )}
      </ThemeProvider>
    </div>
  );
}

export default Login;
