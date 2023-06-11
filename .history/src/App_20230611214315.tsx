import { invoke } from "@tauri-apps/api/tauri";
import { useState } from "react";
import "./App.css";
import Navbar from "./Navbar";

function load_paths() {
    invoke("enumerate_files", { dir: "/Dev Projects/tauri/visual-scripting-js" })
        .then((res) => {
            setPaths(res as string[]);
        })
        .catch((err) => {
            console.error(err);
        });
}

function App() {
    const [paths, setPaths] = useState<string[]>([]);

    

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
