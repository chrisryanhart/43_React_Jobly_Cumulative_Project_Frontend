import React from "react";
import { Card, CardBody, CardText, CardTitle } from "reactstrap"
import { useHistory } from "react-router-dom";
import logo1 from './logos/logo1.png'
import logo2 from './logos/logo2.png'
import logo3 from './logos/logo3.png'
import logo4 from './logos/logo4.png'


function CompanyCard({handle, name,description,logoUrl}){
    const history = useHistory();
    // const images = {'logo1': logo1, 'logo2': logo2, 'logo3': logo3, 'logo4':logo4}

    // if(logoUrl !== null){
    //     // 
    //     let fileName = logoUrl.slice(5,11);
    //     for (ele in images){
    //         console.log(ele);
    //     }
    //     // loop through
    // }

    // const imageUrl = logoUrl === null ? [] : <img alt="sample" src={require(`.${logoUrl}`)}/>;

    // console.log(logoUrl);

    const handleClick = () => { 
        history.push(`/companies/${handle}`);
    };

    return (
        <Card
            key={handle}
            onClick={handleClick}
            style={{
            width: '18rem'
            }}
        >
            <img
            alt="Sample"
            src={`.${logoUrl}`}
            />
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