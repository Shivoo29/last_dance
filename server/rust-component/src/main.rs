// rust-component/src/main.rs

use actix_web::{web, App, HttpServer, Responder};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Deserialize)]
struct AttendanceRecord {
    student_id: u32,
    date: String,
    present: bool,
}

#[derive(Serialize)]
struct AttendanceSummary {
    total_students: u32,
    present_count: u32,
    absent_count: u32,
    attendance_rate: f32,
}

async fn process_attendance(data: web::Json<Vec<AttendanceRecord>>) -> impl Responder {
    let mut summary = HashMap::new();

    for record in data.iter() {
        let entry = summary.entry(record.date.clone()).or_insert(AttendanceSummary {
            total_students: 0,
            present_count: 0,
            absent_count: 0,
            attendance_rate: 0.0,
        });

        entry.total_students += 1;
        if record.present {
            entry.present_count += 1;
        } else {
            entry.absent_count += 1;
        }
    }

    for summary in summary.values_mut() {
        summary.attendance_rate = summary.present_count as f32 / summary.total_students as f32 * 100.0;
    }

    web::Json(summary)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new().service(web::resource("/process").route(web::post().to(process_attendance)))
    })
    .bind("127.0.0.1:8081")?
    .run()
    .await
}