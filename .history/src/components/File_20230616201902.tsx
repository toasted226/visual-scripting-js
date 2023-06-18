import { useState } from "react";
import { UserFile } from "../FileExplorer";
import FileExplorer from "../FileExplorer";
import { listen } from "@tauri-apps/api/event";
import "./File.css";

function File(props: UserFile) {
    const [isExpanded, setIsExpanded] = useState(false);

    // listen for the get-folder event
    listen("get-folder", async () => {
        setIsExpanded(false);
    });

    return (
        <>
            <div className="file" onClick={() => {
                if (props.is_folder) {
                    setIsExpanded(!isExpanded);
                }
                }}>
                <p>{props.name}</p>
            </div>
            {isExpanded ? (
                <FileExplorer dir={props.path} />
            ) : (
                <></>
            )}
        </>
    );
}

export default File;
