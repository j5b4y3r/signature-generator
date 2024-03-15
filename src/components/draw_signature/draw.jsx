// eslint-disable-next-line no-unused-vars
import React, { useState, useRef } from 'react';

const Draw = () => {
    const canvasRef = useRef(null);
    const [lineColor, setLineColor] = useState('#000000');
    const [isDrawing, setIsDrawing] = useState(false);
    const [lastX, setLastX] = useState(0);
    const [lastY, setLastY] = useState(0);
    const [brushWidth, setBrushWidth] = useState(3); // Initial brush width
    const [, setLastBrushWidth] = useState(5); // Store previous brush width

    const startDrawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        setIsDrawing(true);
        setLastX(offsetX);
        setLastY(offsetY);
    };

    const draw = ({ nativeEvent }) => {
        if (!isDrawing) return;
        const { offsetX, offsetY } = nativeEvent;
        const ctx = canvasRef.current.getContext('2d');
        const distance = Math.sqrt((offsetX - lastX) ** 2 + (offsetY - lastY) ** 2);        // Calculate the distance between current and previous points
        // Adjust brush width based on the drawing speed
        const newBrushWidth = Math.max(1, Math.min(20, distance / 2));
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = brushWidth;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
        setLastX(offsetX);
        setLastY(offsetY);
        setLastBrushWidth(newBrushWidth); // Update last brush width
    };

    const finishDrawing = () => {
        setIsDrawing(false);
    };

    const clearCanvas = () => {
        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    };

    const downloadSignature = () => {
        const canvas = canvasRef.current;    // Get the current canvas element
        const downloadLink = document.createElement('a');
        downloadLink.download = 'signature.png';  // Set the filename for the downloaded image
        downloadLink.href = canvas.toDataURL('image/png');  // Get the data URL with base64 encoding of the canvas content
        downloadLink.click();  // Trigger the download of the image
    };

    return (
        <div className="container d-flex flex-column align-items-center">
            <h3 className="text-center my-3">Draw your eSignature here</h3>
            <div className="signature-canvas-container">
                <canvas
                    ref={canvasRef}
                    className="signature-canvas bg-white border"
                    width={window.innerWidth > 600?"800":"400"}
                    height="200"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={finishDrawing}
                    onMouseOut={finishDrawing}
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

export default Draw;
