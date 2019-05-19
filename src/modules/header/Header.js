import React from 'react';
import { Link } from 'react-router-dom'

function Header(props) {
    return(
    <div id="header-main">
        <nav className="navbar navbar-main navbar-expand-lg navbar-transparent navbar-dark" id="navbar-main">
        <div className="container px-lg-0">
            <Link to="/" className="navbar-brand mr-lg-5">
            { props.hideName ? null : <div className="logo logo-header" style={divStyle}>defisurance</div>}
            {/* <img alt="Image placeholder" src="../../assets/img/brand/white.png" id="navbar-logo" style="height: 50px;"> */}
            </Link>
            <button className="navbar-toggler pr-0" type="button" data-toggle="collapse" data-target="#navbar-main-collapse" aria-controls="navbar-main-collapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbar-main-collapse">
            <ul className="navbar-nav align-items-lg-center">
                <li className="nav-item ">
                <Link to="/howitworks" className="nav-link">How it works</Link>
                </li>
                <li className="nav-item ">
                <Link to="/invest-new" className="nav-link">Investors</Link>
                </li>
                <li className="nav-item ">
                <Link to="/developers" className="nav-link">Developers</Link>
                </li>
            </ul>
            </div>
        </div>
        </nav>
    </div>
    );
}

var divStyle = {
  height: '50px',
};

export default Header;
