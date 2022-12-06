import React, { useContext, useState } from "react";
import UserContext from "./UserContext";
import { NavLink } from "react-router-dom";
import { Nav, Navbar, NavItem, Collapse, NavbarToggler } from "reactstrap";
import './NavBar.css'

function NavBar(){
    // navbar toggle handler state
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const { authCredentials, logout } = useContext(UserContext);


    const handleClick = () => { 
        logout();
    }

    return (
        <div>
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
        </div>
    );
}

export default NavBar;