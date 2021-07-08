import React from 'react';
import Navbar from './Navbar';

export default function Contact() {
  return (
    <>
      <Navbar activeLink="contactus" isHiddenUponScroll={false} />
      <div className="contact">
        {/* <h1>Wana, Contact US?</h1> */}
        <div className="division">
          <div className="contactinfo">
            <h1>If you have any need please contact <span>us!</span></h1>
            <div className="infocontainer">
              <p className="icon"><i className="fas fa-map-marker-alt" /></p>
              <div className="info">
                <h3>Head office:</h3>
                <p>2nd Floor, Tri Dev Complex, Above Rathi X-Ray Clinic, Udhna Darwaja, Surat-395002</p>
              </div>
            </div>
            <div className="infocontainer">
              <p className="icon"><i className="fas fa-envelope" /></p>
              <div className="info">
                <h3>Mail for information:</h3>
                <p>info@msquaretec.com</p>
                <p>support@msquaretec.com</p>
              </div>
            </div>
            <div className="infocontainer">
              <p className="icon"><i className="fas fa-phone" /></p>
              <div className="info">
                <h3>Call for help:</h3>
                <p>+91 7490044775 (India)</p>
                <p>+33 76995 1365 (Paris)</p>
                <p>+1 (703) 220-7958 (Canada)</p>
              </div>
            </div>
          </div>
          <div className="contact-form">
            <form>
              <div className="row">
                <div className="formcontrol">
                  <label htmlFor="Email">Email</label>
                  <input type="email" name="Email" />
                </div>
                <div className="formcontrol">
                  <label htmlFor="First Name">First Name</label>
                  <input type="text" name="First Name" />
                </div>
              </div>
              <div className="row">
                <div className="formcontrol">
                  <label htmlFor="Last Name">Last Name</label>
                  <input type="text" name="Last Name" />
                </div>
                <div className="formcontrol">
                  <label htmlFor="phone Number">Phone Number</label>
                  <input type="text" name="phone Number" />
                </div>
              </div>
              <div className="formcontrol">
                <label htmlFor="message">Message</label>
                <textarea name="message" cols="30" rows="8" />
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
