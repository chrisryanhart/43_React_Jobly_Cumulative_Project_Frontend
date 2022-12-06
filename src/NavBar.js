import React, { useContext, useState } from "react";
import UserContext from "./UserContext";
import { NavLink } from "react-router-dom";
import { Nav, Navbar, NavItem, Collapse, NavbarToggler } from "reactstrap";
import './NavBar.css'

function NavBar(){
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const { authCredentials, logout, currentUser } = useContext(UserContext);

    // const newAuthCredentials = JSON.parse(localStorage.getItem('authCredentials'));
    // if token = empty string, 
    // where to control the Navbar components, useEffect?

// if logged out (no token), return alternate links

// if logged in (token present), return the below
    const handleClick = () => { 
        // console.log('token: ', token);
        logout();
    }

    return (
        <div>
            {/* they used nav here */}
            <Navbar className="navbar navbar-dark bg-dark">
                <NavLink exact to="/" className="navbar-brand">
                    Jobly
                </NavLink>

                <NavbarToggler onClick={toggle}  className="navbar-toggler ml-auto"/>
                <Collapse isOpen={isOpen} navbar>
                    <Nav navbar>
                        <NavItem>
                            <NavLink exact to="/companies">Companies</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink exact to="/jobs">Jobs</NavLink>
                        </NavItem>
                        {authCredentials.token && <NavItem>
                            <NavLink exact to="/profile">{`${authCredentials.username}'s `}Profile</NavLink>
                        </NavItem>}
                        {!authCredentials.token && <NavItem>
                            <NavLink exact to="/login">Login</NavLink>
                        </NavItem>}
                        {!authCredentials.token && <NavItem>
                            <NavLink exact to="/signup">Signup</NavLink>
                        </NavItem>}
                        {authCredentials.token && <NavItem>
                            <NavLink onClick={handleClick} exact to="/">Logout</NavLink>
                        </NavItem>}
                    </Nav>
                </Collapse>
            </Navbar>
            {/* <nav>
                <ul>
                    <li><NavLink className='home' exact to='/'>Jobly</NavLink></li>
                </ul> */}
                
                {/* <Link exact to='/companies'>Companies</Link>
                <Link exact to='/jobs'>Jobs</Link>
                <Link exact to='/profile'>Profile</Link>
                <Link exact to='/'>Logout</Link> */}
            {/* </nav> */}
        </div>

    );
}


{/* <Nav className="navbar-nav ml-auto" >
<NavItem>
    <NavLink exact to="/companies">Companies</NavLink>
</NavItem>
<NavItem>
    <NavLink exact to="/jobs">Jobs</NavLink>
</NavItem>
{authCredentials.token && <NavItem>
    <NavLink exact to="/profile">{`${authCredentials.username}'s `}Profile</NavLink>
</NavItem>}
{!authCredentials.token && <NavItem>
    <NavLink exact to="/login">Login</NavLink>
</NavItem>}
{!authCredentials.token && <NavItem>
    <NavLink exact to="/signup">Signup</NavLink>
</NavItem>}
<NavItem>
    <NavLink onClick={handleClick} exact to="/">Logout</NavLink>
</NavItem>
</Nav>
</Navbar> */}


export default NavBar;