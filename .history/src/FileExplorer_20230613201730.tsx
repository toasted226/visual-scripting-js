

function FileExplorer() {
    return (
        <div className="file-explorer">
            {/* TODO: We need to have some sort of native menu option to select a directory */}
            {paths.map((path) => {
                    return <p>{path}</p>
            })}
        </div>
    )
}
