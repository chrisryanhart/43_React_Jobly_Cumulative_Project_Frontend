import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import CompanyList from "./CompanyList";
import JobList from "./JobList";
import SignUpForm from "./SignUpForm";
import EditProfileForm from "./EditProfileForm";
import LoginForm from "./LoginForm";
import CompanyDetail from "./CompanyDetail";

function Routes(){

    return (
        // <div>
        //     <p>Test</p>
        // </div>
        <Switch>
            <Route exact path='/'>
                <Home />
            </Route>
            <Route exact path='/companies'>
                <CompanyList />
            </Route>
            <Route exact path='/jobs'>
                <JobList />
            </Route>
            <Route exact path='/signup'>
                <SignUpForm />
            </Route>
            <Route exact path='/profile'>
                <EditProfileForm />
            </Route>
            <Route exact path='/login'>
                <LoginForm />
            </Route>
            <Route exact path='/companies/:handle'>
                <CompanyDetail />
            </Route>
            <Route>
                <p>Couldn't find page you wanted</p>
            </Route>
        </Switch>
    );
}

export default Routes;