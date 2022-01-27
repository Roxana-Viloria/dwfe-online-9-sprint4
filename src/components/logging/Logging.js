import './logging.css';

import { useEffect, useState } from 'react';
import { firestore, auth, logout, googleLogin, isLogged } from '../../firebase';

// imgs//
import buttonGoogle from '../../pictures/buttonGoogle.svg';
import logo from '../../pictures/logo.svg';


function Logging() {

  return (
    <>
      <div className="supercontainer">
        <div>
          <img src={logo} className="logo"></img>
        </div>
        <div className="loggingContainer">
          <h1 className="welcomeTittle">Bienvenidos a Devs_united!</h1>
          <h2 className="welcomeTittle">Registrate ahora</h2>
          <button type="button" onClick={googleLogin} className="buttonLogging">
            <img src={buttonGoogle} className="googleButton"></img>
          </button>
          <div className="rights">
            <span className="copyright">© 2020 Devs_United</span>
            <span className="beta">BETA</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Logging;


