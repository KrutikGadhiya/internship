import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { motion } from 'framer-motion';
import { Formik } from 'formik';
import * as Yup from 'yup';
import qs from 'qs';
// import bcrypt from 'bcryptjs';
import Axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './Navbar';
import ErrorMessage from './ErrorMessage';

toast.configure();
const passRegex = /[!@#$%^&*]/;

function LogIn() {
  const history = useHistory();
  // const [defaultBackground, setDefaultBackground] = useState(true);
  const [newBackground, setNewBackground] = useState(false);

  function signinToggle() {
    const formBx = document.querySelector('.formBx');
    const loginWraper = document.querySelector('.login-wraper');

    formBx.classList.remove('active');
    loginWraper.classList.remove('active');

    setNewBackground(false);
    // setDefaultBackground(true);
  }
  function signupToggle() {
    const formBx = document.querySelector('.formBx');
    const loginWraper = document.querySelector('.login-wraper');

    formBx.classList.add('active');
    loginWraper.classList.add('active');

    // setDefaultBackground(false);
    setNewBackground(true);
  }

  function redirect() {
    history.push('/devices');
  }

  const onLogin = ({ loginemail, loginpassword }) => {
    if (!passRegex.test(loginpassword)) {
      toast.error('Password must have atleast one special character', {
        autoClose: 5000,
      });
      return;
    }
    Axios({
      method: 'POST',
      url: 'https://api.iot.puyinfotech.com/api/user/login',
      data: qs.stringify({
        email: loginemail,
        password: loginpassword,
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    })
      .then((res) => {
        // console.log(res.data)
        localStorage.setItem('accessToken', JSON.stringify(res.data.accessToken));
        localStorage.setItem('userDetails', JSON.stringify(res.data));
        toast.success('SignedIN Succesfully', { autoClose: 10000 });
        redirect();
      })
      .catch((err) => {
        toast.error(err.response.data.error, { autoClose: 5000 });
        toast.error(err.response.data.message, { autoClose: 5000 });
      });
  };

  const onSignup = ({
    firstname, lastname, email, password,
  }) => {
    Axios({
      method: 'POST',
      url: 'https://api.iot.puyinfotech.com/api/user/signup',
      data: qs.stringify({
        email,
        password,
        first_name: firstname,
        last_name: lastname,
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    })
      .then((res) => {
        console.log(res.data);
        toast.success('Signed Up Succesfully, Login to Continue', { autoClose: 5000 });
      })
      .catch((err) => {
        console.log(err.response.data);
        toast.error(err.response.data.error, { autoClose: 5000 });
        toast.error(err.response.data.message, { autoClose: 5000 });
      });
  };

  const signupValidationSchema = Yup.object().shape({
    firstname: Yup.string().required().label('First Name'),
    lastname: Yup.string().required().label('Last Name'),
    email: Yup.string().required().email().label('Email'),
    password: Yup.string().required().min(8).label('Password'),
    confirmpassword: Yup.string()
      .required()
      .oneOf([Yup.ref('password'), null], 'Passwords do not match')
      .label('Password'),
  });

  const loginValidationSchema = Yup.object().shape({
    loginemail: Yup.string().required().email().label('Email'),
    loginpassword: Yup.string().required().min(8).label('Password'),
  });

  const pageTransition = {
    initial: {
      bottom: 0,
    },
    animate: {
      bottom: '100%',
      transition: { duration: 1.5, ease: [0.9, 0, 0.1, 1] },
    },
    exit: {
      bottom: 0,
      transition: { duration: 1.5, ease: [0.9, 0, 0.1, 1] },
    },
  };

  return (
    <>
      {/* <div className="transition transition-1" /> */}
      <motion.div className="transition transition-1" initial="initial" animate="animate" exit="exit" variants={pageTransition} />

      <div className="login-wraper">

        <Navbar activeLink="login" isHiddenUponScroll={false} changeBackground={newBackground} />

        <div className="container">
          <div className="blueBg">
            <div className="box signin">
              <h2>Already have an Account ?</h2>
              <button onClick={signinToggle} className="signinBtn">
                Log In
              </button>
            </div>
            <div className="box signup">
              <h2>Don&apos;t Have an Account ?</h2>
              <button onClick={signupToggle} className="signupBtn">
                Sign Up
              </button>
            </div>
          </div>
          <div className="formBx">
            <div className="form signinForm">
              <Formik
                key={1}
                initialValues={{
                  loginemail: '',
                  loginpassword: '',
                }}
                onSubmit={onLogin}
                validationSchema={loginValidationSchema}
              >
                {({
                  handleChange,
                  errors,
                  setFieldTouched,
                  touched,
                  handleSubmit,
                }) => (
                  <>
                    <form>
                      <h3>Log In</h3>
                      <input
                        type="text"
                        placeholder="Email"
                        onBlur={() => setFieldTouched('loginemail')}
                        onChange={handleChange('loginemail')}
                      />
                      <ErrorMessage
                        error={errors.loginemail}
                        visible={touched.loginemail}
                      />
                      <input
                        type="password"
                        placeholder="Password"
                        onBlur={() => setFieldTouched('loginpassword')}
                        onChange={handleChange('loginpassword')}
                      />
                      <ErrorMessage
                        error={errors.loginpassword}
                        visible={touched.loginpassword}
                      />
                      <input
                        type="submit"
                        value="Login"
                        onClick={handleSubmit}
                      />
                      <Link className="forget" to="/forgetPassword">
                        Forget Password
                      </Link>
                    </form>
                  </>
                )}
              </Formik>
            </div>

            <div className="form signupForm">
              <Formik
                key={2}
                initialValues={{
                  firstname: '',
                  lastname: '',
                  email: '',
                  password: '',
                  confirmpassword: '',
                }}
                onSubmit={onSignup}
                validationSchema={signupValidationSchema}
              >
                {({
                  handleChange,
                  errors,
                  setFieldTouched,
                  touched,
                  handleSubmit,
                }) => (
                  <>
                    <form>
                      <h3>Sign Up</h3>
                      <input
                        type="text"
                        placeholder="First Name"
                        onBlur={() => setFieldTouched('firstname')}
                        onChange={handleChange('firstname')}
                      />
                      <ErrorMessage
                        error={errors.firstname}
                        visible={touched.firstname}
                      />
                      <input
                        type="text"
                        placeholder="Last Name"
                        onBlur={() => setFieldTouched('lastname')}
                        onChange={handleChange('lastname')}
                      />
                      <ErrorMessage
                        error={errors.lastname}
                        visible={touched.lastname}
                      />
                      <input
                        type="text"
                        placeholder="Email"
                        onBlur={() => setFieldTouched('email')}
                        onChange={handleChange('email')}
                      />
                      <ErrorMessage
                        error={errors.email}
                        visible={touched.email}
                      />
                      <input
                        type="password"
                        placeholder="Password"
                        onBlur={() => setFieldTouched('password')}
                        onChange={handleChange('password')}
                      />
                      <ErrorMessage
                        error={errors.password}
                        visible={touched.password}
                      />
                      <input
                        type="password"
                        placeholder="Confirm Password"
                        onBlur={() => setFieldTouched('confirmpassword')}
                        onChange={handleChange('confirmpassword')}
                      />
                      <ErrorMessage
                        error={errors.confirmpassword}
                        visible={touched.confirmpassword}
                      />
                      <input
                        type="submit"
                        value="Register"
                        onClick={handleSubmit}
                      />
                    </form>
                  </>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LogIn;
