<template>
  <div>
    <SponsorHeader />
    <div class="container">
      <h1>{{ isEditMode ? 'Modify Ad Request' : 'Request Ad' }}</h1>
      <form @submit.prevent="submitRequest">
        <div class="form-group">
          <label for="campaign_id">Select Campaign</label>
          <select
            id="campaign_id"
            v-model="adRequest.campaign_id"
            class="form-control"
            :disabled="isEditMode"
            required
          >
            <option v-for="campaign in campaigns" :key="campaign.id" :value="campaign.id">
              {{ campaign.name }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="messages">Messages</label>
          <textarea
            id="messages"
            v-model="adRequest.messages"
            class="form-control"
            rows="3"
            required
          ></textarea>
        </div>
        <div class="form-group">
          <label for="requirements">Requirements</label>
          <textarea
            id="requirements"
            v-model="adRequest.requirements"
            class="form-control"
            rows="3"
            required
          ></textarea>
        </div>
        <div class="form-group">
          <label for="payment_amount">Payment Amount</label>
          <input
            type="number"
            id="payment_amount"
            v-model="adRequest.payment_amount"
            class="form-control"
            placeholder="Enter amount in USD"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary">
          {{ isEditMode ? 'Update Request' : 'Submit Request' }}
        </button>
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
      isEditMode: false, // Determines if editing mode is active
      adRequest: {
        campaign_id: '',
        messages: '',
        requirements: '',
        payment_amount: '',
      },
      campaigns: [],
    };
  },
  async created() {
    const requestId = this.$route.params.requestId; // Check for requestId in the route
    if (requestId) {
      this.isEditMode = true; // Enable edit mode
      await this.fetchAdRequest(requestId); // Fetch the ad request for editing
    } else {
      await this.fetchCampaigns(); // Fetch campaigns for a new request
    }
  },
  methods: {
    async fetchCampaigns() {
      try {
        const response = await this.$axios.get('/sponsor/campaigns');
        this.campaigns = response.data.campaigns;
      } catch (error) {
        console.error('Error fetching campaigns:', error.response || error);
      }
    },
    async fetchAdRequest(requestId) {
      try {
        const response = await this.$axios.get(`/ad_request/${requestId}`);
        this.adRequest = response.data; // Populate the form with existing request data
      } catch (error) {
        console.error('Error fetching ad request:', error.response || error);
      }
    },
    async submitRequest() {
      try {
        if (this.isEditMode) {
          // Send updated data to the backend
          const requestId = this.$route.params.requestId;
          await this.$axios.post(`/ad_request/modify/${requestId}`, this.adRequest);
          alert('Ad request updated successfully');
        } else {
          // Submit a new request
          const influencerId = this.$route.params.influencerId;
          await this.$axios.post(`/ad_request/${influencerId}`, this.adRequest);
          alert('Ad request submitted successfully');
        }
        this.$router.push('/sponsor/ad-requests');
      } catch (error) {
        console.error('Error submitting ad request:', error.response || error);
        alert('Failed to submit or update the ad request');
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 80px auto; /* Push content below the header */
  text-align: center;
}

h1 {
  margin-bottom: 30px;
  font-size: 1.8rem;
}

.form-control {
  background-color: #1c1c1c;
  border: 1px solid #444;
  color: #dfbd69;
  border-radius: 30px;
  padding: 10px 15px;
}

.form-control:focus {
  background-color: #333;
  border-color: #dfbd69;
}

.btn-primary {
  background: linear-gradient(90deg, #dfbd69, #926f34);
  border: none;
  border-radius: 30px;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  color: #000;
  cursor: pointer;
}

.btn-primary:hover {
  box-shadow: 0 0 15px rgba(223, 189, 105, 0.6);
}
</style>
