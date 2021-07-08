import React, { useEffect } from 'react';
import {
  Switch, Route, Redirect, useLocation, useHistory,
} from 'react-router-dom';

import { AnimatePresence } from 'framer-motion';
import './App.css';
import './transitions.css';
import LandingPage from './components/LandingPage';
import LogIn from './components/LogIn';
import ControlPanel from './components/main-panel/ControlPanel';
import Contact from './components/Contact';
import Features from './components/Features';

function ProtecedRoute(props) {
  return (
    <Route
      path={props.path}
      render={(data) => (localStorage.getItem('accessToken') ? (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <props.component {...data} />
      ) : (
        <Redirect to={{ pathname: '/' }} />
      ))}
    />
  );
}

function App() {
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      history.push('/devices');
    }
  }, []);
  return (
    <>
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.key}>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/login">
            <LogIn />
          </Route>
          <Route exact path="/features">
            <Features />
          </Route>
          <Route exact path="/contactus">
            <Contact />
          </Route>
          <ProtecedRoute exact path="/mypanel" component={() => <ControlPanel devices />} />
          {/* <ProtecedRoute exact path="/home" component={() => <ControlPanel home />} /> */}
          <ProtecedRoute exact path="/devices" component={() => <ControlPanel devices />} />
          <ProtecedRoute exact path="/usersetting" component={() => <ControlPanel usersetting />} />
          <ProtecedRoute exact path="/setting" component={() => <ControlPanel setting />} />
        </Switch>
      </AnimatePresence>
    </>
  );
}

export default App;
