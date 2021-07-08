import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import Switch from 'react-switch';
import Swal from 'sweetalert2';
import bulb from './img/lightbulb.svg';
import bulbon from './img/lightbulb-on.svg';
import fan from './img/Fan.svg';
import AC from './img/AC-2.svg';
import ACon from './img/ACon-2.svg';
import TV from './img/tv.svg';
import TVon from './img/tv-solid-on.svg';

// import livingroom from './img/living-room.jpg';
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
export default function Devices() {
  const history = useHistory();
  // const [masterSwitch, setMasterSwitch] = useState(true);
  const [allDevices, setAllDevices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    axios.get('https://api.iot.puyinfotech.com/api/devices', {
      headers: {
        'x-access-token': JSON.parse(localStorage.getItem('accessToken')),
      },
    })
      .then((res) => {
        console.log(res.data);
        setAllDevices(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        // console.log(err.response);
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
          return;
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
      <div>
        {/* <div className="banner">
        <div className="backgroundImg">
          <img src={livingroom} alt="" />
        </div>
        <div className="selectionList">
          <select name="rooms" id="room">
            <option value="Living Room">Living Room</option>
            <option value="Drawing Room">Drawing Room</option>
            <option value="Bed Room">Bed Room</option>
            <option value="Kitchen">Kitchen</option>
          </select>
        </div>
        <div className="master-toggle">
          <div className="switch">
            <Switch
              className="switch"
              checked={masterSwitch}
              onChange={() => setMasterSwitch(!masterSwitch)}
              onColor="#2ECC71"
              onHandleColor="#fff"
              handleDiameter={35}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
              height={30}
              width={70}
              id="material-switch"
            />
          </div>
        </div>
      </div> */}
        <div className="devices">
          <h1>Devices</h1>
          {
            allDevices.length !== 0 ? (
              <div className="devices-grid">
                {
                  allDevices.map((device) => <Device id={device.id} key={device.id} name={device.type} desc={device.type} deviceState={device.state} />)
                }
              </div>
            ) : (
              !isLoading && (
                <div className="nodevice">
                  <h1>No Devices found</h1>
                  {/* <i className="bx bx-box">😩</i> */}
                  <i className="bx">😩</i>
                  <p>Downlad the Mobile app to continue further</p>
                </div>
              )
            )
          }

          {/* <Device name="bulb" type={bulb} desc="living room light" deviceState={false} />
      <Device name="TV" type={TV} desc="living room TV" deviceState /> */}
        </div>
      </div>
    </>
  );
}

function deviceType(type) {
  if (type === 'fan') {
    return 'icon-animation-rotate';
  }
}
function deviceIcon(type) {
  if (type === 'fan') {
    return fan;
  }
  if (type === 'light_simple') {
    return bulb;
  }
  if (type === 'AC') {
    return AC;
  }
  if (type === 'TV') {
    return TV;
  }
}
function deviceIconOn(type) {
  if (type === 'fan') {
    return fan;
  }
  if (type === 'light_simple') {
    return bulbon;
  }
  if (type === 'AC') {
    return ACon;
  }
  if (type === 'TV') {
    return TVon;
  }
}
function Device(props) {
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(props.deviceState);
  }, []);

  function turnOnOff(id, state) {
    axios.get(`https://api.iot.puyinfotech.com/api/devices/${id}/${state}`, {
      headers: {
        'x-access-token': JSON.parse(localStorage.getItem('accessToken')),
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }
  return (
    <div className="device">
      <div className="top">
        <div className="icon">
          <img
            className={checked ? deviceType(props.name) : ''}
            width="30px"
            src={checked ? deviceIconOn(props.name) : deviceIcon(props.name)}
            alt={props.name}
          />
        </div>
        <div className="toggle-btn">
          <Switch
            checked={checked}
            onChange={() => {
              setChecked(!checked);
              turnOnOff(props.id, checked ? 'off' : 'on');
            }}
            onColor="#86d3ff"
            onHandleColor="#2693e6"
            handleDiameter={25}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={20}
            width={40}
            className="react-switch"
            id="material-switch"
          />
        </div>
      </div>
      <div className="device-desc">
        {props.desc}
      </div>
      {/* <div className="device-state">
        {checked ? 'ON' : 'OFF'}
      </div> */}
    </div>
  );
}
