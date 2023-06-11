import { invoke } from "@tauri-apps/api/tauri";
import { useState } from "react";
import "./App.css";
import Navbar from "./Navbar";

function App() {
    const [paths, setPaths] = useState<string[]>([]);

    return (
        <div className="container">
            <Navbar />
            <div className="content">
                <h1>Paths</h1>
            </div>
        </div>
    );
}

export default App;
