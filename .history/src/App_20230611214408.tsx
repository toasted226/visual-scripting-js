import { invoke } from "@tauri-apps/api/tauri";
import { useState } from "react";
import "./App.css";
import Navbar from "./Navbar";

function App() {
    const [paths, setPaths] = useState<string[]>([]);

    function load_paths() {
        invoke("enumerate_files", { dir: "/" })
            .then((res) => {
                setPaths(res as string[]);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    return (
        <div className="container">
            <Navbar />
            <div className="content">
                <h1>Paths</h1>
                <button onClick={load_paths}>Load Paths</button>
                {paths.map((path) => {
                    return <p>{path}</p>
                })}
            </div>
        </div>
    );
}

export default App;
