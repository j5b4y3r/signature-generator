import SignatureGenerator from "./pages/signature_generator";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Draw from "./components/draw_signature/draw";
import Type from "./components/type_signature/type";
import DrawingPad from "./components/tester";
import Home from "./pages/home.jsx";
import Header from "./components/header/header.jsx";

function App() {

  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/online-signature" element={<SignatureGenerator />} />
                <Route path="/online-signature/draw" element={<Draw />} />
                <Route path="/online-signature/type" element={<Type />} />
                <Route path="/test" element={<DrawingPad />} />
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
