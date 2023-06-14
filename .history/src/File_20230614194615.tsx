import { useState } from "react";
import { UserFile } from "./FileExplorer";
import "./File.css";

function File(props: UserFile) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="file">
            <p>{props.name}</p>
        </div>
    );
}

export default File;