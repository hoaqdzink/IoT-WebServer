import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./Page/Home"; 
import Control from "./Page/Control"; 
import Sensor from "./Page/Sensor";


import "./App.css";
import "./css/Header.css";

function App() {
    return (
        <Router>
            <div>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/control" element={<Control />} />
                    <Route path="/sensor" element={<Sensor />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
