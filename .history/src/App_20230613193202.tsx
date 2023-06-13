import { invoke } from "@tauri-apps/api/tauri";
import { useState } from "react";
import "./App.css";
import Navbar from "./Navbar";
import { emit, listen } from "@tauri-apps/api/event";
import Sidebar from "./Sidebar";

function App() {
    return (
        <div className="container">
            <Navbar />
            <Sidebar />
        </div>
    );
}

export default App;
