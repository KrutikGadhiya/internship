import React from 'react';
import Swal from 'sweetalert2';
import { useHistory, NavLink } from 'react-router-dom';

import logo from './img/icon1.svg';

export default function Nav() {
  const history = useHistory();

  function logout() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will Signout!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, SignOut!',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        history.push('/');
      }
    });
  }

  return (
    <>
      <nav className="Nav-nav">
        <div className="Nav-menu">
          <NavLink to="/devices"><img width="70px" src={logo} alt="Nav-menu" /></NavLink>
        </div>
        <div className="Nav-navlinks">
          <NavLink className="navlink" activeClassName="activCls" to="/devices">
            <div className="nav-icons"><i className="bx bx-devices" /></div>
          </NavLink>
          <NavLink className="navlink" activeClassName="activCls" to="/usersetting">
            <div className="nav-icons"><i className="bx bx-user" /></div>
          </NavLink>
          <NavLink className="navlink" activeClassName="activCls" to="/setting">
            <div className="nav-icons"><i className="fas fa-cog" /></div>
          </NavLink>
        </div>
        <div className="Nav-exit">
          <button
            onClick={logout}
          >
            <i className="bx bx-log-out" />
          </button>
        </div>
      </nav>
    </>
  );
}
