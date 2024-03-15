import SignatureGenerator from "./pages/signature_generator";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Draw from "./components/draw_signature/draw.jsx";
import Type from "./components/type_signature/type.jsx";
import DrawingPad from "./components/tester.jsx";

function App() {

  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<a href="/online-signature">Generate</a>} />
                <Route path="/online-signature" element={<SignatureGenerator/>} />
                <Route path="/online-signature/draw" element={<Draw />} />
                <Route path="/online-signature/type" element={<Type />} />
                <Route path="/test" element={<DrawingPad />} />
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
