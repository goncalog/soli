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
                                    props.location.pathname === "/projects" ? "active" : "" 
                                }`}
                            >
                                <Link 
                                    className="nav-link" to="/projects" onClick={() => setExpanded(false)}
                                >
                                    Invest
                                </Link>
                            </Nav.Item>

                            {(props.loggedIn) && (
                                <Nav.Item
                                    className={`${
                                        props.location.pathname === `/user/${props.userId}/projects` ? "active" : "" 
                                    }`}
                                >
                                    <Link 
                                        className="nav-link" 
                                        to={`/user/${props.userId}/projects`} 
                                        onClick={() => setExpanded(false)}
                                    >
                                        My Projects
                                    </Link>
                                </Nav.Item>
                            )}
                            
                            {props.loggedIn ? (
                                <Nav.Item 
                                    className={`${
                                        props.location.pathname === "/user/logout" ? "active" : "" 
                                    }`}
                                >
                                    <Link 
                                        className="nav-link" 
                                        to="/user/logout" 
                                        onClick={() => setExpanded(false)}
                                    >
                                        Logout
                                    </Link>
                                </Nav.Item>
                            ) : (
                                [
                                    <Nav.Item 
                                        className={`${
                                            props.location.pathname === "/user/login" ? "active" : "" 
                                        }`}
                                    >
                                        <Link 
                                            className="nav-link" 
                                            to="/user/login" 
                                            onClick={() => setExpanded(false)}
                                        >
                                            Login
                                        </Link>
                                    </Nav.Item>,

                                    <Nav.Item 
                                        className={`${
                                            props.location.pathname === "/user/signup" ? "active" : "" 
                                        }`}
                                    >
                                        <Link 
                                            className="nav-link" 
                                            to="/user/signup" 
                                            onClick={() => setExpanded(false)}
                                        >
                                            Signup
                                        </Link>
                                    </Nav.Item>
                                ]
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Navbar>
        </div>
    );
}

export default withRouter(Navigation);
