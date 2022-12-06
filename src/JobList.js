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
        try {
            async function fetchJobs(){
                let res = await JoblyApi.getAllJobs();
                setJobs([...res]);
            }
            fetchJobs();
        } catch (err) {
            console.error('couldnt load jobs', err);
        }

    },[]);

    if (jobs.length === 0) {
        return (
            <div>...Page loading</div>
        );
    }

    const extractSearchInput = async (searchInput) => {
        try {
            if (searchInput.value === '') {
                let res = await JoblyApi.getAllJobs();
                setJobs([...res])
            } else {
                let jobTitle = {'title': searchInput.value};
                let res = await JoblyApi.getAllJobs(jobTitle);
                setJobs([...res]);
            } 
        } catch(err){
            console.error('couldnt extract form output', err);
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