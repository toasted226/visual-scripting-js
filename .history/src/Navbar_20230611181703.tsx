import { invoke } from "@tauri-apps/api/tauri";
import "./Navbar.css";

function Navbar() {
    return (
        <nav className="navbar">
            <h1>Editor</h1>
            <button>Compile</button>
        </nav>
    );
}

export default Navbar;