<template>
  <div>
    <SponsorHeader />
    <div class="container">
      <h1>Influencer List</h1>
      <form @submit.prevent="fetchInfluencers" class="form-inline mb-4">
        <div class="form-group">
          <label for="search" class="mr-2">Search</label>
          <input
            type="text"
            class="form-control mr-3"
            id="search"
            v-model="searchTerm"
            placeholder="Search by name, category, or niche"
          />
        </div>
        <div class="form-group">
          <label for="niche" class="mr-2">Filter by Niche</label>
          <select class="form-control mr-3" id="niche" v-model="selectedNiche">
            <option value="all">All Niches</option>
            <option v-for="niche in niches" :key="niche" :value="niche">
              {{ niche }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="sort" class="mr-2">Sort by Reach</label>
          <select class="form-control mr-3" id="sort" v-model="sortOrder">
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary">Search</button>
      </form>

      <div class="table-box">
        <h2>Available Influencers</h2>
        <table class="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Niche</th>
              <th>Reach</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="influencer in influencers" :key="influencer.id">
              <td>{{ influencer.username }}</td>
              <td>{{ influencer.category }}</td>
              <td>{{ influencer.niche }}</td>
              <td>{{ influencer.reach }}</td>
              <td>
                <!-- Button to navigate to the Request Ad page -->
                <button 
                  @click="navigateToRequestAd(influencer.id)" 
                  class="btn btn-request"
                >
                  Request Ad
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import SponsorHeader from './Spon-header.vue';

export default {
  components: {
    SponsorHeader,
  },
  data() {
    return {
      niches: [],
      influencers: [],
      searchTerm: '',
      selectedNiche: 'all',
      sortOrder: 'desc',
    };
  },
  async created() {
    await this.fetchNiches();
    await this.fetchInfluencers();
  },
  methods: {
    async fetchNiches() {
      const response = await this.$axios.get('/niches');
      this.niches = response.data;
    },
    async fetchInfluencers() {
      const response = await this.$axios.get('/influencers', {
        params: {
          search: this.searchTerm,
          niche: this.selectedNiche,
          sort_by: this.sortOrder,
        },
      });
      this.influencers = response.data.influencers;
    },
    navigateToRequestAd(influencerId) {
      // Navigate to the Request Ad page with the influencerId
      this.$router.push({ name: 'RequestAd', params: { influencerId } });
    },
  },
};
</script>

<style scoped>
body {
  background-color: #000000;
  color: #DFBD69;
  font-family: 'Arial', sans-serif;
}

.container {
  max-width: 1200px;
  margin: 80px auto; /* Push content below the header */
  padding: 20px;
}

.container h1, .table-box h2 {
  color: #DFBD69;
  text-align: center;
  margin-bottom: 30px;
}

.table-box {
  border: 2px solid #DFBD69;
  border-radius: 10px;
  padding: 20px;
  background-color: #1c1c1c;
  margin-top: 20px;
}

.table {
  color: #DFBD69;
  background-color: transparent;
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;
}

.table th, .table td {
  text-align: center;
  border: 1px solid #444;
  padding: 10px;
}

.table th {
  color: #DFBD69;
  font-weight: bold;
}

.table td {
  color: #DFBD69;
}

.btn-request {
  background: linear-gradient(90deg, #DFBD69, #926F34);
  border: none;
  border-radius: 10px;
  color: #000;
  font-weight: bold;
  padding: 5px 15px;
  text-transform: uppercase;
}

.btn-request:hover {
  box-shadow: 0 0 15px rgba(223, 189, 105, 0.6);
}
</style>
