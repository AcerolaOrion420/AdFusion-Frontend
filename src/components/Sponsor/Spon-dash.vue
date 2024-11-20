<!-- src/components/Sponsor/SponsorDash.vue -->
<template>
    <div>
      <SponsorHeader />
      <div class="dashboard-container">
        <h1 class="title">AdFusion</h1>
  
        <section class="profile-section">
          <h2>Profile</h2>
          <div class="profile-card">
            <p><strong>Username:</strong> {{ profile.username || 'N/A' }}</p>
            <p><strong>Email:</strong> {{ profile.email || 'N/A' }}</p>
            <p><strong>Company Name:</strong> {{ profile.company_name || 'N/A' }}</p>
            <p><strong>Industry:</strong> {{ profile.industry || 'N/A' }}</p>
            <p><strong>Budget:</strong> {{ profile.budget || 'N/A' }}</p>
            <router-link to="/sponsor/profile" class="btn">Edit Profile</router-link>
          </div>
        </section>
  
        <section class="ad-request-section">
          <h2>Ad Request Status Distribution</h2>
          <div class="ad-request-chart">
            <canvas id="ad_chart" width="400" height="200"></canvas>
          </div>
        </section>
      </div>
    </div>
  </template>
  
  <script>
  import SponsorHeader from './Spon-header.vue';
  
  
  export default {
    name: 'SponsorDash',
    components: {
      SponsorHeader,
    },
    data() {
      return {
        profile: {
          username: '',
          email: '',
          company_name: '',
          industry: '',
          budget: '',
        },
      };
    },
    async created() {
      try {
        const profileResponse = await this.$axios.get('/sponsor/profile');
        this.profile = profileResponse.data;
  
        const chartData = await this.$axios.get('/ad_chart');
        this.renderChart(chartData.data);
      } catch (error) {
        console.error('Failed to load profile or chart data:', error);
      }
    },
  };
  </script>
  
  
  <style scoped>
.dashboard-container {
  max-width: 900px;
  margin: 50px auto;
  text-align: center;
  color: #dfbd69;
}

.title {
  font-size: 36px;
  margin-bottom: 20px;
}

.profile-section,
.ad-request-section {
  margin-top: 30px;
}

.profile-card {
  background-color: #333;
  color: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.profile-card p {
  font-size: 16px;
  margin: 10px 0;
}

.btn {
  background: linear-gradient(90deg, #dfbd69, #926f34);
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  display: inline-block;
  margin-top: 10px;
  transition: box-shadow 0.3s ease;
}

.btn:hover {
  box-shadow: 0 0 10px rgba(223, 189, 105, 0.6);
}

.ad-request-chart {
  background-color: #333;
  padding: 30px;
  border-radius: 10px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  color: #f5f5f5;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>

  