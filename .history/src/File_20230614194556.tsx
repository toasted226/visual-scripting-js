import { useState } from "react";
import { UserFile } from "./FileExplorer";
import "./File.css";

function File(props: UserFile) {
    return (
        <div className="file">
            <p>{props.name}</p>
        </div>
    );
}

export default File;