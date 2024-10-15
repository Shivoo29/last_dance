# backend/services/integration.py

import requests

def translate_text(lang, key):
    response = requests.post('http://localhost:8080/translate', json={'lang': lang, 'key': key})
    return response.json()['translated']

def process_attendance_data(attendance_records):
    response = requests.post('http://localhost:8081/process', json=attendance_records)
    return response.json()

# Use these functions in your Flask routes
# For example, in routes/attendance.py:

from services.integration import translate_text, process_attendance_data

@bp.route('/mark_attendance', methods=['POST'])
def mark_attendance():
    # ... (existing code to mark attendance)

    success_message = translate_text(request.args.get('lang', 'en'), 'attendance_marked')
    return jsonify({'message': success_message}), 200

@bp.route('/attendance_summary', methods=['GET'])
def attendance_summary():
    # Fetch attendance records from the database
    attendance_records = Attendance.query.all()
    
    # Convert to the format expected by the Rust service
    records_for_processing = [
        {
            'student_id': record.student_id,
            'date': record.date.isoformat(),
            'present': record.present
        }
        for record in attendance_records
    ]

    # Process the data using the Rust service
    summary = process_attendance_data(records_for_processing)

    return jsonify(summary), 200