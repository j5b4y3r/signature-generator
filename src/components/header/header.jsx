import React from 'react';
import {NavLink} from "react-router-dom";

const Header = () => {
    return (
        <>
            <header className="header border border-start-0 border-end-0 border-top-0 border-success py-3">
                <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-white ftco-navbar-light sleep"
                     id="ftco-navbar">
                    <div className="container">
                        <NavLink className="navbar-brand text-dark" to="/">
                           <h4>Signature Generator</h4>
                        </NavLink>
                        <button className="navbar-toggler collapsed" type="button" data-toggle="collapse"
                                data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false"
                                aria-label="Toggle navigation">
                            <span className="oi oi-menu"></span> Menu
                        </button>
                        <div className="navbar-collapse collapse justify-content-center" id="ftco-nav">
                            <ul className="navbar-nav">
                                <li className="nav-item active"><NavLink to="/"
                                                                         className="nav-link text-dark">Home</NavLink>
                                </li>
                                <li className="nav-item"><NavLink to="/online-signature"
                                                                  className="nav-link text-dark">Online signature</NavLink></li>
                                <li className="nav-item"><NavLink to="/online-signature/draw"
                                                                  className="nav-link text-dark">Draw</NavLink></li>
                                <li className="nav-item"><NavLink to="/online-signature/type"
                                                                  className="nav-link text-dark">Type</NavLink></li>

                            </ul>
                        </div>
                    </div>
                </nav>
            </header>


        </>
    );
};

export default Header;