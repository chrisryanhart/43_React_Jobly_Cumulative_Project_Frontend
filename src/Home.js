import React, { useContext } from "react";
import UserContext from "./UserContext"

function Home(){

    const { currentUser } = useContext(UserContext);

    if(currentUser){
        return (
            <div>
                <div><p>Jobly</p></div>
                <div><p>All the jobs in one place.</p></div>
                <div><p>Welcome back!</p></div>
            </div>
        );
    } else {
        return (
            <div>
                <div><p>Please login or signup to continue</p></div>
            </div>
        );
    }
}

export default Home;