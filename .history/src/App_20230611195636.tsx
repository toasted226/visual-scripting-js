import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import Navbar from "./Navbar";

function App() {
    let files: [{name: string, path: string}] = [{name: "myfolder", path: "/myfolder"}];

    return (
        <div className="container">
            <Navbar />
        </div>
    );
}

export default App;
