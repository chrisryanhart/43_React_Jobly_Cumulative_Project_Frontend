import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "./UserContext"

function LoginForm({}){
    const INITIAL_STATE = {username: 'testuser', password: 'password'};
    const [loginFormData, setLoginFormData] = useState(INITIAL_STATE);
    const history = useHistory();
    // control form state here
    // extract login() from context
    const { login } = useContext(UserContext)

    // if logged out, show login/sign up links
    const handleChange = (e) => {
        const val = e.target.value;
        const name = e.target.name;
        setLoginFormData({...loginFormData, [name]: val});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(loginFormData);
        setLoginFormData(INITIAL_STATE);
        history.push('/');
    }


    return (
        <form onSubmit={handleSubmit}>
            <div>Please login below</div>   
            <div>
                <div>
                    <label htmlFor="username">Username</label>
                    <input 
                        name="username" 
                        id="username" 
                        value={loginFormData.username}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input 
                        name="password" 
                        id="password" 
                        value={loginFormData.password}
                        onChange={handleChange}
                    />
                </div>
                <button>Login</button>
            </div>

        </form>
    );
}

export default LoginForm;