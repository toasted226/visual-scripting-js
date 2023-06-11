import { invoke } from "@tauri-apps/api/tauri";
import { useState } from "react";
import "./App.css";
import Navbar from "./Navbar";

function App() {
    const [paths, setPaths] = useState<string[]>([]);

    invoke("enumerate_files", { dir: "C:\\Users\\Keagan\\Desktop" })
        .then((res) => {
            
        });

    return (
        <div className="container">
            <Navbar />
            <div className="content">
                <h1>Paths</h1>
                {paths.map((path) => {
                    return <p>{path}</p>
                })}
            </div>
        </div>
    );
}

export default App;
