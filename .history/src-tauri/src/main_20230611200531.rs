// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

struct UserFile {
    name: String,
    path: String,
    is_folder: bool,
}

#[tauri::command]
fn enumerate_files() -> Vec<UserFile> {

}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
