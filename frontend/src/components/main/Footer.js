import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import '../../css/Footer.css';

function Footer(props) {
    const date = new Date();
    const year = date.getFullYear();
    const links = (props.loggedIn) 
            ? [
                { name: 'Contact', path: '/contact' },
                { name: 'Logout', path: '/user/logout' },
            ]
            : [
                { name: 'Contact', path: '/contact' },
                { name: 'Login', path: '/user/login' },
                { name: 'Signup', path: '/user/signup' },
            ];

    return (
        <div className="footer">
            <footer className="py-2 bg-dark">
                <div className="links-container">
                    {links.map((item, i) => {
                        return <Link className="footer-link" key={i} to={item.path}>{item.name}</Link>;
                    })}
                </div>             
                <p className="m-0 text-white">Copyright &copy; { year } Soli</p>
            </footer>
        </div>
    );
}

export default withRouter(Footer);
