import React, { useState, useEffect } from 'react';
import UserContext from "./UserContext"
import './App.css';
import NavBar from './NavBar';
import { BrowserRouter } from "react-router-dom";
import Routes from './Routes';
import JoblyApi from "./api"
// import { JsonWebTokenError } from 'jsonwebtoken';


function App() {
  // you know someone is logged in if you have a token
  // const INITIAL_AUTH_STATE = {token: '', username: ''};
  // const [authCredentials, setAuthCredentials] = useState(INITIAL_AUTH_STATE);
  const [currentUser, setCurrentUser] = useState({});
  // could also set to an empty array if null 
  let authItems = JSON.parse(localStorage.getItem('authCredentials'))
  const INITIAL_AUTH_STATE = authItems !== null ? authItems : {username: '', token: ''};
  const [authCredentials, setAuthCredentials] = useState(INITIAL_AUTH_STATE);


  // const history = useHistory();

  useEffect(function loadUserDetails(){
    // run upon start up
    // update the currentUser when the token changes
    async function fetchUserDetails(){

      // need username to call
      let res = await JoblyApi.getUser(authCredentials.username);
      setCurrentUser(res);
    }
    if(authCredentials.username) fetchUserDetails();

  },[]);

  // update if any change to the token
  // update happens with either login or register

  // add login function for the api call

  const logout = () => {
    // setAuthCredentials(INITIAL_AUTH_STATE);
    setCurrentUser({});
    // set local storage
    localStorage.clear();
    setAuthCredentials({...authCredentials, username: '', token: ''})
    // authCredentials.username = '';
    // authCredentials.token = '';

  }

  const login = async (credentials) => {
    // gather login credentials
    // call api
    // console.log('token before login: ',JoblyApi.token);
    let res = await JoblyApi.authenticateUser(credentials);

    // const loggedInCredentials = {username: credentials.username, token: res}

    // if not error, setToken
    // setAuthCredentials({...authCredentials, username: credentials.username, token: res});
    let loggedInUser = {username: credentials.username, token: res};
    localStorage.setItem('authCredentials', JSON.stringify(loggedInUser));

    setAuthCredentials({...authCredentials, username: credentials.username, token: res});

    let userRes = await JoblyApi.getUser(credentials.username);
    setCurrentUser({...userRes});
    // authCredentials.username = credentials.username;
    // authCredentials.token = res;
    // authCredentials.token = res;

    console.log('updated creds');


    // consider error handling
    // if(res) setCurrentUser(credentials.username);
    // history.push('/');
    // update token in state
    // update token on api class
    // redirect with history
  }

  const signup = async (newProfileData) => {

    console.log(newProfileData);

    // call register api
    let res = await JoblyApi.createUser(newProfileData);

    // const loggedInCredentials = {username: newProfileData.username, token: res}

    let newUser = {username: newProfileData.username, token: res};

    // setAuthCredentials({...authCredentials, username: newProfileData.username, token: res});
    localStorage.setItem('authCredentials', JSON.stringify(newUser));

    setAuthCredentials({...authCredentials, username: newProfileData.username, token: res});
    // authCredentials.username = newProfileData.username;
    // authCredentials.token = res;

    let userRes = await JoblyApi.getUser(authCredentials.username);
    setCurrentUser({...userRes});
    
    // authCredentials.token = res;

    // consider error handling
    // if(res) setCurrentUser(newProfileData.username);

    // history.push('/');
        // redirect with history

  }

  const editProfile = async (profileData) => {
    // destructure other editable data
    // separate the data to edit
    // confirm login credentials (username, pw) 
    // const userCredentials = [profileData.username, profileData.password];
    // username.push(profileData.username);

    // call will break with error if there is no match
    let verificationRes = await JoblyApi.authenticateUser({username: profileData.username, password: profileData.password});

    if(!verificationRes) throw Error;

    const dataToEdit = {...profileData};

    delete dataToEdit.username;
    delete dataToEdit.password;

    let res = await JoblyApi.editProfile(profileData.username, dataToEdit);

    let userRes = await JoblyApi.getUser(profileData.username);
    setCurrentUser({...userRes});

  }


  // logout function will remove the token value from the state

  // useContext can only handle a single object; multiple variables can be stored here
  
  JoblyApi.token = authCredentials.token;
  // JoblyApi.token = authCredentials.token;

  // console.log('token: ', JoblyApi.token);
  return (
    <div className="App">
      {/* <Routes/> */}
      <UserContext.Provider value={{authCredentials, login, logout, signup, editProfile, currentUser}}>
        <BrowserRouter>
          <NavBar />
          <Routes />
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
