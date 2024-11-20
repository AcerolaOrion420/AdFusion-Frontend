// src/services/authService.js
import api from './api';


export const login = async (username, password) => {
  try {
    const response = await api.post('/login', { username, password });

    // Store the token in localStorage for authentication
    if (response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
      console.log(response.data.token);
      localStorage.setItem('user_role', response.data.role); // Optional: Store role
    }

    return response.data; // Return the data for redirection
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
    throw errorMessage;
  }
};

export const logout = () => {
  localStorage.removeItem('auth_token'); // Clear token
  localStorage.removeItem('user_role'); // Clear role
  window.location.href = '/login'; // Redirect to login
};





export const signup = async (username, password, email, role) => {
  try {
    const response = await api.post('/signup', { username, password, email, role });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Signup failed. Please try again.';
    throw errorMessage;
  }
};

