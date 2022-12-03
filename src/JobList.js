import React, { useEffect,useState, useContext } from "react";
import JobCardList from "./JobCardList";
import SearchForm from "./SearchForm";
import JoblyApi from "./api";
import UserContext from "./UserContext"
import { useHistory } from "react-router-dom";

function JobList(){
    const history = useHistory();

    const { authCredentials } = useContext(UserContext);

    if(!authCredentials.token){
        history.push('/login');
    }

    const [jobs,setJobs] = useState([]);

    useEffect(function loadJobs(){
        async function fetchJobs(){
            let res = await JoblyApi.getAllJobs();
            setJobs([...res]);
        }
        fetchJobs();
    },[]);

    if (jobs.length === 0) {
        return (
            <div>...Page loading</div>
        );
    }

    // add searchFor function
    const extractSearchInput = async (searchInput) => {
        if (searchInput.value === '') {
            let res = await JoblyApi.getAllJobs();
            setJobs([...res])
        } else {
            let jobTitle = {'title': searchInput.value};
            let res = await JoblyApi.getAllJobs(jobTitle);
            setJobs([...res]);
        }  
    };

    return (
        <div>
            <SearchForm extractSearchInput={extractSearchInput}/>
            <JobCardList jobs={jobs}/>
        </div>
    );
}

export default JobList;