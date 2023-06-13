import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { listen } from "@tauri-apps/api/event";
import "./Sidebar.css";

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="title">
                <h1>File Explorer</h1>
                <hr/>
            </div>
        </div>
    );
}

export default Sidebar;
