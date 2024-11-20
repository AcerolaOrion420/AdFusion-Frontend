<!-- src/components/Landing.vue -->
<template>
    <div class="landing-container">
      <h1 class="title">Welcome to AdFusion</h1>
      <p>Connect with top influencers and sponsors to grow your brand or influence.</p>
      <div class="button-container">
        <router-link to="/login" class="btn">Login</router-link>
        <router-link to="/signup" class="btn">Sign Up</router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Landing-comp',
  };
  </script>
  
  <style scoped>
  .landing-container {
    text-align: center;
    max-width: 600px;
    margin: 0 auto;
    padding: 50px 20px;
    background-color: rgba(0, 0, 0, 0.8);
    color: #f5f5f5;
    border-radius: 10px;
  }
  
  .title {
    font-size: 36px;
    margin-bottom: 20px;
    color: #dfbd69;
  }
  
  p {
    font-size: 18px;
    margin-bottom: 30px;
  }
  
  .button-container {
    display: flex;
    justify-content: center;
    gap: 20px;
  }
  
  .btn {
    display: inline-block;
    background: linear-gradient(90deg, #dfbd69, #926f34);
    color: white;
    padding: 10px 20px;
    font-size: 18px;
    border-radius: 5px;
    text-decoration: none;
    font-weight: bold;
    transition: box-shadow 0.3s ease;
  }
  
  .btn:hover {
    box-shadow: 0 0 10px rgba(223, 189, 105, 0.6);
  }
  </style>
  