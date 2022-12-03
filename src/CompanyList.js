import React, { useState, useEffect, useContext } from "react";
import JoblyApi from "./api";
import CompanyCard from "./CompanyCard";
import SearchForm from "./SearchForm";
import UserContext from "./UserContext"
import { useHistory } from "react-router-dom";

function CompanyList(){
    const history = useHistory();
    const { authCredentials } = useContext(UserContext);

    if(!authCredentials.token){
        history.push('/login');
    }
    // add state for companies
    const [companies, setCompanies] = useState([]);


    useEffect(function getCompaniesWhenMounted(){
        async function getCompanies(){
            const res = await JoblyApi.getAllCompanies();
            setCompanies([...res]);
        }
        getCompanies();
    },[]);



    const extractSearchInput = async (searchInput) => {
        
        let companyName = {'name': searchInput.value};

        let res = await JoblyApi.getAllCompanies(companyName);
        setCompanies([...res]);
    };

    const companiesList = companies.map(ele => {
        return (<CompanyCard 
            name={`${ele.name}`} 
            description={`${ele.description}`} 
            logoUrl={`${ele.logoUrl}`} 
        />);
    });


    return (
        <div>Here's my company list.
            <SearchForm extractSearchInput={extractSearchInput}/>
            {companiesList}
        </div>
    );
}

export default CompanyList;