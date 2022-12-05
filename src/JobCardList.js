import React, { useContext } from "react";
import JobCard from './JobCard'
import UserContext from "./UserContext"

function JobCardList({jobs}){

    const { currentUser } = useContext(UserContext);

    // need way to add job to currentUser

    // if I query jobs from api here, I can't reuse it in the companyDetail component

    // if user has applied, change button to 'applied'
    // get from current user
    // if application id matches job id, state applied

    // what data type is in the currentUser?
    // { id, title, companyHandle, companyName, state }

    const jobArr = jobs.map(job => {
        const hasApplied = currentUser.applications.includes(job.id) ? true : false;

        return <JobCard key={job.id} id={job.id} title={job.title} salary={job.salary} equity={job.equity} hasApplied={hasApplied}/>;
    });

    return (
        <>
            {jobArr}
        </>
    );
}

export default JobCardList;