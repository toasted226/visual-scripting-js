// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

struct Person {
    name: String,
    age: i32,
}

impl Person {
    fn new(name: String, age: i32) -> Self {
        Self {name, age}
    }

    fn get_name(&self) -> &str {
        &self.name
    }
}

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn get_text(num: i32) -> String {
    let a = String::from(format!("this string has the number {}", num));
    let b = "this long string is long";

    let p = Person::new(String::from("Keagan"), 20);
    let name = p.name;

    let result = longest(&a, b);
    result.to_string()
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_text])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}
