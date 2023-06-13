import { UserFile } from "./FileExplorer";

function File(props: { name: string, path: string, is_folder: boolean }) {
    return (
        <div className="file">
            <p>{props.name}</p>
        </div>
    );
}

export default File;