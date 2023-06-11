import { invoke } from "@tauri-apps/api/tauri";
import React, { useState } from "react";
import "./App.css";
import Navbar from "./Navbar";

function App() {
    const [num, setNum] = useState(0);
    const [text, setText] = useState("");

    async function getText() {
        const text: string = await invoke("get_text", {num});
        setText(text);
    }

    return (
        <div className="container">
            <Navbar />
            <button onClick={() => {
                setNum(num + 1);
                getText()
            }}>Click me</button>
            <p>{text}</p>
        </div>
    );
}

export default App;
