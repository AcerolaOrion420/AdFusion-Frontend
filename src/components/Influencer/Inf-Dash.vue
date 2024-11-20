<!-- src/components/Influencer/InfDash.vue -->
<template>
  <div>
    <InfluencerHeader />

    <div class="dashboard-container">
      <h1 class="title">Dashboard</h1>

      <section class="profile-section">
        <h2>Profile</h2>
        <div class="profile-card">
          <p><strong>Username:</strong> {{ profile.username || 'None' }}</p>
          <p><strong>Email:</strong> {{ profile.email || 'None' }}</p>
          <p><strong>Category:</strong> {{ profile.category || 'None' }}</p>
          <p><strong>Niche:</strong> {{ profile.niche || 'None' }}</p>
          <p><strong>Follower Count:</strong> {{ profile.followerCount || 'None' }}</p>
          <router-link to="/influencer/profile" class="btn">Edit Profile</router-link>
        </div>
      </section>

      <section class="ad-request-section">
        <h2>Ad Request Status Distribution</h2>
        <div class="ad-request-chart">
          <p>Ad Request Status Distribution</p>
        </div>
      </section>
    </div>
  </div>
</template>


<script>
import InfluencerHeader from './Inf-header.vue';
export default {
  name: 'InfDash',
  components: {
    InfluencerHeader,
  },
  data() {
    return {
      profile: {
        username: '',
        email: '',
        category: '',
        niche: '',
        followerCount: '',
      },
    };
  },
  async created() {
    try {
      // Fetch the influencer profile information from the backend
      const response = await this.$axios.get('/influencer/profile');
      this.profile = response.data;
    } catch (error) {
      console.error('Failed to load profile:', error);
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

  