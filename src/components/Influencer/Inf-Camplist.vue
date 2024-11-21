<template>
    <div class="campaign-list-container">
      <h1 class="title">Campaign List</h1>
  
      <!-- Filters Section -->
      <form @submit.prevent="fetchCampaigns" class="form-inline mb-4">
        <div class="form-group">
          <label for="search" class="mr-2">Search</label>
          <input
            type="text"
            class="form-control mr-3"
            id="search"
            v-model="searchTerm"
            placeholder="Search by name, description, or sponsor"
          />
        </div>
        <div class="form-group">
          <label for="visibility" class="mr-2">Filter by Visibility</label>
          <select class="form-control mr-3" id="visibility" v-model="selectedVisibility">
            <option value="all">All</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
        <div class="form-group">
          <label for="sort" class="mr-2">Sort by Budget</label>
          <select class="form-control mr-3" id="sort" v-model="sortOrder">
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary">Search</button>
      </form>
  
      <!-- Campaigns Table -->
      <div class="table-box">
        <h2>Available Campaigns</h2>
        <table class="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Budget</th>
              <th>Visibility</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="campaign in campaigns" :key="campaign.id">
              <td>{{ campaign.name }}</td>
              <td>{{ campaign.description }}</td>
              <td>${{ campaign.budget }}</td>
              <td>{{ campaign.visibility }}</td>
              <td>
                <button
                @click="navigateToRequestAd(campaign.id)"
                    class="btn btn-request">
                        Request Sponsorship
                </button>

              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        campaigns: [],
        searchTerm: '',
        selectedVisibility: 'all',
        sortOrder: 'desc',
      };
    },
    async created() {
      await this.fetchCampaigns();
    },
    methods: {
        async fetchCampaigns() {
  try {
    const response = await this.$axios.get('/influencer/campaigns', {
      params: {
        search: this.searchTerm,
        visibility: this.selectedVisibility,
        sort_by: this.sortOrder,
      },
    });
    this.campaigns = response.data.campaigns;
  } catch (error) {
    console.error('Error fetching campaigns:', error.response || error);
  }
},
navigateToRequestAd(campaignId) {
    this.$router.push({ name: 'InfRequestAd', params: { campaignId } });
  },
    },
  };
  </script>
  
  <style scoped>
  body {
    background-color: #000000;
    color: #dfbd69;
    font-family: 'Arial', sans-serif;
  }
  
  .campaign-list-container {
    max-width: 1200px;
    margin: 80px auto;
    text-align: center;
    padding: 20px;
  }
  
  .title {
    color: #dfbd69;
    font-size: 36px;
    margin-bottom: 30px;
  }
  
  .table-box {
    border: 2px solid #dfbd69;
    border-radius: 10px;
    padding: 20px;
    background-color: #1c1c1c;
  }
  
  .table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  .table th,
  .table td {
    border: 1px solid #444;
    padding: 12px;
    text-align: center;
  }
  
  .table th {
    color: #dfbd69;
    font-weight: bold;
  }
  
  .table td {
    color: #dfbd69;
  }
  
  .btn-request {
    background: linear-gradient(90deg, #dfbd69, #926f34);
    border: none;
    border-radius: 10px;
    padding: 8px 15px;
    font-weight: bold;
    cursor: pointer;
  }
  
  .btn-request:hover {
    box-shadow: 0 0 15px rgba(223, 189, 105, 0.6);
  }
  </style>
  