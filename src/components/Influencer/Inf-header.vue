<template>
  <nav class="navbar">
    <div class="navbar-container">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link to="/influencer/dashboard" class="nav-link">Dashboard</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/influencer/campaigns" class="nav-link">Search for Campaigns</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/influencer/ad-requests" class="nav-link">Ad Requests</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/influencer/payments" class="nav-link">Payments</router-link>
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
  name: "InfluencerHeader",
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
  position: fixed; /* Fixed position at the top */
  top: 0;
  left: 0;
  width: 100%; /* Full width */
  z-index: 1000; /* Ensure it’s above other elements */
}

.navbar-container {
  display: flex;
  align-items: center;
  padding-left: 15px; /* Aligns content to the left */
}

.navbar-nav {
  list-style: none;
  display: flex; /* Horizontal layout */
  gap: 20px; /* Space between links */
}

.nav-item {
  margin: 0;
}

.nav-link {
  color: #DFBD69;
  font-weight: bold;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
}

.nav-link:hover {
  color: #f5f5f5;
}

.logout-button {
  background: none;
  border: none;
  font: inherit;
  color: inherit;
  cursor: pointer;
  padding: 0;
  text-align: left;
}
</style>
