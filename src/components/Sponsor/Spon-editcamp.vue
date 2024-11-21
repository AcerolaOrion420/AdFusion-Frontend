<template>
  <div>
    <SponsorHeader />
    <div class="container">
      <h1>Edit Campaign</h1>
      <form @submit.prevent="updateCampaign">
        <div class="form-group">
          <label for="name">Campaign Name</label>
          <input
            type="text"
            class="form-control"
            id="name"
            v-model="campaign.name"
            required
          />
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <textarea
            class="form-control"
            id="description"
            v-model="campaign.description"
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
            v-model="campaign.start_date"
            required
          />
        </div>
        <div class="form-group">
          <label for="end_date">End Date</label>
          <input
            type="date"
            class="form-control"
            id="end_date"
            v-model="campaign.end_date"
            required
          />
        </div>
        <div class="form-group">
          <label for="budget">Budget</label>
          <input
            type="number"
            step="0.01"
            class="form-control"
            id="budget"
            v-model="campaign.budget"
            required
          />
        </div>
        <div class="form-group">
          <label for="niche">Niche</label>
          <select
            class="form-control"
            id="niche"
            v-model="campaign.niche"
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
            v-model="campaign.visibility"
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
            v-model="campaign.goals"
            rows="3"
            required
          ></textarea>
        </div>
        <button type="submit" class="btn btn-success">Update Campaign</button>
      </form>
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
      campaign: {
        name: "",
        description: "",
        start_date: "",
        end_date: "",
        budget: "",
        niche: "",
        visibility: "public",
        goals: "",
      },
      niches: [],
    };
  },
  methods: {
    async fetchCampaignData() {
      const campaignId = this.$route.params.campaignId;

      try {
        const [campaignResponse, nichesResponse] = await Promise.all([
          this.$axios.get(`/campaign/${campaignId}`),
          this.$axios.get("/niches"),
        ]);

        this.campaign = campaignResponse.data;
        this.niches = nichesResponse.data;
      } catch (error) {
        console.error("Error fetching campaign data:", error);
        alert("Failed to fetch campaign data. Please try again.");
      }
    },
    async updateCampaign() {
      const campaignId = this.$route.params.campaignId;

      try {
        const response = await this.$axios.put(
          `/campaign/${campaignId}`,
          this.campaign
        );

        if (response.status === 200) {
          alert("Campaign updated successfully!");
          this.$router.push("/sponsor/manage-campaigns");
        }
      } catch (error) {
        console.error("Error updating campaign:", error);
        alert("Failed to update the campaign. Please try again.");
      }
    },
  },
  mounted() {
    this.fetchCampaignData();
  },
};
</script>

<style scoped>
body {
  background-color: #000000;
  color: #f5f5f5;
  font-family: 'Arial', sans-serif;
}

.container {
  max-width: 600px;
  margin: 80px auto; /* Push content below the header */
  padding: 20px;
}

h1 {
  color: #dfbd69;
  text-align: center;
  margin-bottom: 30px;
}

.form-control {
  background-color: #1c1c1c;
  border: 1px solid #444;
  color: #f5f5f5;
  border-radius: 30px;
  padding: 10px 15px;
}

.form-control:focus {
  background-color: #333;
  border-color: #dfbd69;
}

.btn-success {
  background: linear-gradient(90deg, #dfbd69, #926f34);
  border: none;
  border-radius: 30px;
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.btn-success:hover {
  box-shadow: 0 0 15px rgba(223, 189, 105, 0.6);
}
</style>
