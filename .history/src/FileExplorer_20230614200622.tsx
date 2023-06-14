import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { listen } from "@tauri-apps/api/event";
import "./FileExplorer.css";
import File from "./File";

export interface UserFile {
    name: string,
    path: string,
    is_folder: boolean,
}

function FileExplorer(props: {dir: string}) {
    const [files, setFiles] = useState<UserFile[]>([]);

    if (dir != "") {
        
    }

    // listen for the get-folder event
    listen("get-folder", async (event) => {
        load_paths(event.payload as string);
    });

    // Do not run this function every rendering frame, will freeze the app!
    async function load_paths(dir: string) {
        let result: UserFile[] = await invoke("enumerate_files", { dir });
        setFiles(result);
    }

    return (
        <div className="file-explorer">
            <div className="file-list">
                {files.map((file) => {
                    return <File name={file.name} path={file.path} is_folder={file.is_folder} />
                })}
            </div>
        </div>
    )
}

export default FileExplorer;
