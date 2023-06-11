import { invoke } from "@tauri-apps/api/tauri";
import "./Navbar.css";

function Navbar() {
    return (
        <nav>
            <h3>Editor</h3>
            <button>Compile</button>
        </nav>
    );
}

export default Navbar;