import { invoke } from "@tauri-apps/api/tauri";
import "./Navbar.css";

function Navbar() {
    return (
        <nav className="navbar">
            <h2>Editor</h2>
            <button>Compile</button>
        </nav>
    );
}

export default Navbar;