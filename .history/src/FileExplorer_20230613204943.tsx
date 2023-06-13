import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { listen } from "@tauri-apps/api/event";
import "./FileExplorer.css";

function FileExplorer() {
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
        <div className="file-explorer">
            <div className="file-list">

            </div>
        </div>
    )
}

export default FileExplorer;
