import React, { useState, useEffect } from 'react';
import UserContext from "./UserContext"
import './App.css';
import NavBar from './NavBar';
import { BrowserRouter } from "react-router-dom";
import Routes from './Routes';
import JoblyApi from "./api"


function App() {

  let authItems = JSON.parse(localStorage.getItem('authCredentials'))
  const INITIAL_AUTH_STATE = authItems !== null ? authItems : {username: '', token: ''};
 
  const [authCredentials, setAuthCredentials] = useState(INITIAL_AUTH_STATE);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(function loadUserDetails(){

    async function fetchUserDetails(){

      try{
        let res = await JoblyApi.getUser(authCredentials.username);
        setCurrentUser(res);
      } catch (err){
        console.error('Error loading user', err);
        setCurrentUser({});
      }
    }
    if(authCredentials.username) fetchUserDetails();

  },[authCredentials]);


  const logout = () => {
    setCurrentUser({});

    localStorage.clear();
    setAuthCredentials({...authCredentials, username: '', token: ''})
  }

  const login = async (credentials) => {

    try {
      let res = await JoblyApi.authenticateUser(credentials);

      let loggedInUser = {username: credentials.username, token: res};
      localStorage.setItem('authCredentials', JSON.stringify(loggedInUser));
  
      setAuthCredentials({...authCredentials, username: credentials.username, token: res});

      // let userRes = await JoblyApi.getUser(credentials.username);
      // setCurrentUser({...userRes});
    } catch (err) {
      console.error('Error: unable not log in ', err)
    }
  }

  const signup = async (newProfileData) => {

    try {
      let res = await JoblyApi.createUser(newProfileData);

      let newUser = {username: newProfileData.username, token: res};
  
      localStorage.setItem('authCredentials', JSON.stringify(newUser));
      setAuthCredentials({...authCredentials, username: newProfileData.username, token: res});
  
      // let userRes = await JoblyApi.getUser(authCredentials.username);
      // setCurrentUser({...userRes});
    } catch (err) {
      console.error('couldnt signup user', err);

    }
  }

  const editProfile = async (profileData) => {

    try {
      // call will break with error if there is no match
      let verificationRes = await JoblyApi.authenticateUser({username: profileData.username, password: profileData.password});

      if(!verificationRes) throw Error;

      const dataToEdit = {...profileData};

      delete dataToEdit.username;
      delete dataToEdit.password;

      await JoblyApi.editProfile(profileData.username, dataToEdit);

      let userRes = await JoblyApi.getUser(profileData.username);
      setCurrentUser({...userRes});
    } catch (err){
      console.log('Unable to update user', err);
    }


  }

  const applyToJob = async (username, id) => {

    try {
      let res = await JoblyApi.apply(username, id);

      setCurrentUser(user => {
        user.applications.push(res);
        return {...user};
        });
    } catch(err) {
      console.error('Error: couldnt apply to job', err);
    }
  }

  JoblyApi.token = authCredentials.token;

  return (
    <div className="App">
      {/* <Routes/> */}
      <UserContext.Provider value={{authCredentials, login, logout, signup, editProfile, currentUser, applyToJob}}>
        <BrowserRouter>
          <NavBar />
          <Routes />
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
