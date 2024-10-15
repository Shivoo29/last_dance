// src/services/api.js

const API_URL = 'http://localhost:5000';

export const login = async (username, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  return response.json();
};

export const register = async (username, email, password, role) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password, role }),
  });
  return response.json();
};

export const registerStudent = async (formData) => {
  const response = await fetch(`${API_URL}/register_student`, {
    method: 'POST',
    body: formData,
  });
  return response.json();
};

export const uploadAttendance = async (formData) => {
  const response = await fetch(`${API_URL}/mark_attendance`, {
    method: 'POST',
    body: formData,
  });
  return response.json();
};

export const getAttendance = async (date) => {
  const response = await fetch(`${API_URL}/get_attendance?date=${date}`);
  return response.json();
};
