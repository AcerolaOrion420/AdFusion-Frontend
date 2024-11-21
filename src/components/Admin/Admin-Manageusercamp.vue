<template>
    <div class="container">
      <h1 class="title">Manage Entities</h1>
  
      <!-- Filter Buttons -->
      <div class="filter-buttons">
        <button 
          v-for="filter in filters" 
          :key="filter.type" 
          @click="fetchEntities(filter.type)" 
          :class="{ active: activeFilter === filter.type }"
          class="btn"
        >
          {{ filter.label }}
        </button>
      </div>
  
      <!-- Entities Table -->
      <div v-if="entities.length" class="table-container">
        <table class="table">
          <thead>
            <tr>
              <th v-for="header in tableHeaders" :key="header">{{ header }}</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="entity in entities" :key="entity.id">
              <td v-for="key in Object.keys(entity)" :key="key">{{ entity[key] }}</td>
              <td>
                <button 
                  @click="toggleFlag(entity.id)" 
                  :class="['btn-action', entity.flagged ? 'btn-flagged' : 'btn-unflagged']"
                >
                  {{ entity.flagged ? 'Unflag' : 'Flag' }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-else>No {{ activeFilter }} to display.</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        filters: [
          { type: 'influencers', label: 'Influencers' },
          { type: 'campaigns', label: 'Campaigns' },
        ],
        activeFilter: '',
        entities: [],
        tableHeaders: [],
      };
    },
    methods: {
      async fetchEntities(type) {
        try {
          this.activeFilter = type;
          const response = await this.$axios.get('/admin/active_entities', {
            params: { type },
          });
          this.entities = response.data;
  
          // Set table headers based on the current filter
          this.tableHeaders = type === 'influencers'
            ? ['ID', 'Username', 'Category', 'Niche', 'Follower Count', 'Flagged']
            : ['ID', 'Name', 'Sponsor ID', 'End Date', 'Flagged'];
        } catch (error) {
          console.error('Error fetching entities:', error.response || error);
          alert('Failed to fetch data.');
        }
      },
      async toggleFlag(entityId) {
        try {
          const response = await this.$axios.post('/admin/flag_entity', {
            id: entityId,
            type: this.activeFilter,
          });
          alert(response.data.message);
          await this.fetchEntities(this.activeFilter); // Refresh data
        } catch (error) {
          console.error('Error toggling flag:', error.response || error);
          alert('Failed to update flag status.');
        }
      },
    },
    created() {
      // Default fetch influencers on load
      this.fetchEntities('influencers');
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 900px;
    margin: 50px auto;
    text-align: center;
    color: #dfbd69;
    background-color: #111;
    padding: 20px;
    border-radius: 10px;
    border: 2px solid #dfbd69;
  }
  
  .title {
    font-size: 36px;
    margin-bottom: 20px;
  }
  
  .filter-buttons {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .filter-buttons .btn {
    padding: 10px 20px;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
    background-color: #333;
    color: #dfbd69;
    border: 2px solid #dfbd69;
  }
  
  .filter-buttons .btn.active {
    background-color: #dfbd69;
    color: #111;
  }
  
  .table-container {
    margin-top: 20px;
  }
  
  .table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    color: #dfbd69;
  }
  
  .table th, .table td {
    padding: 12px;
    border: 1px solid #444;
    text-align: center;
  }
  
  .table th {
    background-color: #333;
    font-weight: bold;
  }
  
  .table td {
    background-color: #222;
  }
  
  .btn-action {
    padding: 8px 15px;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
    border: none;
    text-transform: uppercase;
  }
  
  .btn-flagged {
    background-color: #dc3545;
    color: #fff;
  }
  
  .btn-unflagged {
    background-color: #28a745;
    color: #fff;
  }
  
  .btn-action:hover {
    opacity: 0.9;
  }
  </style>
  