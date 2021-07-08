import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import FeaturesImage1 from '../assets/Features1.svg';
import FeaturesImage2 from '../assets/Features2.svg';
import Fan from '../assets/fan.svg';

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
export default function Features() {
  return (
    <>
      <motion.div className="transition transition-1" initial="initial" animate="animate" exit="exit" variants={pageTransition} />
      <Navbar
        activeLink="features"
        isHiddenUponScroll={false}
      />
      <div className="features-container">
        <div id="features" className="features">
          <h1>Features</h1>
          <p>Control your devices from anywhere with the Android / Web App.</p>
          <div id="f-row1" className="feature-row">
            <div id="f-col1" className="feature-col">
              <img src={FeaturesImage1} alt="Features 1" />
              <div className="f-col1-circle" />
            </div>
            <div id="f-col2" className="feature-col">
              <h2>Control Devices</h2>
              <p>
                You can control all your smart devices using the ESP8266 module,
                including almost every Electrical device including the Garage
                door.
              </p>
            </div>
          </div>
          <div id="f-row2" className="feature-row">
            <div id="f-col3" className="feature-col">
              <h2>From Anywhere</h2>
              <p>
                You can Control all of your devices from anywhere in the world
                almost instantly.
              </p>
            </div>
            <div id="f-col4" className="feature-col">
              <img src={FeaturesImage2} alt="Features 2" />
              <div className="f-col4-circle" />
            </div>
          </div>
          <div className="fan">
            <img src={Fan} alt="fan" />
          </div>
          <div className="dot">
            <svg
              version="1.1"
              viewBox="0 0 31.955 31.955"
              xml="preserve"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="15.979" cy="15.977" r="6.117" />
            </svg>
            {/* <img src={Dot} alt="dot" /> */}
          </div>
          <div className="circle">
            <svg viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="25"
                stroke="#009AFE"
                strokeWidth="15"
                fill="transparent"
              />
            </svg>
            {/* <img src={Circle} alt="circle" /> */}
          </div>
        </div>
      </div>
    </>
  );
}
