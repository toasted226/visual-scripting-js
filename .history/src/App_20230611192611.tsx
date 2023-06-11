import { invoke } from "@tauri-apps/api/tauri";
import { useState } from "react";
import "./App.css";
import Navbar from "./Navbar";

function App() {
    return (
        <div className="container">
            <Navbar />
        </div>
    );
}

export default App;
