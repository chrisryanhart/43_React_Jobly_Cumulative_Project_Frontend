import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "./UserContext";

function EditProfileForm(){

    const { editProfile, currentUser } = useContext(UserContext);

    // if logged out, show login/sign up links
    
    // retrieve current profile data from context
    const INITIAL_STATE = {
        username: currentUser.username, 
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        password: ''
    };

    const [profileFormData, setProfileFormData] = useState(INITIAL_STATE);
    // control form state here
    // extract login() from context
    

    const history = useHistory();

    // if logged out, show login/sign up links
    const handleChange = (e) => {
        const val = e.target.value;
        const name = e.target.name;
        setProfileFormData({...profileFormData, [name]: val});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // change to editProfile()
        await editProfile(profileFormData);
        setProfileFormData(INITIAL_STATE);
        history.push('/');
    }


    return (
        <form onSubmit={handleSubmit}>
            <div>Edit Profile below</div>   
            <div>
                <div>
                    <label htmlFor="username">Username</label>
                    <input 
                        name="username" 
                        id="username" 
                        value={profileFormData.username}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="firstName">First Name</label>
                    <input 
                        name="firstName" 
                        id="firstName" 
                        value={profileFormData.firstName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name</label>
                    <input 
                        name="lastName" 
                        id="lastName" 
                        value={profileFormData.lastName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input 
                        name="email" 
                        id="email" 
                        value={profileFormData.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Enter Password to make changes</label>
                    <input 
                        name="password" 
                        id="password" 
                        value={profileFormData.password}
                        onChange={handleChange}
                    />
                </div>
                <button>Submit</button>
            </div>

        </form>
    );
}

export default EditProfileForm;