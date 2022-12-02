import React, { useState, useContext } from "react";
import UserContext from "./UserContext"
import { useHistory } from 'react-router-dom'

function SignUpForm(){
    const INITIAL_STATE = {
        username: '', 
        password: '',
        firstName: '',
        lastName: '',
        email: ''
    };

    const [signupFormData, setSignupFormData] = useState(INITIAL_STATE);
    // control form state here
    // extract login() from context
    const { signup } = useContext(UserContext);

    const history = useHistory();

    // if logged out, show login/sign up links
    const handleChange = (e) => {
        const val = e.target.value;
        const name = e.target.name;
        setSignupFormData({...signupFormData, [name]: val});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(signupFormData);
        setSignupFormData(INITIAL_STATE);
        history.push('/');
    }

    // if logged out, show login/sign up links


    return (
        <form onSubmit={handleSubmit}>
            <div>Please sign up below</div>   
            <div>
                <div>
                    <label htmlFor="username">Username</label>
                    <input 
                        name="username" 
                        id="username" 
                        value={signupFormData.username}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input 
                        name="password" 
                        id="password" 
                        value={signupFormData.password}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="firstName">First Name</label>
                    <input 
                        name="firstName" 
                        id="firstName" 
                        value={signupFormData.firstName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name</label>
                    <input 
                        name="lastName" 
                        id="lastName" 
                        value={signupFormData.lastName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input 
                        name="email" 
                        id="email" 
                        value={signupFormData.email}
                        onChange={handleChange}
                    />
                </div>
                <button>Submit</button>
            </div>

        </form>
    );
}

export default SignUpForm;