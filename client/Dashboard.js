// src/components/Dashboard.js

import React, { useState, useEffect } from 'react';
import { getAttendance } from '../services/api';

function Dashboard() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    fetchAttendance();
  }, [date]);

  const fetchAttendance = async () => {
    try {
      const data = await getAttendance(date);
      setAttendanceData(data);
    } catch (error) {
      console.error('Failed to fetch attendance:', error);
    }
  };

  return (
    <div>
      <h1>Attendance Dashboard</h1>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Present</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((record) => (
            <tr key={record.student_id}>
              <td>{record.student_id}</td>
              <td>{record.present ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
