import React, { useEffect, useState } from "react";
import JobCardList from './JobCardList'
import { useParams } from "react-router-dom"
import JoblyApi from "./api";


function CompanyDetail(){
    // if logged out, show login/sign up links
    const [company, setCompany] = useState([]);
    const pageLoading = {'status': true};

    const { handle } = useParams();

    useEffect(function loadCompany(){
        async function fetchCompany(){
            // use try/catch for error
            console.log('test');
            let res = await JoblyApi.getCompany(handle);
            setCompany([res]);
        }
        fetchCompany()
    },[]);

    // if no errors as well
    // have catch display error message as well
    // company length won't be updated
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