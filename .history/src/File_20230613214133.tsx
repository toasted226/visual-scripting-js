import { UserFile } from "./FileExplorer";

function File(props: UserFile) {
    return (
        <div className="file">
            <p>{props.name}</p>
        </div>
    );
}