import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import {useSelector} from "react-redux";
import { GoogleLogin } from 'react-google-login';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import Icon from './icon';
import { signin, signup } from '../../actions/auth';
import { AUTH } from '../../constants/actionTypes';
import useStyles from './styles';
import Input from './Input';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Forget = () => {
  
    const authData = useSelector((state) => state.auth);
    console.log(authData,"kuldeep");
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [setPassword, setSetPassword] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    history.push('/auth')
    setIsSignup((prevIsSignup) => !prevIsSignup);
    // also fine  
    // setIsSignup(true);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
console.log(form);
    if (isSignup) {
      dispatch(signup(form, history));
    } else {
      dispatch(signin(form, history));
    }
  };


  const opendSetPassword = async ()=>{
     
  }

 

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">Reset Password</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
         
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
             <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />
          </Grid>
          {/* type submit and form onSubmit */}
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            Reset
          </Button>

          {/* google  login */}
         


          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
              </Button>
              <Button onClick={opendSetPassword}>
                { isSignup ? 'Forget password' : "Forget password" }
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Forget;