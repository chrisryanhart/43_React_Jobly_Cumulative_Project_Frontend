import React, { useState, useEffect } from 'react';
import CountContext from "./countContext"
import './App.css';
import NavBar from './NavBar';
import { BrowserRouter } from "react-router-dom";
import Routes from './Routes';

function App() {
  // you know someone is logged in if you have a token
  const [token, setToken] = useState('');

  useEffect(function loadToken(){
    // change navbar view if token changes 
  },[token]);

  // update if any change to the token
  // update happens with either login or register

  return (
    <div className="App">
      {/* <Routes/> */}
      <CountContext.Provider value={token}>
        <BrowserRouter>
          <NavBar />
          <Routes />
        </BrowserRouter>
      </CountContext.Provider>
    </div>
  );
}

export default App;
