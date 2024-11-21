<template>
    <div class="admin-dashboard">
      <AdminHeader />
      <div class="dashboard-container">
        <h1 class="title">Admin Dashboard</h1>
  
        <div class="metrics">
          <div class="metric-card">
            <h2>Total Users</h2>
            <p>{{ metrics.total_users }}</p>
          </div>
          <div class="metric-card">
            <h2>Total Campaigns</h2>
            <p>{{ metrics.total_campaigns }}</p>
          </div>
          <div class="metric-card flagged">
            <h2>Flagged Users</h2>
            <p>{{ metrics.flagged_users }}</p>
          </div>
          <div class="metric-card flagged">
            <h2>Flagged Campaigns</h2>
            <p>{{ metrics.flagged_campaigns }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import AdminHeader from './Admin-Header.vue';
  
  export default {
    components: {
      AdminHeader,
    },
    data() {
      return {
        metrics: {
          total_users: 0,
          total_campaigns: 0,
          flagged_users: 0,
          flagged_campaigns: 0,
        },
      };
    },
    async created() {
      await this.fetchDashboardMetrics();
    },
    methods: {
      async fetchDashboardMetrics() {
        try {
          const response = await this.$axios.get('/admin/dashboard');
          this.metrics = response.data;
        } catch (error) {
          console.error('Error fetching dashboard metrics:', error.response || error);
          alert('Failed to load dashboard data.');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .admin-dashboard {
    max-width: 1200px;
    margin: 40px auto;
    padding: 20px;
    background-color: #111;
    border-radius: 10px;
    border: 2px solid #dfbd69;
  }
  
  .title {
    color: #dfbd69;
    text-align: center;
    margin-bottom: 30px;
  }
  
  .metrics {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
  }
  
  .metric-card {
    background-color: #1c1c1c;
    color: #dfbd69;
    border: 2px solid #dfbd69;
    border-radius: 10px;
    padding: 20px;
    text-align: center;
  }
  
  .metric-card.flagged {
    color: #ff4d4f;
  }
  
  .metric-card h2 {
    margin-bottom: 10px;
    font-size: 18px;
  }
  
  .metric-card p {
    font-size: 24px;
    font-weight: bold;
  }
  </style>
  