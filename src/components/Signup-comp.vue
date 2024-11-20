<!-- src/components/Signup.vue -->
<template>
  <div class="signup-container">
    <h2 class="title">Sign Up</h2>
    <form @submit.prevent="handleSignup">
      <div class="form-group">
        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          v-model="username"
          required
          placeholder="Enter your username"
          class="form-control"
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
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          v-model="email"
          required
          placeholder="Enter your email"
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label for="role">Role</label>
        <select id="role" v-model="role" required class="form-control">
          <option value="" disabled>Select your role</option>
          <option value="sponsor">Sponsor</option>
          <option value="influencer">Influencer</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <button type="submit" class="btn">Sign Up</button>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
    </form>
  </div>
</template>

<script>
import { signup } from '../services/authService';

export default {
  data() {
    return {
      username: '',
      password: '',
      email: '',
      role: '',
      errorMessage: '',
      successMessage: '',
    };
  },
  methods: {
    async handleSignup() {
      try {
        await signup(this.username, this.password, this.email, this.role);
        this.successMessage = 'Account created successfully! Please log in.';
        this.errorMessage = '';
        setTimeout(() => {
          this.$router.push('/login'); // Redirect to login page after successful signup
        }, 2000);
      } catch (error) {
        this.errorMessage = error || 'Signup failed';
        this.successMessage = '';
      }
    },
  },
};
</script>

<style scoped>
.signup-container {
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
  color: #dfbd69;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

.form-control {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #555;
  background-color: #333;
  color: #fff;
}

.btn {
  background: linear-gradient(90deg, #dfbd69, #926f34);
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  display: inline-block;
  cursor: pointer;
  transition: box-shadow 0.3s ease;
  width: 100%;
}

.btn:hover {
  box-shadow: 0 0 10px rgba(223, 189, 105, 0.6);
}

.error-message {
  color: #ff5555;
  margin-top: 10px;
}

.success-message {
  color: #55ff55;
  margin-top: 10px;
}
</style>
