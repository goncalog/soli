import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import '../../css/Footer.css';

function Footer() {
    const date = new Date();
    const year = date.getFullYear();

    return (
        <div className="footer">
            <footer className="py-2 bg-dark">
                <Link className="nav-link" to="/contact">Contact</Link>
                <p className="m-0 text-white">Copyright &copy; { year } Soli</p>
            </footer>
        </div>
    );
}

export default withRouter(Footer);
