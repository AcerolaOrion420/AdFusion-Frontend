<template>
    <div class="container">
      <h1 class="title">Manage Flagged Entities</h1>
  
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
              <th v-if="activeFilter === 'users'">Username</th>
              <th v-if="activeFilter === 'users'">Email</th>
              <th v-if="activeFilter === 'campaigns'">Campaign Name</th>
              <th v-if="activeFilter === 'campaigns'">Sponsor</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="entity in entities" :key="entity.id">
              <td v-if="activeFilter === 'users'">{{ entity.username }}</td>
              <td v-if="activeFilter === 'users'">{{ entity.email }}</td>
              <td v-if="activeFilter === 'campaigns'">{{ entity.name }}</td>
              <td v-if="activeFilter === 'campaigns'">{{ entity.sponsor }}</td>
              <td>
                <button @click="unflagEntity(entity.id)" class="btn btn-unflag">
                  Unflag
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-else class="no-data">No flagged {{ activeFilter }} to display.</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        filters: [
          { type: 'users', label: 'Flagged Users' },
          { type: 'campaigns', label: 'Flagged Campaigns' },
        ],
        activeFilter: 'users',
        entities: [],
      };
    },
    methods: {
      async fetchEntities(type) {
        this.activeFilter = type;
        try {
          const endpoint =
            type === 'users'
              ? '/admin/flagged_users'
              : '/admin/flagged_campaigns';
          const response = await this.$axios.get(endpoint);
          this.entities = response.data.entities;
        } catch (error) {
          console.error(`Failed to fetch flagged ${type}:`, error.response || error);
          alert(`Failed to fetch flagged ${type}.`);
        }
      },
      async unflagEntity(entityId) {
        try {
          const endpoint =
            this.activeFilter === 'users'
              ? `/admin/unflag_user/${entityId}`
              : `/admin/unflag_campaign/${entityId}`;
          await this.$axios.post(endpoint);
          alert('Entity unflagged successfully.');
          this.fetchEntities(this.activeFilter); // Refresh the list
        } catch (error) {
          console.error('Failed to unflag entity:', error.response || error);
          alert('Failed to unflag the entity.');
        }
      },
    },
    created() {
      this.fetchEntities(this.activeFilter); // Load flagged users by default
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 900px;
    margin: 50px auto;
    text-align: center;
    background-color: #111;
    color: #dfbd69;
    padding: 20px;
    border-radius: 10px;
    border: 2px solid #dfbd69;
  }
  
  .title {
    font-size: 36px;
    margin-bottom: 30px;
  }
  
  .filter-buttons {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
  
  .filter-buttons .btn {
    margin: 0 10px;
    padding: 10px 20px;
    border: none;
    background-color: #333;
    color: #dfbd69;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .filter-buttons .btn.active {
    background-color: #dfbd69;
    color: #111;
  }
  
  .table-container {
    overflow-x: auto;
  }
  
  .table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
  }
  
  .table th, .table td {
    padding: 10px;
    border: 1px solid #444;
    text-align: center;
  }
  
  .table th {
    background-color: #222;
    color: #dfbd69;
  }
  
  .table td {
    background-color: #1c1c1c;
  }
  
  .btn-unflag {
    background: linear-gradient(90deg, #28a745, #218838);
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
  }
  
  .btn-unflag:hover {
    opacity: 0.8;
  }
  
  .no-data {
    font-size: 18px;
    margin-top: 20px;
  }
  </style>
  