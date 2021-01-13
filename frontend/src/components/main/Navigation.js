import React, { useState } from 'react';
import logo from '../../media/logo.svg';
import '../../css/Navigation.css';
import { Link, withRouter } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function Navigation(props) {
    const [expanded, setExpanded] = useState(false);
    return (
        <div className="navigation">
            <Navbar expanded={expanded} bg="dark" variant="dark" expand="lg">
                <div className="container">
                    <Link className="navbar-brand" to="/" onClick={() => setExpanded(false)}>
                        <img src={logo} className="App-logo" alt="logo" />
                        Soli
                    </Link>
                    <Navbar.Toggle 
                        onClick={() => setExpanded(expanded ? false : "expanded")} 
                        aria-controls="navbarResponsive"
                    />
                    <Navbar.Collapse id="navbarResponsive">
                        <Nav className="ml-auto">
                            <Nav.Item
                                className={`${
                                    props.location.pathname === "/" ? "active" : "" 
                                }`}
                            >
                                <Link className="nav-link" to="/" onClick={() => setExpanded(false)}>
                                    Home
                                    <span className="sr-only">(current)</span>
                                </Link>
                            </Nav.Item>

                            <Nav.Item 
                                className={`${
                                    props.location.pathname === "/evs" ? "active" : "" 
                                }`}
                            >
                                <Link 
                                    className="nav-link" to="/evs" onClick={() => setExpanded(false)}
                                >
                                    Drivers
                                </Link>
                            </Nav.Item>

                            {props.loggedIn ? (
                                <Nav.Item 
                                    className={`${
                                        props.location.pathname === `/owner/${props.userId}/evs` 
                                            ? "active" : "" 
                                    }`}
                                >
                                    <Link 
                                        className="nav-link" 
                                        to={`/owner/${props.userId}/evs`}
                                        onClick={() => setExpanded(false)}
                                    >
                                        Owners
                                    </Link>
                                </Nav.Item>
                            ) : (
                                <Nav.Item 
                                    className={`${
                                        props.location.pathname === "/owner/signup" ? "active" : "" 
                                    }`}
                                >
                                    <Link 
                                        className="nav-link" 
                                        to="/owner/signup" 
                                        onClick={() => setExpanded(false)}
                                    >
                                        Owners
                                    </Link>
                                </Nav.Item>
                            )}

                            <Nav.Item
                                className={`${
                                    props.location.pathname === "/contact" ? "active" : "" 
                                }`}
                            >
                                <Link className="nav-link" to="/contact" onClick={() => setExpanded(false)}>
                                    Contact
                                </Link>
                            </Nav.Item>
                            
                            {props.loggedIn ? (
                                <Nav.Item 
                                    className={`${
                                        props.location.pathname === "/owner/logout" ? "active" : "" 
                                    }`}
                                >
                                    <Link 
                                        className="nav-link" 
                                        to="/owner/logout" 
                                        onClick={() => setExpanded(false)}
                                    >
                                        Logout
                                    </Link>
                                </Nav.Item>
                            ) : (
                                <Nav.Item 
                                    className={`${
                                        props.location.pathname === "/owner/login" ? "active" : "" 
                                    }`}
                                >
                                    <Link 
                                        className="nav-link" 
                                        to="/owner/login" 
                                        onClick={() => setExpanded(false)}
                                    >
                                        Login
                                    </Link>
                                </Nav.Item>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Navbar>
        </div>
    );
}

export default withRouter(Navigation);
