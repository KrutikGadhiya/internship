import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

toast.configure();

const pageTransition = {
  initial: {
    bottom: 0,
  },
  animate: {
    bottom: '100%',
    transition: { duration: 1, ease: [0.9, 0, 0.1, 1] },
  },
  exit: {
    bottom: 0,
    transition: { duration: 1, ease: [0.9, 0, 0.1, 1] },
  },
};

export default function UserSetting() {
  const history = useHistory();
  const [id, setId] = useState('id');
  const [firstName, setFirstName] = useState('user fname');
  const [LastName, setLastName] = useState('user lname');
  const [userEmial, setUserEmail] = useState('user@gmail.com');
  const [isActive, setIsActive] = useState('true');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios.get('https://api.iot.puyinfotech.com/api/user', {
      headers: {
        'x-access-token': JSON.parse(localStorage.getItem('accessToken')),
      },
    })
      .then((res) => {
        console.log(res.data);
        setId(res.data.id);
        setFirstName(res.data.first_name);
        setLastName(res.data.last_name);
        setUserEmail(res.data.email);
        setIsActive(res.data.active);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        if (err.response.status === 401) {
          Swal.fire({
            title: 'Session Expired',
            text: 'Your session has Expired, Signin again to Continue',
            icon: 'error',
          }).then(() => {
            localStorage.clear();
            history.push('/');
          });
        }
        toast.error(err.response.data.error, { autoClose: 5000 });
        toast.error(err.response.data.message, { autoClose: 5000 });
      });
  }, []);

  return (
    <>
      {
        isLoading && (
          <div className="loader-wraper">
            <div className="loader" />
          </div>
        )
      }
      <motion.div className="transition transition-1" initial="initial" animate="animate" exit="exit" variants={pageTransition} />
      <div className="userSetting">
        <h1>User Setting</h1>
        <div className="details">
          <div className="info">
            <h3>ID: <span className="value">{id}</span></h3>
            <h2>
              {isActive ? <FontAwesomeIcon size="2x" icon={faCheckCircle} color="green" /> : <FontAwesomeIcon size="2x" icon={faTimesCircle} color="red" />}
            </h2>
          </div>
          <h3>First Name: <span className="value">{firstName}</span></h3>
          <h3>Last Name: <span className="value">{LastName}</span></h3>
          <h3>Email: <span className="value">{userEmial}</span></h3>
        </div>
      </div>
    </>
  );
}
