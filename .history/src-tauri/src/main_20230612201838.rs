// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs;
use tauri::InvokeError;
use tauri::{CustomMenuItem, Menu, MenuItem, Submenu};
use tauri::api::dialog::FileDialogBuilder;

struct UserFile {
    name: String,
    path: String,
    is_folder: bool,
}

#[tauri::command]
fn enumerate_files(dir: &str) -> Result<Vec<String>, InvokeError> {
    let paths = match fs::read_dir(dir) {
        Ok(paths) => paths,
        Err(e) => return Err(InvokeError::from(format!("Error reading directory: {}", e))),
    };

    let mut files: Vec<String> = Vec::new();

    for path in paths {
        files.push(path.unwrap().path().display().to_string());
    }

    Ok(files)
}

fn open_file() {
    FileDialogBuilder::new()
        .set_title("Open Folder")
        .set_directory("C:/")
        .pick_folder(|folder_path| {
            match folder_path {
                Some(path) => {
                    let path_string: String = path.to_str().unwrap().to_string();
                }
                None => {
                    println!("No folder selected");
                }
            }
        });
}

fn main() {
    // here `"quit".to_string()` defines the menu item id, and the second parameter is the menu item label.
    let open = CustomMenuItem::new("open".to_string(), "Open");
    let save = CustomMenuItem::new("save".to_string(), "Save");
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let submenu = Submenu::new("File", Menu::new()
        .add_item(open)
        .add_item(save)
        .add_item(quit));

    let menu = Menu::new()
        .add_submenu(submenu);

    tauri::Builder::default()
        .menu(menu)
        .on_menu_event(|event| {
            match event.menu_item_id() {
                "open" => {
                    open_file();
                }
                "save" => {
                    println!("save");
                }
                "quit" => {
                    std::process::exit(0);
                }
                _ => {}
            }
        })
        .invoke_handler(tauri::generate_handler![enumerate_files])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
