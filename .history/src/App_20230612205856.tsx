import { invoke } from "@tauri-apps/api/tauri";
import { useState } from "react";
import "./App.css";
import Navbar from "./Navbar";
import { emit, listen } from "@tauri-apps/api/event";

function App() {
    const [paths, setPaths] = useState<string[]>([]);

    async function listen() {
        const unlisten = await listen("event-name", (event) => {console.log(event.payload);});
    }
    listen();

    // Do not run this function every rendering frame, will freeze the app!
    function load_paths() {
        invoke("enumerate_files", { dir: "C:/Users/keaga/OneDrive/Documents" })
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
                {/* TODO: We need to have some sort of native menu option to select a directory */}
                <button onClick={load_paths}>Load Paths</button>
                {paths.map((path) => {
                    return <p>{path}</p>
                })}
            </div>
        </div>
    );
}

export default App;
