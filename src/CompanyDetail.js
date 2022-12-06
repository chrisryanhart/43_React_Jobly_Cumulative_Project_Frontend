import React, { useEffect, useState, useContext } from "react";
import JobCardList from './JobCardList'
import { useParams } from "react-router-dom"
import JoblyApi from "./api";
import UserContext from "./UserContext"
import { useHistory } from "react-router-dom";

function CompanyDetail(){
    const history = useHistory();
    const { authCredentials } = useContext(UserContext);
    const [company, setCompany] = useState([]);
    const { handle } = useParams();

    if(!authCredentials.token){
        history.push('/login');
    }

    useEffect(function loadCompany(){
        try { 
            async function fetchCompany(){
                let res = await JoblyApi.getCompany(handle);
                setCompany([res]);
            }
            fetchCompany()
        } catch (err) {
            console.error('Couldnt log load company', err);
        }

    },[handle]);

    // if no companies loaded, show loader
    if (company.length === 0) {
        return (
            <div>...Page loading</div>
        );
    }

    return (
        <div>
            <div><b>{company[0].name}</b></div>
            <div>{company[0].description}</div>
            <JobCardList jobs={company[0].jobs}/>
        </div>
    );
}

export default CompanyDetail;