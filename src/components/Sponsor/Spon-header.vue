<!-- src/components/Sponsor/SponsorHeader.vue -->
<template>
  <nav class="navbar">
    <div class="navbar-container">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link to="/sponsor/dashboard" class="nav-link">Dashboard</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/sponsor/manage-campaigns" class="nav-link">Manage Campaigns</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/sponsor/influencers" class="nav-link">Search for Influencers</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/sponsor/ad-requests" class="nav-link">Ad Requests</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/sponsor/payments" class="nav-link">Payments</router-link>
        </li>
        <li class="nav-item">
          <button @click="logout" class="nav-link logout-button">Logout</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'SponsorHeader',
  methods: {
    logout() {
      // Clear session cookie and local storage
      document.cookie = "session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      localStorage.clear();

      // Redirect to the logout route
      this.$router.push("/");
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
