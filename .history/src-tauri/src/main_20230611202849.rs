// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{io, fs};

struct UserFile {
    name: String,
    path: String,
    is_folder: bool,
}

#[tauri::command]
fn enumerate_files(dir: &str) -> Result<Vec<UserFile>, io::Error> {
    let paths = fs::read_dir(dir)?;
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
