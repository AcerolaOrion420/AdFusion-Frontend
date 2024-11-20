<!-- src/components/Login.vue -->
<template>
    <div class="login-container">
      <h2 class="title">Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            v-model="username"
            required
            placeholder="Enter your username"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" class="btn">Login</button>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </form>
    </div>
  </template>
  
  <script>
import { login } from '../services/authService';

export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    async handleLogin() {
      try {
        const data = await login(this.username, this.password);

        this.errorMessage = '';

        // Redirect based on role
        if (data.role === 'sponsor') {
          this.$router.push('/sponsor/dashboard');
        } else if (data.role === 'influencer') {
          this.$router.push('/influencer/dashboard');
        } else if (data.role === 'admin') {
          this.$router.push('/admin/dashboard');
        } else {
          console.error('Unknown role detected. Redirecting to login.');
          this.$router.push('/login'); // Fallback
        }
      } catch (error) {
        this.errorMessage = error || 'Login failed. Please check your credentials.';
      }
    },
  },
};

  </script>
  

  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    background-color: #111;
    border-radius: 10px;
    text-align: center;
  }
  .title {
    font-size: 24px;
    margin-bottom: 20px;
  }
  .form-group {
    margin-bottom: 15px;
  }
  input[type="text"],
  input[type="password"] {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #555;
    background-color: #333;
    color: #fff;
  }
  .btn {
    background: linear-gradient(90deg, #DFBD69, #926F34);
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 100%;
  }
  .error-message {
    color: #ff5555;
    margin-top: 10px;
  }
  </style>
  