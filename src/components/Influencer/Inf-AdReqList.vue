<template>
    <div>
      <InfluencerHeader />
      <div class="container">
        <h1>Ad Requests</h1>
  
        <!-- Ongoing Campaign Requests -->
        <section class="requests-section">
          <h2>Ongoing Campaign Requests</h2>
          <div
            v-for="adRequest in adRequests.ongoing"
            :key="adRequest.id"
            class="ad-request-card"
          >
            <h3>Campaign: {{ adRequest.campaign.name }}</h3>
            <p>Sponsor: {{ adRequest.sponsor.username }}</p>
            <p>Messages: {{ adRequest.messages }}</p>
            <p>Requirements: {{ adRequest.requirements }}</p>
            <p>Payment Amount: {{ adRequest.payment_amount }}</p>
            <p>Status: {{ adRequest.status }}</p>
  
            <!-- Action Buttons -->
            <div class="action-buttons">
              <!-- Modify Button -->
              <button @click="modifyAdRequest(adRequest)" class="btn btn-modify">
                Modify
              </button>
  
              <!-- Accept and Reject Buttons -->
              <template v-if="adRequest.latest_sender !== influencerId">
                <button
                  @click="acceptAdRequest(adRequest.id)"
                  class="btn btn-accept"
                  :disabled="adRequest.latest_sender === influencerId"
                >
                  Accept
                </button>
                <button
                  @click="rejectAdRequest(adRequest.id)"
                  class="btn btn-reject"
                  :disabled="adRequest.latest_sender === influencerId"
                >
                  Reject
                </button>
              </template>
  
              <!-- Delete Button -->
              <button
                @click="deleteAdRequest(adRequest.id)"
                class="btn btn-delete"
              >
                Delete
              </button>
            </div>
          </div>
        </section>
  
        <!-- Expired Requests -->
        <section class="requests-section">
          <h2>Expired Requests</h2>
          <div
            v-for="adRequest in adRequests.expired"
            :key="adRequest.id"
            class="ad-request-card"
          >
            <h3>Campaign: {{ adRequest.campaign.name }}</h3>
            <p>Sponsor: {{ adRequest.sponsor.username }}</p>
            <p>Messages: {{ adRequest.messages }}</p>
            <p>Requirements: {{ adRequest.requirements }}</p>
            <p>Payment Amount: {{ adRequest.payment_amount }}</p>
            <p>Status: {{ adRequest.status }}</p>
          </div>
        </section>
  
        <!-- Flagged Sponsor Requests -->
        <section class="requests-section">
          <h2>Flagged Sponsor's Requests</h2>
          <div
            v-for="adRequest in adRequests.flagged"
            :key="adRequest.id"
            class="ad-request-card"
          >
            <h3>Campaign: {{ adRequest.campaign.name }}</h3>
            <p>Sponsor: {{ adRequest.sponsor.username }}</p>
            <p>Messages: {{ adRequest.messages }}</p>
            <p>Requirements: {{ adRequest.requirements }}</p>
            <p>Payment Amount: {{ adRequest.payment_amount }}</p>
            <p>Status: {{ adRequest.status }}</p>
            <p class="flagged-warning">Flagged</p>
          </div>
        </section>
      </div>
    </div>
  </template>
  
  <script>
  import InfluencerHeader from './Inf-header.vue';
  
  export default {
    components: {
      InfluencerHeader,
    },
    data() {
      return {
        influencerId: null, // Stores the logged-in influencer's ID
        adRequests: {
          ongoing: [],
          expired: [],
          flagged: [],
        },
      };
    },
    async created() {
      await this.fetchInfluencerId();
      await this.fetchAdRequests();
    },
    methods: {
      async fetchInfluencerId() {
        try {
          const response = await this.$axios.get('/get_influencer_id');
          this.influencerId = response.data.influencer_id;
        } catch (error) {
          console.error('Error fetching influencer ID:', error.response || error);
        }
      },
      async fetchAdRequests() {
        try {
          const response = await this.$axios.get('/influencer/ad_requests');
          this.adRequests = response.data;
        } catch (error) {
          console.error('Error fetching ad requests:', error.response || error);
        }
      },
      modifyAdRequest(adRequest) {
    // Navigate to the Modify Request page with the requestId
    this.$router.push({
      name: 'ModifyRequestAd',
      params: { requestId: adRequest.id },
    });
  },
      async acceptAdRequest(requestId) {
        await this.$axios.post(`/ad_request/accept/${requestId}`);
        await this.fetchAdRequests();
      },
      async rejectAdRequest(requestId) {
        await this.$axios.post(`/ad_request/reject/${requestId}`);
        await this.fetchAdRequests();
      },
      async deleteAdRequest(requestId) {
        if (confirm("Are you sure you want to delete this request?")) {
          await this.$axios.delete(`/ad_request/delete/${requestId}`);
          await this.fetchAdRequests();
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 900px;
    margin: 50px auto;
    text-align: center;
    color: #dfbd69;
  }
  
  h1 {
    font-size: 2rem;
    margin-bottom: 20px;
  }
  
  .requests-section {
    margin-bottom: 40px;
  }
  
  .ad-request-card {
    border: 2px solid #dfbd69;
    border-radius: 10px;
    background-color: #1c1c1c;
    padding: 15px;
    margin: 15px 0;
    text-align: left;
  }
  
  .ad-request-card h3 {
    color: #dfbd69;
    font-size: 1.2rem;
    margin-bottom: 10px;
  }
  
  .ad-request-card p {
    margin: 5px 0;
    color: #f0e68c;
  }
  
  .flagged-warning {
    color: #ff4d4f;
    font-weight: bold;
  }
  
  .action-buttons {
    margin-top: 10px;
  }
  
  .btn {
    padding: 8px 15px;
    border: none;
    border-radius: 5px;
    font-weight: bold;
    margin-right: 10px;
    text-transform: uppercase;
    cursor: pointer;
  }
  
  .btn-modify {
    background-color: #6c757d;
    color: #fff;
  }
  
  .btn-accept {
    background-color: #28a745;
    color: #fff;
  }
  
  .btn-reject {
    background-color: #dc3545;
    color: #fff;
  }
  
  .btn-delete {
    background-color: #ffc107;
    color: #000;
  }
  
  .btn:hover {
    opacity: 0.8;
  }
  </style>
  
  