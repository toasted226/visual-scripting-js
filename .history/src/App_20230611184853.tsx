import { invoke } from "@tauri-apps/api/tauri";
import React, { useState } from "react";
import "./App.css";
import Navbar from "./Navbar";

function App() {
    const [num, setNum] = useState(0);

    return (
        <div className="container">
            <Navbar />
            <button onClick={() => setNum(num + 1)}>Click me</button>
            <p></p>
        </div>
    );
}

export default App;
