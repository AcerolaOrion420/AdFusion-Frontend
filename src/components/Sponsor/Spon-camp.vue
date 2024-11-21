<template>
  <div>
    <SponsorHeader />
    <div class="manage-campaigns-container">
      <h1 class="title">Manage Campaigns</h1>

      <!-- Form to Create a New Campaign -->
      <div class="form-container">
        <form @submit.prevent="createCampaign">
          <div class="form-group">
            <label for="campaign_name">Campaign Name</label>
            <input
              type="text"
              class="form-control"
              id="campaign_name"
              v-model="newCampaign.name"
              required
            />
          </div>
          <div class="form-group">
            <label for="description">Description</label>
            <textarea
              class="form-control"
              id="description"
              v-model="newCampaign.description"
              rows="3"
              required
            ></textarea>
          </div>
          <div class="form-group">
            <label for="start_date">Start Date</label>
            <input
              type="date"
              class="form-control"
              id="start_date"
              v-model="newCampaign.start_date"
              required
            />
          </div>
          <div class="form-group">
            <label for="end_date">End Date</label>
            <input
              type="date"
              class="form-control"
              id="end_date"
              v-model="newCampaign.end_date"
              required
            />
          </div>
          <div class="form-group">
            <label for="budget">Budget</label>
            <input
              type="number"
              class="form-control"
              id="budget"
              v-model="newCampaign.budget"
              step="0.01"
              required
            />
          </div>
          <div class="form-group">
            <label for="niche">Niche</label>
            <select
              class="form-control"
              id="niche"
              v-model="newCampaign.niche"
              required
            >
              <option v-for="niche in niches" :key="niche" :value="niche">
                {{ niche }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="visibility">Visibility</label>
            <select
              class="form-control"
              id="visibility"
              v-model="newCampaign.visibility"
              required
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
          <div class="form-group">
            <label for="goals">Goals</label>
            <textarea
              class="form-control"
              id="goals"
              v-model="newCampaign.goals"
              rows="3"
              required
            ></textarea>
          </div>
          <button type="submit" class="btn">Create Campaign</button>
        </form>
      </div>

      <!-- Campaign Sections (Ongoing, Flagged, Past) -->
      <div class="campaigns-section">
        <!-- Ongoing Campaigns -->
        <div class="campaign-list">
          <h2>Ongoing Campaigns</h2>
          <table class="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Ad Requests</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="campaign in campaigns.ongoing" :key="campaign.id">
                <td>{{ campaign.name }}</td>
                <td>{{ campaign.adRequestCount }}</td>
                <td>
                  <button
                    @click="editCampaign(campaign.id)"
                    class="btn-action"
                  >
                    Edit
                  </button>
                  <button
                    @click="confirmDelete(campaign.id)"
                    class="btn-action btn-danger"
                  >
                    Delete
                  </button>
                  <button
                    @click="viewRequests(campaign.id)"
                    class="btn-action btn-info"
                  >
                    View Requests
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Flagged Campaigns -->
        <div class="campaign-list">
          <h2>Flagged Campaigns</h2>
          <table class="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="campaign in campaigns.flagged" :key="campaign.id">
                <td>{{ campaign.name }}</td>
                <td>
                  <button
                    @click="editCampaign(campaign.id)"
                    class="btn-action"
                  >
                    Edit
                  </button>
                  <button
                    @click="confirmDelete(campaign.id)"
                    class="btn-action btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Past Campaigns -->
        <div class="campaign-list">
          <h2>Past Campaigns</h2>
          <table class="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="campaign in campaigns.past" :key="campaign.id">
                <td>{{ campaign.name }}</td>
                <td>
                  <button
                    @click="confirmDelete(campaign.id)"
                    class="btn-action btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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
      newCampaign: {
        name: '',
        description: '',
        start_date: '',
        end_date: '',
        budget: '',
        visibility: 'public',
        niche: '',
        goals: '',
      },
      campaigns: {
        ongoing: [],
        flagged: [],
        past: [],
      },
    };
  },
  async created() {
    await this.fetchNiches();
    await this.fetchCampaigns();
  },
  methods: {
    async fetchNiches() {
      const response = await this.$axios.get('/niches');
      this.niches = response.data;
    },
    async fetchCampaigns() {
      const response = await this.$axios.get('/manage_campaigns');
      this.campaigns = response.data;
    },
    async createCampaign() {
      await this.$axios.post('/create_campaign', this.newCampaign);
      this.fetchCampaigns(); // Refresh campaigns after creation
    },
    editCampaign(campaignId) {
      this.$router.push(`/sponsor/campaign/${campaignId}/edit`);
    },
    viewRequests(campaignId) {
      this.$router.push(`/sponsor/campaign/${campaignId}/requests`);
    },
    async confirmDelete(campaignId) {
      if (confirm('Are you sure you want to delete this campaign?')) {
        await this.$axios.delete(`/delete_campaign/${campaignId}`);
        this.fetchCampaigns();
      }
    },
  },
};
</script>

  
  <style scoped>
    .manage-campaigns-container {/* Ensure it takes up a large portion of the screen */
      margin: 40px auto;
      padding: 20px;
      background-color: #111;
      border: 2px solid #dfbd69;
      border-radius: 15px;
    }
    
    .title {
      color: #dfbd69;
      text-align: center;
      font-size: 36px;
      margin-bottom: 30px;
    }
    
    .form-container {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr; /* Two-column layout for wider form fields */
      gap: 20px;
      padding: 20px;
    }
    
    .form-group {
      width: 100%;
    }
    
    label {
      color: #dfbd69;
      font-weight: bold;
      margin-bottom: 5px;
    }
    
    .form-control {
      width: 100%;
      padding: 10px;
      background-color: #222;
      color: #dfbd69;
      border: 1px solid #dfbd69;
      border-radius: 15px;
      outline: none;
    }
    
    .form-control:focus {
      border-color: #f5d487;
      background-color: #333;
    }
    
    textarea.form-control {
      resize: vertical;
    }
    
    .btn {
      grid-column: 1 / -1; /* Span full width of form in grid */
      width: 100%;
      padding: 12px;
      background: linear-gradient(90deg, #dfbd69, #926f34);
      color: white;
      border: none;
      border-radius: 30px;
      font-size: 18px;
      font-weight: bold;
      cursor: pointer;
      text-transform: uppercase;
      margin-top: 20px;
      transition: box-shadow 0.3s ease;
    }
    
    .btn:hover {
      box-shadow: 0 0 10px rgba(223, 189, 105, 0.6);
    }
    
    .campaigns-section {
      display: flex;
      flex-direction: column;
      gap: 30px;
      margin-top: 40px;
    }
    
    .campaign-list {
      background-color: #111;
      padding: 20px;
      border: 2px solid #dfbd69;
      border-radius: 15px;
    }
    
    h2 {
      color: #dfbd69;
      text-align: center;
      font-size: 28px;
      margin-bottom: 20px;
    }
    
    .table {
      width: 100%;
      color: #dfbd69;
    }
    
    .table th, .table td {
      padding: 12px;
      border: 1px solid #dfbd69;
    }
    
    .btn-action {
      background: linear-gradient(90deg, #dfbd69, #926f34);
      color: white;
      border: none;
      padding: 8px 12px;
      margin: 5px;
      border-radius: 5px;
      font-weight: bold;
      cursor: pointer;
      transition: box-shadow 0.3s ease;
    }
    
    .btn-action:hover {
      box-shadow: 0 0 10px rgba(223, 189, 105, 0.6);
    }
    
    .btn-danger {
      background: #cc0000;
    }
    
    .btn-info {
      background: #0066cc;
    }
  </style>
  