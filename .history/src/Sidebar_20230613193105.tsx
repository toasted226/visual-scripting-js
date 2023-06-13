import "./Sidebar.css";

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="title">
                <h1>File Explorer</h1>
            </div>
            <hr/>
            <div className="file-explorer">
                {/* TODO: We need to have some sort of native menu option to select a directory */}
                <button onClick={() => load_paths("/")}>Load Paths</button>
                {paths.map((path) => {
                    return <p>{path}</p>
                })}
            </div>
        </div>
    );
}

export default Sidebar;