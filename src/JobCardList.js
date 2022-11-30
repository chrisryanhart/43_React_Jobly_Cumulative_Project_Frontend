import React from "react";
import JobCard from './JobCard'

function JobCardList({jobs}){

    // if I query jobs from api here, I can't reuse it in the companyDetail component

    const jobArr = jobs.map(job => {
        return <JobCard title={job.title} salary={job.salary} equity={job.equity}/>;
    });

    return (
        <div>
            {jobArr}
        </div>
    );
}

export default JobCardList;