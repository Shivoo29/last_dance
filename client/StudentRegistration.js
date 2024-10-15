// src/components/StudentRegistration.js

import React, { useState } from 'react';
import { registerStudent } from '../services/api';

function StudentRegistration() {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('image', image);
      const response = await registerStudent(formData);
      console.log(response);
      // Handle successful registration (e.g., show success message)
    } catch (error) {
      console.error('Student registration failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Student Name"
        required
      />
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        accept="image/*"
        required
      />
      <button type="submit">Register Student</button>
    </form>
  );
}

export default StudentRegistration;