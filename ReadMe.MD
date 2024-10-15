# AI-Powered Attendance Management System

This project is an advanced Attendance Management System that uses AI for facial recognition to automate student attendance in educational institutions.

## Features

- Facial recognition for student identification
- Automated attendance marking
- Multi-language support
- Real-time analytics dashboard
- High-performance data processing
- Scalable microservices architecture

## Tech Stack

- Backend: Python (Flask), Go, Rust
- Frontend: JavaScript (React)
- Database: PostgreSQL
- AI: face_recognition library (Python)

## Setup and Installation

### Prerequisites

- Python 3.8+
- Node.js 14+
- Go 1.16+
- Rust 1.55+
- PostgreSQL 13+

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/Shivoo29/last_dance
   cd last_dance
   ```

2. Set up and activate a Python virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```

3. Install Python dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Set up the PostgreSQL database and update the connection string in `config.py`.

5. Install Node.js dependencies:
   ```
   cd frontend
   npm install
   ```

6. Set up Go microservice:
   ```
   cd ../go-microservice
   go mod init attendance-system
   go mod tidy
   ```

7. Set up Rust component:
   ```
   cd ../rust-component
   cargo build
   ```

## Running the Application

1. Start the Python backend:
   ```
   cd backend
   python app.py
   ```

2. Start the Go microservice:
   ```
   cd ../go-microservice
   go run main.go
   ```

3. Start the Rust component:
   ```
   cd ../rust-component
   cargo run
   ```

4. Start the React frontend:
   ```
   cd ../frontend
   npm start
   ```

5. Access the application at `http://localhost:3000`

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.
