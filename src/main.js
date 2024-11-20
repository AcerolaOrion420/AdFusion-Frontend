
// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';

// Create a new Axios instance with a base URL and default headers
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', // Set this to your backend URL
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Create the Vue app
const app = createApp(App);

// Add Axios instance to global properties
app.config.globalProperties.$axios = axiosInstance;

// Use router and mount the app
app.use(router);
app.mount('#app');
