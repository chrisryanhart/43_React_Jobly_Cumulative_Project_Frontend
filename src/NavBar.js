import React, { useContext } from "react";
import CountContext from "./countContext";
import { NavLink } from "react-router-dom";
import { Nav, Navbar, NavItem } from "reactstrap";
import './NavBar.css'

function NavBar(){
    const token = useContext(CountContext);
    // if token = empty string, 
    // where to control the Navbar components, useEffect?

// if logged out (no token), return alternate links

// if logged in (token present), return the below

    return (
        <div>
            <Navbar expand="md">
                <NavLink exact to="/" className="navbar-brand">
                    Jobly
                </NavLink>

                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink exact to="/companies">Companies</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink exact to="/companies/:handle">Company Detail</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink exact to="/jobs">Jobs</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink exact to="/profile">Profile</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink exact to="/login">Login/Signup</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink exact to="/signup">Signup</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink exact to="/">Logout</NavLink>
                    </NavItem>
                </Nav>
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


export default NavBar;