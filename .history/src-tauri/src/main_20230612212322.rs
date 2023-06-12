// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs;
use tauri::{CustomMenuItem, Menu, Submenu, Manager, InvokeError, window};
use tauri::api::dialog::FileDialogBuilder;

struct UserFile {
    name: String,
    path: String,
    is_folder: bool,
}

#[derive(Clone, serde::Serialize)]
struct Payload {
    message: String,
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
                        .pick_folder(|folder_path| {
                            let path_string: String = folder_path.unwrap().to_str().unwrap().to_string();
                            event.window().emit("open", path_string).unwrap();
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
