import { invoke } from "@tauri-apps/api/tauri";
import "./Navbar.css";

function Navbar() {
    return (
        <nav className="navbar">
            <h1>Editing main.vs</h1>
            <button className="compile-btn">Compile</button>
        </nav>
    );
}

export default Navbar;