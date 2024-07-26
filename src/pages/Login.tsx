
import { Container, Paper, Typography, Box, TextField, Button, Stack } from '@mui/material';
import { FaGoogle } from 'react-icons/fa';
import Divider from '@mui/material/Divider';
import Footer from '../components/Footer';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';

import { NavLink, useNavigate } from 'react-router-dom';
import React from 'react';

import { loginStudent } from '../api/services/student.service';
import { useAppDispatch } from '../store/store';
import { addStudent } from '../store/slices/student.auth.slice';
import { addTeacher } from '../store/slices/teacher.auth.slice';
import { loginTeacher, loginTeacherWithGoogle } from '../api/services/teacher.services';
import handleError from '../utils/error.handler';

import { useGoogleLogin, TokenResponse } from '@react-oauth/google';


import { loginStudentWithGoogle } from '../api/services/student.service';

interface LoginProps {
  role: 'student' | 'teacher'
}

const Login: React.FC<LoginProps> = ({ role }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  console.log('role: ', role)
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const googleLogin = useGoogleLogin({
    onSuccess: async (response: TokenResponse) => {

      const loginUser = role == 'student' ?
        await loginStudentWithGoogle(response) :
        await loginTeacherWithGoogle(response);

      role == 'student' ?
        dispatch(addStudent({
          email: loginUser.email,
          id: loginUser.id,
          name: loginUser.name,
          profile_image: loginUser.profile_image
        })) :
        dispatch(addTeacher({
          email: loginUser.email,
          id: loginUser.id,
          name: loginUser.name,
          profile_image: loginUser.profile_image
        }));

      navigate(`/${role}/dashboard`);
    },
    onError: (error) => {
      handleError(error)
    }
  })

  const vaidateEmailInput = () => {
    const email = emailRef.current?.value;
    if (!email) {
      setEmailError(true)
    } else {
      setEmailError(false)
    }
  }

  const validatePasswordInput = () => {
    const password = passwordRef.current?.value;
    if (!password) {
      setPasswordError(true)
    } else {
      setPasswordError(false)
    }
  }

  const validateForm = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (emailError || passwordError) {
      return toast.error('Please enter valid datas')
    }
    try {
      const data = role == "student" ?
        await loginStudent({
          email: emailRef.current?.value as string,
          password: passwordRef.current?.value as string
        })
        : await loginTeacher({
          email: emailRef.current?.value as string,
          password: passwordRef.current?.value as string
        })

      role == 'student' ?
        dispatch(addStudent({
          email: data.email,
          id: data.id,
          name: data.name,
          profile_image: data.profile_image
        })) :
        dispatch(addTeacher({
          email: data.email,
          id: data.id,
          name: data.name,
          profile_image: data.profile_image
        }));

      navigate(`/${role}/dashboard`);
    } catch (error: any) {
      console.log(error)
      handleError(error)
    }

  }
  return (
    <>
      <Container maxWidth="sm" className="flex items-center justify-center  min-h-screen p-4 ">
        <Paper elevation={3} className="p-6  rounded-lg shadow-lg w-full max-w-md">
          <Typography variant="h4" component="h1" className="mb-4 text-center text-costume-primary-color font-semibold">
            {role == "student" ? "Student" : "Teacher"} Login
          </Typography>
          <Divider></Divider>
          <Box component="form" noValidate autoComplete="off" className="mt-4 space-y-2">
            <p className="text-sm text-gray-600">Enter registered email address</p>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              required
              helperText={emailError ? "Enter a valid email address" : ""}
              error={emailError}
              onBlur={vaidateEmailInput}
              inputRef={emailRef}
              sx={{
                '& .MuiInputBase-root': {
                  height: '3rem',
                },
                '& .MuiInputLabel-root': {
                  fontSize: '0.8rem',
                },
              }}
            />

            <p className="text-sm text-gray-600">Enter your password</p>
            <TextField
              label="Password"
              type="password"
              error={passwordError}
              helperText={passwordError ? "Enter a password" : ""}
              variant="outlined"
              fullWidth
              required
              inputRef={passwordRef}
              onBlur={validatePasswordInput}
              sx={{
                '& .MuiInputBase-root': {
                  height: '3rem',
                },
                '& .MuiInputLabel-root': {
                  fontSize: '0.8rem',
                },
              }}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              className="py-2 bg-costume-primary-color"
              onClick={validateForm}
            >
              LOGIN
            </Button>
          </Box>
          <Stack spacing={1} className="mt-4">
            <Typography variant="body2" align="center">
              Dont have an account? <NavLink className="text-costume-primary-color hover:underline"
                to={`/${role}/signup`}>Register</NavLink>
            </Typography>
            <Divider>or</Divider>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<FaGoogle className='text-green-700' />}
              className="mt-2 text-green-700"
              onClick={() => googleLogin()}
            >
              Login with Google
            </Button>

          </Stack>
        </Paper>
      </Container>
      <Toaster position='top-right'></Toaster>
      <Footer></Footer>
    </>
  );
};

export default Login;