import React from "react";
import { Card, CardBody, CardText, CardTitle } from "reactstrap"
import { useHistory } from "react-router-dom";


function CompanyCard({handle, name,description,logoUrl}){
    const history = useHistory();

    const handleClick = () => { 
        history.push(`/companies/${handle}`);
    };

    const hasLogo = logoUrl !== 'null' ? true : false;

    return (
        <Card
            key={handle}
            onClick={handleClick}
            style={{
            width: '18rem'
            }}
        >
            {hasLogo && <img
            alt="Sample"
            src={logoUrl}
            />}
            <CardBody>
                <CardTitle tag="h5">
                    {name}
                </CardTitle>
                <CardText>
                    {description}
                </CardText>
            </CardBody>
        </Card>);

}


export default CompanyCard;