import './App.css';
import { useEffect, useState } from 'react';
import { firestore, auth, logout, googleLogin, isLogged } from './firebase';
import Start from './components/start/Start';
import Feed from './components/feed/Feed';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProfileUserA from './components/profileUserA/ProfileUserA';

function App() {
  
  const [user, setUser] = useState(null)

  useEffect (()=>{


    auth.onAuthStateChanged ((user)=>{
      setUser(user);
    })
  },[])

  return (
  <div className="App">
    <Routes>
      <Route exact path="/" element={<Start/>}/> 
      <Route path="/feed"element={<Feed/>}/>
      <Route path="/profileusera"element={<ProfileUserA/>}/>
      <Route path="/login" element={<Start/>}></Route>
    </Routes>

   
  </div>

  );
}

export default App;
