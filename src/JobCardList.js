import React, { useContext } from "react";
import JobCard from './JobCard'
import UserContext from "./UserContext"

function JobCardList({jobs}){

    const { currentUser } = useContext(UserContext);

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