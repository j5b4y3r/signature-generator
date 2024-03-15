import React, { useState, useRef, useEffect } from 'react';

const DrawingPad = React.memo(() => {
    const [drawing, setDrawing] = useState(false);
    const [paths, setPaths] = useState([]);
    const [undoHistory, setUndoHistory] = useState([]);
    const [currentPath, setCurrentPath] = useState('');
    const [lineColor, setLineColor] = useState('#000');
    const [lineWidth, setLineWidth] = useState(6);
    const prevPointRef = useRef(null);
    const svgRef = useRef(null);

    useEffect(() => {
        const handleMouseUp = () => {
            setDrawing(false);
            if (currentPath) {
                setPaths(prevPaths => [...prevPaths, currentPath]);
                setCurrentPath('');
            }
        };

        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [currentPath]);

    const startDrawing = (event) => {
        event.preventDefault();
        const { clientX, clientY } = getClientCoordinates(event);
        setDrawing(true);
        setCurrentPath(`M ${clientX} ${clientY}`);
        prevPointRef.current = { x: clientX, y: clientY };
        undoHistory.length !== 0 && setUndoHistory([])
    };

    const continueDrawing = (event) => {
        if (!drawing) return;
        event.preventDefault();
        const { clientX, clientY } = getClientCoordinates(event);
        const newPoint = { x: clientX, y: clientY };
        const controlPointX = (prevPointRef.current.x + newPoint.x) / 2;
        const controlPointY = (prevPointRef.current.y + newPoint.y) / 2;
        setCurrentPath(prevPath => `${prevPath} Q ${prevPointRef.current.x} ${prevPointRef.current.y} ${controlPointX} ${controlPointY}`);
        prevPointRef.current = newPoint;
        undoHistory.length !== 0 && setUndoHistory([])
    };

    const getClientCoordinates = (event) => {
        const rect = svgRef.current.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const offsetY = event.clientY - rect.top;
        return { clientX: offsetX, clientY: offsetY };
    };

    const undo = ()=> {
        if (paths.length === 0) return;
        setUndoHistory(prevPaths => [...prevPaths, paths[paths.length -1]])
        paths.pop()
    }
    const redo = ()=>  {
        if (undoHistory.length === 0) return;
        setPaths(prevPaths => [...prevPaths, undoHistory[undoHistory.length -1]])
        undoHistory.pop()
    }

    const clearPaths = () => {
        setPaths([]);
        setCurrentPath('');
    };

    const handleColorChange = (event) => {
        setLineColor(event.target.value);
    };

    const handleWidthChange = (event) => {
        setLineWidth(event.target.value);
    };

    const downloadSignature = () => {
        const svgElement = svgRef.current;
        const svgData = new XMLSerializer().serializeToString(svgElement);
        download('data:image/svg+xml;base64,' + btoa(svgData), 'signature.svg', 'image/svg+xml');
    };

    const download = (data, filename, type = 'text/plain') => {
        const a = document.createElement('a');
        a.href = data;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <div className="container col-12 text-center">
            <svg
                ref={svgRef}
                viewBox="0 0 500 250"
                width="500"
                height="250"
                onMouseDown={startDrawing}
                onMouseMove={continueDrawing}
                onTouchStart={startDrawing}
                onTouchMove={continueDrawing}
                style={{background: '#f1f3f5', cursor: 'crosshair', border: '1px solid #ccc'}}
            >
                {paths.map((path, index) => (
                    <path
                        key={index}
                        d={path}
                        fill="none"
                        stroke={lineColor}
                        strokeWidth={lineWidth}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                ))}
                {currentPath && (
                    <path
                        d={currentPath}
                        fill="none"
                        stroke="gray"
                        strokeWidth={lineWidth}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                )}
            </svg>
            <div className="mt-3 d-flex justify-content-center container">
                <button className="btn btn-danger me-2" onClick={clearPaths} disabled={paths.length===0}>Clear</button>
                <button className="btn btn-light me-2" onClick={undo} disabled={paths.length === 0}>Undo</button>
                <button className="btn btn-light me-2" onClick={redo} disabled={undoHistory.length === 0}>Redo</button>
                <input
                    type="color"
                    value={lineColor}
                    onChange={handleColorChange}
                    className="form-control form-control-color me-2"
                />
                <label htmlFor="width" className="form-label me-3 mt-2">Width </label>
                <input
                    type="range"
                    value={lineWidth}
                    onChange={handleWidthChange}
                    min="1"
                    max="25"
                    className="form-label me-2 mt-2"
                />
                <button className="btn btn-primary" onClick={downloadSignature} disabled={paths.length===0}>Download</button>
            </div>
        </div>
    );
});

export default DrawingPad;
