import React from 'react';
import {Link} from "react-router-dom";

const SignatureGenerator = () => {
    return (
        <div className="container text-center mt-5 justify-content-center">
            <h1 className="h1 fw-bold">Online signature generator</h1>
            <h4 className="m-3 h3 text-secondary text-opacity-75">Create and download your eSignature</h4>
            <p className="h4 m-5 mx-xl-5 text-secondary text-opacity-75">An online signature generator/maker is a tool that helps you create an online signature. eSignatures are a fast and easy way to sign contracts and legal documents.</p>

            <div className="row justify-content-center mt-5 mb-5 row-cols-md-4">
                <div className="col-md-4 mt-2">
                    <div className="card rounded-3 border-0" style={{ backgroundColor: '#0d91ed' }}>
                        <div className="card-body text-white me-3 m-3">
                            <h2 className="card-title mt-3">Draw your signature</h2>
                            <p className="card-text mb-5 fs-6 text-white text-opacity-75">Go artistic. Use your mouse or trackpad to make a statement.</p>
                            <Link to={"/online-signature/draw"}>
                                <button type="button" className="btn btn-light btn-outline-primary mt-4 mb-4 px-5 p-2 fs-5 fw-bold border-1 rounded-pill">Draw your signature</button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mt-2">
                    <div className="card rounded-3 border-0" style={{ backgroundColor: '#0d91ed' }}>
                        <div className="card-body text-white me-3 m-3">
                            <h2 className="card-title mt-3">Type your signature</h2>
                            <p className="card-text mb-5 fs-6 text-white text-opacity-75">So many choices. Type your name and choose the font that best matches your personality.</p>
                            <Link to={"/online-signature/type"}>
                                <button type="button" className="btn btn-light btn-outline-primary mt-4 mb-4 px-5 p-2 fs-5 fw-bold border-1 rounded-pill">Type your signature</button>
                            </Link>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignatureGenerator;
