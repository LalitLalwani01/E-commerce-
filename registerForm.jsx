import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom"
import RowRadioButtonsGroup from './common/radioButton';
import toast, { Toaster } from 'react-hot-toast'
import { BACKEND_URL } from './constants/routes';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function RegisterForm() {
  const navigate =useNavigate()
  const handleSubmit =  async (event) => {
    try {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      console.log({
        email: data.get('email'),
        password: data.get('password'),
        userName:data.get("username"),
        role:data.get("role")
      });
  
      let response=await axios.post(`${BACKEND_URL}/user`,{
          email:data.get("email"),
          password:data.get("password"),
          userName:data.get("username"),
          role:data.get("role")
        })
        console.log("response",response)
        
      //    let authToken = response.data.data
      //    Cookies.set("authToken",authToken)
      //    console.log("authToken",authToken)
      //   if(response.status(201)){
      //     console.log(response.data.message)
      //     return;
      //   }
      toast.success('Successfully registered!',{
      position:"top-right"
      })
  
  
      setTimeout(()=>{
  
        navigate("/login")
      },1000)
      
    } catch (error) {
      toast.error(error.message,{
        position:"top-right"
        })
      
    }
  

}
    let radioFields=[
        {label: "Seller",value:"seller"},
        {label: "Buyer",value:"user"}
      ]
      

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>

            <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Name"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
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
                id="password"
                autoComplete="current-password"
              />
              <RowRadioButtonsGroup fieldsData={radioFields} heading={"Register As"} radioGroupName={"role"}/>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid item>
                  <Link to="/login" variant="body2">
                    {"Already have a account? Sign In"}
                  </Link>
                </Grid>
          
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Toaster/>
    </ThemeProvider>
  );
}