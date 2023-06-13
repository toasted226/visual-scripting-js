import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { listen } from "@tauri-apps/api/event";
import "./Sidebar.css";

function Sidebar() {
    const [paths, setPaths] = useState<string[]>([]);

    // listen for the get-folder event
    listen("get-folder", async (event) => {
        load_paths(event.payload as string);
    });

    // Do not run this function every rendering frame, will freeze the app!
    function load_paths(dir: string) {
        invoke("enumerate_files", { dir })
            .then((res) => {
                setPaths(res as string[]);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    return (
        <div className="sidebar">
            <div className="title">
                <h1>File Explorer</h1>
                <hr/>
            </div>
            <div className="file-explorer">
                {/* TODO: We need to have some sort of native menu option to select a directory */}
                {paths.map((path) => {
                    return <p>{path}</p>
                })}
            </div>
        </div>
    );
}

export default Sidebar;
