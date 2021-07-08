import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

import '../App.css';

import WaveElement from '../assets/abstract-wave-element.png';

function AppCarousel() {
  return (
    <>
      <div className="BackgroundContainer">
        <div className="Background">
          <img src={WaveElement} alt="" />
        </div>
      </div>

      <div className="Carousel">
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          interval={3000}
          emulateTouch
          useKeyboardArrows
        >
          <div>
            <img
              //   style={{ objectFit: "cover" }}
              src="https://i.imgur.com/UCA24By.png"
              alt=""
            />
            {/* <p className="legend">Legend 1</p> */}
          </div>
          <div>
            <img src="https://i.imgur.com/MjZmdC2.png" alt="" />
            {/* <p className="legend">Legend 2</p> */}
          </div>
          <div>
            <img src="https://i.imgur.com/ijuKRuV.png" alt="" />
            {/* <p className="legend">Legend 3</p> */}
          </div>
        </Carousel>
      </div>
    </>
  );
}

export default AppCarousel;
