// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs;
use tauri::api::file;
use tauri::{CustomMenuItem, Menu, Submenu, InvokeError};
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

    let mut files: Vec<UserFile> = Vec::new();

    for path in paths {
        let path_result = path.map_err(|e| InvokeError::from(format!("Error reading path: {}", e)))?;
        let path_string = path_result.path().to_str().unwrap().to_string();
        let name = path_result.file_name().to_str().unwrap().to_string();
        let is_folder = path_result.path().is_dir();

        files.push(UserFile { name, path: path_string, is_folder });
    }

    Ok(files)
}

fn main() {
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
                    FileDialogBuilder::new()
                        .set_title("Open Folder")
                        .set_directory("C:/")
                        .pick_folder(move |folder_path| {
                            event.window().emit("get-folder", folder_path.unwrap().to_str().unwrap()).unwrap();
                        });
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
