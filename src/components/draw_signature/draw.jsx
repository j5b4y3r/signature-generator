import React, { useState, useRef } from 'react';
import SignatureCanvas from "../../lib/rsc/index.jsx";
import Header from "../header/header.jsx";

// eslint-disable-next-line react-refresh/only-export-components
const Draw = () => {
    const canvasRef = useRef(null);
    const [lineColor, setLineColor] = useState('#000000');
    const [brushWidth, setBrushWidth] = useState(3);
    const [hasDrawn, setHasDrawn] = useState(false);

    const clearCanvas = () => {
        canvasRef.current.clear();
        setHasDrawn(false); // reset hasDrawn state after clearing
    };

    const downloadSignature = () => {
        const downloadLink = document.createElement('a');
        downloadLink.download = 'signature.png';
        downloadLink.href = canvasRef.current.getTrimmedCanvas().toDataURL("image/png");
        downloadLink.click();
    };

    return (
        <>
            <Header/>


        <div className="container d-flex flex-column align-items-center">
            <h3 className="text-center my-3">Draw your eSignature here</h3>
            <div className="signature-canvas-container border-1 border-danger rounded">
                <SignatureCanvas
                    // configure pen
                    ref={canvasRef}
                    penColor={lineColor}
                    minWidth={0.1}
                    maxWidth={brushWidth}
                    dotSize={brushWidth}
                    throttle={16}
                    velocityFilterWeight={0.003}
                    onBegin={() => setHasDrawn(true)} // set hasDrawn state when drawing starts
                    canvasProps={{
                        width: window.innerWidth > 800 ? "800" : window.innerWidth - 20,
                        height: window.innerWidth > 800 ? "250" : 200,
                        className: 'sigCanvas'
                    }}
                />
            </div>
            <div className="form d-flex justify-content-center">
                <div className="form-group mx-2">
                    <label className="form-label">Color</label>
                    <input
                        type="color"
                        value={lineColor}
                        onChange={(e) => setLineColor(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="form-group mx-2">
                    <label className="form-label">Width</label>
                    <input
                        type="range"
                        value={brushWidth}
                        onChange={(e) => setBrushWidth(e.target.value)}
                        className="form-range"
                        min="1"
                        max="20"
                    />
                </div>
            </div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-4 m-2 w-100 text-center">
                        <button disabled={!hasDrawn} className="btn btn-outline-primary px-5 me-2 mt-2 p-2 fw-bold fs-5 border-2 rounded-pill" onClick={clearCanvas}>
                            Clear and draw again
                        </button>
                        <button disabled={!hasDrawn} className="btn btn-primary p-2 px-5 me-2 mt-2 fw-bold fs-5 border-2 rounded-pill" onClick={downloadSignature}>
                            Download eSignature
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default React.memo(Draw);
