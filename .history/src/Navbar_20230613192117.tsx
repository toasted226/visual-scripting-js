import { invoke } from "@tauri-apps/api/tauri";
import "./Navbar.css";

function Navbar() {
    return (
        <nav className="navbar">
            <label>Editor</label>
            <button className="compile-btn">Compile</button>
        </nav>
    );
}

export default Navbar;
