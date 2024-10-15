# app.py

from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from config import Config

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)
db = SQLAlchemy(app)

from routes import auth, students, attendance

app.register_blueprint(auth.bp)
app.register_blueprint(students.bp)
app.register_blueprint(attendance.bp)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)