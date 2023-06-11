import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import Navbar from "./Navbar";

function App() {
    return (
        <div className="container">
            <Navbar></Navbar>
        </div>
    );
}

export default App;
