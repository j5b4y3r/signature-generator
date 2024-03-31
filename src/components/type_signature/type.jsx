import React, { useState } from "react";
import WebFont from 'webfontloader';
import Header from "../header/header.jsx";

// eslint-disable-next-line react-refresh/only-export-components
const Type = () => {

    WebFont.load({
        google: {
            families: [
                'Bad Script',
                'Bilbo Swash Caps',
                'Caveat',
                'Covered By Your Grace',
                'Dancing Script',
                'Gochi Hand',
                'Great Vibes',
                'Handlee',
                'Just Another Hand',
                'Kalam',
                'La Belle Aurore',
                'Marck Script',
                'Nothing You Could Do',
                'Qwigley',
                'Sacramento',
                'Shadows Into Light',
                'Stalemate',
                'Yellowtail',
                'DM Sans',
                'Dosis',
                'Inter',
                'Karla',
                'Lato',
                'Manjari',
                'Manrope',
                'Montserrat',
                'Mulish',
                'Noto Sans',
                'Open Sans',
                'Orienta',
                'Overpass',
                'PT Sans',
                'Poppins',
                'Raleway',
                'Sarabun',
                'Thasadith'
            ]

        }
    });


    const [signature, setSignature] = useState('');
    const [color, setColor] = useState('#000000');
    const [selectedStyle, setSelectedStyle] = useState('handwriting');
    const styles = {
        'handwriting': [
            'Bad Script',
            'Bilbo Swash Caps',
            'Caveat',
            'Covered By Your Grace',
            'Dancing Script',
            'Gochi Hand',
            'Great Vibes',
            'Handlee',
            'Just Another Hand',
            'Kalam',
            'La Belle Aurore',
            'Marck Script',
            'Nothing You Could Do',
            'Qwigley',
            'Sacramento',
            'Shadows Into Light',
            'Stalemate',
            'Yellowtail'
        ],
        'sans_serif': [
            'DM Sans',
            'Dosis',
            'Inter',
            'Karla',
            'Lato',
            'Manjari',
            'Manrope',
            'Montserrat',
            'Mulish',
            'Noto Sans',
            'Open Sans',
            'Orienta',
            'Overpass',
            'PT Sans',
            'Poppins',
            'Raleway',
            'Sarabun',
            'Thasadith'
        ]
    };
    const [dList, setDList] = useState(false);

    const handleStyleChange = (e) => {
        setSelectedStyle(e.target.value);
    };

    const handleDownload = (style, color) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = signature.length*60;
        canvas.height = 200;
        ctx.font = "60px " + style; // fix font size and style
        ctx.fillStyle = color;
        const textWidth = ctx.measureText(signature).width;
        const x = (canvas.width - textWidth) / 2;        // Calculate the x-coordinate for centering
        ctx.fillText(signature, x, 100);
        const downloadLink = document.createElement('a');
        downloadLink.download = 'signature.png';
        downloadLink.href = canvas.toDataURL('image/png');
        downloadLink.click();
    };

    return (
        <>
            <Header/>


        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="d-flex flex-row justify-content-center align-items-center">
                        <div className="row-cols-auto">
                            <h1 className="text-center my-4">Type your signature</h1>
                            <div className="mb-3 w-100">
                                <input
                                    type="text"
                                    className="form-control p-2 text-center rounded-pill"
                                    value={signature}
                                    onChange={(e) => setSignature(e.target.value)}
                                    placeholder="Your signature"
                                />
                            </div>
                            <div className="d-flex justify-content-between w-100">
                                <div className="mb-3 d-flex justify-content-between">
                                    <div style={{marginRight: '10px'}} className="text-center">
                                        <select
                                            className="form-select"
                                            value={selectedStyle}
                                            onChange={handleStyleChange}
                                        >
                                            <option key="0" className="btn bg-info" value="handwriting">Handwriting
                                            </option>
                                            <option key="1" className="btn bg-info" value="sans_sarif">Sans Serif
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between border-primary border-2">
                                    <div className="">
                                        <input
                                            type="color"
                                            className="form-control form-control-color border-0"
                                            value={color}
                                            onChange={(e) => setColor(e.target.value)}
                                            title="Choose your color"
                                        />
                                    </div>
                                    <div className="d-flex flex-column justify-content-center">
                                        <p style={{marginLeft: "3px"}} className="text-center">{color}</p>
                                    </div>
                                </div>
                                <div className="ms-3 d-none d-sm-block">
                                    <button disabled={!dList} onClick={() => setDList(false)} className="btn btn-primary me-2">
                                        <i className="bi bi-grid-3x3-gap"></i>
                                        Grid
                                    </button>
                                    <button disabled={dList} onClick={() => setDList(true)} className="btn btn-primary">
                                        <i className="bi bi-list"></i>
                                        List
                                    </button>
                                </div>
                                <div className="text-center">
                                    <button className="btn ms-2 p-2" onClick={() => setSignature('')}>
                                        Clear
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className={dList ? 'list-group w-100' : 'row'}>
                        {selectedStyle === 'handwriting' ?
                            styles.handwriting.map((style, index) => (
                                signature !== '' &&
                                <div key={index} className={dList ? 'list-group-item border-0' : 'col-md-4 mb-3'}>
                                    <div className="card">
                                        <div className="card-body">
                                            <span className="card-title">{style}</span>
                                            <div
                                                className={dList ? "d-flex justify-content-between align-items-center" : "text-center"}>
                                                <article aria-placeholder="Your signature will show here"
                                                         className="card-text mb-5 mt-5 text-nowrap overflow-hidden"
                                                         style={{
                                                             fontFamily: style,
                                                             color: color,
                                                             fontSize: `60px`,
                                                             textAlign: 'center',
                                                             padding: "10px"
                                                         }}>
                                                    {signature}
                                                </article>
                                                <button onClick={() => handleDownload(style, color)}
                                                        className="btn btn-primary  p-2 px-5 me-2 mt-2 fw-bolder fs-6 border-2 rounded-pill">Download
                                                    Signature
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                            :
                            styles.sans_serif.map((style, index) => (
                                signature !== '' &&
                                <div key={index} className={dList ? 'list-group-item border-0' : 'col-md-4 mb-3'}>
                                    <div className="card">
                                        <div className="card-body">
                                            <span className="card-title">{style}</span>
                                            <div
                                                className={dList ? "d-flex justify-content-between align-items-center" : "text-center"}>
                                                <article aria-placeholder="Your signature will show here"
                                                         className="card-text mb-5 mt-5 text-nowrap overflow-hidden"
                                                         style={{
                                                             fontFamily: style,
                                                             color: color,
                                                             fontSize: `60px`,
                                                             textAlign: 'center',
                                                             paddingLeft: "10px"
                                                         }}>
                                                    {signature}
                                                </article>
                                                <button onClick={() => handleDownload(style, color)}
                                                        className="btn btn-primary p-2 px-5 me-2 mt-2 fw-bolder fs-6 border-2 rounded-pill">Download
                                                    Signature
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                </div>
            </div>
        </div>
        </>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export default React.memo(Type);
