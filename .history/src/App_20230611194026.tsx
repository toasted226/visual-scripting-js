import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import Navbar from "./Navbar";

function App() {
    return (
        <div className="container">
            <Navbar name="myfolder" path="/myfolder" />
        </div>
    );
}

export default App;
