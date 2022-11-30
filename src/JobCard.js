import React from "react";
import { Card, CardBody, CardText, CardTitle } from "reactstrap"

function JobCard({title, salary, equity}){

        // if user has applied, change button to 'applied'

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
                    <div>
                        Salary: {salary}
                    </div>
                    <div>
                        Equity: {equity}
                    </div>
                    <button>Apply</button>
                </CardText>
            </CardBody>
        </Card>);
}

export default JobCard;