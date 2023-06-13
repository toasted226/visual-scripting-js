import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { listen } from "@tauri-apps/api/event";
import "./FileExplorer.css";

interface UserFile {
    name: string,
    path: string,
    is_folder: boolean,
}

function FileExplorer() {
    const [files, setFiles] = useState<UserFile>();

    // listen for the get-folder event
    listen("get-folder", async (event) => {
        load_paths(event.payload as string);
    });

    // Do not run this function every rendering frame, will freeze the app!
    async function load_paths(dir: string) {
        let result: UserFile[] = await invoke("enumerate_files", { dir });
    }

    return (
        <div className="file-explorer">
            <div className="file-list">
                {paths.map((path) => {
                    return <p>{path}</p>
                })}
            </div>
        </div>
    )
}

export default FileExplorer;
