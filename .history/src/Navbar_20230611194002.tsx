import { invoke } from "@tauri-apps/api/tauri";
import "./Navbar.css";

function Navbar(attrs: {name: string, path: string}) {
    return (
        <nav className="navbar">
            <h1>Editor</h1>
            <button className="compile-btn">Compile</button>
        </nav>
    );
}

export default Navbar;