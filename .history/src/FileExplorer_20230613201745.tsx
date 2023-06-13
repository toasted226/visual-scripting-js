

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
            {/* TODO: We need to have some sort of native menu option to select a directory */}
            {paths.map((path) => {
                    return <p>{path}</p>
            })}
        </div>
    )
}
