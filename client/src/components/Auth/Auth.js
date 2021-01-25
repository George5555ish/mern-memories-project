import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import Icon from './icon';
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { GoogleLogin } from "react-google-login";
import {signIn, signUp} from '../../actions/auth.js';
import Input from "./Input";
import useStyles from "./styles";
const Auth = () => {
  const classes = useStyles();
  // const state = null;
  const dispatch = useDispatch();
  const history = useHistory();
  const initialState = {firstName: '', lastName: '', email: '', password: '', confirmPassword: ''}
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialState)
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isSignUp){
      dispatch(signUp(formData, history))
    } else {
      dispatch(signIn(formData, history))
    }
  };


  const handleChange = (e) => {

    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
   
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const switchMode = () => {
  
    setIsSignUp((prevSignUp) => !prevSignUp);
    console.log(isSignUp);
    setShowPassword(false);
  };


  const googleSuccess = async (res) => {
      const result = res?.profileObj;
      const token = res?.tokenId;

      try {
      
       
          dispatch({type: 'AUTH', data: {result,token}})
          history.push('/');
      } catch (error) {
          console.log(error)
      }
  }

  const googleFailure = async (err) => {
    console.log(err);
      console.log('Google Sign In was unsuccessful. Try again Later')
  }
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  half
                  autoFocus
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>

        
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>

            <GoogleLogin
            clientId="1020339301-ic60hu00q906npoe6tk0f1a2pb31s4ba.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              > Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignUp
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up!"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
