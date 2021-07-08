import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import '../transitions.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

function Navbar({ activeLink, isHiddenUponScroll, changeBackground }) {
  // const [background, setBackground] = useState(false);

  const handler = () => {
    const nav = document.getElementById('Ham-Container');
    // const header = document.getElementById("TopLeftAppSection");
    const navItems = document.getElementById('Navlinks-1');
    const login = document.getElementById('hidden-Login');
    const hamLogo = document.getElementById('hidden-Hamburger');

    nav.classList.toggle('show');
    // header.classList.toggle("fix");
    navItems.classList.toggle('nav-items');
    login.classList.toggle('hidden-login');
    hamLogo.classList.toggle('hidden-ham-logo');
  };

  const applyLinkStyles = (id) => {
    const HTMLid = id;
    HTMLid.style.color = '#4a39d0';
    HTMLid.style.transition = 'transition: color 0.3s linear';
    HTMLid.style.pointerEvents = 'none';
  };

  let prevScroll = window.pageYOffset;

  const handleScroll = () => {
    const currentScroll = window.pageYOffset;
    if (window.pageYOffset <= 50) {
      document.getElementById('Navbar-container').style.top = 'calc(-5em - 16px)';
    } else if (prevScroll > currentScroll) {
      document.getElementById('Navbar-container').style.top = '0';
    } else {
      document.getElementById('Navbar-container').style.top = 'calc(-5em - 16px)';
    }
    prevScroll = currentScroll;
  };

  useEffect(() => {
    const navbarComponent = document.getElementById('Navbar');

    if (changeBackground) {
      navbarComponent.style.background = '#e1f7ef';
    } else {
      navbarComponent.style.background = '#fbf4ff';
    }
    // const transition_element = document.querySelector('.transition');
    // const links = document.getElementsByClassName('MainHeaderAction');
    // const rightLinks = document.getElementsByClassName('MainHeaderAction-2');
    // const hiddenLogin = document.getElementById('hidden-Login');
    // const logoLink = document.getElementById('LogoLink');

    // for (let i = 0; i < links.length; i += 1) {
    //   const link = links[i];

    //   link.addEventListener('click', (e) => {
    //     e.preventDefault();
    //     const target = e.target.href;
    //     transition_element.classList.add('is-active');

    //     setTimeout(() => {
    //       window.location.href = target;
    //     }, 1500);
    //   });
    // }

    // for (let i = 0; i < rightLinks.length; i += 1) {
    //   const rightLink = rightLinks[i];

    //   rightLink.addEventListener('click', (e) => {
    //     e.preventDefault();
    //     const target = e.target.href;
    //     transition_element.classList.add('is-active');

    //     setTimeout(() => {
    //       window.location.href = target;
    //     }, 1500);
    //   });
    // }

    // hiddenLogin.addEventListener('click', (e) => {
    //   e.preventDefault();
    //   const target = e.target.href;
    //   transition_element.classList.add('is-active');

    //   setTimeout(() => {
    //     window.location.href = target;
    //   }, 1500);
    // });

    // logoLink.addEventListener('click', (e) => {
    //   e.preventDefault();
    //   const target = e.target.href;
    //   transition_element.classList.add('is-active');

    //   setTimeout(() => {
    //     window.location.href = target;
    //   }, 1500);
    // });

    if (isHiddenUponScroll) {
      document.getElementById('Navbar-container').style.top = 'calc(-5em - 16px)';
      window.addEventListener('scroll', handleScroll);
    }

    switch (activeLink) {
      case 'home':
        applyLinkStyles(document.getElementById('home'));
        break;

      case 'features':
        applyLinkStyles(document.getElementById('features'));
        break;

      case 'contactus':
        applyLinkStyles(document.getElementById('about'));
        break;

      case 'login':
        applyLinkStyles(document.getElementById('hidden-Login'));
        document.getElementById('Navlinks-2').style.display = 'none';
        break;

      default:
        break;
    }

    const ham = document.getElementById('hidden-Hamburger');
    ham.addEventListener('click', handler);
    return () => {
      ham.removeEventListener('click', handler);
      window.removeEventListener('scroll', handleScroll);
    };
  });

  return (
    <>
      {/* <div className="transition transition-3" /> */}

      <div className="Navbar-container" id="Navbar-container">
        <nav className="Navbar" id="Navbar">
          <Link to="/" id="LogoLink">
            <div id="LogoSection">
              <div id="Logo" />
              <span className="LogoName" style={{ color: '#101010' }}>
                Smart
              </span>
              <span className="LogoName">Control</span>
            </div>
          </Link>
          <div className="Ham-Container" id="Ham-Container">
            <ul className="Navlinks-1" id="Navlinks-1">
              <li className="HeaderListItems" id="home">
                <Link className="MainHeaderAction" to="/">
                  Home
                </Link>
              </li>
              <li className="HeaderListItems" id="features">
                <Link className="MainHeaderAction" to="/features">
                  Features
                </Link>
              </li>
              <li className="HeaderListItems" id="about">
                <Link className="MainHeaderAction" to="/contactus">
                  Contact Us
                </Link>
              </li>
              <li id="hidden-navbar-HiddenLogin" className="HeaderListItems">
                <Link id="hidden-Login" className="hidden-LoginButton" to="/login">
                  Login
                </Link>
              </li>
            </ul>
          </div>
          <ul className="Navlinks-2" id="Navlinks-2">
            <li className="HeaderListItems-2">
              <Link className="MainHeaderAction-2" to="/login">
                Login
              </Link>
            </li>
            <li className="HeaderListItems-2">
              <Link className="MainHeaderAction-2" to="/login">
                Sign Up
              </Link>
            </li>
          </ul>
          <div id="hidden-Hamburger" className="hidden-Hamburger">
            <FontAwesomeIcon
              id="hidden-ham-bars"
              className="hidden-ham-bars"
              icon={faBars}
            />
          </div>
        </nav>
      </div>
    </>
  );
}

Navbar.defaultProps = {
  changeBackground: false,
};

export default Navbar;
