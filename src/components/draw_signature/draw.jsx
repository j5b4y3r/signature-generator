import React, { useState, useRef } from 'react';
import SignatureCanvas from "../../lib/rsc/index.jsx";


const Draw = () => {
    const canvasRef = useRef(null);
    const [lineColor, setLineColor] = useState('#000000');
    const [brushWidth, setBrushWidth] = useState(3); // Initial brush width

    const clearCanvas = () => {
        canvasRef.current.clear();
    };

    const downloadSignature = () => {
        const downloadLink = document.createElement('a');
        downloadLink.download = 'signature.png';  // Set the filename for the downloaded image
        downloadLink.href = canvasRef.current.getTrimmedCanvas().toDataURL("image/png"); // Get the data URL with base64 encoding of the canvas content
        downloadLink.click();  // Trigger the download of the image
    };

    return (
        <div className="container d-flex flex-column align-items-center">
            <h3 className="text-center my-3">Draw your eSignature here</h3>
            <div className="signature-canvas-container border-2 border-danger">
                <SignatureCanvas
                    ref={canvasRef}
                    penColor={lineColor}
                    minWidth={0.1}
                    maxWidth={brushWidth}
                    dotSize={brushWidth}
                    throttle={5}
                    velocityFilterWeight={0.03}
                    canvasProps={{
                        width: window.innerWidth > 500 ? "800" : "400",
                        height: 200,
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
                    <input disabled={false}
                        type="range"
                        value={brushWidth}
                        onChange={(e) => setBrushWidth(e.target.value)}
                        className="form-range"
                        min="1"
                        max="20"
                    />
                </div>
            </div>
            <div className="d-flex justify-content-center mt-3">
                <button className="btn btn-outline-primary me-2" onClick={clearCanvas}>
                    Clear and draw again
                </button>
                <button className="btn btn-primary" onClick={downloadSignature}>
                    Download eSignature
                </button>
            </div>
        </div>
    );
};

export default React.memo(Draw);
