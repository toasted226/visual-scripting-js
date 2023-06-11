import { invoke } from "@tauri-apps/api/tauri";
import "./Navbar.css";

function Navbar() {
    return (
        <nav className="navbar">
            <h3>Editor</h3>
            <button>Compile</button>
        </nav>
    );
}

export default Navbar;