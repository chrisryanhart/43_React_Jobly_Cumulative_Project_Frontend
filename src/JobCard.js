import React, { useContext } from "react";
import UserContext from "./UserContext";
import { Card, CardBody, CardText, CardTitle } from "reactstrap";
import './JobCard.css';

function JobCard({id, title, salary, equity, hasApplied}){
    const { currentUser, applyToJob } = useContext(UserContext);

    const handleClick = () => {
        applyToJob(currentUser.username, id)
    }

    return (
        <Card
            style={{
            width: '18rem'
            }}
        >
            <CardBody>
                <CardTitle tag="h5">
                    {title}
                </CardTitle>
                <CardText>
                    Salary: {salary}
                </CardText>
                <CardText>
                    Equity: {equity}
                </CardText>
                {hasApplied && <button className="applied">Applied</button>}
                {!hasApplied && <button className="apply" onClick={handleClick}>Apply</button>}
            </CardBody>
        </Card>);
}

export default JobCard;