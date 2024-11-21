<template>
    <nav class="navbar">
      <div class="navbar-container">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/admin/dashboard" class="nav-link">Dashboard</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/manage-users" class="nav-link">Manage Users/Campaigns</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/manage-flaggedusers" class="nav-link">Flagged Users/Campaigns</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/logout" class="nav-link" @click="handleLogout">Logout</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: "AdminHeader",
    methods: {
      handleLogout() {
        // Clear session storage and cookies
        localStorage.clear();
        document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        this.$router.push('/');
      },
    },
  };
  </script>
  
  <style scoped>
  .navbar {
    background-color: #333;
    padding: 15px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
  }
  
  .navbar-container {
    display: flex;
    align-items: center;
    padding-left: 15px;
  }
  
  .navbar-nav {
    list-style: none;
    display: flex;
    gap: 20px;
  }
  
  .nav-item {
    margin: 0;
  }
  
  .nav-link {
    color: #DFBD69;
    font-weight: bold;
    text-transform: uppercase;
    text-decoration: none;
  }
  
  .nav-link:hover {
    color: #f5f5f5;
  }
  </style>
  