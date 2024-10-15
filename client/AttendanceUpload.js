// src/components/AttendanceUpload.js

import React, { useState } from 'react';
import { uploadAttendance } from '../services/api';

function AttendanceUpload() {
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('image', image);
      const response = await uploadAttendance(formData);
      console.log(response);
      // Handle successful upload (e.g., show success message)
    } catch (error) {
      console.error('Attendance upload failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        accept="image/*"
        required
      />
      <button type="submit">Upload Attendance</button>
    </form>
  );
}

export default AttendanceUpload;
