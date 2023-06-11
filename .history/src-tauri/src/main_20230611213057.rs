// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{io, fs};

use tauri::InvokeError;

struct UserFile {
    name: String,
    path: String,
    is_folder: bool,
}

#[tauri::command]
fn enumerate_files(dir: &str) -> Result<Vec<String>, InvokeError> {
    if let paths = fs::read_dir(dir) {
    let mut files: Vec<String> = Vec::new();

    for path in paths {
        files.push(path.unwrap().path().display().to_string());
    }

    Ok(files)
    } else {
        Err(InvokeError::from(io::Error::new(io::ErrorKind::Other, "Failed to read directory")))
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![enumerate_files])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
