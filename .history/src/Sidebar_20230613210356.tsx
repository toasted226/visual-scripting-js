import FileExplorer from "./FileExplorer";
import "./Sidebar.css";

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="title">
                <h1>File Explorer</h1>
            </div>
            <hr/>
            <FileExplorer />
        </div>
    );
}

export default Sidebar;
