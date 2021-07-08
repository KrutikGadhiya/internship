import React from 'react';
// import Nav from './Nav';
import Nav from './Nav';
// import Home from './Home';
import Devices from './Devices';
import UserSetting from './UserSetting';
import Setting from './Setting';
import './main.css';

export default function ControlPanel(props) {
  return (
    <>
      <div className="control-panel-wraper">
        <div className="sidePanel">
          <Nav />
        </div>
        <div className="control-panel">
          {/* {props.home ? <Home /> : <></>} */}
          {props.devices ? <Devices /> : <></>}
          {props.usersetting ? <UserSetting /> : <></>}
          {props.setting ? <Setting /> : <></>}
        </div>
      </div>
    </>
  );
}
