<template>
    <div class="container">
      <h1 class="title">{{ isEditMode ? 'Modify Sponsorship Request' : 'Request Sponsorship' }}</h1>
      <form @submit.prevent="submitAdRequest">
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
          <label for="payment_amount">Payment Amount (USD)</label>
          <input
            type="number"
            id="payment_amount"
            v-model="adRequest.payment_amount"
            class="form-control"
            step="0.01"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary">
          {{ isEditMode ? 'Update Request' : 'Submit Request' }}
        </button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isEditMode: false, // Determines if editing mode is active
        campaign: {}, // Holds campaign data
        adRequest: {
          messages: '',
          requirements: '',
          payment_amount: '',
        },
      };
    },
    async created() {
      const campaignId = this.$route.params.campaignId;
      const requestId = this.$route.params.requestId;
  
      if (requestId) {
        this.isEditMode = true;
        await this.fetchAdRequest(requestId); // Fetch the ad request for editing
      } else {
        await this.fetchCampaign(campaignId); // Fetch campaign details for a new request
      }
    },
    methods: {
      async fetchCampaign(campaignId) {
        try {
          const response = await this.$axios.get(`/campaign/${campaignId}`);
          this.campaign = response.data;
        } catch (error) {
          console.error('Error fetching campaign:', error.response || error);
          alert('Failed to load campaign details.');
        }
      },
      async fetchAdRequest(requestId) {
  try {
    const response = await this.$axios.get(`/ad_request/${requestId}`);
    this.adRequest = response.data;
    this.campaign = response.data.campaign; // Populate campaign details if needed
  } catch (error) {
    console.error('Error fetching ad request:', error.response || error);
    alert('Failed to load ad request details.');
  }
},
      async submitAdRequest() {
        try {
          if (this.isEditMode) {
            // Send updated data to the backend
            const requestId = this.$route.params.requestId;
            await this.$axios.post(`/ad_request/modify/${requestId}`, this.adRequest);
            alert('Ad request updated successfully');
          } else {
            // Submit a new request
            const campaignId = this.$route.params.campaignId;
            await this.$axios.post(`/adrequest/${campaignId}`, this.adRequest);
            alert('Ad request submitted successfully');
          }
          this.$router.push('/influencer/ad-requests');
        } catch (error) {
          console.error('Error submitting ad request:', error.response || error);
          alert('Failed to submit or update the ad request.');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
    margin: 50px auto;
    background-color: #111;
    padding: 20px;
    border-radius: 10px;
    border: 2px solid #dfbd69;
  }
  .title {
    color: #dfbd69;
    text-align: center;
    margin-bottom: 20px;
  }
  .form-control {
    background-color: #1c1c1c;
    border: 1px solid #dfbd69;
    color: #dfbd69;
    border-radius: 10px;
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
    font-weight: bold;
    text-transform: uppercase;
  }
  .btn-primary:hover {
    box-shadow: 0 0 15px rgba(223, 189, 105, 0.6);
  }
  </style>
  