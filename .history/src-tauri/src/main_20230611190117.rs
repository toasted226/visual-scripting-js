// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn get_text(num: i32) -> String {
    format!("My number is {}", num)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_text])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

fn longest(x: &str, y: &str) -> &str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}