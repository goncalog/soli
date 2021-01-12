import React from 'react';
import '../../css/Footer.css';

function Footer() {
    const date = new Date();
    const year = date.getFullYear();

    return (
        <div className="footer">
            <footer className="py-2 bg-dark">
                <p className="m-0 text-white">Copyright &copy; { year } Soli</p>
            </footer>
        </div>
    );
}

export default Footer;
