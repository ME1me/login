import React, { useState } from 'react';
import { TextField, Button, Box, styled, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Component = styled(Box)`
  height: 80vh;
  width: 100vh;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-shadow: 5px 5px 10px #3d3d3dff;
`;

const Image = styled('img')({
  width: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px',
});

const Wrapper = styled(Box)`
  padding: 25px 35px;
  width: 400px;
  display: flex;
  flex: 1;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;

const LoginButton = styled(Button)`
  text-transform: none;
  background: #fb641b;
  color: #fff;
  height: 48px;
  border-radius: 2px;
  &:hover {
    background: #e55a13;
  }
`;

const SignupButton = styled(Button)`
  text-transform: none;
  background: #fff;
  color: #2874f0;
  height: 48px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
  &:hover {
    background: #f0f0f0;
  }
`;

const Text = styled(Typography)`
  font-size: 16px;
  color: #878787;
  text-align: center;
`;

const Login = () => {
  const [account, setAccount] = useState('login');
  const [signup, setSignup] = useState({ name: '', username: '', password: '', email: '' });
  const [data, setData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };
  const onLoginChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const signupUser = async (e) => {
    e.preventDefault();
    if (!signup.name || !signup.username || !signup.password || !signup.email) {
      toast.error('Please fill all the fields', {
        position: 'top-right',
      });
      return;
    }
    try {
      const res = await axios.post('https://login-1-q21f.onrender.com/register', signup);
      toast.success(res.data.message || 'Registered successfully', {
        position: 'top-right',
      });
      setTimeout(() => setAccount('login'), 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong', {
        position: 'top-right',
      });
    }
  };
  const loginUser = async (e) => {
    e.preventDefault();
    console.log(data);
    try {

      const res = await axios.post('https://login-1-q21f.onrender.com/login', data)
      localStorage.setItem('token', res.data.token)
       toast.success(res.data.message || 'Registered successfully', {
        position: 'top-right',
      });
            // navigate('/profile')
      setTimeout(() => navigate('/profile'), 1000);


    }
    catch (error) {
      alert(error.response.data.message)
    }


  }





  return (
    <Component>
      <Box>
        <Image
          src="https://tse3.mm.bing.net/th/id/OIP.CfAPa2jcb7hwMg7f2GKwmwHaHa?pid=Api&P=0&h=180"
          alt="logo"
        />
        {account === 'login' ? (
          <Wrapper component="form" onSubmit={loginUser}>
            <TextField variant="standard" onChange={onLoginChange} name="email"
              label="Enter Email"
              value={data.email  || ''} />
            <TextField type='password' variant="standard" onChange={onLoginChange} name="password" label="Enter Password" value={data.password  || ''} />
            <LoginButton type="submit" variant="contained">Login</LoginButton>
            <Text>Don't have an account?</Text>
            <SignupButton onClick={() => setAccount('signup')}>
              Create New Account
            </SignupButton>
          </Wrapper>
        ) : (
          <Wrapper component="form" onSubmit={signupUser}>
            <TextField variant="standard" onChange={onInputChange} name="name" label="Enter Name" value={signup.name}
            />
            <TextField variant="standard" onChange={onInputChange} name="email" label="Enter Email" value={signup.email}
            />
            <TextField variant="standard" onChange={onInputChange} name="username" label="Enter Username" value={signup.username}
            />
            <TextField type='password' variant="standard" onChange={onInputChange} name="password" label="Enter Password" value={signup.password}
            />
            <LoginButton type="submit" variant="contained">
              Sign Up
            </LoginButton>
            <Text>Already have an account?</Text>
            <SignupButton onClick={() => setAccount('login')}>Login</SignupButton>
          </Wrapper>
        )}
      </Box>
      <ToastContainer />

    </Component>

  );
};

export default Login;


