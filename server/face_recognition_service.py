# services/face_recognition_service.py

import face_recognition
import numpy as np
from models import Student

def encode_face(image_file):
    image = face_recognition.load_image_file(image_file)
    face_encodings = face_recognition.face_encodings(image)
    if face_encodings:
        return face_encodings[0]
    return None

def recognize_faces(image_file):
    image = face_recognition.load_image_file(image_file)
    face_encodings = face_recognition.face_encodings(image)
    
    students = Student.query.all()
    known_face_encodings = [student.face_encoding for student in students]
    
    recognized_students = []
    for face_encoding in face_encodings:
        matches = face_recognition.compare_faces(known_face_encodings, face_encoding)
        if True in matches:
            student_index = matches.index(True)
            recognized_students.append(students[student_index].id)
    
    return recognized_students