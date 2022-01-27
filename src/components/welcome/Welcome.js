import './welcome.css';
import '../../App.css';


import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { firebase, firestore, getCurrentUser } from '../../firebase';

// imgs//
import logo from '../../pictures/logo.svg'
import welcomeName from '../../pictures/welcomeName.svg';




function Welcome() {
  let user = getCurrentUser()
  let navigate =useNavigate();

  const [ userName, setUserName]= useState ("")
  const [color, setColor]= useState ("")
  const [loading, setLoading]= useState (false)

  const userChange =(e)=>{
    setUserName (e.target.value)
  }

  const colorChange =(e)=>{
    setColor (e.currentTarget.dataset.color)
  }

  const continueClick = (e)=>{
    setLoading (true)
    setTimeout (function (){
        firestore
      .collection('users')
      .doc(user.uid)
      .set({name: user.displayName, email: user.email, username: userName, color: color})
      setLoading (false)
      navigate('/feed')
      },2000)
  }


  return (
     <> 
       <div className="supercontainer">
        <div>
          <img src={logo} className="logo"></img>
        </div>
        {loading ?  <div  className="loader"></div> : 
        <div className="welcomeContainer">
          <div>
          <img src={welcomeName} className="welcome"></img>
          </div>
          <br/>
          <input type="text" placeholder="Type your username" className="username" onChange={userChange}></input>
          <p className="select">Select your favorite color</p>
          <div className="containercolors"> 
            <button className="colors" type="button" onClick={colorChange} data-color="red">
              <div className="color red"></div>
            </button>
            <button className="colors" type="button" onClick={colorChange} data-color="orange">
              <div  className="color orange"></div>
            </button>
            <button className="colors" type="button" onClick={colorChange} data-color="yellow">
              <div  className="color yellow "></div>
            </button>
            <button className="colors" type="button" onClick={colorChange}data-color="green">
              <div  className="color green"></div>
            </button>
            <button className="colors" type="button" onClick={colorChange}data-color="blue">
              <div  className="color blue"></div>
            </button>
            <button className="colors" type="button" onClick={colorChange}data-color="indigo">
              <div  className="color indigo"></div>
            </button>
          </div>
          <br/>
          <button 
          type="button" 
          className="continue"
          onClick={continueClick}>
          CONTINUE
          </button>
          <div className="rights">
            <span className="copyright">© 2020 Devs_United</span>
            <span className="beta">BETA</span>
          </div>
        </div>
        }
      </div> 
    </>
  );
}

export default Welcome;