import { useState } from "react";
import { UserFile } from "./FileExplorer";
import "./File.css";
import FileExplorer from "./FileExplorer";

function File(props: UserFile) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <>
            <div className="file" onClick={() => {
                if (props.is_folder) {
                    setIsExpanded(!isExpanded);
                }
                }}>
                <p>{props.name}</p>
            </div>
            {isActive ? (
                <p>{children}</p>
            ) : (
                <></>
            )}
        </>
    );
}

export default File;