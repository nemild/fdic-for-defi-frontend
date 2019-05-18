import React from 'react';

function Header(props) {
    return(
        <div>
        <header className="header header-transparent" id="header-main">
            <nav className="navbar navbar-main navbar-expand-lg navbar-transparent navbar-dark bg-dark" id="navbar-main">
            <div className="container px-lg-0">
                <a className="navbar-brand mr-lg-5" href="../../index.html">
                <div className="logo logo-header" style={divStyle}>defisurance</div>
                {/* <img alt="Image placeholder" src="../../assets/img/brand/white.png" id="navbar-logo" style="height: 50px;"> */}
                </a>
                <button className="navbar-toggler pr-0" type="button" data-toggle="collapse" data-target="#navbar-main-collapse" aria-controls="navbar-main-collapse" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbar-main-collapse">
                <ul className="navbar-nav align-items-lg-center">
                    <li className="nav-item ">
                    <a className="nav-link" href="../../howitworks.html">How it Works</a>
                    </li>
                    <li className="nav-item ">
                    <a className="nav-link" href="../../investors.html">Investors</a>
                    </li>
                    <li className="nav-item ">
                            <a className="nav-link" href="../../developers.html">Developers</a>
                        </li>
                </ul>
                </div>
            </div>
            </nav>
        </header>
        </div>

    );
}

var divStyle = {
  height: '50px',
};

export default Header;
